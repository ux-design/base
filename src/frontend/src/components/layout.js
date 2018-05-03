import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { urls } from '../model/constants'

class Layout extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props
  }
  render() {
    console.log('layout.js > render')
    const layout = this.props.content.layout
    return (
      <div className="lay">
        <div className="lay_bg" key="lay_bg" style={{ backgroundImage: `url(${urls.images}${layout.background.image})` }} />
      </div>
    )
  }
}

const mapState = state => {
  return {
      content: state.app.get('content')
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
          dispatch(actions(action, payload))
      }
  }
}
export default connect(mapState, mapDispatch)(Layout)
