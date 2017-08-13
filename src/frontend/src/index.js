import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Navigation from './components/navigation';
import Content from './components/content';
import Loader from './components/loader';
import registerServiceWorker from './registerServiceWorker';

window.page = '/';

const update = ( page ) => {
    
    if ( !document.getElementById('loader') ) {
        // add loader on the fly
        var el = document.createElement( 'div' );
        el.setAttribute('id', 'loader');
        document.querySelector('body').prepend( el );
        // inject react to the loader
    }
    ReactDOM.render(<Loader on />, document.getElementById('loader'));

    //const ip = 'localhost';
    const ip = '192.168.1.40';
    fetch(`http://${ip}:4000/templates/${page}`, {
        method: 'get'
    }).then( ( resp ) => {
        return resp.json();
    }).then( ( data ) => {
        ReactDOM.render(<Loader />, document.getElementById('loader'));
        ReactDOM.render(<Navigation data={ data.body.navigation } />, document.getElementById('navigation'));
        ReactDOM.render(<Content data={ data.body.content } />, document.getElementById('content'));
        document.querySelector('#navigation').style.opacity = 1;
        document.querySelector('#content').style.opacity = 1;
        registerServiceWorker();  
    }).catch( ( err ) => {
        // Error :(
    });
}

setInterval( () => {
    if ( typeof window.page !== 'undefined' ){
        var url = window.page.substr(1,window.page.length);
        if ( url === '' ) url = 'index'; 
        update( url );
        window.page = undefined ;
    }
}, 20 );
