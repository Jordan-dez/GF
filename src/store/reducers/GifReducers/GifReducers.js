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


import  * as types from "../../actions/Gifs/GifTypes";

const initialContactState ={
    listgifs:[],
    gif:{},
    loading:true,
};
const gifReducers=(state=initialContactState, action)=>{
    switch(action.type) {
        case types.GET_GIFS:
            console.log("state gifs",state)
            return {
                ...state,
                listgifs: action.payload,
                loading: false,
            }
        case types.DELETE_GIF:
            return {
                ...state,
                // listgifs: state.listgifs.filter(t=>t.id !== action.payload.id),
                loading: false,
            }
        case types.ADD_GIF:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
export default gifReducers;