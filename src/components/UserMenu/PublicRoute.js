import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';
import { Outlet, Navigate } from 'react-router-dom';

const PublicRoute = () => {
  
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    !isLoggedIn ? <Outlet /> : <Navigate to='/phonebook' />
  )
};
export default PublicRoute