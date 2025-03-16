import React from 'react'
import ReactDOM from 'react-dom/client'
import User from './features/user/User.tsx'
import App from './components/App.tsx'
import './index.css'

import { PublicClientApplication, EventMessage, AuthenticationResult, EventType } from '@azure/msal-browser';
import { msalConfig } from './authConfig'; 

import { store } from './app/store'
import { Provider } from 'react-redux'
import ProductTable from './components/ProductTable.tsx'

export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  msalInstance.setActiveAccount(msalInstance.getAllAccounts()[0]);
}

msalInstance.addEventCallback((event: EventMessage) => {
  if ((event.eventType === EventType.LOGIN_SUCCESS ||
          event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS ||
          event.eventType === EventType.SSO_SILENT_SUCCESS) && event.payload) {
      const payload = event.payload as AuthenticationResult;
      const account = payload.account;
      msalInstance.setActiveAccount(account);
  }
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="header">
        <nav>
          <ul>
            <li>
              <User msalInstance={msalInstance} />
            </li>
          </ul>
        </nav>
      </div>
      <App />
      <ProductTable />
    </Provider>
  </React.StrictMode>,
)