// import { createFlickr } from "flickr-sdk";

const API_KEY = import.meta.env.VITE_FLICKR_API_KEY
const user_id = import.meta.env.VITE_FLICKR_USER_ID

const apiUrl = 'https://api.flickr.com/services/rest/';

// const { flickr } = createFlickr(API_KEY)


export async function getPhotos() {
    const params = new URLSearchParams({
        method: 'flickr.photos.search',
        api_key: API_KEY,
        user_id,
        per_page: '100',
        page: '1',
        extras: 'url_o', 
        format: 'json',
        nojsoncallback: '1', 
      });
    
    const url:string = `${apiUrl}?${params}`;
    
try {
    const response = await fetch(url)
    const data = await response.json();
    return data.photos.photo
} catch (error) {
    console.error(`error getting photos: ${error}`)
}
}
