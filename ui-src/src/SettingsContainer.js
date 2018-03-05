import { connect } from 'react-redux'
import Settings from './Settings'
import {
  newHandle
} from './actions'

const mapStateToProps = state => {
  return {
    handleTaken: state.handleTaken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    newHandle: (handle, then) => {
      dispatch(newHandle(handle))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
