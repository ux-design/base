import React, { Component } from 'react';
import './viewer.css';
import Model from '../model';
import ImagePreloader from '../helpers/imagePreloader';
const ip = 'http://' + window.location.hostname.replace(':3000','');
//var C = require( '../model/constants' );

class Viewer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillReceiveProps( nextProps ) {

  }

  componentDidUpdate() {
    delete( Model.state.viewer.data );
  }

  _onClick() {
    Model.state.viewer.visible = false ;
    Model.state.toggleViewer = true ;
  }

  _closeViewer() {
    Model.state.viewer.visible = false ;
    Model.state.toggleViewer = true ;
  }

  render() {
    var content ;
    if ( this.props.viewer.content.type === 'VIEWER_SHOW_IMAGE' ) {
      console.log('VIEWER_SHOW_IMAGE')
      content = <img src={ ImagePreloader.images[ ip + '/images/' + this.props.data.url ].src } style={{ width : '100%' , height : '100%' , cursor : "pointer" }} alt={ this.props.data.url }/>
    } 
    if ( this.props.viewer.content.type === 'video' ) {
      content = <img src={ ip + '/videos/' + this.props.data.url } style={{ width : '100%' , height : '100%' , cursor : "pointer" }} alt={ this.props.data.url }/>
    } 
    return (
      <div id="viewer">
        <div className="wrapper" onClick={ this._onClick }>
          { content }
          <div className="viewer-close" onClick={ this._closeViewer }>
            <i className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default Viewer;
