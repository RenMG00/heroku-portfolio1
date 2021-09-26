import React, { useContext } from "react"
import { Route, Switch, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar.js"
import Auth from "./components/Auth.js"
import Home from "./components/Home.js"
import MyTravel from "./components/MyTravel.js"
import Parks from "./components/Parks.js"
import Camps from "./components/Camps.js"
import ProtectedRoute from "./components/ProtectedRoute.js"
import { UserContext } from "./context/UserProvider.js"
import { ParksCampsProvider } from "./context/ParksCampsProvider.js";

export default function App() {

    const { token, logout } = useContext(UserContext)
    
    return (
        <div className="app">
            {token && <Navbar logout={logout} />}
            <Switch>
            <ParksCampsProvider>
                <Route
                    exact path="/"
                    render={() => token ? <Redirect to="/home" /> : <Auth />}
                />
                    <Route
                        path="/home"
                        component={Home}
                        redirectTo="/"
                        token={token}
                    />
                    <ProtectedRoute
                        path="/campgrounds"
                        component={Camps}
                        redirectTo="/"
                        token={token}
                    />
                    <ProtectedRoute
                        path="/parks"
                        component={Parks}
                        redirectTo="/"
                        token={token}
                    />
                    <ProtectedRoute
                        path="/my-travel"
                        component={MyTravel}
                        redirectTo="/"
                        token={token}
                    />
                </ParksCampsProvider>
            </Switch>
        </div>
    )
}