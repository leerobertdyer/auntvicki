import './Videos.css'
import { useEffect, useState } from 'react'

function Videos() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

useEffect(() => {
window.addEventListener('resize', () => {
  setWindowWidth(window.innerWidth)
})
},[])

  return (
    <div className='mainVideosDiv'>
        <iframe className="youtubeIframe" width={windowWidth * .8} height={windowWidth * .4} src="https://www.youtube-nocookie.com/embed/SrD2nilSt2I" title="Aunt Vicki - Vigil (Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " allowFullScreen></iframe>
        <iframe className="youtubeIframe" width={windowWidth * .8} height={windowWidth * .4} src="https://www.youtube-nocookie.com/embed/Yg_q40mY48c" title="Aunt Vicki - Lights Out (Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; " allowFullScreen></iframe>
    </div>
  )
}

export default Videos