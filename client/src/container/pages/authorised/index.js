import React from 'react'
import { Route } from 'react-router-dom';
//routes
import { routes } from '../appRoutes'

export default function Authorised() {
    return (
        <div>
            {routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (<route.main {...props} />)}
                    />
                )
            })}
        </div>
    )
}
