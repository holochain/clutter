import { connect } from "react-redux";
import Settings from "./Settings";
import { appProperty, newHandle, toggleModal } from "./actions";

const mapStateToProps = state => {
  return {
    handleTaken: state.handleTaken,
    isOpen: state.isOpen,
    handles: state.handles,
    appProperties: state.appProperties
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMyHandle: () => {
      dispatch(appProperty("Agent_Handle"));
    },
    newHandle: (handle, then) => {
      dispatch(newHandle(handle));
    },
    toggleModal: () => {
      dispatch(toggleModal());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
