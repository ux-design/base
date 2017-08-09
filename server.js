const express = require( 'express' ) ;  
const app = express() ;  
const dateFormat = require('dateformat');
const fs = require('fs');
const server = require( 'http' ).createServer( app ) ;  
const io = require( 'socket.io' )( server ) ;
const port = process.env.PORT || 8080;
const prettify = require( 'html' );
const html = require( './src/modules/html' );
const htmlINDEX = JSON.parse( fs.readFileSync( './src/templates/index.json' , 'utf8' ) ) ;

// API

	// GET

    app.get( '/' , function( req , res ) {

        res.sendFile( __dirname + '/src/html/index.html' ) ;

    } ) ;

    app.get( '/render' , function( req , res ) {

        const result = html.createHTML( htmlINDEX , true );
        fs.writeFileSync( './src/html/index.html' , prettify.prettyPrint( result ) ) ;
        res.sendFile( __dirname + '/src/html/index.html' ) ;

    } ) ;
        

server.listen( port ) ;  