import React, { Component } from 'react'
import './block.css'
import './animations.css'
import Logo from './logo'

class Block extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      draw: false
    }
  }

  componentDidMount () {
    this.interval = setInterval( () => {
      this._restartLogo()
    }, 2000 )
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _restartLogo () {
    this.setState({draw: !this.state.draw})
    console.log(this.state)
  }

  render() {
    console.log(this.state)
    var animIn = "" , animOut = ""
    if ( this.props.on ) {
        animIn = " bounceIn"
    }
    return (
        <div className="wrapper block-el block-on">
          <div className={"loader-background" + animIn + animOut}>
            <div className="circle spin-low"></div>
          </div>
          { this.state.draw }
          <div className="loader-foreground" onClick={this._click}>
            <Logo className="logo-container logo-container--large" style={{ display: 'flex'}} draw={this.state.draw} />
            <p className="loading">LOADING</p>
          </div>
        </div>
    )
  }
}

export default Block
