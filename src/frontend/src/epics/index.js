import Rx from 'rxjs'

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
            load('http://localhost/templates/index'),
            load('http://localhost/templates/video'),
            load('http://localhost/templates/contact'),
            load('http://localhost/templates/about'),
            Rx.Observable.empty()
                .startWith({ action: 'ROUTE_UPDATE', payload: '/index' }),
            Rx.Observable.empty()
                .startWith({ action: 'TEMPLATE_RENDER' }),
            Rx.Observable.empty()
                .startWith({ action: 'APP_INIT_COMPLETE' })
        )
    })
    .map( data => {
        switch ( data.action ) {
            case'LOAD':
            return {
                type: 'TEMPLATE_LOAD',
                payload: { data: data.data.response, url: data.data.request.url }
            }
            case'APP_INIT_COMPLETE':
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
        }
    })

const APP_INIT_COMPLETE = action$ => {
    action$.ofType( 'APP_INIT_COMPLETE' )
    .map( data => { 
        return {
            type: 'PRELOADER_HIDE',
            payload: {}
        }
    })
}

export { 
    APP_INIT,
    APP_INIT_COMPLETE
}