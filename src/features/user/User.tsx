import { useEffect } from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { InteractionStatus, SilentRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest, b2cPolicies } from '../../authConfig';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectClaims, setAccessToken, setClaims } from './userSlice'
import {MsalProp} from "../../dataModels/MsalProp"
import "./User.css"

function LoginComponent () {
  const { instance, inProgress } = useMsal();
  const claims = useAppSelector(selectClaims);
  const dispatch = useAppDispatch()

    useEffect(() => {
        const activeAccount = instance.getActiveAccount();
        if (activeAccount) {
            dispatch(setClaims(activeAccount?.idTokenClaims));
        }

        const accessTokenRequest: SilentRequest = {
          scopes: loginRequest.scopes,
          account: activeAccount || undefined,
        };
        
        instance.initialize().then(() => {instance.acquireTokenSilent(accessTokenRequest)
        .then((result) => {
          // Acquire token silent success
          dispatch(setAccessToken(result.accessToken));
        });});
        

    }, [dispatch, instance]);

  const handleLoginRedirect = () => {
    instance
        .loginPopup({
            ...loginRequest,
        })
        .then(result => {
            dispatch(setAccessToken(result.accessToken));
            dispatch(setClaims(result.idTokenClaims));
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
            // @ts-expect-error need to pass authority for acquireTokenRedirect to support B2C profile edit
            instance.acquireTokenRedirect(b2cPolicies.authorities.editProfile);
        }
    };

  return (
    <>
      <nav>
          <ul>
            <AuthenticatedTemplate>
            <li>
              <a href="/">Home</a>
            </li>
            <div className="dropdown">
            <button className="dropbtn">{claims?.name}</button>
              <div className="dropdown-content">
                <a href="inventory">Inventory</a>
                <a href="" onClick={handleProfileEdit}>Edit Profile</a>
                <a href="" onClick={handleLogoutRedirect}>Sign Out</a>
              </div>
            </div>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
              <li>
                <button  
                  onClick={handleLoginRedirect}> 
                    Sign In 
                </button>
              </li>
            </UnauthenticatedTemplate>
          </ul>
      </nav>
    </>
  )
}

function User(props: MsalProp) {
  return (
    <MsalProvider instance={props.msalInstance}>
      <LoginComponent />
    </MsalProvider>
  )
}

export default User