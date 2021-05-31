type globalAction = 
                  | {type: 'login'}

const globalState = (state = {}, action: globalAction) => {
  switch(action.type){
    case 'login':
      return state;
    
      default:
        return state;
  }
}

export default globalState;