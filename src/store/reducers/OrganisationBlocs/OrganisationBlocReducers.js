import  * as types from "../../actions/OrganisationBlocs/OrganisationBlocsTypes";

const initialContactState ={
    listorganisationbloc:[],
    organisationbloc:{},
    loading:true,
};
const organisationblocReducers=(state=initialContactState, action)=>{
    switch(action.type) {
        case types.GET_ORGANISATIONBLOCS:
            console.log("state gifs",state)
            return {
                ...state,
                listorganisationbloc: action.payload,
                loading: false,
            }
        case types.DELETE_ORGANISATIONBLOC:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_ORGANISATIONBLOC:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default organisationblocReducers;