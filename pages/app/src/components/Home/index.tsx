import folder from '../../images/folder.png'

const Home = () => {
  return (
    <>
      <section className="home-container">
        <div className="left-container">
          <h1 className="home-title">Welcome to this Website</h1>
          <button className="home-cta">Learn more about us</button>
        </div>
        <div className="right-container">
          <img src={folder} alt="folder" />
        </div>
      </section>
      <section className="info-container">
        <div className="info-card">
          <h4>100%</h4>customer satisfaction
        </div>
        <div className="info-card">
          <h4>5</h4>star rating
        </div>
        <div className="info-card">
          <h4> 100k +</h4>customers
        </div>
        <div className="info-card">
          <h4>99.9%</h4>Performance score
        </div>
      </section>
    </>
  )
}

export default Home
