import './PhotoSlide.css'
import EpkSlideComponent from '../EpkSlideComponent/EpkSlideComponent'

interface Islides {
    photoUrl: string,
    text: string
}

interface IPhotoSlide {
    onPhotoSelection: (photoId: string) => void;
}

export const PhotoSlide: React.FC<IPhotoSlide> = ({ onPhotoSelection }) => {
    const slides:Islides[] = [
        {
            photoUrl: 'public/photos/erinSteppin.jpg',
            text: 'PRESS/BRAGS'
        },
        {
            photoUrl: 'public/photos/drewLights.jpg',
            text: 'PHOTOS/ART'
        },
        {
            photoUrl: 'public/photos/tristagainRev.jpg',
            text: 'ABOUT US'
        },
        {
            photoUrl: 'public/photos/leeColorNiceTextureLights.jpg',
            text: 'VIDEOS'
        }
    ]

  return (
    <div className='mainPhotoSlideDiv'>
        {slides.map((slide, idx) => (
            <div onClick={() => onPhotoSelection(slide.text)}key={idx}>
             <EpkSlideComponent photoUrl={slide.photoUrl} text={slide.text} />
             </div>
        ))}
        </div>
  )
}
