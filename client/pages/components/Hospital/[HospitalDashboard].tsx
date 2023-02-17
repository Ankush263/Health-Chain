import Link from 'next/link'
import React, { useState, useRef, useEffect } from 'react'
import DoctorDetailsCard from '../../../components/cards/DoctorDetailsCard'
import { useRouter } from 'next/router';
// import { getHospitalByWalletAddress, updateHospital } from '../../../Api';
import { getHospitalByWalletAddress, updateHospital } from '../../api/index';
import { ethers } from 'ethers';
import { uploadFileToIPFS } from '../../../Api/pinata';
import ABI from '../../../utils/Healthcare.json'
import Swal from 'sweetalert2';

function HospitalDashboard() {
  interface hospitalDetailsType {
    _id: String,
    image: any;
    name: String,
    walletAddress: String,
    email: String,
    description: String,
    location: String,
    telephone: [String],
    allDoctors: {
      doctors: []
    }
  }

  const deployAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }

  const [filename, setFilename] = useState('');
  const [uploaded, setUploaded] = useState(false)
  const [hospitalDetails, setHospitalDetails] = useState<hospitalDetailsType>({
    _id: '',
    image: '',
    name: '',
    walletAddress: '',
    email: '',
    description: '',
    location: '',
    telephone: [''],
    allDoctors: {
      doctors: []
    }
  })
  const inputRef = useRef<HTMLInputElement>(null);
  const [doctorDetails, setDoctorDetails] = useState({
    name: ``,
    walletAddress: '',
    email: '',
    description: '',
    image: '',
    specialistAt: '',
    time: '',
    day: ''
  })


  const fetch = async () => {
    try {
      const walletAddress = await signer.getAddress()
      const response = await getHospitalByWalletAddress(walletAddress)
      const data = response.data.data.hospital[0]
      setHospitalDetails(data)
      setDoctorDetails(response.data.data.hospital[0]?.allDoctors?.doctors)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const uploadFile = async (e: any) => {
    let file = e.target.files[0]
    try {
      const response = await uploadFileToIPFS(file)
      if(response.success === true) {
        setDoctorDetails({ ...doctorDetails, image: `${response.pinataURL}` })
        setUploaded(true)
        const data1 = (response.pinataURL).slice(34, 41)
        const data2 = (response.pinataURL).slice(75, (response.pinataURL).length)
        setFilename(`${data1}.....${data2}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAddDoctor = async () => {
    try {
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      const id = hospitalDetails?._id
      const walletAddress = await signer.getAddress()
      const response = await getHospitalByWalletAddress(walletAddress)
      const doctor = response.data.data.hospital[0]?.allDoctors?.doctors

      let addDoctor: any
      if(typeof doctor === 'undefined') {
        addDoctor = {
          allDoctors: {
            doctors: [
              {
                name: doctorDetails.name,
                walletAddress: doctorDetails.walletAddress,
                email: doctorDetails.email,
                image: doctorDetails.image,
                description: doctorDetails.description,
                specialistAt: doctorDetails.specialistAt,
                availableTime: doctorDetails.time,
                availableDate: doctorDetails.day
              }
            ]
          }
        }
      }else {
        addDoctor = {
          allDoctors: {
            doctors: [
              ...doctor,
              {
                name: doctorDetails?.name,
                walletAddress: doctorDetails?.walletAddress,
                email: doctorDetails?.email,
                image: doctorDetails?.image,
                description: doctorDetails?.description,
                specialistAt: doctorDetails?.specialistAt,
                availableTime: doctorDetails?.time,
                availableDate: doctorDetails?.day
              }
            ]
          }
        }
      }

      const add = await updateHospital(id, addDoctor)
      const doctorAddress = doctorDetails?.walletAddress
      await contract.allowDoctor(doctorAddress)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You Successfully add a Doctor',
        showConfirmButton: false,
        timer: 1500
      })

      window.location.reload()

    } catch (error: any) {
      console.log(error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`
      })
    }
  }

  useEffect(() => {
    fetch()
  }, [])


  const styles = {
    main: `w-full min-h-screen flex flex-col justify-center items-center`,
    top_container: `w-9/12 flex justify-between items-center`,
    top_left_container: `w-4/12 mt-16 flex flex-col justify-around items-center`,
    top_right_container: `w-6/12 h-full`,
    img_container: `w-10/12 h-full mt-6 mb-6`,
    doc_img_container: `w-10/12 h-3/6 mt-6 mb-6`,
    name_container: `h-10 bg-white border-2 drop-shadow-2xl p-2 mt-10`,
    about_container: `h-28 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    location_container: `h-16 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    phone_container: `h-20 border-2 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    bottom_container: `w-full mt-40 mb-20 flex justify-around`,
    semibold_txt: `font-semibold text-lg`,
    search_area: `border-2 w-6/12 h-10 flex drop-shadow-2xl mb-5 mt-40`,
    sub_box: `w-3/12 bg-white`,
    btn: `w-3/12 bg-high_contrast_yellow border-l-2 active:bg-grinish-yellow`,
    btm_left: `w-3/12 flex flex-col justify-start items-center`,
    btm_right: `w-4/12 mr-20`,

    main_box: `bg-parrot_green w-full h-full drop-shadow-2.5xl border-2 flex flex-col justify-around p-10`,
    input_bg: `h-12 mt-3 mb-3 flex justify-between`,
    large_input_bg: `h-32 mt-5 mb-5`,
    small_input_box: `bg-white border-2 drop-shadow-2xl w-5/12 h-full`,
    l_small_input_box: `bg-ocen_blue border-2 drop-shadow-2xl w-full p-2 h-12 ml-auto cursor-pointer active:drop-shadow-xl active:mt-2`,
    connect_wallet: `bg-high_contrast_yellow border-2 drop-shadow-2xl w-5/12 h-full flex flex-col justify-center items-center active:mt-2 active:drop-shadow-xl active:bg-grinish-yellow`,
    signup: `bg-light-sky border-2 drop-shadow-2xl w-5/12 h-10 mx-auto active:mt-2 active:drop-shadow-xl active:bg-ocen_blue`,
    large_input_box: `bg-white border-2 drop-shadow-2xl w-full h-full`,
  }
  return (
    <div className={styles.main}>
      <div className={styles.top_container}>
        <div className={styles.top_left_container}>
          <div className={styles.img_container}>
            <img 
              src={`${hospitalDetails?.image}`}
              alt="" 
              className='drop-shadow-2.5xl border-4 w-full h-full' 
              onClick={() => console.log(hospitalDetails)}
            />
          </div>
          <div className={styles.name_container}>
            <span className={styles.semibold_txt}>{hospitalDetails?.name}</span>
          </div>
        </div>
        <div className={styles.top_right_container}>
          <div className={styles.about_container}>
            <span className={styles.semibold_txt}>About:</span>
            <span>{hospitalDetails?.description}</span>
          </div>
          <div className={styles.location_container}>
            <span className={styles.semibold_txt}>Location:</span>
            <span>{hospitalDetails?.location}</span>
          </div>
          <div className={styles.phone_container}>
            <span className={styles.semibold_txt}>Phone:</span>
            <span>{hospitalDetails?.telephone}</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom_container}>
        <div className={styles.btm_left}>
          <div className={styles.doc_img_container}>
            <img 
              src="/images/doctor_poster2.png" 
              alt="" 
              className='drop-shadow-2.5xl border-2 w-full h-full' 
            />
          </div>
          <span className='text-2xl mt-10'>Add Doctors</span>
        </div>
        <div className={styles.btm_right}>

        <div className={styles.main_box}>
            <div className={styles.input_bg}>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='name:'
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, name: e.target.value })}
                />
              </div>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-xl'
                  placeholder='wallet address:'
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, walletAddress: e.target.value })}
                />
              </div>
            </div>
            <div className={styles.input_bg}>
              <div className={styles.large_input_box}>
                <input 
                  type="email"
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='email:'
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, email: e.target.value })}
                />
              </div>
            </div>

            <div className={styles.large_input_bg}>
              <div className={styles.large_input_box}>
                <textarea 
                  name="" 
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='description:'
                  cols={30}
                  rows={10}
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, description: e.target.value })}
                ></textarea>
              </div>
            </div>

            <div className={styles.input_bg}>
              <div className="flex flex-col items-start">
                <label className={styles.l_small_input_box}>
                  <span>{uploaded ? `Uploaded ✅` : `Upload Image`}</span>
                  <input type="file" ref={inputRef} onChange={uploadFile} className="hidden"/>
                </label>
                <span className="ml-3 text-gray-600">{filename}</span>
              </div>

              <div className={styles.small_input_box}>
                <select 
                  name="type" 
                  className='h-full w-full' 
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, specialistAt: e.target.value })}
                >
                  <option value="">Specialist At...</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="DietNutrition">DietNutrition</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Gynecologic">Gynecologic</option>
                  <option value="Nurologic">Nurologic</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Pediatric">Pediatric</option>
                  <option value="PlasticSurgery">PlasticSurgery</option>
                  <option value="Psychiatric">Psychiatric</option>
                  <option value="Renal">Renal</option>
                  <option value="Urologic">Urologic</option>
                </select>
              </div>

            </div>
            <div className={styles.input_bg}>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-sm'
                  placeholder='Time: 9:00am - 5:00pm'
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, time: e.target.value })}
                />
              </div>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-lg'
                  placeholder='Day: Mon - Fri'
                  onChange={(e) => setDoctorDetails({ ...doctorDetails, day: e.target.value })}
                />
              </div>
            </div>
            
            <div className={styles.input_bg}>
              <button className={styles.signup} onClick={handleAddDoctor}>
                <span>{`Add Doctor +`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-8/12 mb-20 mt-10">
        {
          hospitalDetails.allDoctors?.doctors.map((i: any) => {
            return (
              <DoctorDetailsCard 
                key={i?._id}
                name={i?.name}
                image={i?.image}
                email={i?.email}
                walletAddress={i?.walletAddress}
                description={i?.description}
                specialistAt={i?.specialistAt}
                day={i?.availableDate}
                time={i?.availableTime}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default HospitalDashboard