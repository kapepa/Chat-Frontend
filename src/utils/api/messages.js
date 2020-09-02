import { axios } from '../../core/index';
import { EncodeJWT } from '../jwt/index';

export default function(id){
	const encode = EncodeJWT({id})
	return axios.post('/message',encode,{headers: {
		'Authorization': `Bearer ${ encode }`
	}}).then((response) => {
		
		if(response.status !== 200){
			response.text().then((text) => {
				return new Error(text)
			})
		}
		return response.data
	})
}

