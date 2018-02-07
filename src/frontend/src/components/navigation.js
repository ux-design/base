import React, { Component } from 'react'
import './navigation.css'
import './animations.css'
import Model from '../model'
import '../logo.svg'

class Navigation extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderChild( payload ) {
    var result
    payload.link
      ? result = <span>{ payload.name }</span>
      : result = payload.name
    return result
  }

  _toggleMenu() {
    Model.state.toggleMenu = true
  }

  _link( payload ) {
    Model.state.page = payload
  }

  _renderLogo() {
    const logo = this.props.navigation.logo
    if ( logo !== '' ) {
      return  <div className="logo-container" onClick={ this._link.bind( this , '/' ) }>
                <img alt="logo" src={ `/static/media/logo.0541813a.svg` } className="logo" ref="logo" />
              </div>
    } else {
      return <div></div>
    }
  }

  shouldComponentUpdate( nextProps, nextState ){
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  }

  render() {
    console.log(this.props)
    const links = this.props.app.content.body.navigation
    var result = []
    var el, selected = ''
    for( let x in links ){
      el = links[ x ]
      el.selected
        ? selected = 'selected'
        : selected = ''
      result.push( <div key={ x } className={ `navigation-el ${selected}` } onClick={ this._link.bind( this, el.link ) }>{ this._renderChild( el ) }</div> )
    }
    return (
      <div className="wrapper">
        { this._renderLogo() }
        <div className="links">
          { result }
        </div>
        <div className="menu-button" onClick={ this._toggleMenu }>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
        <div className="menu-close" onClick={ this._toggleMenu }>
          <i className="fa fa-times" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

export default Navigation
