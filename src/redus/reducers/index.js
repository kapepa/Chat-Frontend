import { combineReducers } from 'redux';
import dialogs from './dialogs';
import message from './message';
import auth from './auth';

export default combineReducers({
	dialogs,
	message,
	auth,
})
