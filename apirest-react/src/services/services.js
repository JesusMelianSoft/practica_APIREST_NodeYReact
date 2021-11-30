import axios from 'axios';
const API_URL = 'http://localhost:8001/api/v1';

const agetAllActors = () => {
    return axios.get(`${API_URL}/actors`).then((response) => response.data);
}

const aDelActor = (id) => {
    return axios.delete(`${API_URL}/actor/${id}`).then((response) => response.data);
}
export default agetAllActors;
//module.exports = { agetAllActors , aDelActor}