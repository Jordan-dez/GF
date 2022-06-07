export const getAuthenticated = (state) => {
    return state.auth.accessToken !== null;
};

export const getAccesToken = state => state.auth.accessToken;
