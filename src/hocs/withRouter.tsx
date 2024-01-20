import React from "react";
import { useLocation, useNavigate, useParams, Location } from "react-router-dom";

export interface WithRouterProps {
  location: Location;
  params: { [key: string]: string };
  navigate: ReturnType<typeof useNavigate>;
}

export const withRouter = <Props extends WithRouterProps>(
  Component: React.ComponentType<Props>
) => (props: Omit<Props, keyof WithRouterProps>) => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  return <Component {...(props as Props)} location={location} params={params} navigate={navigate} />;
};

