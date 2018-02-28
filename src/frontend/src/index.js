import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './app'

const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

// react page loader
/*const update = ( page ) => {
    socket.emit('log',`${socket.id} > ${page}`)
     if ( !document.getElementById('loader') ) {
        // add loader on the fly
        var el_loader = document.createElement( 'div' )
        el_loader.setAttribute('id', 'loader')
        //document.querySelector('body').prepend( el_loader )
        document.querySelector('#content').parentNode.insertBefore( el_loader , document.querySelector('#navigation') )
        // inject react to the loader
        // add block on the fly
        var el_block = document.createElement( 'div' )
        el_block.setAttribute('id', 'block')
        //console.log(document.querySelector('#content').parentNode.insertBefore)
        document.querySelector('#content').parentNode.insertBefore( el_block , document.querySelector('#content').nextSibling )
        var el_viewer = document.createElement( 'div' )
        el_viewer.setAttribute('id', 'viewer')
        document.querySelector('#content').parentNode.insertBefore( el_viewer , document.querySelector('#content').nextSibling )
        // inject react to the block
    } else {
        document.querySelector('#block').style.display = 'flex'
    }
    //render(<Loader on />, document.getElementById('loader'))
    //render(<Block on data={ Model.state.data } />, document.getElementById('block'))
    Model.state.menu = true 
    Model.state.toggleMenu = true 
    fetch(`http://${ip}/templates/${page}`, {
        method: 'get'
    }).then( ( resp ) => {
        return resp.json()
    }).then( ( data ) => {
        Model.state.data = data
        setTimeout( ()=>{
            //render(<Loader />, document.getElementById('loader'))
            //render(<Block data={ Model.state.data } />, document.getElementById('block'))
            //render(<Navigation data={ data } />, document.getElementById('navigation'))
            //render(<Content data={ data } />, document.getElementById('content'))
            document.title = data.title
            //animateTitle( data.title )
            document.querySelector('#navigation').style.opacity = 1
            document.querySelector('#content').style.opacity = 1
            setTimeout( () => {
              document.querySelector('#block').style.display = 'none'
            } , 500 )
            //registerServiceWorker()
        }, 5 ) 
    }).catch( ( err ) => {
        // Error :(
    }) 
}*/

// core

setInterval( () => {
    // show the viewer
    /* if ( Model.state.toggleViewer ) {
        Model.state.toggleViewer = false
        if ( Model.state.viewer.data ) {
            render(<Viewer on data={ Model.state.viewer.data }/>, document.getElementById('viewer'))    
            document.querySelector('#viewer').style.display = 'flex'    
            console.log( 'viewer on' )
        }
        if ( !Model.state.viewer.visible ) {
            render(<div></div>, document.getElementById('viewer'))    
            document.querySelector('#viewer').style.display = 'none'   
            console.log( 'viewer off' ) 
        }
    }
    
    // page loader
    if ( typeof Model.state.page !== 'undefined' ){
        var url = Model.state.page.substr(1,Model.state.page.length)
        if ( url === '' ) url = 'index' 
        update( url )
        Model.state.page = undefined 
    }
    // menu mobile
    if ( Model.state.toggleMenu ){
        Model.state.toggleMenu = false 
        if ( Model.state.menu ) {
            // remove touch lock from document
            if ( Model.state.isMobile ) document.querySelector('body').className = document.querySelector('body').className.replace("lock-screen","")
            // hide mobile menu
            Model.state.menu = false 
            document.querySelector('#navigation').className += " navigation-off-anim"
            document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace(" navigation-on-anim","").replace(" navigation-on","")
            setTimeout( () => {
                document.querySelector('#navigation').className += " navigation-off"
                document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace(" navigation-off-anim","")
            }, 300 )
        } else {
            // lock the document from touch scrolling
            if ( Model.state.isMobile ) document.querySelector('body').className += "lock-screen"
            // show mobile menu 
            Model.state.menu = true 
            document.querySelector('#navigation').className += " navigation-on-anim"
            document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace(" navigation-off-anim","").replace(" navigation-off","")
            setTimeout( () => {
                document.querySelector('#navigation').className += " navigation-on"
                document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace(" navigation-on-anim","")
            }, 600 )
        }
    }
    if ( Model.state.debugger ) {
        if ( !document.querySelector('#debugger') ) {
            var tempDebugger = document.createElement('div')
            tempDebugger.id = 'debugger'
            document.querySelector('body').appendChild( tempDebugger )
            render(<Debugger data={ Model.state } />, document.getElementById('debugger'))
            console.log('creating debugger..')
        }
    } else {
        if ( document.querySelector('#debugger') ) {
            document.querySelector('#debugger').remove()
            console.log('destroying debugger..')
        }
    } */
    
}, 20 )

if ( iOS ) {
    setInterval( () => {
        // scrolling detection to fix ios fixed style bug
        /* Model.state.scrollY = ( window.scrollY - Model.state.scrollYOld )
        Model.state.scrollYOld = window.scrollY
        if ( Model.state.scrollY === 0 || Model.state.scrollY < 0 ) {
          document.querySelector('#navigation').style.position = 'fixed' 
        } else {
          document.querySelector('#navigation').style.position = 'absolute' 
        } */
    }, 200 )
}

// remove body content

const _clearBody = () => {
    const navigation = document.querySelector('#navigation')
    const content = document.querySelector('#content')
    if ( navigation ) { navigation.parentNode.removeChild(navigation) }
    if ( content ) { content.parentNode.removeChild(content) }
}

// add app to body

const _addDiv = ( id ) => {
    var app = document.createElement( 'div' )
    var loader = document.querySelector('#first-loader')
    app.setAttribute('id', id )
    document.querySelector('body').insertBefore(app, loader)
}

// init

const _init = () => {
    _clearBody()
    _addDiv('app')
}

_init()

render(
    <Provider store={ store }>
      <App />
    </Provider>
    , document.querySelector('#app'))
  