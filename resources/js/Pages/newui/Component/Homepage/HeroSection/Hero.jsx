import './Hero.css'
import photo2 from '../../../photo/photo2.svg'
import emLogo from "../../../photo/Vector 1.svg"
const Hero = () => {
  return (
    <section>
     <div className="welcome-section ">
    <h1 className='welcome-text'>Welcome to <span className="highlight relative">EFM  <img src={emLogo} alt="" className='absolute'/></span> hub</h1>
    <img src={photo2} alt="Welcome Image" className="welcome-image" />
</div>

      <div className="statistics-section">
      <div className="stat-item">
      <h1 className='number'>450</h1>
      <p className='label'>Total Clients</p>
      </div>
      <div className="stat-item">
      <h1 className='number'>50</h1>
      <p className='label'>Clients Profits</p>
      </div>
      <div className="stat-item">
      <h1 className='number'>500</h1>
      <p className='label'>Clients Contracts</p>
      </div>
      </div>
     

    </section>
  )
}

export default Hero
