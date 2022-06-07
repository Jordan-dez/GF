// import PostsReducer from './PostsReducer';
import {combineReducers} from 'redux';
import { AuthReducer } from './AuthReducer';
import contactReducers from './ContactsReducer';
import evangelisationReducers from './EvangelisationReducers/EvangelisationReducers';
import evenementReducers from './Evenements/EvenementReducers';
import gifReducers from './GifReducers/GifReducers';
import organisationblocReducers from './OrganisationBlocs/OrganisationBlocReducers';
import organisationsecteurReducers from './OrganisationSecteurReducers/OrganisationSecteurReducers';
import suiviFormationReducers from './SuiviFormationReducers/SuiviFormationsReducers';
import suivitelephoniqueReducers from './SuiviTelephoniqueReducers/SuiviTelephoniqueReducers';
import UserReducers from './UserReducers/UserReducers';

const rootReducers = combineReducers({
	auth:AuthReducer, 
	contacts:contactReducers,
	suivitelephoniques: suivitelephoniqueReducers,
	suiviformations:suiviFormationReducers,
	evangelisations:evangelisationReducers,
	gifs:gifReducers,
	organisationsecteur:organisationsecteurReducers,
	organisationbloc:organisationblocReducers,
	evenements:evenementReducers,
	users:UserReducers
	// post:PostsReducer
})

export default rootReducers;