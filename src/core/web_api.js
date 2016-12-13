import auth0 from 'auth0-js';
import Auth0LegacyAPIClient from './web_api/legacy_api'
import Auth0APIClient from './web_api/p2_api'

class Auth0WebAPI {
  constructor() {
    this.clients = {};
  }

  setupClient(lockID, clientID, domain, opts) {
    if (opts.legacyMode) {
      this.clients[lockID] = new Auth0LegacyAPIClient(clientID, domain, opts);
    } else {
      this.clients[lockID] = new Auth0APIClient(clientID, domain, opts);
    }
  }

  logIn(lockID, options, authParams, cb) {
    this.clients[lockID].logIn(options, authParams, cb);
  }

  signOut(lockID, query) {
    this.clients[lockID].logout(query);
  }

  signUp(lockID, options, cb) {
    this.clients[lockID].signUp(options, cb);
  }

  resetPassword(lockID, options, cb) {
    this.clients[lockID].changePassword(options, (err, data) => cb(err, data && data.countryCode));
  }

  startPasswordless(lockID, options, cb) {
    this.clients[lockID].startPasswordless(options, cb);
  }

  parseHash(lockID, hash = '') {
    return this.clients[lockID].parseHash(decodeURIComponent(hash));
  }

  getUserInfo(lockID, token, callback) {
    return this.clients[lockID].getUserInfo(token, callback);
  }

  getSSOData(lockID, ...args) {
    return this.clients[lockID].getSSOData(...args);
  }

  getUserCountry(lockID, cb) {
    return this.clients[lockID].getUserCountry(cb);
  }
}

export default new Auth0WebAPI();
