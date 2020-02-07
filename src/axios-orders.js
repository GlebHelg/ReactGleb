import axios from 'axios';

const axios_orders = axios.create({
    baseURL: 'https://whenafirestartstoburn-2c250.firebaseio.com/'
});

export default axios_orders;