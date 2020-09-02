import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import './style.scss';
import { Menu, Dropdown } from 'antd';
import { fileAPI, userAPI } from '../../utils/api/index';

function SetMenu(props){
	const { decodeID, authActions } = props
	const proper = {
		customRequest: async function(props){
			const { file, onSuccess, onError } = props;
			const result = await fileAPI.avatar(file, onSuccess, onError);
			const url = result.url;
			const answer = await userAPI.updateAvatar(url, decodeID.tokenAuth)
			if(!answer.updateAvatar) return null;
			authActions.setAvatar(url);
		},
		onChange(info) {
			if (info.file.status === 'done') {
				message.success(`${info.file.name} Файл успешно загружен.`);
			} else if (info.file.status === 'error') {
				message.error(`${info.file.name} файл не удалось загрузить.`);
			}
		},
	};
	const menu = (
		<Menu>
			<Menu.Item key="0">
				<Upload {...proper}>Загрузить аватарку</Upload>
			</Menu.Item>
		</Menu>
	);
	return (
	<Dropdown overlay={menu}>
		<EllipsisOutlined/>
	</Dropdown>
	)
}

export default SetMenu 