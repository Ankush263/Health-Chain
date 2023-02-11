import axios from 'axios'

const HOSPITAL_URL = `http://localhost:5000/api/v1/hospital`
const PATIENT_URL = `http://localhost:5000/api/v1/patient`
const BOOKING_URL = `http://localhost:5000/api/v1/booking`

const HOSPITAL_API = axios.create({ baseURL: HOSPITAL_URL })
const PATIENT_API = axios.create({ baseURL: PATIENT_URL })
const BOOKING_API = axios.create({ baseURL: BOOKING_URL })

// ----------ALL HOSPITAL FUNCTIONS----------
export const getAllHospitals = () => HOSPITAL_API.get('/')
export const getSingleHospitalById = (id: any) => HOSPITAL_API.get(`/${id}`)
export const createHospital = (_hospitalDetails: any) => HOSPITAL_API.post('/', _hospitalDetails)
export const updateHospital = (_updateDetails: any) => HOSPITAL_API.patch('/:id', _updateDetails)

// ----------ALL PATIENT FUNCTIONS----------
export const signup = (_signupDetails: any) => PATIENT_API.post('/signup', _signupDetails)
export const login = (_loginDetails: any) => PATIENT_API.post('/login', _loginDetails)
