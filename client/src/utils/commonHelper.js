import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

const useNavigationHelper = () => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  return navigateTo;
};

export { useNavigationHelper };
