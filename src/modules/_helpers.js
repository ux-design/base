const _typeof = require( './typeof' );
const schemes = require( './_schemes' );

const use = function ( extraload , test ) {
	//console.log( 'use(' , extraload , ')' );
	if ( test || _typeof(extraload.payload) == '[object Undefined]' ) {
		const funcName = arguments.callee.caller.name;
		const { payload , callback } = extraload ;
		const _scheme = schemes[ funcName ] ;
		var error = '';
		if ( _typeof( payload ) == '[object Undefined]' ) {
			return { error : 'payload is not defined' } 
		}
		if ( _typeof( _scheme ) == '[object Undefined]' ) {
			error += 'missing _scheme, ';
		}
		if ( _typeof( payload ) == '[object Undefined]' ) {
			error += 'missing payload, ';
		}
		if ( error == '' ) {
			for ( let key in _scheme ) {
				//console.log( _typeof( payload[ key ] ) , _scheme[ key ] )
				if ( _typeof( payload[ key ] ) != _scheme[ key ] ) error += `mismatch error in key: ${key}\n` ;
			}
			error = error.substring( 0, error.length -1 )
			if ( error == '' ) {
				return callback( payload );
			}	else {
				return { error }
			}
		} else {
			return { error }
		}
	} else {
		return extraload.callback( extraload.payload );
	}
}

module.exports = { use };