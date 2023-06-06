import Realm from "realm";
import { google } from "googleapis";

const googleApiKey = "AIzaSyBeHgNLRxgidrr4OBPPxniHgiAgLVFXq-Q";
const nprojectId = "order-app-375121";
const clientId =
  "1073761024844-o5uku48f5fam1607kf2nrlles1u3lsst.apps.googleusercontent.com";
const client_secret = "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";

const oauthConfig = {
  client_id: clientId,
  project_id: nprojectId,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_secret: client_secret,
  redirect_uris: [`${"http://localhost:3000"}/auth/login`],
  JWTsecret: "secret",
  scopes: [
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
    "openid",
    // any other scopes you might require. View all here - https://developers.google.com/identity/protocols/oauth2/scopes
  ],
};

export default function oauth() {
  const CLIENT_ID = oauthConfig.client_id;
  const CLIENT_SECRET = oauthConfig.client_secret;
  const REDIRECT_URL = oauthConfig.redirect_uris[0];

  const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );
  return oAuth2Client;
}
