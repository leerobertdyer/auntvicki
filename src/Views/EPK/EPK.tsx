import { PhotoSlide } from '../../Components/PhotoSlide/PhotoSlide'
import './EPK.css'
import { ContactStrip } from '../../Components/ContactStrip/ContactStrip'
import { useEffect, useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { FaCameraRetro } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { getPhotos } from "../../flickr"
import { Gallery } from '../../Components/Gallery/Gallery';

interface IcurrentVideo {
    src: string,
    title: string
}

interface IcurrentPress {
    title: string,
    summary: string,
    photo?: string,
    link?: string,
    audio?: string,
    credit?: string,
    iframe?: string
}

interface Iphoto {
    farm: number;
    height_o: number;
    id: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    owner: string;
    secret: string;
    server: string;
    title: string;
    url_l: string;
    url_s: string;
    width_o: number;
}

interface Ibio {
    name: string,
    bio: string,
    title?: string,
    photo: string,
    links?: {
        title: string,
        href: string
    }[]
}

const EPK = () => {

    const allBioElements: Ibio[] = [
        {
            name: "Tristan Smith",
            title: "Drummer",
            bio: "When he isn't holding the groove for old Aunt Vicki, you can find tristan singing, and playing guitar and bass in at least a couple of his own bands:",
            links: [{
                href: 'https://www.instagram.com/watches.nc/',
                title: 'Watches'
            },
            {
                href: 'https://thefloralhygienists.bandcamp.com/album/the-floral-hygienists',
                title: "Floral Hygienists"
            }],
            photo: "/photos/teaDawggy.jpeg"
        },

        {
            name: "Drew Ball",
            title: "Bassist",
            bio: "Party bringer, goat herder, sheep lover, madman Drew Ball is our beloved bassist. But he also has a couple of his own projects:",
            links: [{
                href: "https://www.theriverbreaks.com/",
                title: "The Riverbreaks"
            },
            {
                href: "https://sites.google.com/view/sparklemtn",
                title: "Sparkle Mountain Family Band"
            }
            ],
            photo: '/photos/dBall.jpeg'
        },
        {
            name: "Erin Campbell",
            title: "Auntie",
            bio: "Bringing the left-handed Aunt Vibes to the band. When she isn't singing, she's sewing! See what she's making: ",
            links: [{
                href: "https://www.gmother.com/",
                title: "Grandmother Goods"
            }],
            photo: '/photos/erinDawn.jpg'
        },
        {
            name: "Lee Dyer",
            title: "Uncle Bob",
            bio: "Lee plays whatever he kind find laying around. But usally just guitar in Aunt Vicki. He does a good bit of home studio work with Tiny Sun: ",
            links: [{
                href: "https://www.tinysunstudio.com",
                title: "Tiny Sun Studio"
            }
            ],
            photo: '/photos/leeBoy.jpg'
        }
    ]

    const allPressElements: IcurrentPress[] = [

        {
            title: "Wax Vinyl Records UK Review",
            summary: "Aunt Vicki’s “Time Is On Your Side” offers a fantastic sonic experience that begins with the lazy, soothing vibes reminiscent of a mid-career Beatles track. The song conjures feelings akin to the Revolver era, with its thoughtful and melodic approach. However, as it unfolds, the track gradually builds in pace and intensity, leading to a grand and powerful finish that takes you by surprise.",
            photo: '/photos/gravity.jpg',
            link: 'https://waxvinylrecords.co.uk/aunt-vickis-time-is-on-your-side-a-sonic-journey-of-discovery/',
            audio: '/audio/time.mp3',
            credit: 'Geddi Monroe'
        },

        {
            title: 'From The Straight Review',
            summary: "Different Suits talks about the many life paths you can try out. Erin (the songwriter for this one) has been a sculptor, jewelry maker, clothing designer, life coach, and most recently a musician. So the chorus and bridge talk about trying things on literally, and casting them off if they aren’t working for you.",
            photo: '/photos/crowd.jpg',
            link: 'https://fromthestrait.com/articles/the-rundown-october-29-2023/',
            audio: '/audio/different.mp3',
            credit: 'Sam Bennett'
        },
        {
            title: "Loose Fit Radio Interview 103.3FM AVL",
            summary: "We got the whole band in the studio and I think we only swore once! Talked about Cheap Talk, and the recording process. Ernesto was an awesome host!",
            iframe: "https://www.youtube-nocookie.com/embed/A5ms22_xzcE"
        },
        {
            title: 'WNC Original Music Podcast',
            summary: "An interview with Erin and Lee before our second album Love In The Dark came out.",
            iframe: "https://www.podbean.com/player-v2/?from=embed&i=vbrpx-1152332-pb&square=1&share=1&download=1&fonts=Arial&skin=1&font-color=&rtl=0&logo_link=&btn-skin=7&size=300"
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
    const [allPhotos, setAllPhotos] = useState([])
    const [photoIndex, setPhotoIndex] = useState<number>(0)
    const [bioIndex, setBioIndex] = useState<number>(0)
    const [currentBio, setCurrentBio] = useState<Ibio>(allBioElements[bioIndex])

    useEffect(() => {

        const fetchPhotos = async () => {
            const photos = await getPhotos("auntvicki");
            const nextPhotos = photos.map((photo: Iphoto) => (
                {
                    smallLink: photo.url_s,
                    bigLink: photo.url_l
                }
            ))
            setAllPhotos(nextPhotos)
        }
        fetchPhotos();
    }, [])

    useEffect(() => {
        setCurrentVideo(allVideos[videoIndex])
        setCurrentPress(allPressElements[pressIndex])
        setCurrentBio(allBioElements[bioIndex])
        //eslint-disable-next-line
    }, [videoIndex, pressIndex, bioIndex])


    function setAllAudioVolume(volume: number) {
        const audioElements = document.querySelectorAll('audio');
        audioElements.forEach((audio) => {
            audio.volume = volume;
        });
    }

    setAllAudioVolume(0.1);


    const arrowHelper = (
        arrowDirection: string,
        collection: (IcurrentPress[] | IcurrentVideo[] | Ibio[]),
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
    }

    const arrowBio = (arrowDirection: string) => {
            arrowHelper(arrowDirection, allBioElements, bioIndex, setBioIndex)
    }

    const onPhotoSelection = (photoId: string) => {
        console.log(photoId);
        setShowVideos(false)
        setShowBio(false)
        setShowPhotos(false)
        setShowPress(false)

        if (photoId === "PRESS") {
            setShowPress(true)
        }
        else if (photoId === "ABOUT") {
            setShowBio(true)
        }
        else if (photoId === "PHOTOS") {
            setShowPhotos(true)
        }
        else if (photoId === "VIDEOS") {
            setShowVideos(true)
        }
    }


    const handleSetPhotoIndex = (direction: 'RIGHT' | 'LEFT') => {
        if (direction === "LEFT") {
            if (photoIndex > 0) {
                setPhotoIndex(photoIndex - 1)
            }
            else {
                setPhotoIndex(allPhotos.length - 1)
            }
        }
        if (direction === "RIGHT") {
            if (photoIndex < allPhotos.length - 2) {
                setPhotoIndex(photoIndex + 1)
            }
            else {
                setPhotoIndex(0)
            }
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
                                <IoIosArrowBack className="bigControls" onClick={() => arrowBio('LEFT')} />
                                <p onClick={() => setShowBio(false)} className='bigX epkX'>X</p>
                                <IoIosArrowForward className="bigControls" onClick={() => arrowBio('RIGHT')} />
                            </div>
                            <div className='epkInnerDiv'>
                                { <>
                                        <div className='bioCard'>
                                                <h1 className='bioName'>{currentBio.name}</h1>
                                            <div className='bioPhoto'>
                                            <img src={currentBio.photo} alt="" width="100%" height="100%" style={{objectFit: 'cover', objectPosition: 'center'}} />
                                            </div>
                                            <div className="bioTitleAndDesc">
                                                <p className="bandMateTitle">{currentBio.title}</p>
                                                <p className="bandMateBio">{currentBio.bio}</p>
                                                {currentBio.links && currentBio.links.map((link) => (
                                                    <a className="bioLink" href={link.href} target="_blank">{link.title}</a>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                }


                            </div>
                        </div>


                        : showPhotos
                            ? <div className='epkSelectionDiv'>
                                <div className='bigXDiv'>
                                    <IoIosArrowBack className="bigControls" onClick={() => handleSetPhotoIndex('LEFT')} />
                                    <p onClick={() => setShowPhotos(false)} className='bigX epkX'>X</p>
                                    <IoIosArrowForward className="bigControls" onClick={() => handleSetPhotoIndex('RIGHT')} />
                                </div>
                                <div className='epkInnerDiv'>
                                    <Gallery photos={allPhotos} photoIndex={photoIndex} />
                                </div>

                            </div>


                            : showPress

                                ? <div className='epkSelectionDiv'>
                                    <div className='bigXDiv' >
                                        <IoIosArrowBack className="bigControls" onClick={() => arrowPress('LEFT')} />
                                        <p onClick={() => setShowPress(false)} className='bigX epkX'>X</p>
                                        <IoIosArrowForward className="bigControls" onClick={() => arrowPress('RIGHT')} />
                                    </div>

                                    <div className='epkInnerDiv'>
                                        <h1>{currentPress.title} </h1>
                                        <p className='pressSummary'>{currentPress.summary}</p>
                                        {currentPress.audio && <audio src={currentPress.audio} controls style={{ margin: '10px' }}></audio>}
                                        {currentPress.iframe && <iframe className="youtubeIframeEPK" src={currentPress.iframe} width="640" height="480" allow="autoplay"></iframe>}
                                        {currentPress.link && <>
                                            <a href={currentPress.link} target="_blank" className='picAndLink'>
                                                <img src={currentPress.photo} alt="" className='pressPhoto'></img>

                                                Read The Full Article!</a>
                                            <p className='photoCredit' style={{ width: '100%', textAlign: 'center', marginTop: '15px' }}><FaCameraRetro /> by <a href="https://www.geddimonroe.com/" target="_blank">{currentPress.credit}</a></p>
                                        </>}
                                    </div>
                                </div>


                                : <div className='topPhotoEpk'>
                                    <img src='/photos/eyes.png' className='eyesPhoto' alt='' />
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