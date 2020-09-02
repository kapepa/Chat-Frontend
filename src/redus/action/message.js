import { MessagesAPI  } from '../../utils/api/index';


const message = {
	setMessage: (mess) => {
		return {
			type: 'DIALOGS:SET_CURRENT_DIALOG',
			payload: mess
		}
	},
	updateServer: (obj) => {
		return {
			type: 'DIALOGS:SET_MESSAGE_SERVER' ,
			payload: obj,
		}
	},
	setloaded: (bool) => {
		return {
			type: 'DIALOGS:SET_ISLOADED_DIALOG',
			payload: bool
		}
	},
	setStatusAction: function(items){
		return {
			type: 'DIALOGS:SET_STATUS',
			payload: items,
		}
	},
	setLocalCheck: function(obj){
		return {
			type: 'DIALOGS:SET_LOCAL_CHECK',
			payload: obj,
		}
	},
	allDispatch: (dispatch) => {
		return {
			setMessage: async (id) => {
				dispatch(message.setloaded(true))
				const messList = await MessagesAPI(id);
				dispatch(message.setMessage(messList.message || []));
				dispatch(message.setloaded(false))
			},
			setPartner: (obj) => {
				dispatch(message.setStatusAction(obj));
			},
			localMessage: (obj) => {
				dispatch(message.setMessage(obj))
			},
			serverMessage: (obj) => {
				dispatch(message.updateServer(obj))
			},
			localCheckRead: (obj) => {
				dispatch(message.setLocalCheck(obj))
			},
		};
	},
}

export default message;