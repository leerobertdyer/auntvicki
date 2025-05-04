"use client";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { getPublicCalendarEvents } from "../../../googleAPI";

export default function Shows() {
  const [events, setEvents] = useState<(string[] | null)[]>([]);

  type EventItem = {
    start: {
      dateTime: string;
    };
    summary: string;
  };
  type EventData = {
    items: EventItem[];
  };

  useEffect(() => {
    const updateEvents = async () => {
      const today: Date = new Date();
      const newEvents = await getPublicCalendarEvents();
      const eventData = newEvents.data as EventData;
      const eventsArray: (string[] | null)[] = eventData.items
        .map((e) => {
          const eventDate = new Date(e.start.dateTime);
          if (eventDate >= today) {
            const dateString = e.start.dateTime;
            const date = new Date(dateString);
            const options: Intl.DateTimeFormatOptions = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const formattedDate = date.toLocaleDateString("en-US", options);
            return [formattedDate, e.summary];
          }
          return null;
        })
        .filter((e) => e !== null)
        .reverse();

      setEvents(eventsArray);
      console.log(eventsArray);
    };
    updateEvents().catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, []);

  return (
    <>
      <Header />
      <div className=" min-h-screen bg-center" style={{ backgroundImage: "url(/grafitti2.jpeg)", backgroundSize: 'cover' }}>
        <div
          className="
      m-auto 
     mt-[80px]
      flex 
      h-fit 
      min-h-10 
      w-10/12 
      max-w-screen-lg 
      flex-col 
      rounded-md 
      bg-purple-300
      bg-opacity-90
      border-white
      border-solid
      border-4
      p-5"
        >
          {events ? (
            <>
              <h2 className="p-4 text-center text-2xl sm:text-5xl">
                Upcoming Shows:
              </h2>
              {events.map((event, idx) => {
                return (
                  <div key={idx}>
                    {event ? (
                      <div className="p-2 text-center">
                        <p
                          className="
                      m-auto 
                      max-w-screen-md
                       border-t-2
                       border-t-black"
                        >
                          {event[0]}
                        </p>
                        <p
                          className="
                      m-auto 
                      max-w-screen-md 
                      border-t-2 
                      border-t-black 
                      pb-2
                      pt-5
                      text-3xl"
                        >
                          {event[1]}
                        </p>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <p className="text-center">No upcoming Wife Island shows :(</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
