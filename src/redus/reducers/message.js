const initialState = {
	message: {text: []},
	isloades: false,
	dialogStatus: {
		name: false,
		isOnline: false,
		_id: false,
		avatar: false
	},
	refresh: false,
}

export default (state = initialState, action) => {
	switch(action.type){
		case 'DIALOGS:SET_CURRENT_DIALOG':
			
			return {...state, message: action.payload }
		case 'DIALOGS:SET_ISLOADED_DIALOG':
			return {...state, isloades: action.payload }
		case 'DIALOGS:SET_STATUS':
			return {...state, dialogStatus: action.payload};
		case 'DIALOGS:SET_MESSAGE_SERVER':
			const newState = {...state};
			const messageStateID = newState.message._id;
			if(messageStateID === action.payload.id){
				newState.message.text.push(action.payload.message);
				newState.refresh = true;
				return {...newState};
			}
			return {...state}
		case 'DIALOGS:SET_LOCAL_CHECK':
			const newlocalCheckState = {...state};
			const { messageID, userID, callback, flag } = action.payload;
			if(newlocalCheckState.message._id === messageID){
				newlocalCheckState.message.text.map( el => el.userID.toString() === userID && flag ? el.isReaded : el.isReaded = true )
				callback();
			}
			return newlocalCheckState
		default:
			return state;
	}
}