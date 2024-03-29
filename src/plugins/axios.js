// This file adds baseURL to axios; you can import it for every file that needs baseURL
// This file helps reduce complexity of other files and repetitiveness for adding baseURL
import axios from 'axios';

axios.defaults.baseURL= process.env.VUE_APP_API_URL;

export default axios;