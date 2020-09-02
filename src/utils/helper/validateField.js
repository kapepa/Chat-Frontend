export default function (touched, errors, val){
	if(touched[val]){
		if(!errors[val] && !errors.hasOwnProperty(val)){
			return "success"
		}else{
			return "error"
		}
	}
}