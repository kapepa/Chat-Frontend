import { store } from "emoji-mart";
import { DecodeJWT, EncodeJWT } from '../../utils/jwt/index';

const initialState = {
	authToken: null,
}

function auth(state = initialState, action){
	switch(action.type){
		case "AUTH_TOKEN_USERS":
			localStorage.setItem(document.location.origin, action.payload)
			return {...state, authToken: action.payload};
		case "AUTH_TOKEN_LOAD":
			return {...store, authToken: action.payload};
		case "AUTH_ESTABLISH_AVATAR":
			const decode = DecodeJWT(state.authToken);
			const obj = {...decode, avatar: action.payload};
			const encode = EncodeJWT(obj)
			localStorage.setItem(document.location.origin, encode)
			return {...state, authToken: encode };
		default:
			return state
	}
}

export default auth