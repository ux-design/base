import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from './actions'
import './index.css';
import './bower_components/font-awesome/css/font-awesome.min.css'
// components
import Navigation from './components/navigation'
import LayoutNavigation from './components/layouts/navigation'
import Block from './components/block'
import Content from './components/content'
import Layout from './components/layout'
import Viewer from './components/viewer'
/* import Debugger from './components/debugger' */

class App extends Component {
    _checkRoute = () => {
        const url = window.location.pathname
        if (this.props.app.get('route') !== url ) {
            this.props.fire('PAGE_LOAD', url)
        }
    }
    _renderContent = () => {
        if (this.props.app.get('content').layout) {
            const layout = this.props.app.get('content').layout
            return [<Layout key="layout" />,<LayoutNavigation key="layoutNavigation" {...layout.navigation}/>]
        } else if (this.props.app.get('content').body) {
            return [<Navigation key="navigation" />, <Content key="content" />]
        } else {
            return null
        }
    }
    render () {
        this._checkRoute()
        return  (
            <div>
                { this._renderContent() }
                { this.props.viewer.get('visible')
                    ? <Viewer key="viewer" />
                    : null
                }
                { this.props.preloader.get('visible')
                    ? <Block {...this.props} on />
                    : null
                }
            </div>
        )
    }
}

const mapState = state => {
    return {
        app: state.app,
        viewer: state.viewer,
        preloader: state.block.get('preloader')
    }
}

const mapDispatch = (dispatch) => {
    return {
        fire: (action, payload) => {
            dispatch(actions(action, payload))
        }
    }
}
export default connect(mapState, mapDispatch)(App)
