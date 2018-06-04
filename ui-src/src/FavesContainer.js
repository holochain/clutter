import { connect } from 'react-redux'
import Faves from './components/Faves'
import { addFavourite, getFavourites, removeFavourite } from './actions'

const mapStateToProps = state => {
  return {
    favourites: state.favourites
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addFavourite: favouriteHash => {
      dispatch(addFavourite(favouriteHash))
    },
    getFavourites: () => {
      dispatch(getFavourites())
    },
    removeFavourite: favouriteHash => {
      dispatch(removeFavourite(favouriteHash))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faves)
