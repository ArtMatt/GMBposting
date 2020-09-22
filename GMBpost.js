function search() { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
 
  var service = getService();
  if (service.hasAccess()) {


    
    var options = {
      'headers': { 'Authorization': 'Bearer ' + service.getAccessToken() },
      'muteHttpExceptions': true,
      'method': 'get',
      'contentType': 'application/json')
    };

    var urlGMB = "https://mybusiness.googleapis.com/v4/accounts";
    try {
      var response = UrlFetchApp.fetch(urlGMB, options)
      } catch(e) { Logger.log(e) }
    
    var account = JSON.parse(response).accounts[0].name
    Logger.log("Good Stuff: " + account)
    
    var locsGMB = "https://mybusiness.googleapis.com/v4/" + account + "/locations";
    try {
      var responseLocs = UrlFetchApp.fetch(locsGMB, options)
      } catch(e) { Logger.log(e) }
    //Logger.log(responseLocs)
    Logger.log(JSON.parse(responseLocs).locations.length)
    var locs = JSON.parse(responseLocs).locations.length
    for (n=0; n < locs; n++) {
      name = JSON.parse(responseLocs).locations[n].locationName
      ID = JSON.parse(responseLocs).locations[n].name
      Logger.log(name + " " + ID)
    }
  
    
  } else { 
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

function gmbPost() { 
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  //var tab = sheet.getSheetByName("Titles and Zips");
 
  var service = getService();
  if (service.hasAccess()) {

    var data = {
      "languageCode": "en-US",
      "summary": "Order your Thanksgiving turkeys now!!",
      "callToAction": {
        "actionType": "ORDER",
        "url": "http://google.com/order_turkeys_here",
      },
      "media": [
       {
        "mediaFormat": "PHOTO",
        "sourceUrl": "http://www.art-matt.com/spooky13.jpeg",
       }
      ]
    }
    
    var options = {
      'headers': { 'Authorization': 'Bearer ' + service.getAccessToken() },
      'muteHttpExceptions': true,
      'method': 'get',
      'contentType': 'application/json',
      'payload': JSON.stringify(data)
    };
 
    //update this string with the information from the search function
    var locsGMB = "https://mybusiness.googleapis.com/v4/accounts/109355533101417304380/locations/10865417860994640452/localPosts"
    try {
      var responseLocs = UrlFetchApp.fetch(locsGMB, options)
      } catch(e) { Logger.log(e) }
    Logger.log(responseLocs)
  
    
  } else { 
    var authorizationUrl = service.getAuthorizationUrl();
    Logger.log('Open the following URL and re-run the script: %s',
        authorizationUrl);
  }
}

