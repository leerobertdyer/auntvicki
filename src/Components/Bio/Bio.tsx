import './Bio.css'

function Bio() {
  return (
    <div className='mainBioDiv' id="bio">
        <h3 className='bioTitle'>Meet Aunt Vicki</h3>
        <p className='bioText'>
        <span className='bigLines'>...the musical embodiment of your favorite <span className='red'>rebellious relative</span>, <br/><br/>Aunt Vicki</span> merges <span className="genres">indie, retro rock, and Americana </span>into their signature sound. Led by married songwriters Lee Dyer and Erin Campbell, their two styles give a yin and yang to the overall vibe. Influenced by the <span className='bigLines rockLegends'>rock legends of the '60s </span>and the indie scene of the '90s-00s, the four-piece band delivers <span className='bigLines catchy'>catchy tunes with a gritty edge</span>.  Drew Ball is on Bass/Stage Mischief, and Tristan Smith adds a charming garage rock sass with his vintage drum kit. 
        </p>
    </div>
  )
}

export default Bio