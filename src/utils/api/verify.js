import { axios } from '../../core/index';

export default (url) => {
	return axios.post(`/users/verify${url}`);
}