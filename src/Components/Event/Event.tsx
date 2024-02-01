import './Event.css'
import { FaCameraRetro } from "react-icons/fa";


interface Event {
    summary: string,
    id: string,
    start: {
        dateTime: Date
    }
}

interface EventProps {
    events: Event[];
  }
  
  const Event: React.FC<EventProps> = ({ events }) => {

    return (
        <div className="mainEventDiv">
            <h1>Upcoming Events</h1>
            {events && events.length > 0 &&
                events.map((event: Event) => (
                    <div className='eachEvent' key={event.id}>
                        <h2 className="eventDate">{new Date(event.start.dateTime).toLocaleString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                        })}
                        </h2>
                        <h3 className="eventTitle">{event.summary}</h3>
                    </div>
                ))}
                <p className='photoCredit'><FaCameraRetro /> by <a href="https://www.instagram.com/swiftbennett/?img_index=1" target='_blank'>Sam Bennett</a></p>
        </div>
    )
}

export default Event