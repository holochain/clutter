import React from 'react'
import PropTypes from 'prop-types'

class Modal extends React.Component {
  render() {
    // Render nothing if the "show" prop is false
    if (!this.props.show) {
      return null
    }

    // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    }

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 200,
      margin: '0 auto',
      padding: 30
    }

    return (
      <div style={backdropStyle}>
        <div style={modalStyle}>
          <div align="center">
            <p className="h1">Welcome to Clutter!</p>
          </div>
          <div>{this.props.children}</div>
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
}

export default Modal
