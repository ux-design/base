const { use } = require( './_helpers' );

const timestampToYMD = ( payload , test ) => {
	return use( { payload , callback : ( payload ) => {
		const { ax , ay , bx , by } = payload ;
		return ( ax + ay + bx + by );
	}} , test );
}

module.exports = { method }