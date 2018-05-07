import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { urls } from '../model/constants'
import Lottie from 'react-lottie';
import * as animationData from '../lottie/material_loader.json'

class Layout extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps !== this.props
  }
  render() {
    console.log('layout.js > render')
    const layout = this.props.content.layout
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData
    }
    return (
      <div className="lay">
        <div className="lay_bg" key="lay_bg" style={{ backgroundImage: `url(${urls.images}${layout.background.image})` }} />
        <Lottie options={defaultOptions}
          height={'100%'}
          width={'100%'} />
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
