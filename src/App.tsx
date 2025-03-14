import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

interface AppProps {
  msalInstance: PublicClientApplication;
}

function App({ msalInstance }: AppProps) {
  const [count, setCount] = useState(0);
  const [myBool, setMyBool] = useState(true);
  const [account, setAccount] = useState(msalInstance.getActiveAccount());
  const [isAuthenticating, setIsAuthenticating] = useState(false); // Tracks login state

  useEffect(() => {
    const checkAccount = () => {
      const activeAccount = msalInstance.getActiveAccount();
      setAccount(activeAccount);
    };

    // Ensure authentication state updates when events occur
    const callbackId = msalInstance.addEventCallback((event) => {
      if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log("Login Success:", event.payload);
        setAccount(msalInstance.getActiveAccount());
        setIsAuthenticating(false); // Reset authentication state
      } else if (event.eventType === EventType.LOGIN_FAILURE) {
        console.error("Login Failed:", event);
        setIsAuthenticating(false); // Reset on failure
      }
    });

    checkAccount(); // Check account on mount

    return () => {
      if (callbackId) {
        msalInstance.removeEventCallback(callbackId);
      }
    };
  }, [msalInstance]);

  const handleClick = () => {
    setMyBool((prev) => !prev);
  };

  const handleLogin = async () => {
    try {
      if (account) {
        console.log("User already signed in, skipping login.");
        return;
      }

      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
        console.log("Existing account found, setting active account.");
        return;
      }

      if (isAuthenticating) {
        console.log("Login already in progress. Skipping new login request.");
        return;
      }

      setIsAuthenticating(true);
      console.log("Attempting login...");
      await msalInstance.loginRedirect();
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticating(false); // Reset on error
    }
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await msalInstance.logoutRedirect();
      setAccount(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <p>fuck shit</p>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <button type="button" onClick={handleClick}>Click me</button>

        {/* Show buttons based on authentication status */}
        {!account ? (
          <button type="button" onClick={handleLogin} disabled={isAuthenticating}>
            {isAuthenticating ? "Authenticating..." : "Sign In / Sign Up with Azure B2C"}
          </button>
        ) : (
          <>
            <p>Welcome, {account.username}</p>
            <button type="button" onClick={handleLogout}>
              Sign Out
            </button>
          </>
        )}

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {myBool ? <p>Total count: {count} </p> : <p>False!</p>}
      </div>
    </>
  );
}

export default App;
