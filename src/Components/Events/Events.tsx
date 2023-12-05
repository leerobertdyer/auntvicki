import './Events.css'

function Events() {
    return (
        <div className="events">
            <h4 className='showsTitle'>Upcoming Shows:</h4>
            <iframe
            className='calendar'
                src="https://calendar.google.com/calendar/embed?height=350&wkst=1&bgcolor=%23F6BF26&ctz=America%2FDetroit&showTitle=0&showDate=0&showNav=0&mode=AGENDA&showTz=0&showCalendars=0&showPrint=0&showTabs=0&src=YXVudHZpY2tpLm11c2ljQGdtYWlsLmNvbQ&color=%239E69AF"
                width="650"
                height="250"
                >
            </iframe>
        </div>
    )
}

export default Events