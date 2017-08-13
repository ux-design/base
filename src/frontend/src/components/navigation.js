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
      ? result = <a onClick={ ()=>{ window.page = payload.link } }>{ payload.name }</a>
      : result = payload.name
    return result;
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
      <div>
        { result }
      </div>
    );
  }
}

export default Navigation;
