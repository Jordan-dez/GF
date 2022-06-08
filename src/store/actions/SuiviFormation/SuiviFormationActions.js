import * as types from './SuiviFormationTypes';
import axios from 'axios';
import store from '../../store';
import { UrlBase } from '../../../services/UrlBase';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllsuiviformation =(listsuiviformation) =>({
    type: types.GET_SUIVIFORMATIONS,
    payload: listsuiviformation,

});
const suiviformationDeleted=()=>({
    type: types.GET_SUIVIFORMATIONS,
});

const suiviformationAdded =()=>({
    type: types.ADD_SUIVIFORMATION,
});

export const loadSuiviFormation=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch(`${UrlBase}suivi-formations`,{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            dispatch(getAllsuiviformation(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteSuiviFormation=(id) => {
    const state = store.getState();
    const token = state.auth.accessToken
    return function(dispatch){
        fetch(`${UrlBase}suivi-formations/${id}`,{
            method:'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            dispatch(suiviformationDeleted());
            dispatch(loadSuiviFormation())
        }).catch((error) =>console.log(error));
    }
}
export const addSuiviFormation=(suiviformation) => {
    return function(dispatch){
        axios.post(`suivi-formations/`,suiviformation).then((response) => {
            console.log("response addContact",response);
            dispatch(suiviformationAdded());
        }).catch((error) =>console.log(error));
    }
}