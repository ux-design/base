import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import './index.css';
import './bower_components/font-awesome/css/font-awesome.min.css'
// components
import Navigation from './components/navigation'
import Block from './components/block'
import Content from './components/content'
import Viewer from './components/viewer'
import Loader from './components/loader'
/* import Debugger from './components/debugger' */

class App extends Component {
    render (props) {
        console.log(this.props)
        return  (
            <div>
                { 1 === 2
                    ? <Loader {...this.props} on/>
                    : null
                }
                { this.props.app.get('content')
                    ? [<Navigation key="navigation" {...this.props}/>,
                      <Content key="content" {...this.props}/>]
                    : null
                }
                { this.props.viewer.visible
                    ? <Viewer {...this.props}/>
                    : null
                }
                { this.props.preloader.get('visible')
                    ? <Block {...this.props} on/>
                    : null
                }
            </div>
        )
    }
}

const mapState = state => {
    return {
        app: state.get('app'),
        viewer: state.get('viewer'),
        preloader: state.get('preloader'),
        templates: state.get('templates')
    }
}

const mapDispatch = (dispatch) => {
    return {
        routeUpdate: page => { 
            dispatch( actions( 'ROUTE_UPDATE', page ) ) 
        },
        preloaderShow: page => { 
            dispatch( actions( 'PRELOADER_SHOW' ) ) 
        },
        clickImage: image => {
            dispatch( actions( 'VIEWER_SHOW_IMAGE', image ))
        }
    }
}
export default connect(mapState, mapDispatch)(App)
