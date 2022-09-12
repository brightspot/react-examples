import folder from '../../images/folder.png'

const Home = () => {
  return (
    <>
      <section className="home-container">
        <div className="left-container">
          <h1 className="home-title">
            Learning is an incredible adventure. Ready, set,{' '}
            <span className="accent">go!</span>
          </h1>
          <p>
            We are devoted to helping learners discover wonder and delight in
            education.
          </p>
          <button className="home-cta">Start your learning journey</button>
        </div>
        <div className="right-container">
          <img src={folder} alt="folder" />
        </div>
      </section>
    </>
  )
}

export default Home
