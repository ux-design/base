import React, { Component } from 'react'
import { connect } from 'react-redux'

// css
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
        console.log(this.props)
        return  (
            <div>
                <Loader {...this.props}/>
                <Navigation {...this.props}/>
                <Content {...this.props}/>
                <Viewer {...this.props}/>
                <Block {...this.props}/>
            </div>
        )
    }
}

const mapState = state => {
    return state
}
export default connect(mapState)(App)
