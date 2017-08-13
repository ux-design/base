import React, { Component } from 'react';
import './content.css';

class Content extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChild( payload , n ) {
    return <payload.tag key={ n } className={payload.classes} id={payload.id}>{payload.value}</payload.tag>;
  }

  render() {
    const data = this.props.data;
    var result = [];
    var el;
    for( let x in data ){
      el = data[ x ];
      result.push( this._renderChild( el , x ) );
    }
    return (
      <div>
        { result }
      </div>
    );
  }
}

export default Content;
