import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import NotificationCard from '../../components/cards/NotificationCard';
import PatientCard from '../../components/cards/PatientCard';
import { ethers } from 'ethers';
import ABI from "../../utils/Healthcare.json"
import { getDoctorByWalletAddress, getHospitalByWalletAddress } from '../../Api';

function DoctorDetails() {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const deployAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
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
      const hospitalResponse = await getHospitalByWalletAddress(hospitalAddress)
      const id = hospitalResponse.data.data.hospital[0]._id
      const doctor = await getDoctorByWalletAddress(id, hospitalAddress)
      console.log("Hospital Id is: ", id)
      console.log("doctor is: ", doctor)
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
            <img src="/images/unnamed.png" alt="" className='w-full h-full' onClick={fetch}  />
          </div>
          <div className={styles.txt_container}>
          <div className={styles.name_container}>
            <span>Dr. ABC Dev Roy</span>
          </div>
          </div>
          <div className={styles.btn_container}>
            <div className={styles.btn_bg}>
              <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis placeat distinctio suscipit laudantium voluptate asperiores velit repellat odit, aspernatur ipsa?</span>
            </div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.main_box}>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </div>
    </div>
  )
}

export default DoctorDetails