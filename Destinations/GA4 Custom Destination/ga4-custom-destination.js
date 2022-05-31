/**
Google Analytics 4 - Destination Function Sample
Author - Mark Urquhart
Last updated:  March 21st, 2022
Note:  This is not a production ready function - just a 'hello world' example to show destination function capabilities.
*/


/**
Handle all track events
 */

 async function onTrack(event, settings) {
    const endpoint = 'https://www.google-analytics.com/mp/collect?measurement_id=$settings.measurementid&api_secret=$settings.apisecret'; // GA4 Measurement Protocol Base URL
    
    let eventbody = {
    "client_id" : event.anonymousId,
    "events": [{
        "name" : event.event,
        "params" : {
            "param1": "param1value"
        }
    }]
    }   

    const init = {
        body: JSON.stringify(eventbody),
        headers: {
            "Content-Type": "application/json"
          },
        method: "post"
    }
   
    const res = await fetch(endpoint, init)
    return res.json()

}