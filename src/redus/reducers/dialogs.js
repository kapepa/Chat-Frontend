const initialState = {
	items: [],
	establish: false,
}

export default (state = initialState, action) => {
	switch (action.type){
		case 'DIALOGS:SET_ITEMS':
			return {...state, items: action.payload, establish: true };
		case 'DIALOGS:SET_SERVERS':
			const dublicateState = [...state.items];
			const getIndex = dublicateState.findIndex( el => el._id === action.payload._id);
			dublicateState.splice(getIndex,1,action.payload);
			return {...state, items: dublicateState };
		case 'DIALOGS:SET_ONLINE':
			const listOnline = action.payload.data;
			const isOwner = action.payload.owner;
			const dublicate = [...state.items];
			for(let key of listOnline){
				for(let simbol of dublicate){
					let notOwnerID = isOwner === simbol.author ? simbol.partner : isOwner === simbol.partner ? simbol.author : false  ; 
					if(notOwnerID === key._id){
						simbol.isOnline = true;
						break;
					}
				}
			}
			return {...state, items: dublicate}
		case 'DIALOGS:SET_DISCONNECT':
			const listUser = action.payload.data;
			const OwnerToken = action.payload.owner;
			const copyState = [...state.items];

			for(let simbol of copyState){
				for(let key of listUser){
					let haveID = OwnerToken === simbol.author ? simbol.partner : simbol.author
					if( haveID === key._id ){
						simbol.isOnline = true
					}else{
						simbol.isOnline = false
					}
				}
			}
			return {...state, items: copyState}
		case 'DIALOGS:UPDATE_SERVER':
			const updateServer = action.payload;
			const storeDialogs = [...state.items];
			storeDialogs.push(updateServer);
			return {...state, items: storeDialogs}
		case 'DIALOGS:CHECK_LOCAL_UPADATE':
			const { messageID, isReaded } =  action.payload;
			const newItems = [...state.items];
			newItems.find( el => el.messageID === messageID).isReaded = isReaded;
			return {...state, items: newItems}
		default:
			return state
	}
}
