const action = {
	actionAuth: function(sendToken){
		return {
			type: "AUTH_TOKEN_USERS",
			payload: sendToken,
		}
	},
	actionAuthLoad: function(sendToken){
		return {
			type: "AUTH_TOKEN_LOAD",
			payload: sendToken,
		}
	},
	actionAvatar: function(avatar){
		return {
			type: "AUTH_ESTABLISH_AVATAR",
			payload: avatar,
		}
	},
	establishAuth: function(dispatch){
		return {
			actionSetAuth : (sendToken) => {
				dispatch(action.actionAuth(sendToken))
			},
			loadPage: (sendToken) => {
				dispatch(action.actionAuthLoad(sendToken))
			},
			setAvatar: (avatar) => {
				dispatch(action.actionAvatar(avatar))
			}
		}
	}
}

export default action;