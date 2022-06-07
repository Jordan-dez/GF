import  * as types from "../../actions/Evenements/EvenementTypes";

const initialState ={
    listevenement:[],
    evenement:{},
    loading:true,
};
const evenementReducers=(state=initialState, action)=>{
    switch(action.type) {
        case types.GET_EVENEMENTS:
            console.log("state",state)
            return {
                ...state,
                listevenement:action.payload,
                loading: false,
            }
        case types.DELETE_EVENEMENT:
            console.log("delete",types)
            return {
                ...state.evenements,
                loading: false,
            }
        case types.ADD_EVENEMENT:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default evenementReducers;