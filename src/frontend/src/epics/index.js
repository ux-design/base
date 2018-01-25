import Rx from 'rxjs'

const load = url => {
    return Rx.Observable
            .ajax({
                url: url,
                method: 'GET'
            })
            .catch( err => { return Rx.Observable.of({}) })
}

const loadTemplate = action$ =>
    action$.ofType( 'ROUTE' )
        .mergeMap( action => { return load( 'http://localhost/templates/' + action.payload ) })
        .map( data => { if ( data.response ) { return data.response } else { return data } } )
        .map( data => { return {
            type: 'UPDATE_CONTENT',
            payload: data
        }})

export default loadTemplate