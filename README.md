# Google Sheets API - User Guide

## Overview
This guide provides instructions on how to set up and modify the provided Google Apps Script API to interact with Google Sheets. This API allows you to **Create, Read, Update, and Delete (CRUD)** data in a Google Sheet.

## Features
- **Read Data**: Fetch all rows from the sheet.
- **Create Data**: Add a new row.
- **Update Data**: Modify an existing row based on an ID.
- **Delete Data**: Remove a row based on an ID.

## How to Use

### 1. **Set Up Google Apps Script**
1. Open **Google Sheets**.
2. Click on **Extensions > Apps Script**.
3. Delete any existing code and paste the provided script.
4. Click **Deploy** > **New Deployment**.
5. Choose **Web app** as the deployment type.
6. Set access to **Anyone**.
7. Click **Deploy** and authorize permissions.
8. Copy the **Web App URL** and use it for API calls.

### 2. **Modify for a Different Google Sheet**
To use this script for another sheet:
- Change the **Sheet Name** in the `getSheet()` function:
  ```javascript
  function getSheet() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Your_Sheet_Name");
  }
  ```
- Ensure the sheet has the required columns.

### 3. **API Endpoints**
#### a) **Read Data (GET Request)**
- **URL**: `https://your-deployed-url`  
- **Example Response**:
  ```json
  [
    { "ID": "1", "Name": "John Doe", "Age": "30" },
    { "ID": "2", "Name": "Jane Doe", "Age": "25" }
  ]
  ```

#### b) **Create Data (POST Request)**
- **URL**: `https://your-deployed-url`
- **Payload**:
  ```json
  {
    "action": "create",
    "data": ["3", "Alice Smith", "28"]
  }
  ```
- **Response**:
  ```json
  { "success": true, "message": "Data added!" }
  ```

#### c) **Update Data (POST Request)**
- **URL**: `https://your-deployed-url`
- **Payload**:
  ```json
  {
    "action": "update",
    "id": "2",
    "data": ["2", "Jane Smith", "26"]
  }
  ```
- **Response**:
  ```json
  { "success": true, "message": "Data updated!" }
  ```

#### d) **Delete Data (POST Request)**
- **URL**: `https://your-deployed-url`
- **Payload**:
  ```json
  {
    "action": "delete",
    "id": "3"
  }
  ```
- **Response**:
  ```json
  { "success": true, "message": "Data deleted!" }
  ```

### 4. **Customizing the API for Different Use Cases**
If you want to use this API for a different purpose, modify:
1. **Column Headers:** Ensure your sheet has relevant headers.
2. **Validation:** Add more conditions to check input data.
3. **Custom Actions:** Extend the `doPost` function to support more operations.

### 5. **Troubleshooting**
- **Getting `Method Not Allowed`?** Use only `GET` and `POST` requests since `PUT` and `DELETE` are not supported.
- **Not Updating Data?** Ensure the first column is an `ID` and unique.
- **Getting `Invalid Request`?** Ensure the request payload has correct keys.


