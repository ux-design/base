const { use } = require( './_helpers' );

const method = function ( payload , test ){
	return use( { payload , callback : function( payload ) {
		const { ax , ay , bx , by } = payload ;
		return ( ax + ay + bx + by );
	}} , test );
}

module.exports = { method }