import React from 'react'
import { Link } from 'react-router-dom'

const Faves = ({ addFavourite, favourites, getFavourites, hash }) => {
  return (
    <div>
      {favourites.includes(hash) ? (
        <button
          onClick={() => getFavourites()}
          className="glyphicon glyphicon-heart"
        />
      ) : (
        <button
          onClick={() => {
            addFavourite(hash)
          }}
          className="glyphicon glyphicon-heart-empty"
        />
      )}
    </div>
  )
}

export default Faves
