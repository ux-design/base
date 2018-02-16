import React, { Component } from 'react'
import Model from '../model'
import './content.css'
import Animator from '../helpers/animator'
import ImagePreloader from '../helpers/imagePreloader'
import ChatBox from './chatbox'
import { colors, urls } from '../model/constants'
var itemsToRender = 10
const itemsToRenderStep = 10

class Content extends Component {
  
  _intervals = {}

  _createInterval( payload , ref ) {
    var rnd = parseInt( Math.random() * 1000, 10 )
    var imageUrl = payload
    this._intervals[ rnd ] = setInterval( () => {
      if ( this.refs[ ref ] ) {
        var el = this.refs[ ref ].children[ 1 ].children[ 0 ]
        if ( ImagePreloader.images[ imageUrl ] ) {
          var perc = ImagePreloader.images[ imageUrl ].completedPercentage
          el.innerHTML = perc + '<span style="font-size:10px">%</span>'
        }
      }
      if ( ImagePreloader.images[ imageUrl ].completedPercentage === 100 ) {
        clearInterval( this._intervals[ rnd ] )
        this.refs[ ref ].style.backgroundImage = 'url(' + ImagePreloader.images[ imageUrl ].src + ')' 
        this.refs[ ref ].children[ 0 ].style.display = 'none' 
        this.refs[ ref ].children[ 1 ].style.display = 'none' 
      }
    },100)
  }

  _onClick( payload ) {
    if ( payload.click === 'show-fullscreen' ) {
      Model.state.viewer.data = { type : payload.tag , url : payload.src }
      Model.state.viewer.visible = true 
      Model.state.toggleViewer = true
    }
  }

  _onMouseOver( payload ) {
    var el = this.refs[ payload[ 1 ] ] 
    if ( el.tagName.toLowerCase() === 'div' ) el = el.children[0]
    Animator( el ).use( payload[ 0 ].rollover ).removeAfter( payload[ 0 ].rolloverRemoveAfter )
  }

  _renderChild( payload , n ) {
    if ( payload.tag === 'img' ) {
      const props = {
              key : n ,
              id : payload.id ,
              className : payload.classes ,
              ref :  "image" + n
      }
      if ( payload.rollover ) {
        props.onTouchStart = this._onMouseOver.bind( this, [ payload , 'image' + n ] )
        props.onMouseOver = this._onMouseOver.bind( this, [ payload , 'image' + n ] )
      }
      if ( payload.click ) {
        props.onClick = this._onClick.bind( this, payload )
        props.style={ cursor : "pointer" }
      }
      var imageUrl = urls.images + payload.src 
      ImagePreloader.load( imageUrl )
      this._createInterval( imageUrl , 'content' + n )
      return  <div {...props}>
                <div 
                  ref={ 'content' + n } 
                  style={{ backgroundColor : colors.IMAGE_PRELOAD_BG_COLOR , display : 'flex' , alignItems : 'center', justifyContent : 'center' }} 
                  className="image-inner" 
                >
                  <div className="image-preloader" />
                  <div className="image-preloader-perc">
                    <div className="text"></div>
                  </div>
                </div>
                {/* <img 
                  src={ imageUrl } 
                  onLoad={ this._imageIsLoaded.bind( this, [ 'content' + n , payload.src ] )} alt={ Math.random() } style={{ display : 'none' }}
                /> */}
              </div>
    } else if ( payload.tag === 'chatbox' ) {
      const props = {
              key : n ,
              id : payload.id ,
              className : payload.classes ,
              ref :  "chatbox" + n
      }
      if ( payload.rollover ) {
        props.onTouchStart = this._onMouseOver.bind( this, [ payload , 'image' + n ] )
        props.onMouseOver = this._onMouseOver.bind( this, [ payload , 'image' + n ] )
      }
      if ( payload.click ) {
        props.onClick = this._onClick.bind( this, payload )
        props.style={ cursor : "pointer" }
      }
      return  <ChatBox {...props} />
    } else {
      const props = {
              key :  n ,
              style : { opacity : 0 },
              ref : 'content' + n ,
              className : payload.classes,
              id : payload.id ,
              dangerouslySetInnerHTML : { __html : payload.value } ,
      }
      if ( payload.rollover ) {
        props.onTouchStart = this._onMouseOver.bind( this, [ payload , 'content' + n ] )
        props.onMouseOver = this._onMouseOver.bind( this, [ payload , 'content' + n ] )
      }
      if ( payload.click ) {
        props.onClick = this._onClick.bind( this, payload )
        props.style={ cursor : "pointer" }
      }
      return  <payload.tag {...props}></payload.tag>
    }
  }

  _showElementsOnScroll() {
    var me = this
    window.addEventListener('scroll',() => {
      var lastItem = itemsToRender - 1 
      this._showElements()
      if ( me.refs[ 'content' + lastItem ] ) {
        if ( window.scrollY > me.refs[ 'content' + lastItem ].offsetTop - window.innerHeight + 40 ) {
          this._renderNextElements()
        }
      }
    })
  }

  _showElementsOnResize() {
    var me = this
    window.addEventListener('resize',() => {
      var lastItem = itemsToRender - 1 
      this._showElements()
      if ( me.refs[ 'content' + lastItem ] ) {
        if ( window.scrollY > me.refs[ 'content' + lastItem ].offsetTop - window.innerHeight + 40 ) {
          this._renderNextElements()
        }
      }
    })
  }

  _showElements() {
    var me = this
    var n = 0
    for ( let x in this.refs ) {
      if ( window.scrollY > me.refs[ x ].offsetTop - window.innerHeight + 40 ) {
        this._elShow( x, n )
        ++n
      }
      if ( window.scrollY < me.refs[ x ].offsetTop - window.innerHeight - 40 ) {
        this._elHide( x, n )
        ++n
      }
    }
  }

  _renderNextElements() {
    itemsToRender += itemsToRenderStep 
    this.setState({
      content : this.props.data.body.content.slice( 0 , itemsToRender ),
    })
  }

  _hideElements() {
    var n = 0
    for ( let x in this.refs ) {
      this._elHide( x, n )
      ++n
    }
  }

  _elShow( payload, n ) {
    var me = this
    const ref = payload
    if ( me.refs[ ref ].className.indexOf( 'el-show' ) === -1 ) {
      me.refs[ ref ].className += ' el-show'
    }
  }

  _elHide( payload, n ) {
    var me = this
    const ref = payload
    me.refs[ ref ].className = me.refs[ ref ].className.replace(' el-show','')
  }

  componentWillMount() {
  }

/*   componentWillReceiveProps( nextProps ) {
    this.setState({
      content : nextProps.slice( 0 , itemsToRender )
    })
  } */

  componentDidMount() {
    this._showElementsOnScroll()
    this._showElementsOnResize()
    this._showElements()
  }

  componentDidUpdate( nextProps ) {
    this._hideElements()
    this._showElements()
    console.log('componentDidUpdate')
  }

  render() {
    const elements = this.props
    var result = []
    var el
    for( let x in elements ){
      el = elements[ x ]
      result.push( this._renderChild( el , x ) )
    }
    return (
      <div id="content">
        <div className="wrapper">
          { result }
        </div>
      </div>
    )
  }
}

export default Content
