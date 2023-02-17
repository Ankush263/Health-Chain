import React, { useState, useRef, useEffect } from 'react'
// import { getSinglePatientByWalletAddress } from '../../Api';
import { getSinglePatientByWalletAddress } from '../../pages/api/index';
import { uploadFileToIPFS } from '../../Api/pinata';
import Swal from 'sweetalert2';
import { ethers } from 'ethers';
import ABI from '../../utils/Healthcare.json';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 5,
    props: {
      walletAddress: ''
    }
  }
}

function PatientCard(props: any) {
  const [displayFileName, setDisplayFileName] = useState('');
  const [fileName, setFileName] = useState('')
  const [uploaded, setUploaded] = useState(false)
  const [sendClick, setSendClick] = useState(false)
  const [reportName, setReportName] = useState('')
  const [patientDetails, setPatientDetails] = useState({
    name: '',
    email: '',
    age: 0,
    gender: '',
  })
  const inputRef = useRef<HTMLInputElement>(null);

  const deployAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }


  const uploadFile = async (e: any) => {
    let file = e.target.files[0]
    try {
      const response = await uploadFileToIPFS(file)
      if(response.success === true) {
        setFileName(response.pinataURL)
        setUploaded(true)
        const data1 = (response.pinataURL).slice(34, 41)
        const data2 = (response.pinataURL).slice(65, (response.pinataURL).length)
        setDisplayFileName(`${data1}.....${data2}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const fetch = async () => {
    try {
      const patient = await getSinglePatientByWalletAddress(props.walletAddress)
      const singlePatient = patient.data.data.patient[0]
      setPatientDetails({
        name: singlePatient.name,
        email: singlePatient.email,
        age: singlePatient.age,
        gender: singlePatient.gender
      })
      console.log("singlePatient: ", singlePatient)
    } catch (error) {
      console.log(error)
    }
  }

  const setReport = async () => {
    try {
      setSendClick(prev => !prev)
      Swal.fire({
        title: 'Name of the report',
        html: `<input type="text" id="name" class="swal2-input" placeholder="Name of the report">`,
        confirmButtonText: 'Done',
        focusConfirm: false,
        preConfirm: () => {
          const name = (Swal.getPopup()?.querySelector('#name') as HTMLInputElement)?.value
          if (!name) {
            Swal.showValidationMessage(`Please enter name`)
          }
          return { name: name }
        }
      }).then(async (result: any) => {
        console.log("Clicked")
        setReportName(result.value?.name)
        Swal.fire(`
          Name: ${result.value?.name}
        `.trim())
      })
    } catch (error) {
      console.log(error)
    }
  }

  const sendReport = async () => {
    try {
      setSendClick(prev => !prev)
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      console.log("Contract", contract)
      console.log("_to: ", props.walletAddress)
      console.log("_reportName: ", reportName)
      console.log("_prescription: ", fileName)

      const response = await contract.sendReport(props.walletAddress, reportName, fileName)

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You Successfully Send the report',
        showConfirmButton: false,
        timer: 1500
      })
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    card_container: `border-2 w-full h-42 bg-white drop-shadow-2xl p-2 flex justify-between items-center mb-10`,
    left: `h-full w-7/12 flex flex-col p-2`,
    mid: `h-full w-2/12 mr-20`,
    right: `h-full w-2/12 p-2`,
    l_small_input_box: `bg-ocen_blue border-2 drop-shadow-2xl w-11/12 p-2 h-12 ml-auto cursor-pointer active:drop-shadow-xl active:mt-2`,
    btn: `bg-light-sky w-full h-10 drop-shadow-2xl active:drop-shadow-xl active:mt-2 border-2`,
    btn_green: `bg-deep_green w-full h-10 drop-shadow-2xl active:drop-shadow-xl active:mt-2 border-2`
  }
  return (
    <div className={styles.card_container}>
      <div className={styles.left}>
        <span className='text-xl font-semibold'>{patientDetails.name}</span>
        <span>{patientDetails.email}</span>
        <span>{props.walletAddress}</span>
        <div className='flex w-3/12 justify-between'>
          <span>age: {patientDetails.age}+</span>
          <span>{patientDetails.gender}</span>
        </div>
      </div>
      <div className={styles.mid}>
        <div className="flex items-center flex-col">
          <label className={styles.l_small_input_box}>
            <span>{uploaded ? `Uploaded` : `Upload report +`}</span>
            <input type="file" ref={inputRef} onChange={uploadFile} className="hidden"/>
          </label>
          <span className="ml-3 text-gray-600">{displayFileName}</span>
        </div>
      </div>
      <div className={styles.right}>
        {
          sendClick ?
          <button className={styles.btn_green} onClick={sendReport}>
            <span>{"Click here to Send"}</span>
          </button> 
          :
          <button className={styles.btn} onClick={setReport}>
            <span>{"Send Report >>"}</span>
          </button>
        }
        
      </div>
    </div>
  )
}

export default PatientCard