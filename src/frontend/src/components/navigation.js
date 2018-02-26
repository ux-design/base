import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
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
    console.log(this.props.menuIsOpen)
    this.props.fire('NAVIGATION_MENU_CLICK', this.props.menuIsOpen)
  }

  _link = ( payload ) => {
    this.props.fire('PAGE_LOAD', payload)
  }

  render() {
    console.log(this.props)
    console.log('navigation.js > render')
    const menuIsOpen = this.props.menuIsOpen
    const links = this.props.content.body.navigation
    var result = []
    var el, selected = ''
    for( let x in links ){
      el = links[ x ]
      el.selected
        ? selected = 'navigation__link--selected'
        : selected = ''
      result.push( <div key={ x } className={ `navigation__link ${selected}` } onClick={ this._link.bind( this, el.link ) }>{ this._renderChild( el ) }</div> )
    }
    return (
      <div className={`navigation ${menuIsOpen?'navigation--fullscreen':null}`}>
        <div className="navigation__logo" onClick={this._link.bind(this, '/index')}>
          <Logo className="logo logo--small" draw />
        </div> 
        <div className={`navigation__links ${menuIsOpen?'navigation__links--show':null}`}>
          { result }
        </div>
        <div className="navigation__toggle" onClick={ this._toggleMenu }>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
      content: state.app.get('content'),
      menuIsOpen: state.navigation.get('menuIsOpen')
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
          dispatch(actions(action, payload))
      }
  }
}
export default connect(mapState, mapDispatch)(Navigation)