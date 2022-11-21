import {useState, useContext, useRef} from 'react'
import { starshipsContext } from "../context/StarshipsContext";
import "./Create.css"

export const Create = () => {
  const inputElement = useRef(null)
  const [input, setInput] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const { starships, setStarships } = useContext(starshipsContext);

  const handleSubmit = (e) => {
    e.preventDefault()
    let date = new Date()
    setStarships([...starships, {name: input, creation_date: date}])
    setInput("")
    inputElement.current.focus()
    setShowPopup(true)
    setTimeout(() => {
      setShowPopup(false)
    }, 4000);
  }

  return (
    <div className='create-page'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input type="text" id="nameInput" placeholder='Starship name' required ref={inputElement}
        value={input} onChange={e => setInput(e.target.value)} />
        <input type="submit" value="Create" className='button' />
      </form>
      {showPopup && <div className="success">
        Starship added !
      </div>}
    </div>
  )
}
