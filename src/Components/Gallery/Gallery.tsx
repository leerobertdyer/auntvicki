import { useState } from "react";
import "./Gallery.css"

interface IPhoto {
  smallLink: string;
  bigLink: string;
}

interface GalleryProps {
  photos: IPhoto[];
  photoIndex: number
}

export const Gallery = ({ photos, photoIndex }: GalleryProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [bigImage, setBigImage] = useState<string>('')
  const [grid, setGrid] = useState<boolean>(true)
  console.log('Photos inside gallery: ', photos)

  const handleDownloadClick = (link: string) => {
    setBigImage(link)
    setShowPopup(true)
  }

  const downloadPhoto = async (link: string) => {
    try {
      const response = await fetch(link);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AuntVicki.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      {showPopup &&
        <div className="galleryPopup">
          <img src={bigImage} width="100%" alt="" />
          <button className="downloadBtn" onClick={() => downloadPhoto(bigImage)}>Download</button>
          <button className="backBtn" onClick={() => setShowPopup(false)}>Go Back</button>
        </div>}

      <div className="mainGalleryDiv">
        {photos && photos.length > 0 && !grid
          ? <>
            {photos.slice(photoIndex, photoIndex + 1).map((photo, key) => (
              <div key={key} className="outerGalleryDiv">

                {
                     <div className="slidePhotoDiv">
                      <img onClick={() => handleDownloadClick(photo.bigLink)} src={photo.bigLink} loading="lazy" className="slidePhoto" />
                    </div>
                }


              </div>
            ))}
          </>
          : <>
          <div className="mainGridPhotoDiv">
  {photos.slice(photoIndex, photoIndex + 16).map((photo) => (
    <div className="gridPhotoDiv">
      <img onClick={() => handleDownloadClick(photo.bigLink)} src={photo.smallLink} alt="" width="100%" height="100%" style={{objectFit: 'cover', objectPosition: 'center'}}/>
    </div>
  ))}
  </div>
          </>
        }

      </div>
      <h2 className="explanation">Click any photo to enlarge/download</h2>
      <h3 onClick={() => setGrid(!grid)}
      className="explanation gridButton"
      >{grid ? 'Switch to Slide' : 'Switch to Grid'}</h3>
    </>
  )
}
