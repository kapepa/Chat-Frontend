import { axios } from '../../core/index';

export default {
	photo: function(file, onSuccess, onError){
		let formData = new FormData();
		formData.append('photos', file);
		return axios({  
			method: 'post',
			url: '/files/image',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: formData
		}).then( function(response){
			if(response.status !== 200) throw response;
			onSuccess()
			return response.data;
		}).catch(error => onError("Error uploading image"))  
	},
	removePhoto: function(data){
		return axios({
			method: "post",
			url: '/files/delphot',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: `photo=${data}`,
		}).then(function(response){
			if(response.status !== 200) throw response;
			return response.data;
		}).catch( error => new Error(error))
	},
	avatar: function(data, onSuccess, onError){
		let formData = new FormData();
		formData.append("avatar", data);
		return axios({
			method: "post",
			url: '/files/avatar',
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: formData
		}).then(function(response){
			if(response.status !== 200) throw response;
			onSuccess()
			return response.data;
		}).catch(error => onError("Error uploading image"))
	},
	blobs: function(blobs){
		const formData = new FormData();
		formData.append("blobs", blobs)
		return axios({
			method: "post",
			url: "/files/blobs",
			headers: {
				'Content-Type': 'multipart/form-data',
			},
			data: formData
		}).then(function(response){
			if(response.status !== 200) throw response;
			return response.data;
		}).catch( err => new Error(err))
	},
}