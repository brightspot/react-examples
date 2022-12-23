import './App.css'
import { Profile, useAllProfilesQuery } from './generated'

const App = () => {
  const { loading, error, data } = useAllProfilesQuery()

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  const profilesArray = data?.AllProfiles?.ListOfProfiles

  const arrayOfProfiles: Profile[] = []

  profilesArray?.forEach((profile) => {
    if (profile) {
      const {
        displayName,
        favoriteSport,
        favoriteBook,
        favoriteFood,
        favoriteSong,
      }: Profile = profile

      let p: Profile = {
        displayName,
        favoriteSport,
        favoriteBook,
        favoriteFood,
        favoriteSong,
      }
      arrayOfProfiles.push(p)
    }
  })

  return (
    <div className="profiles-container">
      {arrayOfProfiles.map((profile: Profile) => {
        const {
          displayName,
          favoriteSport,
          favoriteBook,
          favoriteFood,
          favoriteSong,
        } = profile
        return (
          <div className="profile">
            <h1>{displayName}</h1>
            <h2>{favoriteBook}</h2>
            <h2>{favoriteSport}</h2>
            <h2>{favoriteFood}</h2>
            <h2>{favoriteSong}</h2>
          </div>
        )
      })}
    </div>
  )
}

export default App
