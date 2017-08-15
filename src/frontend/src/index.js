import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bower_components/font-awesome/css/font-awesome.min.css';
import Navigation from './components/navigation';
import Content from './components/content';
import Loader from './components/loader';
import registerServiceWorker from './registerServiceWorker';

const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
const mobilecheck = () => {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// a small state to share with all react components
window.state = {
  toggleMenu: true,
  menu: false,
  data: null,
  scrollY: 0,
  scrollYOld: 0,
  page: '/',
  isMobile: mobilecheck(),
};


// animate title
const animateTitle = ( payload ) => {
  document.title = '';
  window.state.title = '';
  for ( let x in payload ) {
    var letter = payload[ x ] ;
    setTitle( letter , ( x * 250 ) );
  }
}

const setTitle = ( payload , time ) => {
  var letter = payload ;
  setTimeout( () => {
    window.state.title += letter;
    document.title = window.state.title + '_';
  }, time );
}

// react page loader
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
            document.title = data.title;
            //animateTitle( data.title );
            document.querySelector('#navigation').style.opacity = 1;
            document.querySelector('#content').style.opacity = 1;
            registerServiceWorker();  
        }, 200 ) ;
    }).catch( ( err ) => {
        // Error :(
    });
}

setInterval( () => {
    // page loader
    if ( typeof window.state.page !== 'undefined' ){
        var url = window.state.page.substr(1,window.state.page.length);
        if ( url === '' ) url = 'index'; 
        update( url );
        window.state.page = undefined ;
    }
    // menu mobile
    if ( window.state.toggleMenu ){
        window.state.toggleMenu = false ;
        if ( window.state.menu ) {
            // remove touch lock from document
            if ( window.state.isMobile ) document.querySelector('body').className = document.querySelector('body').className.replace("lock-screen","");
            // hide mobile menu
            window.state.menu = false ;
            document.querySelector('#navigation').className += "navigation-off";
            document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace("navigation-on","");
        } else {
            // lock the document from touch scrolling
            if ( window.state.isMobile ) document.querySelector('body').className += "lock-screen";
            // show mobile menu 
            window.state.menu = true ;
            document.querySelector('#navigation').className += "navigation-on";
            document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace("navigation-off","");
        }
    }
    
}, 20 );

if ( iOS ) {
    setInterval( () => {
        // scrolling detection to fix ios fixed style bug
        window.state.scrollY = ( window.scrollY - window.state.scrollYOld );
        window.state.scrollYOld = window.scrollY;
        if ( window.state.scrollY === 0 || window.state.scrollY < 0 ) {
          document.querySelector('#navigation').style.position = 'fixed'; 
          //document.querySelector('#navigation').className += ' ios-small-in';
        } else {
          //document.querySelector('#navigation').className = document.querySelector('#navigation').className.replace('ios-small-in','');
          document.querySelector('#navigation').style.position = 'absolute'; 
        }
    }, 200 );
}
