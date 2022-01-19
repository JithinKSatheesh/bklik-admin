// store.js
import React, {createContext, useReducer} from 'react';

const userModel = {
  username : '',
  email : '',
  image : '',
  firstname : '',
  lastname : ''
}

const initialState = { ...userModel };

const userStore = createContext(initialState);
const { Provider } = userStore;

const UserStateProvider = ( { children } ) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'initUser':
        const newState = {...state, ...action?.payload}
        // console.log("here at store", newState)
        return newState;
      case 'logOut' :
        return { ...userModel }
      default:
        throw new Error();
    };
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { userStore, UserStateProvider }