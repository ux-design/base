import React, { Component } from 'react';
import './block.css';
import './animations.css';

class Block extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log( this.props );
    var animIn = "" , animOut = "";
    if ( this.props.on ) {
        animIn = " bounceIn";
    }
    return (
        <div className={ "wrapper block-el block-on " + animIn + animOut }>
            <div className="circle spin-low"></div>
            <p className="loading">LOADING</p>
        </div>
    );
  }
}

export default Block;
