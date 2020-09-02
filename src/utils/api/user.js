import { axios } from '../../core/index'

export default {
	login: (postData) => {
		return axios.get('/dialog/findDialog',postData)
	},
	updateAvatar: ( url, userID ) => {
		return axios({
			method: "post",
			url: '/users/avatarUpdata',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: `url=${url}&userID=${userID}`
		}).then((response) => {
			if(response.status !== 200) throw response;
			return response.data;
		}).catch( e => new Error(e.name))
	}
}