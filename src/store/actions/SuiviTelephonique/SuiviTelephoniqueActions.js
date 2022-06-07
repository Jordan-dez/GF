import * as types from './SuiviTelephoniqueTypes';
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllsuivitelephonique =(suivitelephoniques) =>({
    type: types.GET_SUIVITELEPHONIQUES,
    payload: suivitelephoniques,

});
const suivitelephoniqueDeleted=()=>({
    type: types.GET_SUIVITELEPHONIQUES,
});

const suivitelephoniqueAdded =()=>({
    type: types.ADD_SUIVITELEPHONIQUE,
});

export const loadSuiviTelephonique=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/suivi-telephoniques',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            dispatch(getAllsuivitelephonique(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteSuiviTelephone =(id) => {
    return function(dispatch){
        fetch(`suivi-telephoniques/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(suivitelephoniqueDeleted());
            dispatch(loadSuiviTelephonique())
        }).catch((error) =>console.log(error));
    }
}
export const addTelephonique=(suivitelephonique) => {
    return function(dispatch){
        axios.post(`suivi-telephoniques/`,suivitelephonique).then((response) => {
            console.log("response addContact",response);
            dispatch(suivitelephoniqueAdded());
        }).catch((error) =>console.log(error));
    }
}