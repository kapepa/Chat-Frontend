import React, { useState, useEffect } from 'react';
import { UsergroupDeleteOutlined } from '@ant-design/icons';
import { Status, Chatimput, SetMenu } from '../../components';
import { Dialogs, Messages, FindUser } from '../../container/index';
import { connect } from 'react-redux';
import './style.scss';
import { DecodeJWT } from '../../utils/jwt/index';
import { messageActions, dialogsActions, authActions } from '../../redus/action/index';
import Socket from '../../utils/socket/index';
import { fileAPI } from '../../utils/api/index';

function Home(props){
	const { isOnline, message, dialogs, auth, history, messageActions, dialogsActions, authActions } = props;
	const decodeID = DecodeJWT(auth);
	if(auth === null || auth === "null"){
		history.push("/")
	}
	const [ state, setState ] = useState({message: message.message.text, id: message.message._id, input: false});
	const [ letter, setLeter ] = useState({text: ""})
	const [ status, setStatus ] = useState(message.dialogStatus);

	if(message.message._id) Socket.clearMessage(message.message._id, messageActions, dialogsActions, message.message._id, dialogs);

	if(!dialogs.establish && auth !== null){
		const callback = (list) => { list.forEach( el => { Socket.listenerCheck(el.messageID, messageActions, dialogsActions) } )}
		dialogsActions.setDialogs(auth,callback);
		Socket.connectionUser( {user: decodeID.tokenAuth}, dialogsActions, decodeID, messageActions );
		Socket.receiveAnswer(decodeID, dialogsActions, messageActions);
	}

	const navigatorCheck = () => !!(navigator.getUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.webkitGetUserMedia) ;

	const recordSound = (record, stop, dialogsID, messageID) => {

		if (navigatorCheck()) {	
			navigator.mediaDevices.getUserMedia ({audio: true})
				.then(function(stream) {
					let mediaRecorder = new MediaRecorder(stream);

					record.onclick = function() {mediaRecorder.start()}
					stop.onclick = function() {mediaRecorder.stop()}

					mediaRecorder.ondataavailable = async function(e) {
						const blob = new Blob(new Array(e.data), { 'type' : 'audio/ogg; codecs=opus' })
						const file = new File([blob],`${Date.now()}.ogg`);
						const res =  await fileAPI.blobs(file);
						sendMessage(null, dialogsID, messageID, {isAudio: res})
					}
				})
				.catch(function(err) {
					console.log('The following error occured: ' + err);
				}
		 );
		} else {
				console.log('getUserMedia not supported on your browser!');
		}
	}

	const removeMessage = function(messageID, userID, date){
		if(!messageID) return null;
		Socket.removeMessage({messageID, userID, date})
	}

	const sendMessage = async function(content, dialogID, messageID, obj){
		if(!message.message._id && content === undefined) return null;
		const currentTime = new Date().toISOString()
		const createMessage = { avatar: "", isReaded: false, attachments: obj.image === undefined ? [] : obj.image, isTyping: false, isAudio: obj.isAudio === undefined ? {url: "", public_id: ""} : obj.isAudio, date: currentTime, name: decodeID.name, text: content, userID: decodeID.tokenAuth};
		const arrMessage = [].concat(state.message);
		const newDialogs = [...dialogs.items];
		const dialogIndex = dialogs.items.findIndex((el) => { return el.messageID === state.id});
		arrMessage.push(createMessage);
		newDialogs[dialogIndex].lastMessage = content;
		newDialogs[dialogIndex].update_at = new Date().toISOString()
		messageActions.localMessage({...message.message, text: arrMessage});
		dialogsActions.establishDialog(newDialogs)
		Socket.sendMessage({dialogID: dialogID, authorID: decodeID.tokenAuth, text: content, attachments: obj.image ? obj.image : [], isAudio: obj.isAudio === undefined ? {url: "", public_id: ""} : obj.isAudio, date: currentTime})
		Socket.beginCheck({messageID, userID: decodeID.tokenAuth});
	}

	const establishMessage = function(messageID, userID, obj){
		messageActions.setMessage(messageID);
		messageActions.setPartner(obj);
		Socket.beginCheck({messageID, userID});
	}
	
	useEffect(() => {
		if(message.message.text.length !== state.message.length && message.message._id === state.id )setState({...state, message: message.message.text});
		if(message.message._id !== state.id ) setState({message: message.message.text, id: message.message._id, input: true});
		if(dialogs && dialogs.items.length){
			const checkOnline = dialogs.items.find( el => el._id === message.dialogStatus._id );
			if(checkOnline && status.isOnline !== checkOnline.isOnline){
				setStatus({...message.dialogStatus, isOnline: checkOnline.isOnline})
				setLeter({text: ""})
			}
		}
		
	},[ message.message.text, message.message._id, state, status, dialogs, message ])

	return(
		<section className="home">
			<div className="chat">
				<div className="chat__sidebar">

					<div className="chat__sidebar-header">

						<div>
							<UsergroupDeleteOutlined />
							<span>Список диалогов</span>
						</div>
						
						<FindUser message = { message } dialogs = { dialogs } dialogsActions = { dialogsActions } messageActions = { messageActions } />

					</div>
					
					<Dialogs items = { dialogs.items } userID = {decodeID.tokenAuth} establishMessage = {establishMessage} message = {message} dialogs = {dialogs}  messageActions = {messageActions} dialogsActions = {dialogsActions} />

				</div>
				<div className="chat__dialog">

					<div className="chat__dialog-header">
						<div className="chat__dialog-header-center">
							<div className="chat__dialog-header-username">{message.dialogStatus.user}</div>
							<div className="chat__dialog-header-status">
								{ !message.dialogStatus.user ?? ! isOnline ? <div>Выберите пользователя</div> : <Status status={status.isOnline} /> }
							</div>
						</div>
						<div className="chat__dialog-header-rigth">
							<SetMenu decodeID = {decodeID} authActions = {authActions}/>
						</div>
					</div>
						<Messages message = { state.message } latestMessage = {letter} removeMessage = {removeMessage} ownID = {decodeID.tokenAuth} ownAvatar = {decodeID.avatar} partnerID = {message.dialogStatus._id} partnerAvatar = {message.dialogStatus.avatar} />
						<div className="chat__dialog-input-wrap">
							{	state.input && <div className="chat__dialog-input"> <Chatimput dialogsID = {message.dialogStatus._id} messageID = {state.id} message = {message.message} sendMessage = {sendMessage} navigatorCheck = {navigatorCheck} recordSound = {recordSound}/></div>}
						</div>
				</div>

			</div>
		</section>
	)
}

export default connect( (status) => { return { message: status.message, auth: status.auth.authToken, dialogs: status.dialogs }  }, (dispatch) => { 
	return {
		messageActions: messageActions.allDispatch(dispatch), dialogsActions: dialogsActions.allDispatch(dispatch), authActions: authActions.establishAuth(dispatch),
 	};
})( Home );
