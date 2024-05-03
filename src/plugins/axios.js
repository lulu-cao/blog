import axios from 'axios';

const customAxios = axios.create({
  baseURL: "https://blog-cms-django-abaff6e17c2a.herokuapp.com/api/"
});

export default customAxios;
