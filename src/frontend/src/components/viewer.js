import React, { Component } from 'react'
import { connect } from 'react-redux'
import './viewer.css'
import actions from '../actions'
import ImagePreloader from '../helpers/imagePreloader'
const ip = 'http://' + window.location.hostname.replace(':3000','')

class Viewer extends Component {
  _onClick = () => {
    this.props.fire('VIEWER_HIDE')
  }
  _closeViewer() {
  }
  render() {
    console.log(this.props)
    const viewer = this.props.viewer
    const {type, url} = viewer.get('content')
    var content 
    if ( type === 'image' ) {
      content = <img src={ ImagePreloader.images[ ip + '/images/' + url ].src } className="viewer__image" alt={ url }/>
    } 
    return (
      <div id="viewer" onClick={ this._onClick }>
        <div className="viewer__container">
          { content }
        </div>
        <div className="viewer-close" onClick={ this._closeViewer }>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
      viewer: state.viewer
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
          dispatch(actions(action, payload))
      }
  }
}
export default connect(mapState, mapDispatch)(Viewer)
