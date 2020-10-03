import axios from 'axios';
import API_URL from '../API_URL';
//const API_URL = 'http://localhost:8000';
axios.defaults.headers.common['Authorization'] = `JWT ${localStorage.getItem('token')}` // for all requests
export default class HousingService{

    constructor(){}


    getHousings() {
        const url = `${API_URL}/api/housings/`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
        }   
    getMyHousings() {
        const url = `${API_URL}/api/myhousing/`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
        }
           
    getHousingsByURL(link){
        const url = `${API_URL}${link}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
    getHousing(pk) {
        const url = `${API_URL}/api/housings/${pk}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
    deleteHousings(housing){
        const url = `${API_URL}/api/housings/${housing.pk}`;
        return axios.delete(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} });
    }
    createHousing(housing){
        const url = `${API_URL}/api/housings/`;
        return axios.post(url,housing,{
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data',
            }
        });
    }
    updateHousing(housing){
        //console.log(housing);
        const url = `${API_URL}/api/housings/${housing.pk}`;
        return axios.put(url,housing,{
            headers: {
                Authorization: `JWT ${localStorage.getItem('token')}`,
                'content-type': 'multipart/form-data',
            }
        });
    }
    searchHousing(query, field){
        const url = `${API_URL}/api/housings/s/${field}/${query}`;
        return axios.get(url,{ headers: {Authorization: `JWT ${localStorage.getItem('token')}`} }).then(response => response.data);
    }
}