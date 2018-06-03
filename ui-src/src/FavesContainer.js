import { connect } from 'react-redux'
import Faves from './components/Faves'
import { addFavourite, getFavourites } from './actions'

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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Faves)
