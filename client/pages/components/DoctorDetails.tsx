import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NotificationCard from '../../components/cards/NotificationCard';
import PatientCard from '../../components/cards/PatientCard';
import { ethers } from 'ethers';
import ABI from "../../utils/Healthcare.json"
// import { 
//   getDoctorByWalletAddress, 
//   getHospitalByWalletAddress, 
//   getBookingByDoctorId 
// } from '../../Api';
import { 
  getDoctorByWalletAddress, 
  getHospitalByWalletAddress, 
  getBookingByDoctorId 
} from '../../pages/api/index';

function DoctorDetails() {
  const [filename, setFilename] = useState('');
  const [myPatients, setMyPatients] = useState([])
  const inputRef = useRef<HTMLInputElement>(null);
  const [doctorDetails, setDoctorDetails] = useState({
    name: '',
    description: '',
    image: ''
  })
  const [bookingDetails, setBookingDetails] = useState([])

  const deployAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }


  const fetch = async () => {
    try {
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      const hospitalAddress = await contract.showMyHospital()
      const address = await signer.getAddress()
      const hospitalResponse = await getHospitalByWalletAddress(hospitalAddress)
      const id = hospitalResponse.data.data.hospital[0]._id
      const doctorAbout = await getDoctorByWalletAddress(id, address)
      const doctor = doctorAbout.data.data.doctor
      const booking = await getBookingByDoctorId(doctorAbout.data.data.doctor._id)
      const allMyPatient = await contract.getAllMyAddedPatient()
      setMyPatients(allMyPatient)
      setDoctorDetails({ name: doctor.name, description: doctor.description, image: doctor.image })
      setBookingDetails(booking.data.data.booking)
      console.log("allMyPatient: ", allMyPatient)
    } catch (error) {
      console.log(error)
    }
  }

  const onFileChange = () => {
    setFilename(inputRef.current!.files![0].name);
  };

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    main: `w-full flex flex-col items-center`,
    upper: `w-full h-screen flex justify-around items-center`,
    left_container: `w-5/12 h-5/6 flex flex-col justify-between items-start ml-20`,
    img_container: `border-2 w-6/12 h-4/6 drop-shadow-2.5xl ml-10`,
    txt_container: `w-11/12 h-1/6 flex flex-col justify-center items-start ml-10`,
    name_container: `w-5/12 h-10 bg-white border-2 drop-shadow-2xl flex justify-center items-center`,
    btn_container: `w-11/12 h-1/6`,
    btn_bg: `w-7/12 h-5/6 bg-white border-2 drop-shadow-2xl ml-10 p-1 active:drop-shadow-xl active:bg-ocen_blue p-2 overflow-auto`,
    right_container: `w-4/12 h-5/6 mr-20`,
    main_box: `bg-dark_pink w-full h-full drop-shadow-2.5xl border-2 flex flex-col justify-start items-between p-10 overflow-auto`,
    lower: `w-8/12 mb-20 mt-20`
  }
  return (
    <div className={styles.main}>
      <div className={styles.upper}>
        <div className={styles.left_container}>
          <div className={styles.img_container}>
            <img src={`${doctorDetails.image}`} alt="" className='w-full h-full' onClick={fetch}  />
          </div>
          <div className={styles.txt_container}>
          <div className={styles.name_container}>
            <span>{doctorDetails.name}</span>
          </div>
          </div>
          <div className={styles.btn_container}>
            <div className={styles.btn_bg}>
              <span>{doctorDetails.description}</span>
            </div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.main_box}>
            {
              bookingDetails.map((i: any) => {
                return (
                  <NotificationCard 
                    key={i._id}
                    bookingId={i._id}
                    id={i.patientID}
                    date={i.bookingDate}
                    time={i.bookingTime}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        {
          myPatients.map((i: any) => {
            return (
              <PatientCard
               key={i}
               walletAddress={i}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default DoctorDetails