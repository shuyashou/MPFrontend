import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { PublicClientApplication, EventType, EventMessage, AuthenticationResult } from '@azure/msal-browser';
import { msalConfig } from './authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

async function initializeMsal() {
  await msalInstance.initialize(); // Ensure MSAL is initialized

  // Check if there's a pending redirect response
  msalInstance
    .handleRedirectPromise()
    .then((response) => {
      if (response) {
        console.log("Login Redirect Success:", response);
        msalInstance.setActiveAccount(response.account);
      } else {
        console.log("No pending authentication redirect.");
      }
    })
    .catch((error) => console.error("Redirect error:", error));

  // Handle login success
  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const payload = event.payload as AuthenticationResult;
      console.log("Login Success:", payload);
      msalInstance.setActiveAccount(payload.account);
    }
  });

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App msalInstance={msalInstance} />
    </React.StrictMode>
  );
}

initializeMsal();
