import { HiOutlineMail } from "react-icons/hi";
import "./style.css";

export default function Header() {
  return (
    <header className="mainHeader">
      <div className="birdsAndTitle">
        <div className="birdImageDiv">
          <img 
            src="/wifeisland/photos/bird.png"
            alt="jungle bird"
          />
        </div>
        <div className="wifeIslandTitle">
          <p>Aunt Vicki Duo</p>
          <hr/>
          <hr/>
        </div>
        <div className="birdImageDiv">
          <img 
            src="/wifeisland/photos/bird.png"
            alt="jungle bird"
          />
        </div>
      </div>
      <div style={{width: '100px', height: '100px', overflow: 'hidden', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <img src="/wifeisland/photos/flowersAndRiver.jpg" style={{width: '100px'}} alt=""/>
      </div>

      <button>
          <a style={{textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', width: "100%"}} href="mailto:mgmt@auntvicki.rocks">
            <HiOutlineMail />
            <p style={{textAlign: 'center'}}>Contact</p>
          </a>
      </button>
    </header>
  );
}
