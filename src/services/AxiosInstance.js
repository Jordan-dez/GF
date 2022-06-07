// import axios from 'axios';
// import  store  from '../store/store';
// import { getAccesToken } from '../store/selectors/AuthSelectors';


// const axiosInstance = axios.create({
//     baseURL: `https://api.gf.dev.kloudlabs.fr/api/v1/`,
//     withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//     const state = store.getState();
//    console.log("state depuis axios instance mois de mai",state)
//     const token = getAccesToken(state);
//     // config.params = config.params || {}; 
//     // TODO: check how auth is handled by backend
//     // config.headers.Authorization=`Bearer ${token}`;
//     config.headers.common['Authorization']=`Bearer ${token}`;
//     console.log("config",config);
//     return config;
// });
// axios.defaults.headers.common = {
//     'Authorization': 'Bearer jordan@gmail.com' 
// };

// export default axiosInstance;
