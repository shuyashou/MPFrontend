import User from "../features/user/User"
import {MsalProp} from "../dataModels/MsalProp"
import viteLogo from '/vite.svg'
import { Outlet } from "react-router-dom"

function Nav(props: MsalProp) {
  return (
    <>
      <div className="header">
        <img src={viteLogo} className="logo" alt="Vite logo" />
        <User msalInstance={props.msalInstance} />
      </div>
      <Outlet />
    </>
  )
}

export default Nav