import { useEffect, useContext, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AlertContext } from "../model/context";

export const usePreventLeave = (shouldPrevent: boolean, message: string) => {
  const { alert } = useContext(AlertContext);
  const navigate = useNavigate();
  const location = useLocation();

  // 나가기, 새로고침, url 변경시 되묻기 
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (shouldPrevent) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [shouldPrevent]);

  const handleNavigation = useCallback(async () => {
    if (shouldPrevent) {
      const result = await alert(message, "확인", "취소");
      return result;
    }
    return true;
  }, [shouldPrevent, message, alert]);

  // 뒤로가기 방지
  useEffect(() => {
    const preventGoBack = async (event: PopStateEvent) => {
      if (shouldPrevent) {
        event.preventDefault();
        if (await handleNavigation()) {
          navigate(-1);
        } else {
          history.pushState(null, "", location.pathname);
        }
      }
    };
    window.addEventListener("popstate", preventGoBack);
    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, [handleNavigation, location.pathname, navigate, shouldPrevent]);
};
