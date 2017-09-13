import React, { Component } from 'react';
import './debugger.css';

class Debugger extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <div className={ "wrapper debugger-el" }>
          <div className="line">
            <div className="key">key</div>
            <div className="value">value</div>
          </div>
        </div>
    );
  }
}

export default Debugger;
