function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify(readData())
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let requestData = JSON.parse(e.postData.contents);

  if (!requestData.action) {
    return ContentService.createTextOutput(JSON.stringify({ error: "Action required!" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (requestData.action === "create" && requestData.data) {
    let success = createData(requestData.data);
    return ContentService.createTextOutput(JSON.stringify({ success, message: success ? "Data added!" : "ID already exists!" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (requestData.action === "update" && requestData.id && requestData.data) {
    let updated = updateData(requestData.id, requestData.data);
    return ContentService.createTextOutput(JSON.stringify({ success: updated, message: updated ? "Data updated!" : "ID not found!" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (requestData.action === "delete" && requestData.id) {
    let deleted = deleteData(requestData.id);
    return ContentService.createTextOutput(JSON.stringify({ success: deleted, message: deleted ? "Data deleted!" : "ID not found!" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "Invalid request!" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
}

function readData() {
  let sheet = getSheet();
  let data = sheet.getDataRange().getValues();
  let headers = data[0]; // First row is headers
  let result = [];

  for (let i = 1; i < data.length; i++) {
    let rowObject = {};
    for (let j = 0; j < headers.length; j++) {
      rowObject[headers[j]] = data[i][j];
    }
    result.push(rowObject);
  }

  return result;
}

function createData(data) {
  let sheet = getSheet();
  let existingData = sheet.getDataRange().getValues();
  
  let newId = data[0];
  for (let i = 1; i < existingData.length; i++) {
    if (existingData[i][0] == newId) {
      return false; // ID already exists
    }
  }

  sheet.appendRow(data);
  return true;
}

function updateData(id, newData) {
  let sheet = getSheet();
  let data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      let row = data[i];
      newData[0] = row[0]; // Keep the original ID
      sheet.getRange(i + 1, 1, 1, newData.length).setValues([newData]);
      return true;
    }
  }
  return false;
}

function deleteData(id) {
  let sheet = getSheet();
  let data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == id) {
      sheet.deleteRow(i + 1);
      return true;
    }
  }
  return false;
}
