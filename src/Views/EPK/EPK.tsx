import { PhotoSlide } from '../../Components/PhotoSlide/PhotoSlide'
import './EPK.css'
import { ContactStrip } from '../../Components/ContactStrip/ContactStrip'
import { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa";
import Bio from '../../Components/Bio/Bio'
import { Link } from 'react-router-dom';

interface IcurrentVideo {
    src: string,
    title: string
}

interface IcurrentPress {
    title: string,
    link: string,
    summary: string,
    photo: string,
    audio?: string,
    credit?: string
}

const EPK = () => {

    const allPressElements: IcurrentPress[] = [
        {
            title: "Wax Vinyl Records UK Review",
            link: 'https://waxvinylrecords.co.uk/aunt-vickis-time-is-on-your-side-a-sonic-journey-of-discovery/',
            summary: "Aunt Vicki’s “Time Is On Your Side” offers a fantastic sonic experience that begins with the lazy, soothing vibes reminiscent of a mid-career Beatles track. The song conjures feelings akin to the Revolver era, with its thoughtful and melodic approach. However, as it unfolds, the track gradually builds in pace and intensity, leading to a grand and powerful finish that takes you by surprise.",
            photo: 'src/assets/photos/gravity.jpg',
            audio: 'src/assets/audio/time.mp3',
            credit: 'Geddi Monroe'
        },

        {
            title: 'From The Straight Review',
            link: 'https://fromthestrait.com/articles/the-rundown-october-29-2023/',
            summary: "Different Suits talks about the many life paths you can try out. Erin (the songwriter for this one) has been a sculptor, jewelry maker, clothing designer, life coach, and most recently a musician. So the chorus and bridge talk about trying things on literally, and casting them off if they aren’t working for you.",
            photo: 'src/assets/photos/epicErinAngel.jpg',
            audio: 'src/assets/audio/different.mp3',
            credit: 'Sam Bennett'
        }
    ]

    const allVideos: IcurrentVideo[] = [
        {
            src: "https://www.youtube-nocookie.com/embed/SrD2nilSt2I",
            title: "Aunt Vicki - Vigil (Music Video)"
        },
        {
            src: 'https://www.youtube-nocookie.com/embed/RinXf8AsBXE',
            title: 'Crybaby @ the Orange Peel'
        },
        {
            src: "https://www.youtube-nocookie.com/embed/Yg_q40mY48c",
            title: "Aunt Vicki - Lights Out (Music Video)"
        },
        {
            src: 'https://www.youtube-nocookie.com/embed/cGqu6S21sQU',
            title: "AV Knights In Training"
        }
    ]



    const [showVideos, setShowVideos] = useState<boolean>(false)
    const [showBio, setShowBio] = useState<boolean>(false)
    const [showPhotos, setShowPhotos] = useState<boolean>(false)
    const [showPress, setShowPress] = useState<boolean>(false)
    const [videoIndex, setVideoIndex] = useState<number>(0)
    const [currentVideo, setCurrentVideo] = useState<IcurrentVideo>(allVideos[videoIndex])
    const [pressIndex, setPressIndex] = useState<number>(0)
    const [currentPress, setCurrentPress] = useState<IcurrentPress>(allPressElements[pressIndex])
    const [autoPlay, setAutoplay] = useState<boolean>(false)

    useEffect(() => {
        setCurrentVideo(allVideos[videoIndex])
        setCurrentPress(allPressElements[pressIndex])
        //eslint-disable-next-line
    }, [videoIndex, pressIndex])

    const arrowHelper = (
        arrowDirection: string,
        collection: (IcurrentPress[] | IcurrentVideo[]),
        index: number,
        setFunc: (value: number) => void
    ) => {
        if (arrowDirection === "LEFT") {
            if (collection[index - 1]) {
                setFunc(index - 1)
            } else {
                setFunc(collection.length - 1)
            }
        }
        if (arrowDirection === "RIGHT") {
            if (collection[index + 1]) {
                setFunc(index + 1)
            } else { setFunc(0) }
        }
    }

    const arrowPress = (arrowDirection: string) => {
        arrowHelper(arrowDirection, allPressElements, pressIndex, setPressIndex)
        setAutoplay(false)
    }

    const onPhotoSelection = (photoId: string) => {
        console.log(photoId);
        setShowVideos(false)
        setShowBio(false)
        setShowPhotos(false)
        setShowPress(false)

        if (photoId === "PRESS/BRAGS") {
            setShowPress(true)
        }
        else if (photoId === "ABOUT US") {
            setShowBio(true)
        }
        else if (photoId === "PHOTOS/ART") {
            setShowPhotos(true)
        }
        else if (photoId === "VIDEOS") {
            setShowVideos(true)
        }
    }

    return (
        <>
            <div className='mainEPKDiv'>
                <Link to='/'>
                    <button className="homeBtn">Home</button>
                </Link>
                {showVideos

                    ? <div className='epkSelectionDiv'>
                        <div className='bigXDiv'>
                            <IoIosArrowBack className="bigControls" onClick={() => arrowHelper('LEFT', allVideos, videoIndex, setVideoIndex)} />
                            <p onClick={() => setShowVideos(false)} className='bigX epkX'>X</p>
                            <IoIosArrowForward className="bigControls" onClick={() => arrowHelper('RIGHT', allVideos, videoIndex, setVideoIndex)} />

                        </div>
                        <div className='epkInnerDiv'>
                            <iframe className="youtubeIframeEPK" src={currentVideo.src} title={currentVideo.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " allowFullScreen></iframe>
                        </div>

                    </div>

                    : showBio

                        ? <div className='epkSelectionDiv'>
                            <div className='bigXDiv'>
                                <p onClick={() => setShowBio(false)} className='bigX epkX'>X</p>
                            </div>
                            <Bio />
                        </div>

                        : showPhotos
                            ? <div className='epkSelectionDiv'>
                                <div className='bigXDiv'>
                                    <p onClick={() => setShowPhotos(false)} className='bigX epkX'>X</p>
                                </div>

                            </div>

                            : showPress

                                ? <div className='epkSelectionDiv'>
                                    <div className='bigXDiv' >
                                        <IoIosArrowBack className="bigControls" onClick={() => arrowPress('LEFT')} />
                                        <p onClick={() => setShowPress(false)} className='bigX epkX'>X</p>
                                        <IoIosArrowForward className="bigControls" onClick={() => arrowPress('RIGHT')} />
                                    </div>

                                    <div className='epkInnerDiv'
                                        onMouseOver={() => setAutoplay(true)}
                                    >
                                        <h1>{currentPress.title} </h1>
                                        <p className='pressSummary'>{currentPress.summary}</p>
                                        {autoPlay &&
                                            <audio src={currentPress.audio} hidden autoPlay controls></audio>
                                        }
                                        <a href={currentPress.link} target="_blank" className='picAndLink'>
                                            <img src={currentPress.photo} alt="" className='pressPhoto'></img>
                                            Read The Full Article!</a>
                                            <p className='photoCredit' style={{width: '100%', textAlign: 'center', marginTop: '15px'}}><FaCameraRetro/> by <a href="https://www.geddimonroe.com/" target="_blank">{currentPress.credit}</a></p>
                                    </div>
                                </div>


                                : <div className='topPhotoEpk'>
                                    <img src='src/assets/photos/eyes.png' className='eyesPhoto' alt='' />
                                    <div className='avepkText'>
                                        <p>EPK</p>
                                    </div>
                                    <PhotoSlide onPhotoSelection={onPhotoSelection} />
                                    <p className="photoCredit"><FaCameraRetro /> by <a href="https://www.instagram.com/swiftbennett/?img_index=1" target='_blank'>Sam Bennett</a></p>
                                    <div className='epkFooter'>
                                        <ContactStrip />
                                    </div>
                                </div>
                }

            </div>
        </>
    )
}


export default EPK