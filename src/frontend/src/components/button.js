import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    return ( 
      <div {...this.props}>
        { this.props.children }
      </div>
    )
  }
}