// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
// load the presentational component
import AppSidebar from './components/AppSidebar';

export default connect(
  state => ({
    translations: state.i18n.translations.example, // all package translations
    user: state.appSidebar.user,
  }),
)(AppSidebar);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
/*
a consumer of a package should be able to use the package in the following way:
import Example, { actions, actionTypes, middleware, reducer } from '@bufferapp/publish-example';
*/
