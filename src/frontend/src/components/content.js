import React, { Component } from 'react';
import './content.css';

class Content extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChild( payload , n ) {
    return <payload.tag key={ n } style={{ opacity : 0 }} ref={ 'content' + n } className={payload.classes} id={payload.id}>{payload.value}</payload.tag>;
  }

  _showElementsOnScroll() {
    var me = this;
    window.addEventListener('scroll',() => {
      this._showElements();
    });
  }

  _showElements() {
    var me = this;
    var n = 0;
    for ( let x in this.refs ) {
      if ( window.scrollY > me.refs[ x ].offsetTop - window.innerHeight + 40 ) {
        this._elShow( x, n );
        ++n;
      }
      if ( window.scrollY < me.refs[ x ].offsetTop - window.innerHeight + 40 ) {
        this._elHide( x, n );
        ++n;
      }
    }
  }

  _hideElements() {
    var me = this;
    var n = 0;
    for ( let x in this.refs ) {
      this._elHide( x, n );
      ++n;
    }
  }

  _elShow( payload, n ) {
    var me = this;
    const ref = payload;
    if ( me.refs[ ref ].className.indexOf( 'el-show' ) === -1 ) {
      me.refs[ ref ].className += ' el-show';
    }
  }

  _elHide( payload, n ) {
    var me = this;
    const ref = payload;
    me.refs[ ref ].className = me.refs[ ref ].className.replace('el-show','');
  }

  componentDidMount() {
    this._showElementsOnScroll();
    this._showElements();
  }

  componentDidUpdate( nextProps ) {
    this._hideElements();
    this._showElements();
    console.log('componentDidUpdate')
  }

  render() {
    console.log('render')
    const data = this.props.data;
    var result = [];
    var el;
    for( let x in data ){
      el = data[ x ];
      result.push( this._renderChild( el , x ) );
    }
    return (
      <div className="wrapper">
        { result }
      </div>
    );
  }
}

export default Content;
