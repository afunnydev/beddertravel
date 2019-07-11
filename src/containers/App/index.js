import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route, Redirect, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { createBrowserHistory } from 'history';

import AppContext from 'containers/AppContext';

import Auth from 'containers/Auth/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import BusinessAddPage from 'containers/BusinessAdd/Loadable';
import BusinessEditPage from 'containers/BusinessEdit/Loadable';
import ReviewAddPage from 'containers/ReviewAddPage/Loadable';
import AboutPage from 'containers/AboutPage/Loadable';
import PrivacyPolicyPage from 'containers/PrivacyPolicyPage/Loadable';
import TermsPage from 'containers/TermsPage/Loadable';
import FaqPage from 'containers/FaqPage/Loadable';
import BusinessViewPropConnector from 'containers/BusinessView/BusinessViewPropConnector/Loadable';
import BookingsPropConnector from 'containers/Bookings/BookingsPropConnector/Loadable';
import BookingPropConnector from 'containers/Booking/BookingPropConnector/Loadable';
import ReservationsPropConnector from 'containers/Reservations/ReservationsPropConnector/Loadable';
import UserProfile from 'containers/UserProfile/Loadable';
import GainsPropConnector from 'containers/GainsPage/GainsPropConnector/Loadable';
import MyAdsPage from 'containers/MyAdsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Admin from 'containers/Admin/Loadable';

import MainLayout from 'components/MainLayout';
import configureStore from 'utils/configureStore';

import GlobalStyle from './GlobalStyle';

const AppWrapper = styled.div`
  margin: 0 auto;
  min-height: 100%;
`;

const initialState = {};
const store = configureStore(initialState);
const history = createBrowserHistory();

const PlatformPages = () => (
  <MainLayout>
    <Switch>
      <Route path="/home" component={HomePage} />

      <Route path="/businesses" component={MyAdsPage} />
      <Route path="/ownerAds" component={MyAdsPage} />
      <Route path="/business/add" component={BusinessAddPage} />
      <Route path="/business/view/:id" component={BusinessViewPropConnector} />
      <Route path="/business/:id" component={BusinessEditPage} />

      <Route path="/review/add/:id" component={ReviewAddPage} />

      <Route path="/booking/:id" component={BookingPropConnector} />
      <Route path="/bookings" component={BookingsPropConnector} />

      <Route path="/reservations" component={ReservationsPropConnector} />

      <Route path="/earnings" component={GainsPropConnector} />

      <Route path="/profile" component={UserProfile} />

      <Route path="/about" component={AboutPage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/terms-and-conditions" component={TermsPage} />
      <Route path="/faq" component={FaqPage} />

      <Route path="/admin" component={Admin} />

      <Route path="/" component={NotFoundPage} />
    </Switch>
  </MainLayout>
);

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <AppWrapper>
        <AppContext>
          <SnackbarProvider maxSnack={3}>
            <React.Fragment>
              <Helmet titleTemplate="%s - Bedder Travel" defaultTitle="Bedder Travel" >
                <meta name="description" content="Bedder uses the power of user generated content to guide other travellers like you to the best places to stay." />
                <meta name="robots" content="noindex,nofollow" />
              </Helmet>
              <GlobalStyle />
              <Switch>
                <Redirect exact path="/" to="/home" />
                <Route path="/auth" component={Auth} />
                <Route path="/" component={PlatformPages} />
                <Route path="" component={NotFoundPage} />
              </Switch>
            </React.Fragment>
          </SnackbarProvider>
        </AppContext>
      </AppWrapper>
    </Router>
  </Provider>
);

export default App;
export { store };
