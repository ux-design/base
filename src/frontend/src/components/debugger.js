import React, { Component } from 'react';
import './debugger.css';

class Debugger extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderValues() {
    var line =  <div className="line">
                  <div className="key">key</div>
                  <div className="value">value</div>
                </div>;
    var result =  [<div className="line">
                    <div className="key">key</div>
                    <div className="value">value</div>
                  </div>,
                  <div className="line">
                    <div className="key">key</div>
                    <div className="value">value</div>
                  </div>];
    return result;
  }

  render() {
    return (
        <div className={ "wrapper debugger-el" }>
          {/* { this._renderValues() } */}
        </div>
    );
  }
}

export default Debugger;
