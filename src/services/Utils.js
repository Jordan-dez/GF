import store from "../store/store";
const state = store.getState();
export const token = state.auth.accessToken