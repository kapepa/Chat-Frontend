import React, { useEffect } from 'react';
import { Form, Input } from 'antd';
import { Button, Block } from '../../../components/index';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';

const RegisterForm = function(props) {
	const {
		values,
		touched,
		errors,
		history,
		handleChange,
		handleBlur,
		handleSubmit,
		isSubmitting,
	} = props;

	useEffect(() => {
		function changeScreen(){
			setTimeout(() => {
				history.push(`/`)
			},3000)
		}
		if(isSubmitting.sucess === true){
			history.push(`/verify`,{verify: "sucess"});
			changeScreen()
		}else if(isSubmitting.sucess === false){
			history.push(`/verify`,{verify: "destroy"});
			changeScreen()
		}

	},[isSubmitting, history])

	return (
		<div className="auth__content">
		<div className="auth__top">
			<h2>Регистрация</h2>
			<p>Для входа в чат, вам нужно зарегистрироваться</p>
		</div>	
		<Block className="" >	
 			<Form
					name="normal_login"
					className="refister-form"
	 				onFinish = {handleSubmit}
 			>
	 				<Form.Item
	 					hasFeedback
	 					validateStatus={ values.email ? "success" : "error" }
	 					name="email"
	 					rules={[{ required: true, message: 'введите ваш E-Mail' }]}
	 					help={touched.email ? errors.email : " " }
	 				>
	 					<Input 
	 						onChange={handleChange}
	 						onBlur={handleBlur}
	 						value={values.email}
	 						name="email"
	 						size="large" 
	 						prefix={<MailOutlined className="site-form-item-icon" />}
	 						type="email"
	 						placeholder="E-Mail"
	 					/>
	 				</Form.Item>

					<Form.Item
						hasFeedback
						validateStatus={ values.name ? "success" : "error" }
						name="name"
						rules={[{ required: true, message: 'Введите ваше имя!' }]}
						help={touched.name ? errors.name : " "}
					>
						<Input  
							onChange={handleChange}
							onBlur={handleBlur}
							name="name"
							size="large" 
							prefix={<UserOutlined className="site-form-item-icon" />} 
							type="text"
							placeholder="Ваше имя" 
							value=""
						/>
					</Form.Item>
					<Form.Item
						hasFeedback
						validateStatus={ values.password ? "success" : "error" }
						name="password"
						rules={[{ required: true, message: 'Введите ваш пароль!' }]}
						help={touched.password ? errors.password : " "}
					>
						<Input
							onChange={handleChange}
							onBlur={handleBlur}
							name="password"
							size="large"
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Пароль"
							value=""
						/>
					</Form.Item>
					<Form.Item
						hasFeedback
						validateStatus={ values.password === values.confirmed ? "success" : "error"}
						name="confirmed"
						dependencies={['password']}
						rules={[
							{ required: true, message: 'Введите подтверждение пароля!' }
						]}
						help={touched.confirmed ? errors.confirmed : " "}
					>
						<Input
							onChange={handleChange}
							onBlur={handleBlur}
							name="confirmed"
							size="large"
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Повторить пароль"
						/>
					</Form.Item>

				<Form.Item>
					<Button htmlType="submit" type="primary" size="large">Регистрация</Button>
				</Form.Item>
			</Form>
		</Block>
		</div>
	 );
}

export default RegisterForm;