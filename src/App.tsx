import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { IPublicClientApplication, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest, b2cPolicies } from './authConfig'; 


type AppProps = {
  msalInstance: IPublicClientApplication
};


function LoginComponent () {
  const { instance, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
    instance
        .loginPopup({
            ...loginRequest,
        })
        .catch(e => {
            console.error(e);
        });
  };

  const handleLogoutRedirect = () => {
    instance
        .logoutPopup({
          mainWindowRedirectUri: '/', // redirects the top level app after logout
        })
        .catch(e => {
            console.error(e);
        });
  };

  const handleProfileEdit = () => {
    if(inProgress === InteractionStatus.None){
      // @ts-ignore
      instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
    }
};

  return (
    <>
      <AuthenticatedTemplate>
        <div>User logged in: {activeAccount?.idTokenClaims?.name}</div>
        <button 
            onClick={handleLogoutRedirect}> 
                Sign Out 
        </button>
        <button  
            onClick={handleProfileEdit}> 
                Edit Profile 
        </button>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button  
            onClick={handleLoginRedirect}> 
                Sign In 
        </button>
      </UnauthenticatedTemplate>
    </>
  )
};


function App(props: AppProps) {
  const [count, setCount] = useState(0);
  const [myBool, setmyBool] = useState(true);

  const handleClick = () => {
    setmyBool((myBool) => !myBool)
    console.log(myBool);
  };

  return (
    <MsalProvider instance={props.msalInstance}>
      <LoginComponent />
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={handleClick}>Click Me</button>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </MsalProvider>
  )
}

export default App