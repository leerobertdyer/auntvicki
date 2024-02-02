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
            photoUrl: 'src/assets/photos/erinSteppin.jpg',
            text: 'PRESS/BRAGS'
        },
        {
            photoUrl: 'src/assets/photos/drewLights.jpg',
            text: 'PHOTOS/ART'
        },
        {
            photoUrl: 'src/assets/photos/tristagainRev.jpg',
            text: 'ABOUT US'
        },
        {
            photoUrl: 'src/assets/photos/leeColorNiceTextureLights.jpg',
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
