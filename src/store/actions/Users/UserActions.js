import * as types from './UserTypes';
// import axios from 'axios';
import store from '../../store';
import { UrlBase } from '../../../services/UrlBase';

const getAllusers =(listusers) =>({
    type: types.GET_USERS,
    payload: listusers,

});
const userDeleted=()=>({
    type: types.DELETE_USER,
});

const userAdded =()=>({
    type: types.ADD_USER,
});

export const loadUsers=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch(`${UrlBase}users`,{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            dispatch(getAllusers(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteUser =(id) => {
    return function(dispatch){
        fetch(`suivi-telephoniques/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(userDeleted());
            dispatch(loadUsers())
        }).catch((error) =>console.log(error));
    }
}
export const addUser=(user) => {
    return function(dispatch){
        fetch(`suivi-telephoniques/`,user).then((response) => {
            console.log("response addContact",response);
            dispatch(userAdded());
        }).catch((error) =>console.log(error));
    }
}