import * as types from './GifTypes';
import axios from 'axios';
import store from '../../store';
import {UrlBase} from "../../../services/UrlBase"
//import { getAccesToken } from '../selectors/AuthSelectors';

const getAllgif=(listgifs) =>({
    type: types.GET_GIFS,
    payload: listgifs,

});
const gifDeleted=(id)=>({
    type: types.DELETE_GIF,
    payload:id
});

const gifAdded =()=>({
    type: types.ADD_GIF,
});

export const loadGifs=()=>{
    const state = store.getState();
    const token = state.auth.accessToken
    console.log("state", state);
    // console.log("loading contacts token",token)
    return function(dispatch) {
        fetch(`${UrlBase}gfs`,{
            headers: {
                Authorization : `Bearer ${token}`
            }
        }).then(resp=>resp.json())
        .then((response) => {
            console.log("response",response);
            // const listgifs = response.data;
            dispatch(getAllgif(response.data))
            console.log("gif action",dispatch(getAllgif(response.data)))
        }).catch((error) => console.log(error))
    }
};
export const deleteGif =(id) => {
    const state = store.getState();
    const token = state.auth.accessToken
    // return function(dispatch,history){
    //     fetch(`${UrlBase}gfs/${id}`,{
    //         method: 'DELETE',
            
    //         headers: {
    //             Authorization : `Bearer ${token}`,
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(id)
    //     })
    //     .then(response => response.json())
    //     .then((data) => {
    //         console.log("response gifDeleted",data);
    //         console.log("jordan test before deleted");
    //         dispatch(gifDeleted());
    //         console.log("jordan test after deleted");
    //         dispatch(loadGifs())
    //     }).catch((error) =>console.log(error));
    // }
    return function(dispatch){
        fetch(`${UrlBase}gfs/${id}`,{
            method:'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(data=>{
            dispatch(gifDeleted(id));
            dispatch(loadGifs());
        })
    }
}
export const addGif=(gif) => {
    const state = store.getState();
    const token = state.auth.accessToken
    return function(dispatch){
        fetch(`${UrlBase}gfs`,{
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                Authorization : `Bearer ${token}`
            },
            body:JSON.stringify(gif)
           }).then((response) => {
            console.log("response addgf",response);
            dispatch(gifAdded());
            dispatch(loadGifs());
            
        }).catch((error) =>console.log(error));
    }
}