// © 2021 Poren Chiang

// Constants
var SPREADSHEET_ID = "<SPREADSHEET_ID>"

// Functions
function fetchData() {
  var response = UrlFetchApp.fetch("https://sms.1922.gov.tw/map/user/people/clear_count")
  try {
    var text = response.getContentText()
    var entity = JSON.parse(text)
    if (entity["Result"])
      return entity["Data"]
    Logger.log(text)
  }
  finally {}
  Logger.log(response)
  return null
}

function formatDate(date) {
  return Utilities.formatDate(date, "GMT+8", "yyyy-MM-dd")
}

function formatTime(date) {
  return Utilities.formatDate(date, "GMT+8", "yyyy-MM-dd'T'HH:mm:ss")
}

function parseDate(dateStr) {
  return dateStr.substr(0, 4) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(6)
}

function run() {
  // Declare the spreadsheet we’re going to use
  var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID)
  var sheet = spreadsheet.getSheetByName("AutoFetch")

  // Load the existing dates
  var dates = sheet.getSheetValues(1, 1, sheet.getLastRow(), 1).map((i) => (i[0] instanceof Date) ? formatDate(i[0]) : i[0])

  // Fetch data from 1922 server
  var data = fetchData()
  if (data === null) return

  // Check if data has already been recorded
  var date = parseDate(data["yyyymmdd"])
  var rowNumber = dates.indexOf(date) + 1
  if (rowNumber > 1) {
    var timestamp = data["updatetime"].substr(0, 19)
    var lastUpdated = formatTime(sheet.getSheetValues(rowNumber, 5, 1, 1)[0][0])
    Logger.log("[%s] #%d last updated %s <=> %s", date, rowNumber, timestamp, lastUpdated)

    // Use string dictionary sort
    if (timestamp <= lastUpdated) return
  }

  // Append data
  sheet.appendRow([date, data["alldaycnt"], data["allsumcnt"], data["allqryrowcnt"], data["updatetime"]])
}
