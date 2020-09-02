import { axios } from '../../core/index';

export default function(data){
	return axios.post("/users/recovery", data,{
		headers: {
			'Authorization': `Bearer ${ data }`
		}
	}).then((response) => {
		if(response.status !== 200){
			throw response.statusText;
		}
		return response.data
	})
}