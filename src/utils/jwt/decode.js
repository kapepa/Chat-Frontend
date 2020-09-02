import { JWT_TOKEN_SICRET_WORD } from '../../variables';
import jwt from 'jsonwebtoken';

export default function(obj){
	return jwt.verify(obj, JWT_TOKEN_SICRET_WORD, function(err, decoded) {
		return decoded
	});
}