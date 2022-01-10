import BaseClient from './base-client';

class SSOClient extends BaseClient {
  constructor() {
    super();
    this.baseURL = 'api';
  }

  async userLogin(payload) {
    try {
      const url = `${this.baseURL}/passenger/login`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async userSignUp(payload) {
    try {
      const url = `${this.baseURL}/passenger/signup`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getUser(payload) {
    try {
      const url = `${this.baseURL}/passenger`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async getReservation(payload) {
    try {
      const url = `${this.baseURL}/reservation`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async cancelReservation(payload) {
    try {
      const url = `${this.baseURL}/reservation/remove`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default SSOClient;