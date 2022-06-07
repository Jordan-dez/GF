import * as types from './EvangelisationTypes'
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllevangelisation =(evangelisations) =>({
    type: types.GET_EVANGELISATIONS,
    payload: evangelisations,

});
const evangelisationDeleted=()=>({
    type: types.DELETE_EVANGELISATION,
});

const evangelisationAdded =()=>({
    type: types.ADD_EVANGELISATION,
});

export const loadEvangelisation=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/evangelisations',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            dispatch(getAllevangelisation(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteEvangelisation =(id) => {
    return function(dispatch){
        fetch(`suivi-formations/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(evangelisationDeleted());
            dispatch(loadEvangelisation())
        }).catch((error) =>console.log(error));
    }
}
export const addEvangelisatin=(suiviformation) => {
    return function(dispatch){
        axios.post(`suivi-formations/`,suiviformation).then((response) => {
            console.log("response addContact",response);
            dispatch(evangelisationAdded());
        }).catch((error) =>console.log(error));
    }
}