import axios from 'axios'

const HOSPITAL_URL = `https://healthcare-f6fj.onrender.com/api/v1/hospital`
const PATIENT_URL = `https://healthcare-f6fj.onrender.com/api/v1/patient`
const BOOKING_URL = `https://healthcare-f6fj.onrender.com/api/v1/booking`

const HOSPITAL_API = axios.create({ baseURL: HOSPITAL_URL })
const PATIENT_API = axios.create({ baseURL: PATIENT_URL })
const BOOKING_API = axios.create({ baseURL: BOOKING_URL })

// ----------ALL HOSPITAL FUNCTIONS----------
export const getAllHospitals = () => HOSPITAL_API.get('/')
export const getHospitalByWalletAddress = (_walletAddress: any) => HOSPITAL_API.get(`/?walletAddress=${_walletAddress}`)
export const getSingleHospitalById = (id: any) => HOSPITAL_API.get(`/${id}`)
export const createHospital = (_hospitalDetails: any) => HOSPITAL_API.post('/', _hospitalDetails)
export const updateHospital = (_id: any, _updateDetails: any) => HOSPITAL_API.patch(`/${_id}`, _updateDetails)
export const getDoctorByWalletAddress = (_id: any, _walletAddress: any) => HOSPITAL_API.get(`/${_id}/${_walletAddress}`)

// ----------ALL PATIENT FUNCTIONS----------
export const signup = (_signupDetails: any) => PATIENT_API.post('/signup', _signupDetails)
export const login = (_loginDetails: any) => PATIENT_API.post('/login', _loginDetails)
export const getSinglePatient = (_patientId: any) => PATIENT_API.get(`/${_patientId}`)
export const getSinglePatientByWalletAddress = (_address: any) => PATIENT_API.get(`/?walletAddress=${_address}`)

// ----------ALL BOOKING FUNCTIONS----------
export const createBooking = (_bookingDetails: any) => BOOKING_API.post(`/`, _bookingDetails)
export const getBookingByDoctorId = (_doctorId: any) => BOOKING_API.get(`/?doctorID=${_doctorId}`)
export const deleteBooking = (_bookingId: any) => BOOKING_API.delete(`/${_bookingId}`)
