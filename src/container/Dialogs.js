/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { Dialogs as BaseDialogs } from '../components/index.js'

function Dialogs(props){
	const { items, userID, establishMessage } = props;
	const [ state, setState ] = useState(items);
	let condition = items === undefined ? [] : [...items];

	function search(e){
		const value = e.target.value.toLowerCase();
		const regexp = new RegExp(`^${value}`)
		const res = condition.filter( el => {
			return el.fullname.toLowerCase().match(regexp)
		});
		setState(res);
	}

	useEffect(() => {
		if(state !== items){
			setState(items)
		}
	},[props])

	return (
		<React.Fragment>
		<div className="chat__sidebar-search">
			<Input
				placeholder={"Поиск среди контактов"}
				prefix={<SearchOutlined />}
				onChange={search}
			/>
		</div>
		<div className="chat__sidebar-dialogs">{<BaseDialogs  items = {state} userID = {userID} establishMessage = {establishMessage} />}</div>			
		</React.Fragment>
	)
}

export default Dialogs;
