import { Navigate } from "react-router-dom"

const RestrictedRoute = ({data,children}) => {
  if(!data){
  return  <Navigate to='/'/>
  }
 return children

}
export default RestrictedRoute