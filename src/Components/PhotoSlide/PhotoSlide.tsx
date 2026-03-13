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
            photoUrl: '/photos/erinSteppin.jpg',
            text: 'PRESS'
        },
        {
            photoUrl: '/photos/drewBlackAndWhite.jpg',
            text: 'PHOTOS'
        },
        {
            photoUrl: '/photos/gregg2.jpg',
            text: 'ABOUT'
        },
        {
            photoUrl: '/photos/leeColorNiceTextureLights.jpg',
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
