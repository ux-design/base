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
            <div className="loader-el loader-on">
                <p>loading..</p>
            </div>
        );
    } else {
        return (
            <div className="loader-el loader-off">
                <p>loading..</p>
            </div>
        );
    }
    
  }
}

export default Loader;
