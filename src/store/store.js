import { applyMiddleware,createStore ,compose} from 'redux';
import reduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducers from './reducers/rootReducers';

const middleware = [reduxThunk];

if(process.env.Node_ENV ==="development"){
    middleware.push(logger)
}

// const composeEnhancers =
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const reducers = combineReducers({
//     posts: PostsReducer,
//     auth: AuthReducer,
    	
	
// });
const store =createStore(rootReducers,applyMiddleware(...middleware));


export default store;
