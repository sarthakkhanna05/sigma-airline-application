import BaseClient from './base-client';

class FlightClient extends BaseClient {
  constructor() {
    super();
    this.baseURL = 'api';
  }

  async flightSearch(payload) {
    try {
      const url = `${this.baseURL}/flight/search`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async flightBook(payload) {
    try {
      const url = `${this.baseURL}/reservation/create`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }

  async flightCreate(payload) {
    try {
      const url = `${this.baseURL}/flight/create`;
      const res = await this.post(url, payload);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

export default FlightClient;