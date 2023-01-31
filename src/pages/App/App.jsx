import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

// import and routes by Anthony Dampier based on Group Production
import StoriesPage from '../StoriesPage/StoriesPage';
import ArchivePage from '../ArchivePage/ArchivePage';
import ContactsPage from '../ContactsPage/ContactsPage';
import ThemesPage from '../ThemesPage/ThemePage';
import AdminPage from '../AdminPage/AdminPage';


import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user.currentUser);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/user"
          >
            <UserPage />
          </ProtectedRoute>
          
          <ProtectedRoute
            // logged in shows StoriesPage else shows LoginPage
            exact
            path="/StoriesPage"
          >
            <StoriesPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ArchivePage else shows LoginPage
            exact
            path="/ArchivePage"
          >
            <ArchivePage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ContactsPage else shows LoginPage
            exact
            path="/ContactsPage"
          >
            <ContactsPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ThemesPage else shows LoginPage
            exact
            path="/ThemesPage"
          >
            <ThemesPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AdminPage else shows LoginPage
            exact
            path="/AdminPage"
          >
            <AdminPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
