import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { Button, Block } from '../../../components/index';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import condition from '../../../utils/helper/validateField';
import { authActions, dialogsActions } from '../../../redus/action/index';
import { connect } from 'react-redux';
import { DecodeJWT } from '../../../utils/jwt/index'

function LoginForm(props){
  const {
    values,
    touched,
    errors,
    handleChange,
		handleBlur,
		history,
		isSubmitting,
		handleSubmit,
		establishAuth,
		allDispatch,
	} = props;
	const [ stateTouch, setStateTouch ] = useState(true);
	useEffect(() => {
		if( isSubmitting.token  ){
			const decode = DecodeJWT(isSubmitting.token);
			if(decode.cofirmed){
				establishAuth.actionSetAuth(isSubmitting.token)
				history.push('/im');
			}else{
				history.push(`/verify`,{verify: "confirmed"});
			}
		}
	},[isSubmitting, establishAuth, allDispatch, history])

	return (
		<div className="auth__content">
			<div className="auth__top">
				<h2>Войти в аккаунт</h2>
				<p>Пожалуйста, войдите в свой аккаунт</p>
			</div>	
			<Block className="" >	
				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
					onChange = {() => {setStateTouch(true)} }
					onFinish = {handleSubmit}
				>
					<Form.Item
						hasFeedback
						validateStatus={ stateTouch ? condition(touched, errors, "email") : "error"}
						name="email"
						rules={[{ required: true, message: 'Please input your email proper!' }]}
					>
						<Input 
							size="large" 
							prefix={<UserOutlined className="site-form-item-icon" />} 
							type="email"
							placeholder="email" 
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
							name="email"
						/>
					</Form.Item>
					<Form.Item
						hasFeedback
						validateStatus={ stateTouch ? condition(touched, errors, "password") : "error"}
						name="password"
						rules={[{ required: true, message: 'Please input your Password proper!' }]}
					>
						<Input
							size="large"
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
							name="password"
						/>
					</Form.Item>

					<Form.Item>
						<Button htmlType="submit" type="primary" size="large">ВОЙТИ В АККАУНТ</Button>
					</Form.Item>
					<div className='auth__link-case'>
						<Link className='auth__link-regist' to='/register'>Зарегистрироваться</Link>
						<Link className='auth__link-regist' to='/forget'>Забыли пароль</Link>
					</div>
				</Form>
			</Block>
		</div>
	)
}

export default connect(({auth}) => { return {auth} }, (dispatch) => { return { establishAuth: authActions.establishAuth(dispatch), allDispatch: dialogsActions.allDispatch(dispatch) } })(LoginForm)