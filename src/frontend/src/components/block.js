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
    this._restartLogo()
    this.interval = setInterval( () => {
      this._restartLogo()
    }, 2000 )
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  _restartLogo () {
    this.setState({draw: !this.state.draw})
  }

  render() {
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
            <Logo className="logo-container logo--large" style={{ display: 'flex'}} draw={this.state.draw} />
            { this.props.app.get('error')
              ? <p className="loading">SERVER ERROR</p>
              : <p className="loading">LOADING</p>
            }
          </div>
        </div>
    )
  }
}

export default Block
