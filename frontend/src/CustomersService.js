import axios from 'axios';
import API_URL from './API_URL';
//const API_URL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}` // for all requests
export default class CustomersService{

    constructor(){}


    getCustomers() {
        const url = `${API_URL}/api/customers/`;
        //return axios.get(url).then(response => response.data);
        /*
        return axios({
            method: 'get',
            url: `${API_URL}/api/customers/`,
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`
              },
          }).then(response => response.data);*/
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
        }   
    getCustomersByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
    getCustomer(pk) {
        const url = `${API_URL}/api/customers/${pk}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
    deleteCustomer(customer){
        const url = `${API_URL}/api/customers/${customer.pk}`;
        return axios.delete(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} });
    }
    createCustomer(customer){
        const url = `${API_URL}/api/customers/`;
        return axios.post(url,customer,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} });
    }
    updateCustomer(customer){
        const url = `${API_URL}/api/customers/${customer.pk}`;
        return axios.put(url,customer,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} });
    }
    searchCustomer(query, field){
        const url = `${API_URL}/api/customers/s/${field}/${query}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
}