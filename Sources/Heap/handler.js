/**
Name:   Heap Page Views Function
Author: Mark Urquhart
Date:   July/August 2022
Note:   For POC purposes, not a production ready function.
*/

async function onRequest(request, settings) {
	// receive incoming payload from Heap, push to json object
	let eventBody = request.json();

	// set if/then around event type, which maps to events defined via Heap Webhooks
	if (eventBody.type == 'page') {
		Segment.page({
            // using Heap ID as anonymous ID - this mapping is found at Heap Webhook level
			anonymousId: eventBody.anonymousId,
			context: {
				ip: eventBody.context_ip,
				page: {
					path: eventBody.page_path,
					referrer: eventBody.page_referrer,
					search: eventBody.page_search,
					title: eventBody.page_title,
					url: eventBody.page_url
				}
			},
			name: eventBody.page_title,
			properties: {
				source: eventBody.source,
				session_utm_source: eventBody.prop_session_utm_source,
				session_utm_medium: eventBody.prop_session_utm_medium,
				session_utm_term: eventBody.prop_session_utm_term,
				session_utm_content: eventBody.prop_session_utm_content,
				session_utm_campaign: eventBody.prop_session_utm_campaign,
				browser: eventBody.prop_browser,
				device_type: eventBody.prop_device_type,
				device: eventBody.prop_device,
				platform: eventBody.prop_platform,
				city: eventBody.prop_city,
				region: eventBody.prop_region,
				country: eventBody.prop_country
			}
		});
	}
	if (eventBody.type == 'click') {
		Segment.track({
			anonymousId: eventBody.anonymousId,
			context: {
				ip: eventBody.context_ip,
				session_id: eventBody.context_session_id,
				page: {
					path: eventBody.page_path,
					referrer: eventBody.page_referrer,
					search: eventBody.page_search,
					title: eventBody.page_title,
					url: eventBody.page_url
				}
			},
			event: `Clicked Element - ${eventBody.target_tag}`,
			properties: {
				heirarchy: eventBody.heirarhcy,
				source: eventBody.source,
				target_class: eventBody.target_class,
				target_id: eventBody.target_id,
				target_tag: eventBody.target_tag,
				target_text: eventBody.target_text,
				href: eventBody.href,
				session_utm_source: eventBody.prop_session_utm_source,
				session_utm_medium: eventBody.prop_session_utm_medium,
				session_utm_term: eventBody.prop_session_utm_term,
				session_utm_content: eventBody.prop_session_utm_content,
				session_utm_campaign: eventBody.prop_session_utm_campaign,
				browser: eventBody.prop_browser,
				device_type: eventBody.prop_device_type,
				device: eventBody.prop_device,
				platform: eventBody.prop_platform,
				city: eventBody.prop_city,
				region: eventBody.prop_region,
				country: eventBody.prop_country
			}
		});
	}
	if (eventBody.type == 'scroll') {
		Segment.track({
			anonymousId: eventBody.anonymousId,
			context: {
				ip: eventBody.context_ip,
				session_id: eventBody.context_session_id,
				page: {
					path: eventBody.page_path,
					referrer: eventBody.page_referrer,
					search: eventBody.page_search,
					title: eventBody.page_title,
					url: eventBody.page_url
				}
			},
			event: `Scroll Depth - ${eventBody.percent}`,
			properties: {
				percent: eventBody.percent,
				source: eventBody.source,
				session_utm_source: eventBody.prop_session_utm_source,
				session_utm_medium: eventBody.prop_session_utm_medium,
				session_utm_term: eventBody.prop_session_utm_term,
				session_utm_content: eventBody.prop_session_utm_content,
				session_utm_campaign: eventBody.prop_session_utm_campaign,
				browser: eventBody.prop_browser,
				device_type: eventBody.prop_device_type,
				device: eventBody.prop_device,
				platform: eventBody.prop_platform,
				city: eventBody.prop_city,
				region: eventBody.prop_region,
				country: eventBody.prop_country
			}
		});
	}
	if (eventBody.type == 'form submit') {
		Segment.track({
			anonymousId: eventBody.anonymousId,
			context: {
				ip: eventBody.context_ip,
				session_id: eventBody.context_session_id,
				page: {
					path: eventBody.page_path,
					referrer: eventBody.page_referrer,
					search: eventBody.page_search,
					title: eventBody.page_title,
					url: eventBody.page_url
				}
			},
			event: `Form Submitted - ${eventBody.form_name}`,
			properties: {
				form_name: eventBody.form_name,
				source: eventBody.source,
				session_utm_source: eventBody.prop_session_utm_source,
				session_utm_medium: eventBody.prop_session_utm_medium,
				session_utm_term: eventBody.prop_session_utm_term,
				session_utm_content: eventBody.prop_session_utm_content,
				session_utm_campaign: eventBody.prop_session_utm_campaign,
				browser: eventBody.prop_browser,
				device_type: eventBody.prop_device_type,
				device: eventBody.prop_device,
				platform: eventBody.prop_platform,
				city: eventBody.prop_city,
				region: eventBody.prop_region,
				country: eventBody.prop_country
			}
		});
	}
}
