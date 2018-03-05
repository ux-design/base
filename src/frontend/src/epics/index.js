import Rx from 'rxjs'
import io from 'socket.io-client'
const ip = window.location.hostname;
const socket = io(ip)
// observables

const load = url => {
  return Rx.Observable
    .ajax({
      url: url,
      method: 'GET'
    })
    .catch( err => { return Rx.Observable.of({ response: {}, request: { url: url} }) })
    .map( data => {
      return {
        action: 'LOAD',
        data: data
      }
    })
}

// epics

const APP_INIT = action$ =>
  action$.ofType( 'APP_INIT' )
  .do( action => {
    if ( document.querySelector( '#first-loader' ) ) {
      document.querySelector( '#first-loader' ).parentNode.removeChild( document.querySelector( '#first-loader' ) )
    }
  })
  .mergeMap( action => {
    return Rx.Observable.concat(
      Rx.Observable.empty()
        .startWith({ action: 'PRELOADER_SHOW' }),
      load('http://'+ip+'/templates/index'),
      load('http://'+ip+'/templates/video'),
      load('http://'+ip+'/templates/contact'),
      load('http://'+ip+'/templates/learn'),
      load('http://'+ip+'/templates/about'),
      Rx.Observable.empty()
        .startWith({ action: 'ROUTE_UPDATE', payload: '/index' }),
      Rx.Observable.empty()
        .delay(1000),
      Rx.Observable.empty()
        .startWith({ action: 'PRELOADER_HIDE' }),
      Rx.Observable.empty()
        .startWith({ action: 'TEMPLATE_RENDER' }),
      Rx.Observable.empty()
        .startWith({ action: 'APP_READY' })
    )
  })
  .map( data => {
    switch ( data.action ) {
      case'LOAD':
        return {
          type: 'TEMPLATE_LOAD',
          payload: { data: data.data.response, url: data.data.request.url }
        }
      case'APP_READY':
        return {type: 'APP_READY'}
      case'PRELOADER_SHOW':
        return {type: 'PRELOADER_SHOW'}
      case'PRELOADER_HIDE':
        return {type: 'PRELOADER_HIDE'}
      case'ROUTE_UPDATE':
        return {
          type: 'ROUTE_UPDATE',
          payload: data.payload
        }
      case'TEMPLATE_RENDER':
        return {type: 'TEMPLATE_RENDER'}
      default:
        return {}
    }
  })

  const NAVIGATION_MENU_CLICK = action$ =>
  action$.ofType( 'NAVIGATION_MENU_CLICK' )
  .mergeMap( action => {
    return Rx.Observable.concat(
      Rx.Observable.empty()
        .startWith({ action: 'NAVIGATION_MENU_TOGGLE' }),
      Rx.Observable.empty()
        .startWith({ action: 'SCROLL', payload: action.payload })
    )
  })
  .map( data => {
    switch (data.action) {
      case'NAVIGATION_MENU_TOGGLE':
        return {type: 'NAVIGATION_MENU_TOGGLE'}
      case'SCROLL':
        if (data.payload) {
          return {type: 'SCROLL_ENABLE'}
        } else {
          return {type: 'SCROLL_DISABLE'}
        }
      default:
        return {}
    }
  })

const PAGE_LOAD = action$ =>
  action$.ofType( 'PAGE_LOAD' )
  .mergeMap( action => {
    return Rx.Observable.concat(
      Rx.Observable.empty()
        .startWith({ action: 'NAVIGATION_MENU_CLICK' }),
      Rx.Observable.empty()
        .startWith({ action: 'PRELOADER_SHOW' }),
      Rx.Observable.empty()
        .startWith({ action: 'VIEWER_HIDE' }),
      Rx.Observable.empty()
        .startWith({ action: 'ROUTE_UPDATE', payload: action.payload }),
      Rx.Observable.empty()
        .delay(1000),
      Rx.Observable.empty()
        .startWith({ action: 'APP_SCROLL_TOP' }),
      Rx.Observable.empty()
        .startWith({ action: 'TEMPLATE_RENDER' }),
      Rx.Observable.empty()
        .startWith({ action: 'PRELOADER_HIDE' })
    )
  })
  .map( data => {
    switch ( data.action ) {
      case'NAVIGATION_MENU_CLICK':
        return {type: 'NAVIGATION_MENU_CLICK'}
      case'PRELOADER_SHOW':
        return {type: 'PRELOADER_SHOW'}
      case'PRELOADER_HIDE':
        return {type: 'PRELOADER_HIDE'}
      case'ROUTE_UPDATE':
        return {
          type: 'ROUTE_UPDATE',
          payload: data.payload
        }
      case'TEMPLATE_RENDER':
        return {type: 'TEMPLATE_RENDER'}
      case'VIEWER_HIDE':
        return {type: 'VIEWER_HIDE'}
      case'APP_SCROLL_TOP':
        return {type: 'APP_SCROLL_TOP'}
      default:
        return {}
    }
  })

  const VIEWER_SHOW = action$ =>
  action$.ofType( 'VIEWER_SHOW' )
  .mergeMap( action => {
    return Rx.Observable.concat(
      Rx.Observable.empty()
        .startWith({ action: 'VIEWER_SHOW_IMAGE_FULLSCREEN', payload: action.payload }),
      Rx.Observable.empty()
        .startWith({ action: 'SCROLL_DISABLE' })
    )
  })
  .map( data => {
    switch (data.action) {
      case'VIEWER_SHOW_IMAGE_FULLSCREEN':
        return {type: 'VIEWER_SHOW_IMAGE_FULLSCREEN', payload: data.payload}
      case'SCROLL_DISABLE':
        return {type: 'SCROLL_DISABLE'}
      default:
        return {}
    }
  })

const VIEWER_CLOSE = action$ =>
  action$.ofType( 'VIEWER_CLOSE' )
  .mergeMap( action => {
    return Rx.Observable.concat(
      Rx.Observable.empty()
        .startWith({ action: 'VIEWER_HIDE' }),
      Rx.Observable.empty()
        .startWith({ action: 'SCROLL_ENABLE' })
    )
  })
  .map( data => {
    switch (data.action) {
      case'VIEWER_HIDE':
        return {type: 'VIEWER_HIDE'}
      case'SCROLL_ENABLE':
        return {type: 'SCROLL_ENABLE'}
      default:
        return {}
    }
  })

export { 
  APP_INIT,
  NAVIGATION_MENU_CLICK,
  PAGE_LOAD,
  VIEWER_SHOW,
  VIEWER_CLOSE
}