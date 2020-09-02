import { withFormik } from 'formik';
import Recovery from '../components/index'
import { EncodeJWT } from '../../../utils/jwt/index';
import RecoveryAPI from '../../../utils/api/recovery';

export default withFormik({
  mapPropsToValues: () => ({ password: '', confirmed: '', token: '' }),

  validate: values => {
    const errors = {};

    if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)) {
			errors.password = 'Required';
		}
		
		if (values.password !== values.confirmed ) {
      errors.confirmed = 'Required';
		}

    return errors;
  },

  handleSubmit: async (values, { setSubmitting }) => {
		const { password, token } = values;
		const encode = EncodeJWT({password, token});
		const result = await RecoveryAPI(encode);
		if(result){
			setSubmitting({submit: true});
		}
  },

})(Recovery);