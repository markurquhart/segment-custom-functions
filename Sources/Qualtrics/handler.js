/**
Name:  Qualtrics custom function (education survey)
Author:  Mark Urquhart
Date:  March 24th, 2022
Note:  For demonstration purposes, not a production ready function.
*/

async function onRequest(request, settings) {
	let eventBody = request.json();
	let received_timestamp = +new Date();

	Segment.track({
		event: 'Qualtrics Survey Completed',
		anonymousId: eventBody.response_id,
		timestamp: received_timestamp,
		properties: {
			source: 'Qualtrics',
			survey_name: eventBody.survey_name,
			highest_level_of_education: eventBody.highest_level_of_education,
			first_name: eventBody.recipient_first_name,
			last_name: eventBody.recipient_last_name,
			email: eventBody.recipient_email,
			gpa: eventBody.gpa,
			university_of_choice: eventBody.university_of_choice,
			recipient_language: eventBody.recipient_language,
			response_postal_code: eventBody.response_postal_code,
			response_state: eventBody.response_state,
			response_city: eventBody.response_city,
			response_areacode: eventBody.response_areacode,
			response_country: eventBody.response_country,
			response_link: eventBody.response_link
		}
	});
}