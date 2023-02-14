import React, { useState, useEffect } from 'react';
import { getSinglePatient } from '../../Api';
import { ethers } from 'ethers';
import ABI from '../../utils/Healthcare.json';
import { uploadJSONToIPFS } from '../../Api/pinata';
import { deleteBooking } from '../../Api';

function NotificationCard(props: any) {
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    walletAddress: ''
  })

  const deployAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }

  const fetch = async () => {
    try {
      const response = await getSinglePatient(props.id)
      const patient = response.data.data.patient[0]
      console.log(patient)
      setPatientDetails(
        {
          name: patient.name,
          email: patient.email,
          age: patient.age,
          gender: patient.gender,
          walletAddress: patient.walletAddress
        }
      )
      console.log(props.id)
    } catch (error) {
      console.log(error)
    }
  }

  const uploadMetadataToIPFS = async () => {
    try {
      const response = await uploadJSONToIPFS({
        name: patientDetails.name,
        email: patientDetails.email,
        age: patientDetails.age,
        gender: patientDetails.gender,
        id: props.id,
        walletAddress: patientDetails.walletAddress
      })
      if(response.success === true) {
        return response.pinataURL
      }
    } catch (error) {
      console.log("Upload metadata to IPFS error: ", error)
    }
  }

  const addPatient = async () => {
    try {
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      const patientJSON = await uploadMetadataToIPFS()
      const deleteBook = await deleteBooking(props.bookingId)
      const add = await contract.addPatient(patientDetails, patientDetails.walletAddress)
      console.log("Add response: ", add)
      console.log("deleteBook response: ", deleteBook)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    card_container: `border-2 w-11/12 h-36 bg-white mb-10 drop-shadow-2xl flex justify-between`,
    left_container: `w-7/12 h-full flex flex-col p-2`,
    right_container: `w-3/12 h-full flex justify-center items-center`,
    btn: `bg-light-sky p-2 border-2 w-11/12 h-10 drop-shadow-2xl mr-5 active:mt-5 active:drop-shadow-xl`
  }
  return (
    <div>
      <div className={styles.card_container}>
        <div className={styles.left_container}>
          <span>{patientDetails.name}</span>
          <span>{patientDetails.email}</span>
          <div className='flex w-7/12 justify-between'>
            <span>age: {patientDetails.age}</span>
            <span>{patientDetails.gender}</span>
          </div>
          <span className='font-semibold text-sm'>Booking Time: {props.time}</span>
          <span className='font-semibold text-sm'>Booking Date: {props.date}</span>
        </div>
        <div className={styles.right_container}>
          <button className={styles.btn} onClick={addPatient}>{"Add +"}</button>
        </div>
      </div>
    </div>
  )
}

export default NotificationCard