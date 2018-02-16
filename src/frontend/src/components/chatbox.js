import React, { Component } from 'react';
import io from 'socket.io-client';
import './chatbox.css';
const ip = 'http://' + window.location.hostname.replace(':3000','');
const socket = io(ip);
//var C = require( '../model/constants' );

class ChatBox extends Component {
  
  constructor( props ) {
    super( props );
    this.state = {
        content : []
    };
  }

  componentDidMount() {
    var me = this;
    console.log('chatbox did mount')
    socket.on('message', function ( data ) {
        me._addMessage( { from : "site" , text : data } );
        console.log( data );
    });
  }

  _addMessage( payload ) {
    var temp = this.state.content;
    temp.push( <div key={ temp.length } className={ payload.from }>{ payload.text }</div> );
    this.setState({
        content : temp
    });
  }

  _sendMessage() {
    if ( this.refs.message.value !== '' ) {
        socket.emit('message',this.refs.message.value );
        this._addMessage( { text : this.refs.message.value , from : 'visitor' } );
        this.refs.message.value = '';
    };
  }

  render() {
    return (
        <div id="chatbox">
            <div className="wrapper">
                <div className="header"></div>
                <div className="content">
                    { this.state.content }
                </div>
                <div className="footer">
                    <textarea ref="message" className="text"></textarea>
                    <div className="send" onClick={ this._sendMessage.bind(this) }>send</div>
                </div>
            </div>
        </div>
    );
  }
}

export default ChatBox;
