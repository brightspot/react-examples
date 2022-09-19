import { Navigate } from "react-router-dom";

type Props = {
    user?: string | null
    redirectPath?: string
    children: JSX.Element|JSX.Element[]
}

const ProtectedRoute = ({
    user,
    redirectPath = '/',
    children,
  }: Props) => {
    console.log(user)
    if (user !== 'Brightspot User') {
      return <Navigate to={redirectPath} replace />;
    }
  
    return (
        <>{children}</>
            )
  };

export default ProtectedRoute