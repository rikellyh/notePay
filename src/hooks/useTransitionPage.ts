import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

export const usePageTransition = () => {
  const [fadeOut, setFadeOut] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setFadeOut(true);
  }, [location]);

  return { fadeOut };
};
