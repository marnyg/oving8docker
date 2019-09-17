import ReactDOM from 'react-dom';
import * as CryptoJS from 'crypto-js';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import axios from 'axios';
axios.interceptors.response.use(response => response.data);


class Password extends Component {

    pass=''

    render(){
        return (
            <div>
                <h1>Hasdelliiiio, world!</h1>
                <input ref="pass"></input>
                <button onClick={this.handleStuff}>yo</button>
            </div>
        )
    }
    
    handleStuff(event){
        let inp=this.refs.pass
        this.pass=inp.value
        console.log(this.pass)
        let encrypt=this.encrypt(this.pass)
        this.sendToBackend(encrypt)
    }

    encrypt(purePass){
        console.log("encrypting ", purePass)
 		let salt = "ola sitt salt";
		let key128Bits = CryptoJS.PBKDF2(purePass, salt, { keySize: 128/32 });
        return key128Bits 
    }
    sendToBackend(encryptedPass){
        console.log("sending ", String(encryptedPass))
		let enc=String(encryptedPass)
		axios.put('/pass', {enc}).then(e=>console.log(e)).catch(e=>console.log(e))
    }
}
ReactDOM.render( <Password/>, document.getElementById('root'));
