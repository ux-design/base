import React, { Component } from 'react';
import './navigation.css';

class Navigation extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChild( payload ) {
    var result;
    payload.link
      ? result = <a onClick={ ()=>{ window.state.page = payload.link } }>{ payload.name }</a>
      : result = payload.name
    return result;
  }

  _toggleMenu() {
    window.state.toggleMenu = true;
  }

  shouldComponentUpdate( nextProps, nextState ){
    return JSON.stringify(nextProps) !== JSON.stringify(this.props);
  }

  render() {
    const data = this.props.data;
    var result = [];
    var el;
    for( let x in data ){
      el = data[ x ];
      result.push( <div key={ x } className={ `navigation-el navigation-in` }>{ this._renderChild( el ) }</div> );
    }
    return (
      <div className="wrapper">
        <div className="links">
          { result }
        </div>
        <div className="menu-button" onClick={ this._toggleMenu }>
          <i className="fa fa-bars" aria-hidden="true"></i>
        </div>
      </div>
    );
  }
}

export default Navigation;
