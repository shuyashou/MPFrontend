import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useAppSelector } from './app/hooks'
import { selectAccessToken, selectUser } from './features/user/userSlice'

function App() {

  const user = useAppSelector(selectUser);
  const accessToken = useAppSelector(selectAccessToken);

  const [count, setCount] = useState(0);

  const [myBool, setmyBool] = useState(true);

  const handleClick = () => {
    setmyBool((myBool) => !myBool)
    console.log(myBool);
  };

  return (
    <>
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
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button type="button" onClick={handleClick}>Click Me</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {myBool ? <p>Total Count: {count}</p> : <p>False!</p>}
      </div>
      <p>Id Token: {user?.idToken}</p>
      <p>Access Token: {accessToken}</p>
    </>
  )
}

export default App