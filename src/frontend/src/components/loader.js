import React, { Component } from 'react';
import './loader.css';

class Loader extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    if ( this.props.on ) {
        return (
            <div className="wrapper loader-el loader-on">
                <i className="fa fa-circle-o-notch spin" aria-hidden="true"></i>
            </div>
        );
    } else {
        return (
            <div className="wrapper loader-el loader-off">
                <i className="fa fa-circle-o-notch" aria-hidden="true"></i>
            </div>
        );
    }
    
  }
}

export default Loader;
