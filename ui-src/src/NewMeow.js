import React, { Component } from 'react'

class NewMeow extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newMeowText: ''
    }
  }
  updateMeowText = (e) => {
    this.setState({
      newMeowText: e.target.value
    })
  }
  onMeowSubmit = (e) => {
    e.preventDefault()
    if (!this.state.newMeowText) return
    this.props.post(this.state.newMeowText)
    this.setState({
      newMeowText: ''
    })
  }
  render () {
    return (
      <form onSubmit={this.onMeowSubmit} id='meow-form' action=''>
        <input value={this.state.newMeowText} onChange={this.updateMeowText} className='form-control' id='meow' name='meow' type='text' size='64' />
        <button type='submit' id='postMeow' className='btn btn-primary'>Meow</button>
      </form>
    )
  }
}

export default NewMeow
