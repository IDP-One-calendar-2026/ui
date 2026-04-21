import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthTokens } from "@/lib/auth";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken) {
      setAuthTokens(accessToken, refreshToken || undefined);
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate('/', { replace: true });
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
}