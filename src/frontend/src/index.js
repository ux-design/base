import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
registerServiceWorker() 

//const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)

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
  
