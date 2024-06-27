import { Login } from "./views/Login";
import { JobHome } from "./views/JobHome/JobHome.jsx";
import { Toaster } from "sonner";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { loaduser } from "./redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UnProtectedRoute from "./components/UnProtectedRoute.jsx";
function App() {
  const dispatch = useDispatch()
  const authState = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(loaduser());
  }, [dispatch])

  if (authState.status === "idle") {
    return <div>Loading...</div>
  }

  return (
    <div className=" bg-slate-950 min-h-screen w-screen">
      <Toaster richColors />
      <Routes>
        <Route path={"/"} element={<ProtectedRoute element={<JobHome />} />} />
        <Route path={"/login"} element={<UnProtectedRoute element={<Login />} />} />

        <Route path="*" element={<div>no brro</div>} />


      </Routes>


    </div>
  );
}
export default App
