import { Navigate, useLocation } from 'react-router-dom';
import { routes } from '/@/router/routes';
import { searchRoute } from '../../utils';
import { useSelector } from '/@/redux';

const AuthRouter = (props: { children: JSX.Element }) => {
  const location = useLocation();
  const token = useSelector((state) => state.user.token);
  const route = searchRoute(location.pathname, routes);

  if (route?.meta?.replacePath) return <Navigate to={route.meta.replacePath} replace />;

  if (!token && !route?.meta?.ignoreAuth) return <Navigate to="/login" replace />;

  return props.children;
};

export default AuthRouter;
