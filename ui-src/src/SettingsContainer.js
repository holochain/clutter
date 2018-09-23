import { connect } from 'react-redux'
import Settings from './Settings'
import {
  appProperty,
  getFirstName,
  useHandle,
  setFirstName,
  toggleModal
} from './actions'

const mapStateToProps = state => {
  return {
    handleTaken: state.handleTaken,
    isOpen: state.isOpen,
    handles: state.handles,
    appProperties: state.appProperties
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFirstName: () => {
      dispatch(getFirstName())
    },
    getMyHandle: () => {
      dispatch(appProperty('Agent_Handle'))
    },
    useHandle: (handle, then) => {
      dispatch(useHandle(handle))
    },
    setFirstName: firstName => {
      dispatch(setFirstName(firstName))
    },
    toggleModal: () => {
      dispatch(toggleModal())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
