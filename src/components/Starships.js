import React from 'react'
import { Starship } from "./Starship"
import { useContext } from "react";
import { starshipsContext } from "../context/StarshipsContext";
import { useNavigate } from 'react-router-dom';
import './Starships.css'


export const Starships = () => {

  const navigate = useNavigate();
  const { starships, isPending, error } = useContext(starshipsContext);

  return (
    <div className="wrapper">
      {isPending && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {starships && starships.length !== 0 &&
        <>
          <div className='starships-infos'>
            <h2 className="count">
              There are {starships.length} starships
            </h2>
            <div className="btn add" onClick={() => navigate('/create')}>Add</div>
          </div>
          <div className='starships'>
            {starships.map(starship => {
              return (
                <Starship key={starship.name + Math.random()} name={starship.name}
                creation_date={starship.creation_date} />
              )
            })}
          </div>
        </>
      }
    </div>
  )
}
  