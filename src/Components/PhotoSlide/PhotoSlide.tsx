import './PhotoSlide.css'

interface Islides {
    photoUrl: string,
    text: string
}

export const PhotoSlide = () => {
    const slides:Islides[] = [
        {
            photoUrl: 'src/assets/avLogo.png',
            text: 'PHOTOS & ART'
        },
        {
            photoUrl: 'src/assets/epicJamShot.jpg',
            text: 'BIO & GOALS'
        },
        {
            photoUrl: 'src/assets/fullStage.jpg',
            text: 'PRESS & BRAGS'
        },
        {
            photoUrl: 'src/assets/crowd.jpg',
            text: 'VIDEOS'
        }
    ]

  return (
    <div className='mainPhotoSlideDiv'>
        {slides.map(slide, idx)}
        </div>
  )
}
