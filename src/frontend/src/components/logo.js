import React, { Component } from 'react'
import './logo.css'

export default class Logo extends Component {
  render () {
    const {draw, className, style} = this.props
    return (
      <svg className={className} style={style?style:{position: 'absolute', border: 'red solid 0px'}} data-name="logo" xmlns="http://www.w3.org/2000/svg" viewBox="10 25 80 50">
        <path id="logo-letter-m2" className={`logo logo--pink ${draw?'draw draw--letter-m draw--delay-m2':null}`} d="M58.45,35.83a13.81,13.81,0,0,1,6.86-1.93A16.55,16.55,0,0,1,81.86,50.45V67" />
        <path id="logo-letter-m" className={`logo logo--pink ${draw?'draw draw--letter-m draw--delay-m':null}`} d="M42.45,35.83a14.75,14.75,0,0,1,6.86-1.93A16.55,16.55,0,0,1,65.86,50.45V67" />
        <path id="logo-letter-a" className={`logo logo--blue ${draw?'draw draw--letter-a':null}`} d="M50.27,51.59a16.54,16.54,0,1,1,0-1.14V67" />
      </svg>
    )
  }
}
