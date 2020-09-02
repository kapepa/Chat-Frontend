import React from 'react';
import { DialogItem } from  '../index';
import { Empty } from 'antd';
import './style.scss';
// import Socket from '../../utils/socket/index';

function Dialogs({ items, userID, establishMessage}){
	const dialogsList = items.map((item,i) => {
		return (
			<DialogItem
				messageID = {item.messageID}
				key = {`${item._id}-${i}-${item.updatedAt}`}
				_id = {item._id}
				avatar= {item.avatar}
				user = {item.fullname}
				isOnline = {item.isOnline}
				unreaded = {parseInt(item.unreaded).toFixed(0)}
				isMe = {item._id === userID}
				text = {item.lastMessage}
				create_at = {item.update_at}
				establishMessage = {establishMessage}
				userID = {userID}
				isReaded = {item.isReaded}
			/>
		)
	});
	return (
		<div className="dialogs">
			{ items.length ? dialogsList : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Ничего не найдено" /> }
		</div>
	)
}

export default Dialogs;