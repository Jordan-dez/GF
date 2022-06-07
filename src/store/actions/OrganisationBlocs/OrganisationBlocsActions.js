import * as types from './OrganisationBlocsTypes';
import axios from 'axios';
import store from '../../store';
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllorganisationbloc=(listorganisationbloc) =>({
    type: types.GET_ORGANISATIONBLOCS,
    payload: listorganisationbloc,

});
const organisationblocDeleted=()=>({
    type: types.GET_ORGANISATIONBLOCS,
});

const organisationblocAdded =()=>({
    type: types.ADD_ORGANISATIONBLOC,
});

export const loadOrganisationBloc=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch('https://api.gf.dev.kloudlabs.fr/api/v1/organisation-blocs',{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            // const listgifs = response.data;
            dispatch(getAllorganisationbloc(response.data))
            console.log("gif action",dispatch(getAllorganisationbloc(response.data)))
        }).catch((error) => console.log(error))
    }
};
export const deleteOrganisationbloc =(id) => {
    return function(dispatch){
        fetch(`suivi-formations/${id}`).then((response) => {
            console.log("response deleteContact",response);
            dispatch(organisationblocDeleted());
            dispatch(loadOrganisationBloc())
        }).catch((error) =>console.log(error));
    }
}
export const addOrganisationBloc=(organisationbloc) => {
    return function(dispatch){
        axios.post(`suivi-formations/`,organisationbloc).then((response) => {
            console.log("response addContact",response);
            dispatch(organisationblocAdded());
        }).catch((error) =>console.log(error));
    }
}