// import { createFlickr } from "flickr-sdk";

const API_KEY = import.meta.env.VITE_FLICKR_API_KEY
const user_id = import.meta.env.VITE_FLICKR_USER_ID

const apiUrl = 'https://api.flickr.com/services/rest/';

// const { flickr } = createFlickr(API_KEY)



export async function getPhotos(tags: string) {

    function shuffleArray<T>(array: T[]): T[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const params = new URLSearchParams({
        method: 'flickr.photos.search',
        api_key: API_KEY,
        user_id,
        tags,
        per_page: '100',
        page: '1',
        extras: 'url_s, url_l', 
        format: 'json',
        nojsoncallback: '1', 
      });
    
    const url:string = `${apiUrl}?${params}`;
    
try {
    const response = await fetch(url)
    const data = await response.json();
    
    const photos = data.photos.photo
    shuffleArray(photos)
    // console.log('PHOTOS ARRAY FLICKR.ts: ', photos)
    return photos
} catch (error) {
    console.error(`error getting photos: ${error}`)
}
}
