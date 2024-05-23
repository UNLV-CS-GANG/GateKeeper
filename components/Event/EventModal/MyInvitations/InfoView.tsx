import getDateTime from '@/lib/getDateTime'
import { Dispatch, SetStateAction } from 'react'
import EventExtended from '@/types/Event/EventExtended'
import EventModalView from '@/types/Event/EventModalView'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import ModalContent from '@/components/Common/Modal/ModalContent'
import InfoList from '@/components/Common/Preview/InfoList/InfoList'
import InfoListItem from '@/components/Common/Preview/InfoList/InfoListItem'
import ModalFooter from '@/components/Common/Modal/ModalFooter'

export default function InfoView({
  event,
  setView,
}: {
  event: EventExtended
  setView: Dispatch<SetStateAction<EventModalView>>
}) {
  return (
    <>
      <ModalContent>
        {/* <ModalCornerButton>
          <button
            type="button"
            className="rounded-full p-1 outline-none transition-colors duration-150 hover:bg-gray-200"
            // onClick={() => {}} // add leave event popup
          >
            <EllipsisVerticalIcon className="h-6 w-6" />
          </button>
        </ModalCornerButton> */}

        <div className="pb-4">
          <div className="flex place-items-center space-x-1.5">
            {event.inviteLink && <LockClosedIcon className="h-5 w-5 text-gray-600" />}
            <h1 className="text-xl font-medium sm:text-2xl">{event.title}</h1>
          </div>
          <p className="text-sm text-gray-500 sm:text-base">{event.description}</p>
        </div>

        <InfoList>
          <InfoListItem label="Location">{event.location}</InfoListItem>
          <InfoListItem label="Created">{getDateTime(new Date(event.createdAt))}</InfoListItem>
          <InfoListItem label="Access">
            {getDateTime(new Date(event.accessStart))} {' - '}
            {getDateTime(new Date(event.accessEnd))}
          </InfoListItem>
          <InfoListItem label="Organization">{event.organizationId ? event.organization.name : 'N/A'}</InfoListItem>
          <InfoListItem label="Guests">
            {event.capacity ? `${event.invites.length}/${event.capacity}` : event.invites.length}
          </InfoListItem>
        </InfoList>
      </ModalContent>

      <ModalFooter>
        <div className="flex h-full place-items-center justify-between px-3">
          <button
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-500 shadow-sm transition-colors duration-200 hover:bg-gray-100 hover:text-gray-600"
            onClick={() => setView(EventModalView.LEAVE)}
          >
            Leave
          </button>
          <div className="flex space-x-2.5">
            <button
              className="rounded-lg bg-gray-600 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-gray-700 hover:text-gray-100"
              onClick={() => setView(EventModalView.TICKET)}
            >
              Ticket
            </button>
            <button
              className="rounded-lg bg-indigo-400 px-5 py-2.5 text-sm font-semibold text-gray-200 shadow-sm transition-colors duration-200 hover:bg-indigo-500 hover:text-gray-100"
              onClick={() => setView(EventModalView.CHAT)}
            >
              Chat
            </button>
          </div>
        </div>
      </ModalFooter>
    </>
  )
}