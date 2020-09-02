import React, { useState, useEffect, useRef } from 'react';
import { AudioOutlined } from '@ant-design/icons';
import './style.scss';

export default function(props){
	const { navigatorCheck, recordSound, dialogsID, messageID } = props
	const [ media, setMedia ] = useState(true)
	let record = useRef(null);
	let stop = useRef(null);
	const changeMedia = () => media ? setMedia(false) : setMedia(true)

	useEffect(() => {
		if(media && navigatorCheck) recordSound(record.current, stop.current, dialogsID, messageID )
	})
	
	return(
		<React.Fragment>
			<AudioOutlined style={{display: media ? "block" : "none"}} ref = {record} onClick = {changeMedia} /> <div style={{display: media ? "none" : "block"}} ref = {stop} onClick = {changeMedia} className = "chat__dialog-dote" ></div>
		</React.Fragment>
	)
}