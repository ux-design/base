import React, { Component } from 'react';
import './content.css';
var C = require( '../model/constants' );
var itemsToRender = 10;
const itemsToRenderStep = 10;
const ip = 'http://' + window.location.hostname.replace(':3000','');
console.log(ip)

class Content extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      content : this.props.data.body.content.slice( 0 , itemsToRender ),
      lastItemIndex : itemsToRender - 1 
    };
  }

  _imageIsLoaded( payload ) {
    console.log( ip + '/images/'+payload[ 1 ] )
    this.refs[ payload[ 0 ] ].style.backgroundImage = 'url(' + ip + '/images/'+payload[ 1 ]+')' ;
  }

  _renderChild( payload , n ) {
    if ( payload.tag === 'img' ) {
      return  <div key={ n } id={payload.id} className={payload.classes} >
                <div ref={ 'content' + n } style={{ backgroundColor : C.COLORS.IMAGE_PRELOAD_BG_COLOR }} className="image-inner" />
                <img src={ ip + '/images/' + payload.src } onLoad={ this._imageIsLoaded.bind( this, [ 'content' + n , payload.src ] )} alt={ Math.random() } style={{ display : 'none' }}/>
              </div>;
    } else {
      return <payload.tag key={ n } style={{ opacity : 0 }} ref={ 'content' + n } className={payload.classes} id={payload.id} dangerouslySetInnerHTML={{ __html : payload.value }}></payload.tag>;
    }
  }

  _showElementsOnScroll() {
    var me = this;
    window.addEventListener('scroll',() => {
      var lastItem = itemsToRender - 1 ;
      this._showElements();
      if ( me.refs[ 'content' + lastItem ] ) {
        if ( window.scrollY > me.refs[ 'content' + lastItem ].offsetTop - window.innerHeight + 40 ) {
          this._renderNextElements();
        }
      }
    });
  }

  _showElementsOnResize() {
    var me = this;
    window.addEventListener('resize',() => {
      var lastItem = itemsToRender - 1 ;
      this._showElements();
      if ( me.refs[ 'content' + lastItem ] ) {
        if ( window.scrollY > me.refs[ 'content' + lastItem ].offsetTop - window.innerHeight + 40 ) {
          this._renderNextElements();
        }
      }
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

  _renderNextElements() {
    itemsToRender += itemsToRenderStep ;
    this.setState({
      content : this.props.data.body.content.slice( 0 , itemsToRender ),
    })
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

  componentWillMount() {
  }

  componentWillReceiveProps( nextProps ) {
    this.setState({
      content : nextProps.data.body.content.slice( 0 , itemsToRender )
    })
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
    const data = this.state.content//this.props.data.body.content;
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
