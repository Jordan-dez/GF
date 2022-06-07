import * as types from './OrganisationSecteursTypes';
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllorganisationsecteur=(listorganisationsecteur) =>({
    type: types.GET_ORGANISATIONSECTEURS,
    payload: listorganisationsecteur,

});
const organisationsecteurDeleted=()=>({
    type: types.GET_ORGANISATIONSECTEURS,
});

const organisationAdded =()=>({
    type: types.ADD_ORGANISATIONSECTEUR,
});

export const loadOrganisationSecteur=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/organisation-secteurs',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            // const listgifs = response.data;
            dispatch(getAllorganisationsecteur(response.data))
            console.log("gif action",dispatch(getAllorganisationsecteur(response.data)))
        }).catch((error) => console.log(error))
    }
};
export const deleteGif =(id) => {
    return function(dispatch){
        fetch(`suivi-formations/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(organisationsecteurDeleted());
            dispatch(loadOrganisationSecteur())
        }).catch((error) =>console.log(error));
    }
}
export const addGif=(organisationsecteur) => {
    return function(dispatch){
        axios.post(`suivi-formations/`,organisationsecteur).then((response) => {
            console.log("response addContact",response);
            dispatch(organisationAdded());
        }).catch((error) =>console.log(error));
    }
}