import {
    formatError,
    getTokenFromLocalStorage,
    login,
    runLogoutTimer,
    saveTokenInLocalStorage,
    signUp,
} from '../../services/AuthService';


export const SIGNUP_CONFIRMED_ACTION = '[signup action] confirmed signup';
export const SIGNUP_FAILED_ACTION = '[signup action] failed signup';
export const LOGIN_CONFIRMED_ACTION = '[login action] confirmed login';
export const LOGIN_FAILED_ACTION = '[login action] failed login';
export const LOADING_TOGGLE_ACTION = '[Loading action] toggle loading';
export const LOGOUT_ACTION = '[Logout action] logout action';

export function signupAction(email, password, history) {
    return (dispatch) => {
        signUp(email, password)
        .then((response) => {
            saveTokenInLocalStorage(response.data.refreshToken);
            // runLogoutTimer(
            //     dispatch,
            //     response.data.expiresIn * 1000,
            //     history,
            // );
            dispatch(confirmedSignupAction(response.data.refreshToken));
            history.push('/dashboard');
        })
        .catch((error) => {
            const errorMessage = formatError(error.response.data.refreshToken);
            dispatch(signupFailedAction(errorMessage));
        });
    };
}

export function logout(history) {
    localStorage.removeItem('access_token');
    history.push('/login');
    return {
        type: LOGOUT_ACTION,
    };
}
export function checkLoginAction(history) {
    return async (dispatch) => {
        const accessToken = getTokenFromLocalStorage();
        if (accessToken !== null) {
            dispatch(loginConfirmedAction(accessToken));
        }
        else {
            dispatch(logout(history));
        }
    }
}

export function loginAction(email, password, history) {
    return async (dispatch) => {
        let accessToken = getTokenFromLocalStorage()
        if (accessToken === null) {
            accessToken = await login(email, password);
            saveTokenInLocalStorage(accessToken.data.access_token);
        }
        dispatch(loginConfirmedAction(accessToken));
        history.push('/dashboard');

            // .then((response) => {
            //     saveTokenInLocalStorage(response.data.refreshToken);
            //     // console.log("response.data",response.data)
            //     runLogoutTimer(
            //         dispatch,
            //         response.data.expiresIn * 1000,
            //         history,
            //     );
            //     dispatch(loginConfirmedAction(response.data.refreshToken));
            //     // console.log("data response",response.data)
			// 	history.push('/dashboard');                
            // })
            // .catch((error) => {
			// 	//console.log(error);
            //     const errorMessage = formatError(error.response.data);
            //     dispatch(loginFailedAction(errorMessage));
            // });
    };
}

export function loginFailedAction(data) {
    return {
        type: LOGIN_FAILED_ACTION,
        payload: data,
    };
}

export function loginConfirmedAction(data) {
    console.log("data",data)
    return {
        type: LOGIN_CONFIRMED_ACTION,
        payload: data,
    };
}

export function confirmedSignupAction(payload) {
    return {
        type: SIGNUP_CONFIRMED_ACTION,
        payload,
    };
}

export function signupFailedAction(message) {
    return {
        type: SIGNUP_FAILED_ACTION,
        payload: message,
    };
}

export function loadingToggleAction(status) {
    return {
        type: LOADING_TOGGLE_ACTION,
        payload: status,
    };
}
