
//Get the user from the store.js
// This js file is responslible to check if a user has ligin in my appl
// If the User doesn't exist go to sign in path

import store from './store';

export default(to, from, next) =>{
    if(!store.getters.user){
        next({
            path:'/signin'
        })
    }
    else{
        next();
    }
}