import { connect } from 'react-redux'
import Faves from './components/Faves'
import { addFavourite, removeFavourite } from './actions'

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
    removeFavourite: favouriteHash => {
      dispatch(removeFavourite(favouriteHash))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faves)
