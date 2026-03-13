import axios from 'axios';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export function getPublicCalendarEvents() {
  const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/auntvicki.music@gmail.com/events?key=${API_KEY}`;

  return axios.get(calendarUrl);
}