import { useState } from "react";
import "./Gallery.css"

interface IPhoto {
  link: string;
}

interface GalleryProps {
  photos: IPhoto[];
  photoIndex: number
}

export const Gallery = ({ photos, photoIndex }: GalleryProps) => {
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [bigImage, setBigImage] = useState<string>('')

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
          <button onClick={() => downloadPhoto(bigImage)}>Download</button>
        </div>}

      <div className="mainGalleryDiv">
        {photos && photos.length > 0 &&
          <>
            {photos.slice(photoIndex, photoIndex + 3).map((photo, key) => (
              <div key={key} className="outerGalleryDiv">

                {
                  key !== 1
                    ? <div className="galleryPhotoDiv smallPhoto">
                      <img onClick={() => handleDownloadClick(photo.link)} src={photo.link} loading="lazy" width="100%" />
                    </div>
                    : <div className="galleryPhotoDiv largePhoto">
                      <img onClick={() => handleDownloadClick(photo.link)} src={photo.link} loading="lazy" width="120%" />
                    </div>
                }


              </div>
            ))}
          </>
        }

      </div>
      <h2 className="explanation">Click any photo to enlarge/download</h2>
    </>
  )
}
