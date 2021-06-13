import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import _ from 'underscore';
import Constants from '../../constants/constants';

function ConditionalRenderer({
    component: Component,
    routeProps
}) {
    const location = useLocation();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const hasAccessToken = (
        !_.isEmpty(userData)
    );
    if (hasAccessToken) {
        return <Component {...routeProps} />;
    }
    return (
        <Redirect
            to={{
                pathname: Constants.LINK_URL.LOGIN,
                state: { from: routeProps.location }
            }}
        />
    );
};

function ProtectedRoute({
    component: Component,
    ...rest
}) {
    return (
        <Route
            {...rest}
            render={(routeProps) => (
                <ConditionalRenderer
                    routeProps={routeProps}
                    component={Component}
                />
            )}
        />
    );
}

export default ProtectedRoute;