import { User } from '../api/models/LoginResponse';
import { globalStateType, initialState } from '../App';
interface loginPayload {
  token: string;
  user: User;
}

type globalAction = 
                  | {type: 'LOGIN', payload:loginPayload }

const globalState = (state: globalStateType = initialState, action: globalAction): globalStateType => {
  switch(action.type){
    case 'LOGIN':
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        authenticated: true
      };
    
      default:
        return state;
  }
}

export default globalState;