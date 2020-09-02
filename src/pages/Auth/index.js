import React, { Component } from 'react';
import { LoginForm, RegisterForm, Forget, Recovery, Verefy } from '../../modules';
import { Route } from "react-router-dom";
import './style.scss';

class Auth extends Component{
	render(){
		return(
			<section className="auth">
				<Route exact path="/" component={ LoginForm } />
				<Route exact path="/register" component={ RegisterForm } />
				<Route exact path="/forget" component={ Forget } />
				<Route exact path="/recovery/:token" component={ Recovery } />
				<Route exact path="/verify" component={ Verefy } />
			</section>			
		)
	}
}

export default Auth;
