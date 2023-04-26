import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_API_HOST}/api/test/`;

class UserService {
  getListe_User() {
 
    return axios.get(API_URL + 'liste_user' ,{ headers: authHeader() });
  }
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getCemecaBoard() {
    return axios.get(API_URL + 'cemeca', { headers: authHeader() });
  }
  getSofitechBoard() {
    return axios.get(API_URL + 'sofitech', { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(API_URL + 'mod', { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(API_URL + 'admin-societe', { headers: authHeader() });
  }
}

export default new UserService();
