import './EpkSlideComponent.css'

interface EpkSlideComponentProps {
  photoUrl: string,
  text: string

}

const EpkSlideComponent: React.FC<EpkSlideComponentProps> = ({ photoUrl, text }) => {
  return (
    <div className='epkSlideComponentMainDiv' style={{ backgroundImage: `url('${photoUrl}')`, backgroundSize: 'cover' }}>
      <p className='epkSlideComponentText'>
        {text}
      </p>
    </div>
  )
}

export default EpkSlideComponent