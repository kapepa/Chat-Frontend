import React from 'react';
import classNames from 'classnames';
import './style.scss';
import { Time, IconReaded, GradientAvatar } from '../index';

function dialogItems(props){
	const {_id, user, avatar, isOnline, unreaded, isMe, establishMessage, text, messageID, create_at, userID, isReaded } = props;

	const receiveAvatar = (avatar, altname) => {
		if(avatar){
			return <img src={avatar} alt={altname +" avatar"} />;
		}else{
			return <GradientAvatar name={altname} />
		}
	}
	const isActive = false;

	return (
		<div className={classNames("dialogs__items", {"dialogs__items-online": isOnline, "active": isActive})} onClick = { () => establishMessage(messageID, userID, {user, isOnline, _id, avatar}) }>
			<div className="dialogs__items-avatar">
				{receiveAvatar(avatar , user)}
			</div>
			<div className="dialogs__items-info">
				<div className="dialogs__items-info-top">
					<b>{user}</b>
					<span>{<Time date={Date.parse(create_at)} />}</span>
				</div>
				<div className="dialogs__items-info-bottom">
					<p>{text}</p>
				{ !parseInt(unreaded) > 0 || isMe ? <IconReaded condition={isReaded} name={user} /> : <div className="dialogs__items-info-bottom-counter">{unreaded > 9 ? "+9" : unreaded}</div>}
				</div>
			</div>
		</div>
	)
}

export default dialogItems