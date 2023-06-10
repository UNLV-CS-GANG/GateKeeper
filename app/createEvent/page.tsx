import EventForm from "@/components/EventForm";
import BackButton from "@/components/BackButton";
import isValidEvent from "@/lib/isValidEvent";
import { auth } from "@clerk/nextjs";
import { Event } from "@prisma/client";

export default function CreateEvent() {
	const url = 'http://localhost:3000'
	
	async function postEvent(event: Event) {
		'use server';

		const { getToken } = auth();
		const accessToken = await getToken();
	
		if(isValidEvent(event)) {
			try {
				const res = await fetch(`${url}/api/event`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`,
					},
					body: JSON.stringify(event),
				});
	
				if(!res.ok)
					throw Error('Bad request')
	
				console.log('Successful post:', await res.json());
			}
			catch(err) {
				console.error('Error:', err);
			}
		}
		else {
			console.log('Invalid event. Canceling request...')
		}
	}

	return (
		<div>
			<EventForm postEvent={postEvent} />
			<BackButton route='/' />
		</div>
	);
}
