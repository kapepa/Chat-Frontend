import React from 'react';
import { Result } from 'antd';
import { verifyAPI } from '../../../utils/api/index';

export default function(props){
	let hash = props.location.search;
	let condition = props.location.state;
	let content = undefined;

	console.log(condition)

	if(hash){
		props.history.push(`/`)
		verifyAPI(hash)
		content = <Result
			status="success"
		/>
	}else{
		switch(condition.verify){
			case "destroy":
				content = <Result
				status="error"
				title="Попытка регистрации неудачна!"
				subTitle="Попробуйте еще раз зарегистрироваться!"
			/>
			break;
			case "confirmed":
				content = <Result
				status="warning"
				title="Аккаунт необходимо активировать!"
				subTitle="Зайдите на свою почту и активируйте аккаунт!"
			/>
			break;
			case "sucess":
				content = <Result
				status="success"
				title="Вы успешно зарегистрировались !"
				subTitle="Зайдите на своей Email чтобы подтвердить регистрацию"
			/>
			break;
			default:
				content = <Result
					title="Что то пошло не так!"
				/>
			break;
		}
	}


	return(
		content
	)
}