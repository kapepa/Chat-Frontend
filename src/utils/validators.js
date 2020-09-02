export default function({isAuth, err, values}){
  const ruls =  {
    email: function(val) {
      if(!val){
        return err.email = 'Введите Email';
      }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)){
        return err.email = 'Email адрес введен не верно';
      }
    },
    name: function(val){
      if (!val) {
        return err.name = 'Введите Имя';
      } else if (!/^([A-Za-z éàë]{2,40})$/i.test(val)) {
        return err.name = 'Введенное имя не является корректным';
      }
    },
    password: function(val){
      if (!val) {
        return err.password = 'Введите пароль';
      } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(val)) {
        return err.password = isAuth ? 'Введенный пароль или логин' : 'Введенный пароль не является приемлемым' ;
      }
    }
  }

  Object.keys(values).forEach((key) => {
    return ruls[key] && ruls[key](values[key]);
  })
}

// const validators = {
// 	email: function(val){
// 		if (!val) {
// 			return 'Required';
// 		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) {
// 			return 'Email адрес введен не верно';
// 		}
// 	},
// 	name: function(val){
// 		if (!val) {
//       return 'Required';
//     } else if (!/^([A-Za-z éàë]{2,40})$/i.test(val)) {
//       return 'Введенное имя не является корректным';
// 		}
// 	},
// 	password: function(val){
// 		if (!val) {
//       return 'Required';
//     } else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(val)) {
//       return 'Введенный пароль не является приемлемым';
// 		}
// 	}
// }

// export default validators;