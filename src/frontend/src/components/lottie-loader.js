import React, { Component } from 'react'
import Lottie from 'react-lottie'
import * as loaderIn from '../lottie/default/loader-in.json'
import * as loaderOut from '../lottie/default/loader-out.json'
import * as loaderSpin from '../lottie/default/loader-spin.json'

export default class LottieLoader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      render: null
    }
  }
  _start = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: loaderIn
    }
    this.setState({
      render: <Lottie key="LoaderIn" options={defaultOptions}
        height="100%"
        width="100%" 
        eventListeners={[{eventName: 'complete',callback: () => this._loop()}]}
        />
    })
  }
  _end = () => {
    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: loaderOut
    }
    this.setState({
      render: <Lottie key="LoaderOut" options={defaultOptions}
        height="100%"
        width="100%" />
    })
  }
  _loop = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: loaderSpin
    }
    this.setState({
      render: <Lottie key="LoaderSpin" options={defaultOptions}
        height="100%"
        width="100%"
        />
    })
  }
  _update = (props) => {
    if (props.state === 'start') {
      this._start()
    }
    if (props.state === 'end') {
      this._end()
    }
    if (props.state === 'loop') {
      this._loop()
    }
  }
  componentWillReceiveProps(nextProps) {
    this._update(nextProps)
  }
  componentWillMount() {
    this._update(this.props)
  }
  render () {
    return (
      <div style={{ width: this.props.width, height: this.props.height }}>
        {this.state.render}
      </div>
    )
  }
}
