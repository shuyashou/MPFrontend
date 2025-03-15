import { useEffect } from 'react';
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate } from '@azure/msal-react';
import { IPublicClientApplication, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { loginRequest, b2cPolicies } from '../../authConfig';
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { setActiveAccount, setAccessToken, setClaims, selectUser } from './userSlice'

type UserProps = {
    msalInstance: IPublicClientApplication
};

function LoginComponent () {
  const { instance, inProgress } = useMsal();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch()

    useEffect(() => {
        const activeAccount = instance.getActiveAccount();
        if (activeAccount) {
            dispatch(setActiveAccount(activeAccount));
            dispatch(setClaims(activeAccount?.idTokenClaims));
        }
    }, [dispatch, instance]);

  const handleLoginRedirect = () => {
    instance
        .loginPopup({
            ...loginRequest,
        })
        .then(result => {
            dispatch(setAccessToken(result.accessToken));
            dispatch(setActiveAccount(result.account));
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
      <AuthenticatedTemplate>
        <p>Test: {instance.getActiveAccount()?.idTokenClaims?.name}</p>
        <div>User logged in: {user?.idTokenClaims?.name}</div>
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
}

function User(props: UserProps) {
  return (
    <MsalProvider instance={props.msalInstance}>
      <LoginComponent />
    </MsalProvider>
  )
}

export default User