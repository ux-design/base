import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import { urls } from '../model/constants'
import LottieLoader from './lottie-loader'

class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loader: 'start'
    }
  }
  componentDidMount() {
    setTimeout( () => {
      this.setState({loader: 'end'})
    }, 3000)
  }
  render() {
    const layout = this.props.content.layout
    return (
      <div className="lay">
        <div className="lay_bg" key="lay_bg" style={{ backgroundImage: `url(${urls.images}${layout.background.image})` }} />
        <LottieLoader state={this.state.loader} width={1000} height={1000} />
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
