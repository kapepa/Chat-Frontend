import LoginForm from '../components/index';
import { withFormik } from 'formik';
import { axios } from '../../../core/index';
import { EncodeJWT } from "../../../utils/jwt/index";

export default withFormik({
	mapPropsToValues: () => ({ email: '', password: '' }),

	// Custom sync validation
	validate: values => {
		const errors = {};

		if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Required';
		}else if(!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)){
			errors.password = 'Required';
		}
		return errors;
	},

	handleSubmit: async (values, { setSubmitting }) => {
		const { email, password } = values;
		const jwtBody = EncodeJWT({email, password});
		const turn = await axios.post('/users/auth', jwtBody, {
			headers: {
				'Authorization': `Bearer ${jwtBody}`
			}
		});
		if(turn.data){
			setSubmitting({token: turn.data})
		}
	},

	displayName: 'BasicForm',
})(LoginForm);

