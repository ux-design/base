import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import Button from './button'

class Navigation extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      showMenu: false
    }
  }
  _renderChild = payload => {
    var result
    payload.link
      ? result = <span>{ payload.name }</span>
      : result = payload.name
    return result
  }
  _toggleMenu = () => {
    this.props.fire('NAVIGATION_MENU_CLICK', this.props.menuIsOpen)
  }
  _link = payload => {
    this.props.fire('NAVIGATION_LINK_CLICK', payload)
  }
  _linkHome = () => {
    this.props.fire('PAGE_LOAD', '/index')
  }
  componentWillReceiveProps = (nextProps) => {
    if ( nextProps.menuIsOpen ) {
      this._maximizeNav()
      setTimeout( () => {
        this._showMenu()
      }, 500)
    } else {
      this._hideMenu()
      setTimeout( () => {
        this._minimizeNav()
      }, 500)
    }
  }
  _minimizeNav = () => {
    this.setState({showNav: false })
  }
  _maximizeNav = () => {
    this.setState({showNav: true })
  }
  _showMenu = () => {
    this.setState({showMenu: true })
  }
  _hideMenu = () => {
    this.setState({showMenu: false })
  }
  _renderNavigationLink = (key, selected, el) => {
    return <div key={ key } className={ `navigation__link hover flex ${selected}` } onClick={ this._link.bind( this, el.link ) }>{ this._renderChild( el ) }</div>
  }
  _renderOptions = (result) => {
    const {showMenu} = this.state 
    return (
      <div className={`navigation__links flex flex-wrap ${showMenu ? 'navigation__links--show' : ''}`} >
        { result }
      </div>
    )
  }
  render() {
    const links = this.props.content.body.navigation
    var result = []
    var el, selected = ''
    for( let x in links ){
      el = links[ x ]
      el.selected
        ? selected = 'navigation__link--selected'
        : selected = ''
      result.push( this._renderNavigationLink(x, selected, el) )
    }
    var type = this.props.type
    return (
      <div className={`navigation flex flex-ai--start flex-jc--between ${this.state.showNav ? 'navigation--fullscreen' : type === 'overlay'?'gradient-navigation-overlay':''}`}>
        <Button className="navigation__logo hover flex" onClick={ this._linkHome }>
          <i className={`icon icon-logo ${type === 'overlay' && !this.state.showNav ?'icon--circle':''}`} />
        </Button>
        { this._renderOptions(result) }
        <Button className="navigation__toggle hover flex" onClick={ this._toggleMenu }>
          <i className={`icon icon-hamburger ${type === 'overlay' && !this.state.showNav ?'icon--circle':''}`} />
        </Button>
      </div>
    )
  }
}

const mapState = state => {
  return {
      content: state.app.get('content'),
      menuIsOpen: state.navigation.get('menuIsOpen'),
      type: state.navigation.get('type')
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