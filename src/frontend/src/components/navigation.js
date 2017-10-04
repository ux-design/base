import React, { Component } from 'react';
import './navigation.css';
import './animations.css';
import Model from '../model';
import '../logo.svg';
import Animator from '../helpers/animator';

class Navigation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChild( payload ) {
    var result;
    payload.link
      ? result = <span>{ payload.name }</span>
      : result = payload.name
    return result;
  }

  _toggleMenu() {
    Model.state.toggleMenu = true;
  }

  _link( payload ) {
    Model.state.page = payload;
  }

  _renderLogo() {
    const logo = this.props.data.logo;
    if ( logo !== '' ) {
      return  <div className="logo-container" onClick={ this._link.bind( this , '/' ) }>
                <img alt="logo" src={ `/static/media/logo.0541813a.svg` } className="logo" ref="logo" onMouseOver={ this._onMouseOver.bind( this , 'logo' ) } />
              </div>
    } else {
      return <div></div>
    }
  }

  _onMouseOver( payload ) {
    var el = this.refs[ payload ] ;
    Animator( el ).use( 'wiggle' ).removeAfter( 1 );
  }

  shouldComponentUpdate( nextProps, nextState ){
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const data = this.props.data.body.navigation;
    var result = [];
    var el, selected = '';
    for( let x in data ){
      el = data[ x ];
      el.selected
        ? selected = 'selected'
        : selected = ''
      result.push( <div key={ x } className={ `navigation-el ${selected}` } onClick={ this._link.bind( this, el.link ) }>{ this._renderChild( el ) }</div> );
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
    );
  }
}

export default Navigation;
