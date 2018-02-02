import Rx from 'rxjs'

// observables

const load = url => {
    return Rx.Observable
        .ajax({
            url: url,
            method: 'GET'
        })
        .catch( err => { return Rx.Observable.of({ response: {}, request: { url: url} }) })
}

// epics

const LOAD_PAGE = action$ =>
    action$.ofType( 'LOAD_PAGE' )
        .mergeMap( action => { return load( 'http://localhost/templates/' + action.payload ) })
        .map( data => { return {
            type: 'UPDATE_CONTENT',
            payload: { data: data.response, url: data.request.url }
        }})

const APP_INIT = action$ =>
    action$.ofType( 'APP_INIT' )
        .mergeMap( action => {
            return Rx.Observable.concat(
                load('http://localhost/templates/index'),
                load('http://localhost/templates/video'),
                load('http://localhost/templates/contact'),
                load('http://localhost/templates/about')
            )
        })
        .map( data => { return {
                type: 'PRELOADER_HIDE', // UPDATE_CONTENT
                payload: { data: data.response, url: data.request.url }
            }
        })

export { 
    LOAD_PAGE, 
    APP_INIT 
}