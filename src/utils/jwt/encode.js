import { JWT_TOKEN_SICRET_WORD } from '../../variables';
import jwt from 'jsonwebtoken';

export default function(obj){
	return jwt.sign({...obj}, JWT_TOKEN_SICRET_WORD);
}