import React, { useEffect, useState } from 'react';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

    interface ProcessEnv {
        VITE_GOOGLE_CALENDAR_API_KEY: string;
    }
  

const CLIENT_ID:ProcessEnv = process.env.VITE_REACT_APP_GOOGLE_CALENDAR_API_KEY;

const CalendarEvents = () => {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    const oauth2Client = new OAuth2Client({
      clientId: CLIENT_ID,
      redirectUri: 'http://localhost:3000', // Your authorized redirect URI
    });

    const handleAuth = async () => {
      try {
        const { tokens } = await oauth2Client.getToken();
        oauth2Client.setCredentials(tokens);
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const response = await calendar.events.list({
          calendarId: 'primary', // Use 'primary' for the user's primary calendar
          timeMin: new Date().toISOString(),
          maxResults: 10, // Adjust as needed
          singleEvents: true,
          orderBy: 'startTime',
        });
        setEvents(response.data.items || []);
      } catch (error) {
        console.error('Authentication error:', error);
      }
    };

    handleAuth();
  }, []);

  return (
    <div>
      <h1>Google Calendar Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.summary}</strong>
            <p>{new Date(event.start.dateTime || event.start.date).toLocaleDateString()}</p>
            <p>{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarEvents;
