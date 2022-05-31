/**
Name:  Sprinklr custom function for authenticated case updates
Author:  Mark Urquhart
Date:  May 30th, 2022
Note:  For demonstration purposes, not a production ready function.
*/

async function onRequest(request, settings) {
  let eventBody = request.json()
  let channel = eventBody.payload.contact.channelType
  let caseStatus = eventBody.payload.status
  let email = eventBody.payload.workflow.customProperties._c_62954a8e20e6bb5cfb7da0ab[0]
  let contact_id = eventBody.payload.contact.id
  let fullName = eventBody.payload.workflow.customProperties._c_62959be820e6bb5cfb85feca[0]

  const props = {
    social_channel: channel,
    social_case_channelId: eventBody.payload.contact.channelId,
    social_webhook_run_id: eventBody.id,
    social_case_id: eventBody.payload.id,
    social_case_number: eventBody.payload.caseNumber,
    social_case_subject: eventBody.payload.subject,
    social_case_description: eventBody.payload.description,
    social_case_createdTime: eventBody.payload.createdTime,
    social_case_modifiedTime: eventBody.payload.modifiedTime,
    social_case_sentimentScore: eventBody.payload.sentiment,
    social_case_status: caseStatus,
    social_case_priority: eventBody.payload.priority,
    social_case_caseType: eventBody.payload.caseType,
    social_case_twitterHandle: eventBody.payload.contact.name
  }

  Segment.track({
    event: `${channel} Case Update -  ${caseStatus}`,
    anonymousId: eventBody.payload.id,
    properties: props,
    context: {
      externalIds: [
        {
          id: contact_id,
          type: 'sprinklr_id',
          collection: 'users',
          encoding: 'none'
        },
        {
          id: email,
          type: 'email',
          collection: 'users',
          encoding: 'none'
        }
      ]
    }
  })
}
