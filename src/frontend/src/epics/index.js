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
                action: 'load',
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
                .startWith({ action: 'APP_INIT_COMPLETE' })
        )
    })
    .map( data => {
        switch ( data.action ) {
            case"load":
            return {
                type: 'UPDATE_CONTENT',
                payload: { data: data.data.response, url: data.data.request.url }
            }
            case"APP_INIT_COMPLETE":
            return {
                type: 'PRELOADER_HIDE',
                payload: {}
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