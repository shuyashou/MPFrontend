import { useAppSelector } from '../app/hooks'
import { selectAccessToken, selectUser } from '../features/user/userSlice'

function UserInventory() {

  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);

  return (
    <>
      <p>Id Token: {user?.idToken}</p>
      <p>Access Token: {accessToken}</p>
    </>
  )
}

export default UserInventory