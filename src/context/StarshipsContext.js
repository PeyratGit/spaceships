import { createContext, useState, useEffect } from "react";

export const starshipsContext = createContext();

const StarshipsContextProvider = ({ children }) => {

  // If starships list exist in locaStorage, use it. Else set as empty
  const [starships, setStarships] = useState(JSON.parse(localStorage.getItem('starships')) || [])
  const [isPending, setIsPending] = useState(false)
	const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      setIsPending(true)
      try {
        const response = await fetch('https://swapi.dev/api/starships/?format=json')
        const data = await response.json()
        const starshipsCount = data.count
        let counter = 1
        let tempStarships = []
        // While the actual list of starships length doesn't match the API count of starships
        // Cycle through API pages (10 results per page)
        while(tempStarships.length !== starshipsCount) {
          const response2 = await fetch(`https://swapi.dev/api/starships/?format=json&page=${counter}`)
          const data2 = await response2.json()
          data2.results.map(starship => {
            starship.creation_date = new Date()
          })
          tempStarships = [...tempStarships, ...data2.results]
          counter++
        }
        setIsPending(false)
        setError(null)
        setStarships(tempStarships)
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("The fetch was aborted")
        } else {
          setIsPending(false)
          setError("Could not fetch the data")
        }
      }
    }

    // Arbitrary rule to check if the actual starships array match the API count
    if (starships.length < 36) {
      localStorage.clear()
      fetchData()
    }

    return () => {
      controller.abort()
    }
  }, [starships, setStarships])

  // Each time the starships array is changed by the user, update the localStorage
  useEffect(() => {
    localStorage.setItem('starships', JSON.stringify(starships));
  }, [starships])

  return (
    <starshipsContext.Provider value={{starships, setStarships, isPending, error}}>
      {children}
    </starshipsContext.Provider>
  );
};

export default StarshipsContextProvider;
