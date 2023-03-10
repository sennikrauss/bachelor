import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  // Url des Authorization-Servers
  issuer: 'http://localhost:3001/countries',

  // Url der Angular-Anwendung
  // An diese URL sendet der Authorization-Server den Access Code
  redirectUri: window.location.origin + '/countries',

  // Name der Angular-Anwendung
  clientId: 'spa',

  // Rechte des Benutzers, die die Angular-Anwendung wahrnehmen möchte
  scope: 'openid profile email offline_access api',

  // Code Flow (PKCE ist standardmäßig bei Nutzung von Code Flow aktiviert)
  responseType: 'code'

}
