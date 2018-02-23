import React, { Component } from 'react'
import './navigation.css'
import './animations.css'
import { urls } from '../model/constants'
import Logo from './logo'

class Navigation extends Component {
  
  constructor(props) {
    super(props)
    this.state = {}
  }

  _renderChild = ( payload ) => {
    var result
    payload.link
      ? result = <span>{ payload.name }</span>
      : result = payload.name
    return result
  }

  _toggleMenu = () => {
    console.log(this.props)
    this.props.preloaderShow()
  }

  _link = ( payload ) => {
    //Model.state.page = payload
  }

  _renderLogo = () => {
    const logo = this.props.logo
    if ( logo !== '' ) {
      return  <div className="logo-container" onClick={ this._link.bind( this , '/' ) }>
                <Logo draw />
              </div>
    } else {
      return <div></div>
    }
  }

/*   shouldComponentUpdate( nextProps, nextState ){
    return JSON.stringify(nextProps) !== JSON.stringify(this.props)
  } */

  render() {
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
      <div id="navigation">
        <div className="wrapper">
          { this._renderLogo() }
          <div className="links">
            { result }
          </div>
          <div className="menu-button" onClick={ this._toggleMenu }>
            <i className="fa fa-bars menu__icon" aria-hidden="true"></i>
          </div>
          <div className="menu-close" onClick={ this._toggleMenu }>
            <i className="fa fa-times menu__icon" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default Navigation
