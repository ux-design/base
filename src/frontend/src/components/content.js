import React, { Component } from 'react';
import './content.css';
const ip = window.location.hostname;

class Content extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  _renderChild( payload , n ) {
    if ( payload.tag === 'img' ) {
      return <div key={ n } id={payload.id} className={payload.classes} ><div ref={ 'content' + n } style={{ backgroundImage : 'url(http://'+ip+'/images/'+payload.src+')' }} className="image-inner" /></div>;
    } else {
      return <payload.tag key={ n } style={{ opacity : 0 }} ref={ 'content' + n } className={payload.classes} id={payload.id}>{payload.value}</payload.tag>;
    }
  }

  _showElementsOnScroll() {
    window.addEventListener('scroll',() => {
      this._showElements();
    });
  }

  _showElementsOnResize() {
    window.addEventListener('resize',() => {
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
      if ( window.scrollY < me.refs[ x ].offsetTop - window.innerHeight - 40 ) {
        this._elHide( x, n );
        ++n;
      }
    }
  }

  _hideElements() {
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
    me.refs[ ref ].className = me.refs[ ref ].className.replace(' el-show','');
  }

  componentDidMount() {
    this._showElementsOnScroll();
    this._showElementsOnResize();
    this._showElements();
  }

  componentDidUpdate( nextProps ) {
    this._hideElements();
    this._showElements();
    console.log('componentDidUpdate')
  }

  render() {
    console.log('render')
    const data = this.props.data.body.content;
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
