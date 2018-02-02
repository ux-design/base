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
import Debugger from './components/debugger'

class App extends Component {
    render (props) {
        const { preloaderIsVisible } = this.props
        console.log( preloaderIsVisible )
        return  (
            <div>
                { preloaderIsVisible
                    ? <Loader {...this.props} on/>
                    : null
                }
                {/* <Navigation {...this.props}/>
                <Content {...this.props}/>
                <Viewer {...this.props}/> */}
                { preloaderIsVisible
                    ? <Block {...this.props} on/>
                    : null
                }
            </div>
        )
    }
}

const mapState = state => {
    return {
        preloaderIsVisible: state.get('preloader').get('visible')
    }
}

const mapDispatch = (dispatch) => {
    return {
        route: (page) => { 
            dispatch( actions( 'ROUTE', page ) ) 
        }
    }
}
export default connect(mapState, mapDispatch)(App)
