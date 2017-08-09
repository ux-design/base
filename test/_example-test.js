const colors = require( 'colors' );
const _example = require( '../src/modules/_example' );

const test = ( name , func , expected ) => {
	if ( name != '' ) console.log( `\n# Testing ${name}\n`.cyan.bold ); 
	if ( JSON.stringify(func) == JSON.stringify(expected) ) { 
		console.log( '  OK'.green.bold ); 
	} else {
		console.log( '  NO.'.red.bold );
		if ( func.error ) {
			console.log( `    • ${func.error}`.replace(/\n/g,'\n    • ').red );
		} else {
			console.log( `    • expected ${expected} but received ${func} `.red );
		}
	}	
}

test( 'method' , _example.method() , { error : 'payload is not defined' } );
test( '' , _example.method({ ax : 1 , ay : "s" , bx : [] , by : 4 } , true ) , { error : 'mismatch error in key: ay\nmismatch error in key: bx' } );
test( '' , _example.method({ ax : 1 , ay : 1 , bx : 1 , by : 1 } , true ) , 4 );
test( '' , _example.method({ ax : 3 , ay : 3 , bx : 3 , by : 3 } , true ) , 12 );