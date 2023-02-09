import type { NextPage } from 'next';
import FontPage from '../components/FontPage';
import PatientSignup from '../components/PatientSignup';
import AllHospitals from '../components/AllHospitals';

const Home: NextPage = () => {
  return (
    <div>
      <FontPage />
      <PatientSignup />
      <AllHospitals />
    </div>
  )
}

export default Home
