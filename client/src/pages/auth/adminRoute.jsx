import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth);
  const isAuthenticated = true;
  const user = { role: 'admin' };

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminRoute; 