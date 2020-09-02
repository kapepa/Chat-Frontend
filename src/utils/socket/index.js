import io from '../../core/socket';

export default {
	sendMessage: function(obj){
		io.emit('sendMessage', obj);	
	},
	receiveAnswer: function(token, dialogsActions, messageActions){
		io.on(token.tokenAuth,(data) => {
			const { newDialogs, newMessage } = data;
			dialogsActions.serverDialog(newDialogs)
			messageActions.serverMessage(newMessage)
		})
	},
	connectionUser: function(dialogs, dialogsActions, auth, messageActions){
		io.emit('enstablishUser',dialogs)
		io.on('enstablishUser', function(data){
			dialogsActions.onlineDialog(data.isOnline,auth.tokenAuth)
		})
		io.on('closeOnline', function(data){
			dialogsActions.disconnectDialog(data.isOnline,auth.tokenAuth)
		})
		io.on('updateDialogs', function(data){
			dialogsActions.updateDialog(data)
			messageActions.setPartner({	name: data.fullname, isOnline: data.isOnline, _id: data.messageID })
			messageActions.setMessage(data.messageID)
		})
	},
	createDialogs: function(obj){
		io.emit('createDialogs', obj)
	},
	removeMessage: function(obj){
		io.emit('removeMessage', obj);
	},
	clearMessage: function( id, messageActions, dialogsActions, openMesssage, dialogs ){
		io.on(`clear-${id}`, function({message, lastMessage, messageID}){
			const indexDialog = dialogs.items.findIndex( el => el.messageID === messageID );
			dialogs.items[indexDialog].lastMessage = lastMessage;
			dialogsActions.serverDialog(dialogs.items[indexDialog])
			if(openMesssage === message._id) messageActions.localMessage(message)
		})
	},
	listenerCheck: function(id, messageActions, dialogsActions){
		io.on(`read-${id}`,function(data){
			const callback = function(){io.emit("confirmedReadedmessage",{messageID: data.messageID, userID: data.userID})};
			dialogsActions.checkLocalDialog(data)
			messageActions.localCheckRead({...data, callback, flag: true})
		})
		io.on(`confirmed-${id}`,function(data){
			const callback = function(){};
			dialogsActions.checkLocalDialog(data);
			messageActions.localCheckRead({...data, callback, flag: false})
		})
	},
	beginCheck: function(obj){
		io.emit("beginCheck", obj)
	}
}
