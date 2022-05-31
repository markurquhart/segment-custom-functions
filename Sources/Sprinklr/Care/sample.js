let json = {
    "eventTime": 1653968528732,
    "id": "62958e9020e6bb5cfb84fd96",
    "payload": {
      "allEngagedUsersList": [
        "1000174680"
      ],
      "avgCaseResponseSLA": 1012658,
      "caseNumber": 4698,
      "caseType": "Complaint",
      "channelCustomProperties": [],
      "contact": {
        "channelId": "1410590426084614149",
        "channelType": "TWITTER",
        "id": "TWITTER_1410590426084614149",
        "name": "prankingdwight"
      },
      "conversationId": "1531398681517342723",
      "createdTime": 1653949723486,
      "description": "@ntdundermifflin can you please give me an update on my order?",
      "firstMessageAssociatedTime": 1653948872342,
      "firstMessageId": "ACCOUNT_1000124883_1653948872342_TWITTER_4_1531398681517342723",
      "firstUserBrandResponseCreationTime": 1653949885000,
      "id": "6295451b20e6bb5cfb7c5e65",
      "latestMessageAssociatedTime": 1653951511151,
      "latestProfileMessageAssociatedTime": 1653948872342,
      "modifiedTime": 1653968528704,
      "priority": "Normal",
      "sentiment": 0,
      "status": "Awaiting Assignment",
      "subject": "Jim Halpert - Order update required",
      "totalProcessingClockTime": 0,
      "version": 27,
      "workflow": {
        "assignment": {
          "assignedById": 1000174680,
          "assigneeId": "1000174680",
          "assigneeType": "USER",
          "assignmentTime": 1653949723485
        },
        "customProperties": {
          "59f2edc7e4b055fc746f4ed3": [
            "1000174680"
          ],
          "5a0d0ed5e4b0de2cde63ac2d": [
            "Default"
          ],
          "5a173daae4b087d044a38505": [
            "AAAAA"
          ],
          "5e3a7c15b805f905440a5f22": [
            "No"
          ],
          "5e85bab6e107005ca269e6c8": [
            "False"
          ],
          "5f2d5a7ec1e68e20a9e69455": [
            "No"
          ],
          "_c_6012bda46a07a05b7bc03289": [
            "false"
          ],
          "_c_612cda93291a9a1d7327b09b": [
            "false"
          ],
          "_c_62954a8e20e6bb5cfb7da0ab": [
            "prankingdwight@gmail.com"
          ],
          "spr_uc_last_assigned_agent": [
            "1000174680"
          ],
          "spr_uc_priority": [
            "Normal"
          ],
          "spr_uc_status": [
            "Awaiting Assignment"
          ],
          "spr_uc_type": [
            "Complaint"
          ]
        },
        "queues": []
      }
    },
    "subscriptionDetails": {
      "subscriptionId": "629544f020e6bb5cfb7c5c74"
    },
    "type": "case.update"
  };

let email = json.payload.workflow.customProperties._c_62954a8e20e6bb5cfb7da0ab[0];


console.log(email);