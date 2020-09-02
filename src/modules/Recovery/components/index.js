import React, { useState, useEffect } from 'react';
import { Form, Input } from 'antd';
import { Button, Block } from '../../../components/index';
import { LockOutlined } from '@ant-design/icons';

export default props => {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
		handleSubmit,
		isSubmitting,
		history,
	} = props;
	const [state, setState] = useState(false);
	values.token = props.match.params.token;
	useEffect(() => {
		if(isSubmitting.submit){
			setState(true)
			setTimeout(() => {
				history.push('/')
			}, 3000);
		}
	},[isSubmitting, history])
  return (
		<div className="auth__content">
			<div className="auth__top">
				<h2>Восстановление пароля</h2>
			</div>	
			<Block className="" >
				{ !state 
				? 
					<Form
						name="basic"
						initialValues={{ remember: true }}
						onFinish={handleSubmit}
					>
						<Form.Item
							name="password"
							rules={[{ required: true, message: 'Пожалуйста введите свой пароль!' }]}
							validateStatus={errors.password === undefined ? "success" : "error"}
							hasFeedback
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder={'Пожалуйста введите свой пароль!'}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.password}
								type="password"
								name="password"
								id="password"
							/>
						</Form.Item>

						<Form.Item
							name="confirmed"
							rules={[{ required: true, message: 'Введите подтверждение пароля!' }]}
							validateStatus={errors.confirmed === undefined ? "success" : "error"}
							hasFeedback
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								placeholder={'Введите подтверждение пароля!'}
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.confirmed}
								type="password"
								name="confirmed"
								id="confirmed"
							/>
						</Form.Item>

						<Form.Item >
							<Button type="primary" htmlType="submit">
								Сменить пароль
							</Button>
						</Form.Item>
					</Form>
				:
					<div>Пароль успешно изменен</div>
				}
			</Block>
		</div>
  );
};