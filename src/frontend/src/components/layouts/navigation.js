import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../actions'
class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      opened: false
    }
  }
  _toggleOpened = () => {
    this.setState({
      opened: !this.state.opened
    })
  }
  _link = ( payload ) => {
    this.props.fire('NAVIGATION_LINK_CLICK', `/${payload}`)
  }
  _render = () => {
    if (this.state.opened) {
      return (
        <div key="lay_nav" className="lay_nav">
          <div key="lay_nav_btn0" className="lay_nav_btn lay_nav_btn--pri lay_anim lay_nav_btn--left" onClick={this._link.bind( this, this.props.opened[0] )}>
            <h3>{ this.props.opened[0] }</h3>
          </div>
          <div key="lay_nav_btn1" className="lay_nav_btn lay_nav_btn--pri lay_anim lay_nav_btn--right" onClick={this._link.bind( this, this.props.opened[1] )}>
            <h3>{ this.props.opened[1] }</h3>
          </div>
          <div key="lay_nav_btn2" className="lay_nav_btn lay_nav_btn--pri lay_anim 
          lay_nav_btn--top" onClick={this._link.bind( this, this.props.opened[2] )}>
            <h3>{ this.props.opened[2] }</h3>
          </div>
          <div key="lay_nav_btn3" className="lay_nav_btn lay_nav_btn--pri lay_anim 
          lay_nav_btn--bottom" onClick={this._link.bind( this, this.props.opened[3] )}>
            <h3>{ this.props.opened[3] }</h3>
          </div>
          <div key="lay_nav_btn4" className="lay_nav_btn lay_nav_btn--pri lay_anim 
          lay_nav_btn--bottom" onClick={this._link.bind( this, this.props.opened[4] )}>
            <h3>{ this.props.opened[4] }</h3>
          </div>
          <div key="lay_nav_btn" className="lay_nav_btn lay_anim lay_nav_btn--sec lay_nav_btn--sm" onClick={this._toggleOpened}>
            <h3>{ this.props.closed }</h3>
          </div>
        </div>
      )
    } else {
      return (
        <div key="lay_nav" className="lay_nav">
          <div key="lay_nav_btn0" className="lay_nav_btn lay_nav_btn--sec lay_anim lay_nav_btn--sm">
            <h3>{ this.props.opened[0] }</h3>
          </div>
          <div key="lay_nav_btn1" className="lay_nav_btn lay_nav_btn--sec lay_anim lay_nav_btn--sm">
            <h3>{ this.props.opened[1] }</h3>
          </div>
          <div key="lay_nav_btn2" className="lay_nav_btn lay_nav_btn--sec lay_anim lay_nav_btn--sm">
            <h3>{ this.props.opened[2] }</h3>
          </div>
          <div key="lay_nav_btn3" className="lay_nav_btn lay_nav_btn--sec lay_anim lay_nav_btn--sm">
            <h3>{ this.props.opened[3] }</h3>
          </div>
          <div key="lay_nav_btn4" className="lay_nav_btn lay_nav_btn--sec lay_anim lay_nav_btn--sm">
            <h3>{ this.props.opened[4] }</h3>
          </div>
          <div key="lay_nav_btn" className="lay_nav_btn lay_anim lay_nav_btn--pri lay_nav_btn--md" onClick={this._toggleOpened}>
            <h3>{ this.props.closed }</h3>
          </div>
        </div>
      )
    }
  }
  render() {
    return this._render()
  }
}
const mapState = state => {
  return {
      content: state.app.get('content'),
      menuIsOpen: state.navigation.get('menuIsOpen')
  }
}

const mapDispatch = (dispatch) => {
  return {
      fire: (action, payload) => {
          dispatch(actions(action, payload))
      }
  }
}
export default connect(mapState, mapDispatch)(Navigation)
