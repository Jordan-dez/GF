import * as types from './SuiviFormationTypes';
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllsuiviformation =(suiviformations) =>({
    type: types.GET_SUIVIFORMATIONS,
    payload: suiviformations,

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
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/suivi-formations',{
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
export const deleteSuiviTelephone =(id) => {
    return function(dispatch){
        fetch(`suivi-formations/${id}`).then((response) => {
            console.log("response deleteContact",response);
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