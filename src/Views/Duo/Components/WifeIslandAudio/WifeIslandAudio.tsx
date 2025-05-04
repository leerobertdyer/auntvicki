import './style.css'

export default function WifeIslandAudio({title, audioSrc}: {title: string, audioSrc: string}) {
  return (
    <div className="mainWifeIslandAudioDiv">
      <p>{title}</p>
      <div className="wifeIslandAudioDiv">
        <audio src={audioSrc} controls style={{height: "120px;"}} />
      </div>
    </div>
  )
}