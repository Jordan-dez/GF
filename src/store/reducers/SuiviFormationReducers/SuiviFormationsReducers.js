import  * as types from "../../actions/SuiviFormation/SuiviFormationTypes";

const initialContactState ={
    listsuiviformation:[],
    suiviformation:{},
    loading:true,
};
const suiviFormationReducers=(state=initialContactState, action)=>{
    switch(action.type) {
        case types.GET_SUIVIFORMATIONS:
            return {
                ...state,
                listsuiviformation: action.payload,
                loading: false,
            }
        case types.DELETE_SUIVIFORMATION:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_SUIVIFORMATION:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default suiviFormationReducers;