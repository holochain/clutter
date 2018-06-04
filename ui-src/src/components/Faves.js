import React from 'react'

const Faves = ({
  addFavourite,
  favourites,
  getFavourites,
  hash,
  removeFavourite
}) => {
  return (
    <div>
      {favourites && favourites.includes(hash) ? (
        <button
          onClick={() => removeFavourite(hash)}
          className="glyphicon glyphicon-heart"
          style={{ color: 'red' }}
        />
      ) : (
        <button
          onClick={() => {
            addFavourite(hash)
          }}
          className="glyphicon glyphicon-heart-empty"
          style={{ color: 'red' }}
        />
      )}
    </div>
  )
}

export default Faves
