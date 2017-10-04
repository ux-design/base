import React, { Component } from 'react';
import './viewer.css';
import Model from '../model';
const ip = 'http://' + window.location.hostname.replace(':3000','');
var C = require( '../model/constants' );

class Viewer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps( nextProps ) {
    console.log( nextProps );
  }

  componentDidUpdate() {
    delete( Model.state.viewer.data );
  }

  _onClick() {
    Model.state.viewer.visible = false ;
  }

  render() {
    var content ;
    if ( this.props.data.type == 'img' ) {
      content = <img src={ ip + '/images/' + this.props.data.url } style={{ width : '100%' , height : '100%' }} />
    } 
    if ( this.props.data.type == 'video' ) {
      content = <img src={ ip + '/videos/' + this.props.data.url } style={{ width : '100%' , height : '100%' }} />
    } 
    return (
      <div className="wrapper" onClick={ this._onClick }>
        { content }
      </div>
    );
  }
}

export default Viewer;
