import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import Button from './button'

class Navigation extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      showMenu: false,
      type: 'band'
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
    return <div key={ key } className={ `navigation__link flex flex-grow ${selected}` } onClick={ this._link.bind( this, el.link ) }>{ this._renderChild( el ) }</div>
  }
  _renderOptions = (result) => {
    return (
      <div className={`navigation__links ${this.state.showMenu?'navigation__links--show':''}`} style={this.state.showMenu ? {transform: 'scale(1)'} : {transform: 'scale(0)'}} >
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
    return (
      <div className={`navigation flex flex-ai--start flex-jc--between ${this.state.showNav?'navigation--fullscreen':''}`}>
        <Button className="navigation__logo flex" onClick={ this._linkHome }>
          <i className="icon icon-logo" />
        </Button>
        { this._renderOptions(result) }
        <Button className="navigation__toggle flex" onClick={ this._toggleMenu }>
          <i className="icon icon-hamburger" />
        </Button>
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