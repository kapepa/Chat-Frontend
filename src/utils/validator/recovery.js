export default {
	password: function(value){
		let error;
		if (!value) {
			error = 'Required';
		} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
			error = 'Invalid email address';
		}
		return error;
	},
	email: function(val) {
		let error;
		if(!val){
			error.email = 'Введите Email';
		}else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)){
			error.email = 'Email адрес введен не верно';
		}
		return error;
	},
	name: function(val){
		let error;
		if (!val) {
			error.name = 'Введите Имя';
		} else if (!/^([A-Za-z éàë]{2,40})$/i.test(val)) {
			error.name = 'Введенное имя не является корректным';
		}
		return error;
	},
	confirmed: function(value){
		let error;
		if (!value) {
			error = 'Required';
		} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
			error = 'Invalid email address';
		}
		return error;
	}	
}