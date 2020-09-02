import React, { useEffect, useRef } from 'react';
import { Empty, Spin } from 'antd';
import { Message } from '../components/index';
import { connect } from "react-redux";
import classNames from 'classnames';

function Messages(props){
	const { isloades, message, ownID, ownAvatar, partnerAvatar, removeMessage, newMessage } = props;
	const scrollEl = useRef(null);
	useEffect(() => {
		const getHeight = scrollEl.current.scrollHeight;
		scrollEl.current.scrollTo(0,getHeight)
	})
	
	const letters = message.map((el, index) => {
		el.userID === ownID ? el.avatar = ownAvatar : el.avatar = partnerAvatar;
		return <Message key={`${el.date}-${index}-${el._id}`} {...el} isMeToken={ownID} removeMessage = {removeMessage} messageID = {newMessage.message._id}/>
	});
	const spinEl = <div className = { classNames({"chat__dialog-loaded": isloades}) }><Spin tip="Идет загрузка..." size="large"/></div>;
	
	return (
		<div ref={ scrollEl } className="chat__dialog-message">
			{ letters ? letters : isloades ? spinEl : letters.length ? letters : <Empty description=" Откройте диалог"/> }
		</div>
	)
}

export default connect(
	({ message, auth }) => { return { isloades: message.isloades, auth: auth.authToken, newMessage: message } }
)(Messages);
