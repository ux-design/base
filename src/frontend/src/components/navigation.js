import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../actions'
import Logo from './logo'

class Navigation extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      showMenu: false
    }
  }
  _renderChild = ( payload ) => {
    var result
    payload.link
      ? result = <span>{ payload.name }</span>
      : result = payload.name
    return result
  }
  _toggleMenu = () => {
    this.props.fire('NAVIGATION_MENU_CLICK', this.props.menuIsOpen)
  }
  _link = ( payload ) => {
    this.props.fire('NAVIGATION_LINK_CLICK', payload)
  }
  componentWillReceiveProps = (nextProps) => {
    //console.log(nextProps.menuIsOpen)
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
  render() {
    //console.log('navigation.js > render')
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
      <div className={`navigation ${this.state.showNav?'navigation--fullscreen':''}`}>
        <div className="navigation__logo" onClick={this._link.bind(this, '/index')}>
          <Logo className="logo logo--small" draw />
        </div> 
        <div className={`navigation__links ${this.state.showMenu?'navigation__links--show':''}`} style={this.state.showMenu ? {transform: 'scale(1)'} : {transform: 'scale(0)'}} >
          { result }
        </div>
        <div className="centered fullscreen">
          <div className="navigation__null">
            <div className="navigation__background" style={this.state.showMenu ? {transform: 'scale(0.4)'} : {}} />
          </div>
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