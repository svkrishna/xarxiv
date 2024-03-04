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

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

export { useNavigationHelper, formatDate };
