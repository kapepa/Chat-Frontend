import React, { useState, useRef } from 'react';
import { FormOutlined } from '@ant-design/icons';
import { ModalFindUser } from '../components/index';
import { finduserAPI } from '../utils/api/index';
import { EncodeJWT, DecodeJWT } from '../utils/jwt/index';
import io from '../utils/socket/index';

const FindUser = function(props){
	const { message, dialogs, dialogsActions, messageActions } = props;
	const [ state, setState ] = useState({visible: false, optionas: [], selectedItems: '', fetching: false, showText: false, btnDisable: true, message: '' })
	const areaRef = useRef(null)

	const showModal = () => {
    setState({
      ...state, visible: true,
    });
	};

	
  const handleOk = e => {
		const authorID = DecodeJWT(window.localStorage.getItem(document.location.origin)).tokenAuth;
		const partnerID = state.optionas.find( el => el.fullname === state.selectedItems )._id;
		const checkExist = dialogs.items.find( (el) => {
			const establistAuthor = el.author.toString() === authorID.toString() ? authorID : el.partner.toString() === authorID.toString() ? el.partner : false ;
			return establistAuthor.toString() === authorID.toString() && ( el.author.toString() === partnerID.toString() || el.partner.toString() === partnerID.toString()) ? el : false;
		})
		if( checkExist ) dialogsActions.serverDialog({...checkExist, lastMessage: areaRef.current.state.value, update_at: new Date().toISOString()})
		if( checkExist && checkExist.messageID === message.message._id ) {
			const userMessage = {...message.message.text.find(el => el.userID === authorID)};
			userMessage.data = new Date().toISOString();
			userMessage.text = areaRef.current.state.value;
			message.message.text.push(userMessage)
			messageActions.localMessage({...message.message, text: message.message.text})
		}
		
		const obj = {authorID, partnerID, message: areaRef.current.state.value};
		io.createDialogs(obj)
		setState({...state, visible: false})
  };

	const handleChange = e => {
		const name = e;
		setState({
      ...state, selectedItems: name, showText: true
		});
	}

	const onPressEnter = e => {
		const letter = e.target.textContent;
		if(letter.length) setState({...state, btnDisable: false, message: areaRef.current.state.value})
	}

	const handleString = async e => {
		e.preventDefault();
		setState({...state, fetching: true})
		const templateString = e.target.value;
		const encode = EncodeJWT({explore: templateString})
		const answer = await finduserAPI(encode);
		setState({...state, optionas: answer.listUser, fetching: true})
	} 

	const handleCancel = e => {
		setState({ ...state, visible: false })
	}

	return 	(
		<React.Fragment>
			<button onClick={showModal} className="chat__sidebar-header-btn"><FormOutlined /></button>
			<ModalFindUser 
				visible = { state.visible }
				optionas = { state.optionas }
				showModal = { showModal } 
				handleOk = { handleOk } 
				handleChange = { handleChange } 
				selectedItems = { state.selectedItems } 
				handleCancel = { handleCancel }
				handleString = { handleString }
				fetching = { state.fetching }
				showText = { state.showText }
				onPressEnter = { onPressEnter }
				btnDisable = { state.btnDisable}
				areaRef = { areaRef }
			/>
		</React.Fragment>
	)
}

export default FindUser