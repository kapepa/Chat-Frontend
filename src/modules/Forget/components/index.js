import React, { useState, useEffect } from 'react';
import { Button, Block } from '../../../components/index';
import { UserOutlined } from '@ant-design/icons';
import { Link } from "react-router-dom";
import { Form, Input } from 'antd';

export default (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
		handleSubmit,
		isSubmitting
	} = props;
	const [state, setState] = useState(false)
	
	useEffect( function (){
		setState(isSubmitting)
	},[isSubmitting])

  return (
		<div className="auth__content">
			<div className="auth__top">
				<h2>Восстановить пароль</h2>
			</div>
				<Block>
					{ !state ? 					
					<Form
						name="normal_login"
						className="login-form"
						initialValues={{ remember: true }}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="email"
							rules={[{ required: true, message: 'Введите свой Email' }]}
							hasFeedback
							validateStatus={errors.email === undefined ? "success" : "error" }
						>
							<Input 
								type="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.name}
								name="email"
								placeholder="Введите свой Email"
								prefix={<UserOutlined className="site-form-item-icon" />}
							/>
						</Form.Item>
						{errors.name && touched.name && <div id="feedback">{errors.name}</div>}
						<Form.Item>
							<Button type="primary" htmlType="submit" className="login-form-button">
								Отправить
							</Button>
						</Form.Item>
						<div className='auth__link-case'>
							<Link className='auth__link-regist' to='/'>Логин</Link>
						</div>
					</Form>
					: 
					<div>На ваш Email адрес было отправлено письмо с инструкциями!</div>
					}

				</Block>
			</div>
  );
};