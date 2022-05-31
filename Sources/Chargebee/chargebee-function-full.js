/**
~ FUNCTION INFO ~
Name - Chargebee Source Function
Description - This function is meant to bring customer events and activities from Chargebee into to Segment to include in Personas and/or other downstream Destinations.  Non-customer Chargebee webhook event types may be added in later, as requested (Coupons, Subscriptions, etc).
Function Version - 1.0
Function Author - Mark Urquhart
Using Chargbee API Version - 2.0
Last updated:  March 16th, 2022
*/

/**
~ SEGMENT API TERMINOLOGY HELPERS ~
Segment.Set = Set data to be sent to connected Data Warehouses 
Segment.Identify = Let Segment know customer information has changed 
Segment.Track = Let Segment know of a Customer activity / event fac
*/

/**
~ EVENT MAPPING ~
Chargebee Customer Specific Webhook Event -> Segment calls

1. Customer Created -> Segment.Set / Segment.Identify
2. Customer Changed -> Segment.Set / Segment.Identify
3. Customer Deleted -> Segment.Set / Segment.Identify 
4. Customer Moved Out -> Segment.Set / Segment.Identify 
5. Customer Moved In -> Segment.Set / Segment.Identify 
6. Promotional Credits Added -> Segment.Set / Segment.Track 
7. Promotional Credits Deducted -> Segment.Set / Segment.Track 
8. Subscription Created -> Segment.Set / Segment.Track
9. Subscription Created with Backdating -> Segment.Set / Segment.Track 
10. Subscription Started -> Segment.Set / Segment.Track 
11. Subscription Trial End Reminder -> Segment.Set / Segment.Track 
12. Subscription Activated -> Segment.Set / Segment.Track 
13. Subscription Activated with Backdating -> Segment.Set / Segment.Track 
14. Subscription Changed -> Segment.Set / Segment.Track 
15. Subscription Changed with Backdating -> Segment.Set / Segment.Track 
16. Subscription Cancelled -> Segment.Set / Segment.Track 
17. Subscription Cancelled with Backdating -> Segment.Set / Segment.Track 
18. Subscription Reactivated -> Segment.Set / Segment.Track 
19. Subscription Reactivated with Backdating -> Segment.Set / Segment.Track 
20. Subscription Renewed -> Segment.Set / Segment.Track 
21. Subscription Scheduled Cancellation Removed -> Segment.Set / Segment.Track 
22. Subscription Changed Scheduled -> Segment.Set / Segment.Track 
23. Subscription Scheduled Changes Removed -> Segment.Set / Segment.Track 
24. Subscription Shipping Address Updated -> Segment.Set / Segment.Track / Segment.Identify
25. Subscription Deleted -> Segment.Set / Segment.Track
26. Subscription Paused -> Segment.Set / Segment.Track
27. Subscription Pause Scheduled -> Segment.Set / Segment.Track
28. Subscription Scheduled Pause Removed -> Segment.Set / Segment.Track
29. Subscription Resumed -> Segment.Set / Segment.Track
30. Subscription Resumption Scheduled -> Segment.Set / Segment.Track
31. Subscription Scheduled Resumption Removed -> Segment.Set / Segment.Track
32. Subscription Advance Invoice Schedule Added -> Segment.Set / Segment.Track
33. Subscription Advance Invoice Updated -> Segment.Set / Segment.Track
34. Subscription Advance Invoice Schedule Removed -> Segment.Set / Segment.Track
35. SUbscription Renewal Reminder -> Segment.Set / Segment.Track
36. 

*/

async function onRequest(request, settings) {
	let eventBody = request.json();
    
    // Chargebee has the same webhook metadata across event types, so we can use a constant object here and combine it with event specific props
    const wh_metadata = {
        wh_id: eventBody.id,
        wh_occurred_at: eventBody.occurred_at,
        wh_source: eventBody.source,
        wh_user: eventBody.user,
        wh_event_type: eventBody.event_type, 
        wh_status: eventBody.webhook_status
    }

    // Customer Created Event - Set + Identify calls in Segment

    if (eventBody.event_type == 'customer_created') {
		let userId = eventBody.content.customer.id
        let event_props = {
            first_name: eventBody.content.customer.first_name,
            last_name: eventBody.content.customer.last_name,
            email: eventBody.content.customer.email,
            phone: eventBody.content.customer.phone,
            company: eventBody.content.customer.company,
            auto_collection: eventBody.content.customer.auto_collection,
            net_term_days: eventBody.content.customer.net_term_days,
            allow_direct_debit: eventBody.content.customer.allow_direct_debit,
            customer_created_at: eventBody.content.customer.customer_created_at,
            taxability: eventBody.content.customer.taxability,
            customer_updated_at: eventBody.content.customer.customer_updated_at,
            pii_cleared: eventBody.content.customer.pii_cleared,
            channel: eventBody.content.customer.channel,
            resource_version: eventBody.content.customer.resource_version,
            deleted: eventBody.content.customer.deleted,
            object: eventBody.content.customer.object,
            card_status: eventBody.content.customer.card_status,
            promotional_credits: eventBody.content.customer.promotional_credits,
            refundable_credits: eventBody.content.customer.refundable_credits,
            excess_payments: eventBody.content.customer.excess_payments,
            unbilled_charges: eventBody.content.customer.unbilled_charges,
            preferred_currency_code: eventBody.content.customer.preferred_currency_code,
			source: 'Chargebee'
		};

        const props = Object.assign(wh_metadata, event_props)

		Segment.set({
			collection: wh_event_type,
			id: wh_id,
			properties: props
		});
        
        Segment.identify({
            userId: customer_id,
            traits: {
              userName: 'Unicorn'
            }
        })
		Segment.track({
			event: 'Customer Created',
			userId: eventBody.content.invoice.customer_id,
			properties: props
		});
	}

}
