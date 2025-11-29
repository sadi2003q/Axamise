import { iconsImgs } from "../../utils/images"

const Financial = () => {
  return (
    <div className="subgrid-two-item grid-common grid-c8">
    <div className="grid-c-title" style={{marginBottom: '0.5rem'}}>
      <h3 className="grid-c-title-text" style={{fontWeight:700, fontSize:'1.15rem', color:'#fff', letterSpacing:'0.5px', fontFamily:'Roboto Mono, monospace', textShadow:'0 2px 8px #29221d'}}>💡 Financial Advice</h3>
      <button className="grid-c-title-icon" style={{background:'#29221d', borderRadius:'50%', boxShadow:'0 2px 8px #667eea33'}}>
        <img src={ iconsImgs.wallet } alt="Add Advice" style={{filter:'invert(1)'}} />
      </button>
    </div>
        <div className="grid-c8-content">
            <p className="text text-silver-v1">Ipsum dolor sit amet consectetur, adipisicing elit.
                Iste, vitae.....</p>
        </div>
    </div>
  )
}

export default Financial
