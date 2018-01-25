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
        this.props.route('index')
        return  (
            <div>
                <Loader {...this.props} on/>
                {/* <Navigation {...this.props}/>
                <Content {...this.props}/>
                <Viewer {...this.props}/> */}
                <Block {...this.props} on/>
            </div>
        )
    }
}

const mapState = state => {
    return state
}

const mapDispatch = (dispatch) => {
    return {
        route: (page) => { 
            dispatch( actions( 'ROUTE', page ) ) 
        }
    }
}
export default connect(mapState, mapDispatch)(App)
