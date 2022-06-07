// import {
//     CONFIRMED_CREATE_CONTACT_ACTION,
//     CONFIRMED_DELETE_CONTACT_ACTION,
//     CONFIRMED_EDIT_CONTACT_ACTION,
//     CONFIRMED_GET_CONTACTS,
//     CREATE_CONTACT_ACTION,
// } from '../actions/ContactTypes';

// const initialState = {
//     contacts: [],
// };

// export default function ContactsReducer(state = initialState, actions) {
//     if (actions.type === CREATE_CONTACT_ACTION) {
//         const contact = {
//             id: Math.random(),
//             title: 'Post Title 2asdasd',
//             description: 'Sample Description 2asdasdas',
//         };

//         const contacts = [...state.contacts];
//         contacts.push(contact);
//         return {
//             ...state,
//             contacts,
//         };
//     }

//     if (actions.type === CONFIRMED_DELETE_CONTACT_ACTION) {
//         const contacts = [...state.posts];
//         const contactIndex = contacts.findIndex(
//             (contact) => contact.id === actions.payload,
//         );

//         contacts.splice(contactIndex, 1);

//         return {
//             ...state,
//             contacts,
//         };
//     }

//     if (actions.type === CONFIRMED_EDIT_CONTACT_ACTION) {
//         const contacts = [...state.posts];
//         const contactIndex = contacts.findIndex(
//             (post) => post.id === actions.payload.id,
//         );

//         contacts[contactIndex] = actions.payload;
//         return {
//             ...state,
//             contacts,
//         };
//     }

//     if (actions.type === CONFIRMED_CREATE_CONTACT_ACTION) {
//         const contacts = [...state.contacts];
//         contacts.push(actions.payload);

//         return {
//             ...state,
//             contacts,
//         };
//     }

//     if (actions.type === CONFIRMED_GET_CONTACTS) {
//         return {
//             ...state,
//             contacts: actions.payload,
//         };
//     }
//     return state;
// }


import  * as types from "../../actions/SuiviTelephonique/SuiviTelephoniqueTypes";

const initialContactState ={
    listsuivitelephonique:[],
    suivitelephonique:{},
    loading:false,
};
const suivitelephoniqueReducers=(state=initialContactState, action)=>{
    switch(action.type) {
        case types.GET_SUIVITELEPHONIQUES:
            return {
                ...state,
                suivitelephoniques: action.payload,
                loading: false,
            }
        case types.DELETE_SUIVITELEPHONIQUE:
            return {
                ...state,
                loading: false,
            }
        case types.ADD_SUIVITELEPHONIQUE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default suivitelephoniqueReducers;