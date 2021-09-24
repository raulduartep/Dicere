import React from 'react';
import { Route } from 'react-router-dom';
// import { PrivateRoute } from './components/PrivateRoute';
import { AppPage } from './pages/AppPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { GithubCalbackPage } from './pages/GithubCallbackPage';
import { GoogleCalbackPage } from './pages/GoogleCallbackPage';
import { LoginPage } from './pages/LoginPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { VerifyAccountPage } from './pages/VerifyAccountPage';

export const Routes: React.FC = () => (
  <>
    <Route path="/" exact component={LoginPage} />
    <Route path="/forgot" component={ForgotPasswordPage} />
    <Route path="/create" component={CreateAccountPage} />
    <Route path="/auth/google/callback" component={GoogleCalbackPage} />
    <Route path="/auth/github/callback" component={GithubCalbackPage} />
    <Route path="/verify" component={VerifyAccountPage} />
    <Route path="/reset" component={ResetPasswordPage} />
    <Route path="/app" component={AppPage} />
  </>
);
