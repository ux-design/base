import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bower_components/font-awesome/css/font-awesome.min.css';
import Navigation from './components/navigation';
import Content from './components/content';
import Loader from './components/loader';
import registerServiceWorker from './registerServiceWorker';

window.state = {
    toggleMenu: false,
    menu: false,
    data: null
};
window.state.page = '/';

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
    //const ip = '192.168.1.40';    // home
    const ip = '10.99.71.101';      // office
    fetch(`http://${ip}:4000/templates/${page}`, {
        method: 'get'
    }).then( ( resp ) => {
        return resp.json();
    }).then( ( data ) => {
        window.state.data = data;
        setTimeout( ()=>{
            window.state.toggleMenu = true;
            ReactDOM.render(<Loader />, document.getElementById('loader'));
            ReactDOM.render(<Navigation data={ data.body.navigation } />, document.getElementById('navigation'));
            ReactDOM.render(<Content data={ data.body.content } />, document.getElementById('content'));
            document.querySelector('#navigation').style.opacity = 1;
            document.querySelector('#content').style.opacity = 1;
            registerServiceWorker();  
        }, 200 ) ;
    }).catch( ( err ) => {
        // Error :(
    });
}

setInterval( () => {
    if ( typeof window.state.page !== 'undefined' ){
        var url = window.state.page.substr(1,window.state.page.length);
        if ( url === '' ) url = 'index'; 
        update( url );
        window.state.page = undefined ;
    }
    if ( window.state.toggleMenu ){
        window.state.toggleMenu = false ;
        if ( window.state.menu ) {
            window.state.menu = false ;
            document.getElementById('navigation').className = document.getElementById('navigation').className.replace("navigation-on","");
            document.getElementById('navigation').className += "navigation-off";
            setTimeout( ()=>{
                document.getElementById('navigation').style.height = '40px';
            }, 300 )
        } else {
            window.state.menu = true ;
            document.getElementById('navigation').className = document.getElementById('navigation').className.replace("navigation-off","");
            document.getElementById('navigation').className += "navigation-on";
            setTimeout( ()=>{
                document.getElementById('navigation').style.height = '100%';
            }, 280 )
        }
    }
}, 20 );
