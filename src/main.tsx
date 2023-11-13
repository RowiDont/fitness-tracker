import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
import "normalize.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Auth0Provider
            domain="codify.auth0.com"
            clientId="hAvOsj1ARqX9uXvhmd55bJt007ipcFEC"
            authorizationParams={{
                redirect_uri: window.location.origin,
                audience: "fitness-tracker-dev",
            }}
            cacheLocation="memory"
        >
            <Routes />
        </Auth0Provider>
    </React.StrictMode>,
);
