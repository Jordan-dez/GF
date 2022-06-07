import * as types from './EvenementTypes'
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllevenement =(listevenement) =>({
    type: types.GET_EVENEMENTS,
    payload:listevenement,

});
const evenementDeleted=()=>({
    type:types.DELETE_EVENEMENT,
});

const evenementAdded =()=>({
    type:types.ADD_EVENEMENT,
});

export const loadEvenement=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/evenements',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            dispatch(getAllevenement(response.data))
        }).catch((error) => console.log(error))
    }
};
export const deleteEvenement =(id) => {
    return function(dispatch){
        fetch(`https://api.gf.dev.kloudlabs.fr/api/v1/evenements/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(evenementDeleted());
            dispatch(loadEvenement())
        }).catch((error) =>console.log(error));
    }
}
export const addEvenement=(evenement) => {
    return function(dispatch){
        axios.post(`suivi-formations/`,evenement).then((response) => {
            console.log("response addContact",response);
            dispatch(evenementAdded());
        }).catch((error) =>console.log(error));
    }
}