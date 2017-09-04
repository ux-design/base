const express = require( 'express' ) ;  
const app = express() ;  
const dateFormat = require('dateformat');
const fs = require('fs');
const server = require( 'http' ).createServer( app ) ;  
const io = require( 'socket.io' )( server ) ;
const port = process.env.PORT || 4000;
const prettify = require( 'html' );
const html = require( './src/modules/html' );
const ip = require( 'ip' ).address();
console.log( ip );
//const ip = 'localhost';

// API

    // GET

    app.get( '/' , function( req , res ) {

        const query = req.query;
        if ( query.render != undefined ) {
            _forcePageRendering( 'index' );
        }
        res.sendFile( __dirname + `/src/html/index.html` );
        
    } ) ;

    // STATIC FILES (REACT)

    app.use( express.static( __dirname + `/src/frontend/build` ) );
    

    app.get( '/:l1' , function( req , res ) {

        const { l1 } = req.params;
        const query = req.query;
        if ( query.render != undefined ) {
            _forcePageRendering( l1 );
        }
        res.sendFile( __dirname + `/src/html/${l1}.html` );
        
    } ) ;

    app.get( '/templates/:page' , function( req , res ) {
        
        const { page } = req.params;
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'application/json');
        res.sendFile( __dirname + `/src/templates/${page}.json` );
        
    } ) ;

// functions  

const _getProductionCss = () => {
    const items = fs.readdirSync( `./src/frontend/build/static/css` , 'utf8' );
    var result ;
    for ( var i=0; i<items.length; i++) {
        result = items[i].split('.css')[0];
    }
    return `${result}.css`;
}

const _getProductionJs = () => {
    const items = fs.readdirSync( `./src/frontend/build/static/js` , 'utf8' );
    var result ;
    for ( var i=0; i<items.length; i++) {
        result = items[i].split('.js')[0];
    }
    return `${result}.js`;
}

const _forcePageRendering = ( payload ) => {
    console.log( `force rendering => ${payload}.html` )
    var page = JSON.parse( fs.readFileSync( `./src/templates/${payload}.json` , 'utf8' ) ) ;    
    var result = html.createHTML( page , true );
    var options = {
        'indent_size': 2,
        'indent_char': ' ',
        'max_char': 78,
        'brace_style': 'expand',
        'unformatted': ['sub', 'sup', 'b', 'i', 'u']
    }
    result = result.replace(`</body>`,`<script>document.querySelector('#navigation').style.opacity = 0;document.querySelector('#content').style.opacity = 0;</script><link rel="stylesheet" type="text/css" href="http://localhost:4000/static/css/${_getProductionCss()}" media="all" /><script type="text/javascript" src="http://localhost:4000/static/js/${_getProductionJs()}"></script>`);
    fs.writeFileSync( `./src/html/${payload}.html` , prettify.prettyPrint( result , options ) ) ;
}
        
server.listen( port );  
console.log('server listening on port 4000');

;
