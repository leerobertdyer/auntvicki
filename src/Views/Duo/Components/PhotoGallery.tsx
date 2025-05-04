import { useEffect, useState } from "react";
import { getPhotos } from "../../../flickr";

type Photo = {
  id: string;
  url_s: string;
  url_l: string;
  width_s?: string;
  height_s?: string;
  width_l?: string;
  height_l?: string;
};

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [displayPhoto, setDisplayPhoto] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState<Photo>({
    id: "",
    url_s: "",
    url_l: "",
  });

  const expandPhoto = (photo: Photo) => {
    setCurrentPhoto(photo);
    setDisplayPhoto(true);
    window.scrollTo(0, 0)
  };

  const downloadPhoto = async (photoLink: string) => {
    try {
      const response = await fetch(photoLink);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "AuntVicki.jpg";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading img:", error);
    }
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      const allPhotos: Photo[] = await getPhotos('wifeisland');
      setPhotos(allPhotos || []);
    };
    fetchPhotos().catch(() => {
      console.log("fucking typescript hell!"); //lmao leaving for posterity
    });
  }, []);

  return (
    <>
      {displayPhoto ? (
        <div className="fullScreenPhotoDiv">
          <img
            width={Number(currentPhoto.width_l)}
            height={Number(currentPhoto.height_l)}
            src={currentPhoto.url_l}
            alt="photoToDownload"
            className=""
            style={{width: '100vw'}}
          />
          <div className="fullScreenPhotoButtonsDiv">
            <button
              className=""
              onClick={() => setDisplayPhoto(false)}
            >
              Back
            </button>
            <button
              className=""
              onClick={() => downloadPhoto(currentPhoto.url_l)}
            >
              Download
            </button>
          </div>
        </div>
      ) : (
        <div className="">
          <p style={{margin: "20px auto", width: 'fit-content'}}>Click photo to enlarge/download</p>
          <div className="photoGalleryDiv">
          {photos.length > 0
            && photos.map((photo) => (
              <div
              key={photo.id}
              className="photoDiv"
              >
                  <img
                    className=""
                    width={Number(photo.width_s)}
                    height={Number(photo.height_s)}
                    src={photo.url_s}
                    alt=""
                    onClick={() => expandPhoto(photo)}
                    />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
