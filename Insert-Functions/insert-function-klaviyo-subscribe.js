// Author:  Mark Urquhart
// Date:  February 28th, 2024
// Disclaimer:  Please test before putting into production, avoid copy and pasting
// Note:  See the settings, we are adding settings for sensitive keys/vars for security purposes

// Setup a function to use the incoming Identify event as a parameter, and use Segment's settings module
async function onIdentify(event, settings) {
    
    // setting up universal variables
	const email = event.traits.email;
	const first_name = event.traits.first_name;
	const last_name = event.traits.last_name;
    
    // Adding verbose logging to help with debugging within Segment
	console.log(`Processing identify event for: ${email}`);

    // Establish variables
	let optedIn = false; 
	let isNewProfile = false; 
	let metadataData; 

	// GET to fetch traits from Segment's Profile API, based on the email in the Identify event
	const traitsResponse = await fetch(
		`https://profiles.segment.com/v1/spaces/${settings.segmentSpaceId}/collections/users/profiles/email:${email}/traits`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Basic ${btoa(`${settings.segmentProfileToken}` + ':')}`
			}
		}
	);
	const traitsData = await traitsResponse.json();
	optedIn = traitsData?.traits?.email_opt_in || false;

	console.log(`Opted in: ${optedIn}`);

	// GET to fetch metadata from Segment's Profile API
	try {
		const metadataResponse = await fetch(
			`https://profiles.segment.com/v1/spaces/${settings.segmentSpaceId}/collections/users/profiles/email:${email}/metadata`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Basic ${btoa(
						`${settings.segmentProfileToken}` + ':'
					)}`
				}
			}
		);
		if (!metadataResponse.ok) {
			throw new Error(`HTTP error! status: ${metadataResponse.status}`);
		}
		metadataData = await metadataResponse.json(); 
	} catch (error) {
		console.error('Failed to fetch metadata:', error);
		// Error handling
		return; 
	}

	// Check if the profile was created recently (e.g., within the last six hours)
	const createdAt = new Date(metadataData.metadata.created_at);
	const currentTime = new Date();
	const sixHoursInMilliseconds = 6 * 60 * 60 * 1000; // 6 hours in milliseconds
	if (currentTime - createdAt < sixHoursInMilliseconds) {
		isNewProfile = true;
	}

	console.log(`Is new profile: ${isNewProfile}`);

	// Formatting the consented_at timestamp to exclude fractional seconds
	const consentedAt = new Date(event.originalTimestamp)
		.toISOString()
		.replace(/\.\d+Z$/, 'Z');

	// If opted in and is a new profile, subscribe to Klaviyo list
	if (optedIn && isNewProfile) {
		console.log(`Subscribing ${email} to Klaviyo list.`);
		try {
			const response = await fetch(
				'https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						revision: '2023-12-15',
						Authorization: `Klaviyo-API-Key ${settings.klPrivKey}`
					},
					body: JSON.stringify({
						data: {
							type: 'profile-subscription-bulk-create-job',
							attributes: {
								custom_source: 'Segment Function',
								profiles: {
									data: [
										{
											type: 'profile',
											attributes: {
												email: email,
												subscriptions: {
													email: {
														marketing: {
															consent: 'SUBSCRIBED',
															consented_at: consentedAt // Use the formatted timestamp
														}
													}
												}
											}
										}
									]
								}
							},
							relationships: {
								list: {
									data: {
										type: 'list',
										id: settings.klaListId
									}
								}
							}
						}
					})
				}
			);
			const jsonResponse = await response.json();
			console.log(`Subscription response for ${email}:`, jsonResponse);
		} catch (error) {
			console.error('Subscription request failed for ${email}:', error);
		}
	} else {
		console.log(
			`Conditions not met for ${email}. Not subscribing to Klaviyo list.`
		);
	}

	return event;
}
