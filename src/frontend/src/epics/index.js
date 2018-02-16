import Rx from 'rxjs'
const ip = window.location.hostname;
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
    .mergeMap( action => {
        return Rx.Observable.concat(
            load('http://'+ip+'/templates/index'),
            load('http://'+ip+'/templates/video'),
            load('http://'+ip+'/templates/contact'),
            load('http://'+ip+'/templates/about'),
            Rx.Observable.empty()
                .startWith({ action: 'ROUTE_UPDATE', payload: '/index' }),
            Rx.Observable.empty()
                .startWith({ action: 'TEMPLATE_RENDER' }),
            Rx.Observable.empty()
                .startWith({ action: 'APP_READY' }),
            Rx.Observable.empty()
                .startWith({ action: 'PRELOADER_HIDE' })
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
            return {
                type: 'APP_READY'
            }
            case'PRELOADER_HIDE':
            return {
                type: 'PRELOADER_HIDE'
            }
            case'ROUTE_UPDATE':
            return {
                type: 'ROUTE_UPDATE',
                payload: data.payload
            }
            case'TEMPLATE_RENDER':
            return {
                type: 'TEMPLATE_RENDER'
            }
            default:
            return {}
        }
    })

export { 
    APP_INIT
}