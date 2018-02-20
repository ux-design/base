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
                { this.props.app.content
                    ? [<Navigation key="navigation" {...this.props}/>,
                      <Content key="content" {...this.props}/>]
                    : null
                }
                { this.props.viewer.visible
                    ? <Viewer {...this.props}/>
                    : null
                }
                { 1 === 2
                    ? <Block {...this.props} on/>
                    : null
                }
            </div>
        )
    }
}

const mapState = state => {
    return state.toJS()
}

const mapDispatch = (dispatch) => {
    return {
        route: page => { 
            dispatch( actions( 'ROUTE', page ) ) 
        },
        clickImage: image => {
            dispatch( actions( 'VIEWER_SHOW_IMAGE', image ))
        }
    }
}
export default connect(mapState, mapDispatch)(App)
