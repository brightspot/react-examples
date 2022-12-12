import './App.css'
import Card from './components/Card'
import Section from './components/Section'
import { useQuery } from '@apollo/client'
import GET_DOGS_AND_CATS from './queries/GetDogsAndCats'
import { MdPets } from 'react-icons/md'

export interface AnimalData {
  age: number | null
  breed: string | null
  color: string | null
  description: string | null
  gender: string | null
  name: string
  userName: string
  _viewTemplate: string
  _style: {
    bulletStyle: string | null
    // staticNavbar: string | null // UNCOMMENT TO USE
  }
}

function App() {
  const { loading, error, data } = useQuery(GET_DOGS_AND_CATS)

  if (loading) return <div>Loading...</div>
  if (error)
    return <div>There was an error fetching the data: {error.message}</div>

  const catData = data?.Cats?.cats
  const themeData = data?.Cats?._theme
  const dogData = data?.Dogs.dogs
  const animalData = [...catData, ...dogData]

  const root = document.querySelector('html')
  root?.style.setProperty('--primaryColor', themeData?.primaryColor)
  root?.style.setProperty('--secondaryColor', themeData?.secondaryColor)
  root?.style.setProperty('--primaryTextColor', themeData?.primaryTextColor)
  root?.style.setProperty('--secondaryTextColor', themeData?.secondaryTextColor)
  root?.style.setProperty('--font', themeData?.bodyFont)

  return (
    <div className="App">
      <header
        className="navbar"
        data-alignment={themeData?.NavBarAlignment}
        // data-static={themeData?.staticNavbar} // UNCOMMENT TO USE
      >
        <h3 className="icon">
          <span className="iconSpan">
            <MdPets />
          </span>
          Pets
        </h3>
      </header>
      <main>
        <section id="intro">
          <div className="hero">
            <h1 className="title">
              Dogs.
              <br />
              Cats.
              <br /> <span className="accent">Fun.</span>
            </h1>
            <h2 className="subtitle">
              Find the perfect companion to make each day a delight!
            </h2>
          </div>
          <div className="cardsContainer">
            {animalData &&
              animalData.map((data: AnimalData, i: number) => (
                <Card
                  key={i}
                  data={data}
                  buttonStyle={themeData?.buttonStyle}
                />
              ))}
          </div>
        </section>
        {animalData &&
          animalData.map((data: AnimalData, i: number) => (
            <Section key={i} data={data} />
          ))}
      </main>
      <footer>
        <a
          href="https://www.brightspot.com/"
          target="_blank"
          rel="noreferrer"
          className="brightspot"
        >
          Brightspot
        </a>{' '}
        Theming Example
      </footer>
    </div>
  )
}

export default App
