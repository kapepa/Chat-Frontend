import { axios } from '../../core/index';

export default {
	getAll: async (data) => {
		return axios.post('/dialogs/findDialog',data,{
			headers: {
				'Authorization': `Bearer ${ data }`
			}
		}).then(function(response){
			if(response.status !== 200){
				throw response.statusText;
			}
			return response.data
		}).catch(function(e){
			new Error(e);
		});
	},
}

