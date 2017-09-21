import React, { Component } from 'react';
import './block.css';
import './animations.css';

class Block extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var animIn = "" , animOut = "";
    if ( this.props.on ) {
        animIn = " bounceIn";
    }
    return (
        <div className={ "wrapper block-el block-on " + animIn + animOut }>
          <div className="loader-background">
            <div className="circle spin-low"></div>
          </div>
          <div className="loader-foreground">
            <p className="loading">LOADING</p>
          </div>
        </div>
    );
  }
}

export default Block;
