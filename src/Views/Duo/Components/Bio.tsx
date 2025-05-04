import { useEffect, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoIosCopy } from "react-icons/io";

export default function Bio() {
  const [copied, setCopied] = useState(false);
  const [showBio, setShowBio] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => setCopied(false), 3000);
    }
  }, [copied]);

  const bioText = `The Duo Version of Aunt Vicki is a washed out dream of a folk rock band. Based out of
  Charlotte, North Carolina, their songs range from story-telling ballads
  to up-beat stomping acoustic rock songs. A healthy mixture of old
  country, jazz, and their own wily indie spice mixture, they make an
  impressive amount of sound for two people, and can fit almost
  anywhere. Erin Campbell and Lee Dyer are the married songwriters of
  the group. Erin plays light tremolo electric guitar while Lee
  fingerpicks and slaps his acoustic, often while playing tambourine
  with his foot and rubbing his belly at the same time. Occasionally he
  picks up a trumpet or a clarinet, and they both sing. Inspired by: The
  Beatles, Wilco, Tom Waits, Patsy Cline, The Zombies, Simon &
  Garfunkel…`;

  function handleBioClick() {
    setCopied(true);
    window.navigator.clipboard.writeText(bioText);
  }

  return (
    <>
      {copied && (
        <div className="copiedPopup" onClick={() => setCopied(false)}>
          <p>Copied bio to clipboard</p>
          <p>X</p>
        </div>
      )}
      <div className="bioMainDiv">
        <p className="showHideBio" onClick={() => setShowBio(!showBio)} style={{ cursor: "pointer" }}>
          {showBio ? <><IoIosArrowUp /> Hide Bio</> : <><IoIosArrowDown /> View our Bio</>}
        </p>
        {showBio && (
          <div className="wifeIslandText">
            <p style={{position: 'absolute', top: '0px', right: '0', left: '0', cursor: 'pointer', fontSize: '2rem', margin: '0'}} onClick={() => setShowBio(false)}>X</p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "end",gap: "10px" }}
              onClick={(e) => {e.stopPropagation(); handleBioClick()}}>
              <IoIosCopy size={30} /> Copy
            </div>

            <br/>
            {bioText}
          </div>
        )}
      </div>
    </>
  );
}
