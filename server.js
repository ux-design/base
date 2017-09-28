const express = require( 'express' ) ;  
const app = express() ;  
const dateFormat = require('dateformat');
const fs = require('fs');
const server = require( 'http' ).createServer( app ) ;  
const io = require( 'socket.io' )( server ) ;
const prettify = require( 'html' );
const html = require( './src/modules/html' );
const ip = require( 'ip' ).address();
const forceRendering = true ;
//const ip = 'localhost';

// API

    // STATIC FILES (REACT)

    app.use( express.static( __dirname + `/src/frontend/build` ) );

    // // GET

    app.get( '/' , function( req , res ) {

        const query = req.query;
        if ( query.render != undefined || forceRendering ) {
            _forcePageRendering( 'index' );
        }
        res.sendFile( __dirname + `/src/html/index.html` );
        
    } ) ;

    app.get( '/:l1' , function( req , res ) {

        const { l1 } = req.params;
        const query = req.query;
        if ( query.render != undefined || forceRendering ) {
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

    app.get( '/images/:image' , function( req , res ) {
        
        const { image } = req.params;
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader('Content-Type', 'image/jpeg');
        res.sendFile( __dirname + `/src/images/${image}` );
        
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
    var style = `/static/css/${_getProductionCss()}`;
    var script = `/static/js/${_getProductionJs()}`;
    var scriptLoader = `(function () {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = '${script}';
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
        var c = document.createElement('link');
        c.type = 'text/css';
        c.rel = 'stylesheet';
        c.href = '${style}';
        c.media = 'all';
        c.type = 'text/css';
        c.async = true;
        var y = document.getElementsByTagName('script')[0];
        y.parentNode.insertBefore(c, y);
    })();`;

    // result = result.replace(`</body>`,`<div id="first-loader" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px;background-color:white;z-index:1000000;display: flex;justify-content: center;align-items: center;">loading..</div></body>`);
    result = result.replace(`</body>`,`<div id="first-loader" style="position:absolute;top:0px;bottom:0px;left:0px;right:0px;background-color:white;z-index:1000000;display: flex;justify-content: center;align-items: center;font-family:helvetica; font-size:36px;">loading..</div><script>document.querySelector('#navigation').style.opacity = 0;document.querySelector('#content').style.opacity = 0;</script><script>${scriptLoader}</script></body>`);
    fs.writeFileSync( `./src/html/${payload}.html` , prettify.prettyPrint( result , options ) ) ;
}
        
server.listen( 80 );  
console.log( `http://${ip}` );