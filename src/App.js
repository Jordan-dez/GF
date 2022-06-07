import { lazy, Suspense, useEffect } from 'react';

/// Components
import Index from "./jsx";
import { useDispatch, useSelector } from 'react-redux';
import {  Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin } from './services/AuthService';
import { getAuthenticated} from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import './vendor/datatables/css/dataTables.min.css';
import "./css/style.css";
import { checkLoginAction, loginAction } from './store/actions/AuthActions';


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
    setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
  });
});

function App (props) {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(getAuthenticated);
    useEffect(() => {
        dispatch(checkLoginAction(props.history));
    }, [dispatch, props.history]);
    
    let routes = (  
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/page-register' component={SignUp} />
            <Route path='/page-forgot-password' component={ForgotPassword} />
        </Switch>
    );
    if (isAuthenticated) {
		return (
			<>
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>  
                   }
                >
                    <Index / >
                </Suspense>
            </>
        );
	
	} else {
		return (
			<div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                  }
                >
                    {routes}
                </Suspense>
			</div>
		);
	}
};


export default withRouter(App); 

