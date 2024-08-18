import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface rootState {
  userInfo:{
    userInfo:{
      name:''
    }
  }
}

export default function ProtectedRoute() {
  const userInfo = useSelector((state:rootState) => state.userInfo.userInfo);
  console.log('user ingo',userInfo)
  if (userInfo.name) {
    return <Outlet />;
  } else {
    return <Navigate to="signin" />;
  }
}
