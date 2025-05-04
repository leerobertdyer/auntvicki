import WifeIslandAudio from "./WifeIslandAudio/WifeIslandAudio";

export default function Listen() {
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/wifeisland/photos/logo.png)",
          backgroundSize: '100vw',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: '60px'
        }}
      >

        <div className="listenDiv">
          <h1 className="">A few of our songs:</h1>

          <WifeIslandAudio title="Body Like A Cave" audioSrc="/wifeisland/audio/bodyLikeACave.mp3" />

          <WifeIslandAudio title="Old Blue World" audioSrc="/wifeisland/audio/oldBlueWorld.mp3" />

          <WifeIslandAudio title="Two Kids" audioSrc="/wifeisland/audio/twoKids.mp3" />
        </div>
      </div>
    </div>
  );
}
