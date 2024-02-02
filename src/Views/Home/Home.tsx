import Header from "../../Components/Header/Header"
import Bio from "../../Components/Bio/Bio"
import Videos from "../../Components/Videos/Videos"
import { getPublicCalendarEvents } from "../../googleAPI"
import { useEffect, useState } from "react"
import Event from "../../Components/Event/Event"
import Footer from "../../Components/Footer/Footer"

interface Ievent{
    summary: string,
    id: string,
    start: {
        dateTime: Date
    }
}   


const Home = () => {
    const [events, setEvents] = useState<Ievent[]>([])

    useEffect(() => {
        const fetchEvents = async () => {
            const now = new Date()
            const latestEvents = await getPublicCalendarEvents();
            const data = latestEvents.data
            const items = data.items
            const nextEvents = []
            for (const item of items) {
                const itemSpecs:Ievent = {
                    summary: '',
                    id: '',
                    start: {
                        dateTime: new Date()
                    }
                }
                if (new Date(item.start.dateTime) >= now) {
                    itemSpecs['summary']= item.summary
                    itemSpecs['id'] = item.id
                    itemSpecs['start']['dateTime'] = item.start.dateTime
                    nextEvents.push(itemSpecs)
                }
            }
            nextEvents.sort((a, b) => {
                const dateA = new Date(a.start.dateTime)
                const dateB = new Date(b.start.dateTime)
                return dateA.getTime() - dateB.getTime();    
            })

            setEvents(nextEvents)
        }
        fetchEvents();
    }, [])

    return (
        <>
            <Header />
            <div style={{backgroundColor: "rgb(24, 24, 24)", padding: "15px", borderTop: "solid white 3px", borderBottom: "solid white 3px"}}>
            <Bio />
            </div>
            <Videos />
            <Event events={events} />
            <Footer />
        </>
    )
}

export default Home