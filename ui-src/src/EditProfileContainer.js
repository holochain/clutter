import { connect } from 'react-redux'
import EditProfile from './EditProfile'
import { getFirstName, setFirstName, setProfilePic } from './actions'

const mapStateToProps = state => {
  return {
    handle: state.handle,
    firstName: state.firstName,
    profilePic: state.profilePic
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: data => {
      dispatch(setFirstName(data))
    },
    setProfilePic: data => {
      dispatch(setProfilePic(data))
    },
    getFirstName: () => {
      dispatch(getFirstName())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
