import { useAuth } from "context/auth-context";
import { useGoogleLogin } from "react-google-login";
import { authenticate } from "utils/api-client";

export default function useAuthAction() {
  const user = useAuth();
  const { signIn } = useGoogleLogin({
    onSuccess: authenticate,
    clientId:
      "941567674278-gjkg5f89mqo5up4tujq1fuompihjoe3j.apps.googleusercontent.com",
  });

  function handleAuthAction(authAction, data) {
    if (user) {
      authAction(data);
    } else {
      signIn();
    }
  }

  return handleAuthAction;
}
