/**
Chargebee Function Example - Invoice Updated
Author - Mark Urquhart
Last updated:  March 15th, 2022
*/
async function onRequest(request, settings) {
	let eventBody = request.json();

	if (eventBody.event_type == 'invoice_updated') {
		const props = {
			createTime: eventBody.content.invoice.generated_at,
			updateTime: eventBody.content.invoice.updated_at,
			customer_id: eventBody.content.invoice.customer_id,
			subscription_id: eventBody.content.invoice.subscription_id,
			invoice_status: eventBody.content.invoice.updated_at,
			invoice_total: eventBody.content.invoice.total,
			invoice_due_date: eventBody.content.invoice.due_date,
			price_type: eventBody.content.invoice.price_type,
			channel: eventBody.content.invoice.channel,
			// add additional properties as needed...
			source: 'Chargebee'
		};

		Segment.set({
			collection: eventBody.event_type,
			id: eventBody.id,
			properties: props
		});

		Segment.track({
			event: 'Invoice Updated',
			userId: eventBody.content.invoice.customer_id,
			properties: props
		});
	}
}
