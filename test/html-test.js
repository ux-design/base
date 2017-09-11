const colors = require( 'colors' );
const html = require( '../src/modules/html' );
const fs = require( 'fs' );
var template = JSON.parse( fs.readFileSync( '../src/templates/test.json' , 'utf8' ) ) ;

const test = ( name , func , expected ) => {
	if ( name != '' ) console.log( `\n# Testing ${name}\n`.cyan.bold ); 
	if ( JSON.stringify(func) == JSON.stringify(expected) ) { 
        console.log( '  PASSED'.green.bold ); 
        console.log( `${func}`.replace(/</g,'\n<').replace(/\n<\//g,'</').grey );
	} else {
		console.log( '  NO.'.red.bold );
		if ( func.error ) {
			console.log( `    • ${func.error}`.replace(/\n/g,'\n    • ').red );
		} else {
			console.log( `    • expected ${expected} but received ${func} `.red );
		}
	}	
}

test( 'createBODY' , html.createBODY() , { error : 'payload is not defined' } );
// test( '' , html.createBODY( template.body , true ) , `<body><div id="navigation"><div id="welcome"><a href="/">welcome</a></div><div id="about"><a href="/about">about</a></div><div id="contact"><a href="/contact">contact</a></div></div><div id="content"><h1 id="main-title" class="title"></h1><h2 id="main-subtitle" class="subtitle"></h2><p id="main-description" class="paragraph"></p></div></body>` );

test( 'createHTML' , html.createHTML() , { error : 'payload is not defined' } );
// test( '' , html.createHTML( template , true ) , `<!doctype html><html lang="en"><head><title>Andrea Mazzilli</title><meta charset="utf-8"><link rel="stylesheet" type="text/css" href="/css/bundle.min.css" media="all" /></head><body><div id="navigation"><div id="welcome"><a href="/">welcome</a></div><div id="about"><a href="/about">about</a></div><div id="contact"><a href="/contact">contact</a></div></div><div id="content"><h1 id="main-title" class="title"></h1><h2 id="main-subtitle" class="subtitle"></h2><p id="main-description" class="paragraph"></p></div></body></html>` );

test( 'createIMG' , html.createIMG() , { error : 'payload is not defined' } );

template = { src : "me.jpg" , classes : "header cropped" , id : "introduction" };
test( '' , html.createIMG( template , true ) , `<img src="me.jpg" class="header cropped" id="introduction" />` );

