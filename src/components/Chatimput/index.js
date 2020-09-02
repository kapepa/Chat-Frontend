import React, { useState, useRef } from 'react';
import { Input } from 'antd';
import { SmileOutlined, CameraOutlined } from '@ant-design/icons';
import Angle from '../../asset/img/angle_enter.svg';
import { Picker } from 'emoji-mart';
import { File } from '../index';
import { Record } from '../index';
import './style.scss';

function Chatinput(props){
	const { sendMessage, dialogsID, messageID, navigatorCheck, recordSound } = props
	const [pickerState, pickerSet] = useState(false);
	const [flag, establishState] = useState(false);
	const [emoji, emojiSet] = useState(null);
	const [load, setLoad] = useState(false)
	const [image, setImage] = useState([])
	const inputRef = useRef(null);

	const imageLoader = function(arr){ setImage(arr); establishState(true) }
	const actionEmoji = (emoji, event) => {
		const emojiData = emoji.native;
		const oldStr = inputRef.current.input.value;
		inputRef.current.input.value = oldStr + emojiData;

		emojiSet(`${oldStr} ${emojiData} `);
		establishState(true)
	}
	const PickerEl = <Picker set='google' include={["people"]} showPreview={false} onClick = {actionEmoji} />
	const appearPicker = (e) => { pickerState ? pickerSet(false) : pickerSet(true); }
	const arrow = (<img src = {Angle} alt="arrowSVG"/>);

	const buttonSend = function(e){
		e.preventDefault();
		sendMessage(emoji, dialogsID, messageID, image.length ? {image} : {image: []});
		emojiSet();
		setLoad(false);
	}

	const blur = function(e){
		e.preventDefault();
		if(!e.target.value.toString().trim().length){
			establishState(false)
		}
	}
	const swap = function(e){
		if(e.target.value.toString().trim().length){
			establishState(true)
		}else{
			establishState(false)
		}
		emojiSet(e.target.value)
	}

	const upload = () => { load ? setLoad(false) : setLoad(true) }

	return (
		<React.Fragment>
		<Input 
			onPressEnter={ buttonSend } 
			ref={inputRef} value={emoji} 
			onBlur={blur} onChange={swap} 
			size="large" 
			placeholder="Введите текст сообщения…"  
			prefix={<React.Fragment>{pickerState && PickerEl}<SmileOutlined onClick={appearPicker}/></React.Fragment>} 
			suffix={<React.Fragment><CameraOutlined onClick = {upload} /> {!flag ? <Record navigatorCheck = {navigatorCheck} recordSound = {recordSound} dialogsID = {dialogsID} messageID = {messageID}/> : <button  onClick = { buttonSend }>{arrow}</button> } </React.Fragment>} 
		/>
		{ load && <File imageLoader = {imageLoader} /> }
		</React.Fragment>
	)
}

export default Chatinput;