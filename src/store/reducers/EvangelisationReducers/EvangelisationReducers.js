import  * as types from "../../actions/Evangelisation/EvangelisationTypes";

const initialContactState ={
    listsuiviformation:[],
    suiviformation:{},
    loading:true,
};
const evangelisationReducers=(state=initialContactState, action)=>{
    switch(action.type) {
        case types.GET_EVANGELISATIONS:
            return {
                ...state,
                evangelisations: action.payload,
                loading: false,
            }
        case types.DELETE_EVANGELISATION:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_EVANGELISATION:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default evangelisationReducers;