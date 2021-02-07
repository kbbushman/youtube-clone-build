import React from "react";
import { GoogleLogin } from "react-google-login";
import Button from "../styles/Auth";
import { SignInIcon } from "./Icons";
import { authenticate } from "utils/api-client";

function GoogleAuth() {
  return (
    <GoogleLogin
      clientId="941567674278-gjkg5f89mqo5up4tujq1fuompihjoe3j.apps.googleusercontent.com"
      cookiePolicy="single_host_origin"
      onSuccess={authenticate}
      onFailure={authenticate}
      render={(renderProps) => (
        <Button
          tabIndex={0}
          type="button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <span className="outer">
            <span className="inner">
              <SignInIcon />
            </span>
            sign in
          </span>
        </Button>
      )}
    />
  );
}

export default GoogleAuth;
