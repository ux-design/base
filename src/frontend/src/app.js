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
        return  (
            <div>
                { this.props.app.get('content').body
                    ? [<Navigation key="navigation" />,
                      <Content key="content" />]
                    : null
                }
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
