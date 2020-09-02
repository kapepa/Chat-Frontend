import { withFormik } from 'formik';
import RegisterForm from '../components';
import { axios } from '../../../core/index';
import { EncodeJWT } from '../../../utils/jwt/index';

export default withFormik({
	mapPropsToValues: () => ({ name: '', email: '', password: '', confirmed: ''}),
 
	validate: values => {
		const errors = {};

		if (!/^([A-Za-z éàë]{2,40})$/i.test(values.name)) {
			errors.name = 'Required';
		}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
			errors.email = 'Required';
		}else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)){
			errors.password = 'Required';
		}else if(values.password !== values.confirmed){
			errors.confirmed = 'Required';
		}
		return errors;
	},

	handleSubmit: async (values, { setSubmitting }) => {
		const jwtBody = EncodeJWT({fullname: values.name, password: values.password, email: values.email});
		const answer = await axios.post('/users/registration', jwtBody, {headers: {
			'Authorization': `Bearer ${jwtBody}`
		}});
		if(answer) setSubmitting({sucess: answer.data})
	},
})(RegisterForm);

