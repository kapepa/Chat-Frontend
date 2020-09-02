import { dialogsAPI } from '../../utils/api/index';

const action = {
	setDialogs: function(items){
		return {
			type: 'DIALOGS:SET_ITEMS',
			payload: items,
		}
	},
	updateServer: function(items){
		return {
			type: 'DIALOGS:SET_SERVERS',
			payload: items,
		}
	},
	setDialogOnline: function(data){
		return {
			type: 'DIALOGS:SET_ONLINE',
			payload: data,
		}
	},
	setDialogDisconnect: function(data){
		return {
			type: 'DIALOGS:SET_DISCONNECT',
			payload: data,
		}
	},
	upgreadeDialog: function(obj){
		return {
			type: 'DIALOGS:UPDATE_SERVER',
			payload: obj,
		}
	},
	checkUpdateDialog: function(arr){
		return {
			type: 'DIALOGS:CHECK_LOCAL_UPADATE',
			payload: arr,
		}
	},
	allDispatch: (dispatch) => {
		return {
			setDialogs: async (token,callback) => {
				const list = await dialogsAPI.getAll(token);
				callback(list.dialog)
				dispatch(action.setDialogs(list.dialog));
			},
			establishDialog: (newDialog) => {
				dispatch(action.setDialogs(newDialog))
			},
			serverDialog: (items) => {
				dispatch(action.updateServer(items))
			},
			onlineDialog: (data,owner) => {
				dispatch(action.setDialogOnline({data, owner}))
			},
			disconnectDialog: (data,owner) => {
				dispatch(action.setDialogDisconnect({data, owner}))
			},
			updateDialog: function(obj){
				dispatch(action.upgreadeDialog(obj))
			},
			checkLocalDialog: function(obj){
				dispatch(action.checkUpdateDialog(obj))
			}
		}
	},
}

export default action;