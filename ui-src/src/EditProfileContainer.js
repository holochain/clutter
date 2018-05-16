import { connect } from "react-redux";
import EditProfile from "./EditProfile";
import { getFirstName, setFirstName } from "./actions";

const mapStateToProps = state => {
  return {
    handle: state.handle,
    firstName: state.firstName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setFirstName: data => {
      dispatch(setFirstName(data));
    },
    getFirstName: () => {
      dispatch(getFirstName());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
