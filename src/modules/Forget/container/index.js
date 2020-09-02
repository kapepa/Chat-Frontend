import { withFormik } from 'formik';
import ForgetForm from '../components/index';
import { EncodeJWT } from '../../../utils/jwt/index'
import { forgetAPI } from '../../../utils/api/index'

export default withFormik({
  mapPropsToValues: () => ({ email: '' }),

  validate: values => {
		const errors = {};
		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid email address';
		}
    return errors;
  },

  handleSubmit: async (values, { setSubmitting }) => {
		const encode = await EncodeJWT(values);
		const response = await forgetAPI(encode)
		if(!response.message){
			setSubmitting(true);
		}
  },

  displayName: 'BasicForm',
})(ForgetForm);