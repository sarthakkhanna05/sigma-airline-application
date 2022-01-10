import axios from 'axios';
import Config from '../config';
import Cookies from 'js-cookie';

const JwtCookieName = 'logged_in';
const Domain = 'localhost';

class BaseClient {
  constructor() {
    this.axios = this._getInstance();
  }

  _getInstance() {
    const base = {
      baseURL: Config.baseDomain,
      timeout: 10000,
      withCredentials: true,
      headers: {
        // 'x-app-id': 'client-app'?
      }
    }
    const jwtCookie = Cookies.get(JwtCookieName);
    if (jwtCookie) {
      base.headers['x-jwt-token'] = jwtCookie;
    }
    const instance = axios.create(base);
    instance.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      if (error.response && error.response.status === 401) {
        Cookies.remove(JwtCookieName, { path: '', domain: Domain });
        window.location = '/';
      }
      if (error.response) {
        error = error.response.data;
      }
      return Promise.reject(error);
    });

    return instance;
  }



  async get(url) {
    try {
      let res = await this.axios.get(url);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async post(url, payload) {
    try {
      let res = await this.axios.post(url, payload)
      return res;
    } catch (error) {
      throw error;
    }
  }

  async delete(url, payload) {
    try {
      let res = await this.axios.delete(url, payload)
      return res;
    } catch (error) {
      throw error;
    }
  }
}
export default BaseClient;