import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';
import { ethers } from 'ethers';
import FileBase64 from 'react-file-base64';
// import { createHospital, getHospitalByWalletAddress } from '../../Api';
import { createHospital, getHospitalByWalletAddress } from '../api/index';
import Swal from 'sweetalert2';
import { uploadFileToIPFS } from '../../Api/pinata';
import ABI from '../../utils/Healthcare.json';

function AddHospital() {
  const [filename, setFilename] = useState('')
  const [uploaded, setUploaded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [connected, setConnected] = useState(false)
  const [hospitalDetails, setHospitalDetails] = useState({
    name: '',
    walletAddress: '',
    email: '',
    description: '',
    image: '',
    location: '',
    phone: ['']
  })

  const deployAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }

  const fetch = async () => {
    try {
      const address = await signer.getAddress()
      const response = await getHospitalByWalletAddress(address)
      if(response.data.data.hospital.length !== 0) {
        window.location.replace(`/components/Hospital/${address}`)
      }
      console.log(response)
      console.log(address)

    } catch (error) {
      console.log(error)
    }
  }


  const uploadFile = async (e: any) => {
    let file = e.target.files[0]
    try {
      const response = await uploadFileToIPFS(file)
      if(response.success === true) {
        setHospitalDetails({ ...hospitalDetails, image: `${response.pinataURL}` })
        // console.log(response.pinataURL)
        setUploaded(true)
        const data1 = (response.pinataURL).slice(34, 41)
        const data2 = (response.pinataURL).slice(65, (response.pinataURL).length)
        setFilename(`${data1}.....${data2}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleConnect = async () => {
    try{
      
      if (typeof window !== 'undefined') {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' })
        if(chainId != '0x13881') {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x13881' }],
          })
        }
        await window.ethereum.request({ method: 'eth_requestAccounts' })
        setConnected(true)
        setHospitalDetails({...hospitalDetails, walletAddress: await signer.getAddress()})
      }
    }catch(err) {
      console.log(err)
    }
  }

  // const 

  const handleSubmit = async () => {
    try {
      console.log(hospitalDetails)
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      const response = await createHospital({
        name: hospitalDetails.name,
        email: hospitalDetails.email,
        image: hospitalDetails.image,
        location: hospitalDetails.location,
        walletAddress: hospitalDetails.walletAddress,
        description: hospitalDetails.description,
        telephone: hospitalDetails.phone
      })

      const allowHospital = await contract.makeThisAddressHospital()

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You Successfully add your Hospital',
        showConfirmButton: false,
        timer: 1500
      })

      const id = response.data.data.hospital._id
      const address = await signer.getAddress()
      window.location.replace(`/components/Hospital/${address}`)
      
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
    main: `w-full h-screen flex justify-around items-center`,
    left_container: `w-5/12 h-5/6 flex flex-col justify-between items-start ml-20`,
    img_container: `border-2 w-6/12 h-3/6 drop-shadow-2.5xl ml-10`,
    txt_container: `w-11/12 h-1/6 flex flex-col justify-end`,
    txt_up: `text-2xl ml-16`,
    txt: `text-2xl ml-5`,
    btn_container: `w-11/12 h-1/6`,
    btn_bg: `w-48 h-10 bg-light-sky border-2 drop-shadow-2xl ml-20 p-1 active:drop-shadow-xl active:bg-ocen_blue p-2`,
    right_container: `w-4/12 h-5/6 mr-20`,
    main_box: `bg-dark_pink w-full h-full drop-shadow-3xl border-4 flex flex-col justify-around p-10`,
    input_bg: `h-12 mt-3 mb-3 flex justify-between`,
    large_input_bg: `h-32 mt-5 mb-5`,
    small_input_box: `bg-white border-2 drop-shadow-2xl w-5/12 h-full`,
    l_small_input_box: `bg-ocen_blue border-2 drop-shadow-2xl w-full p-2 h-12 ml-auto cursor-pointer active:drop-shadow-xl active:mt-2`,
    connect_wallet: `bg-high_contrast_yellow border-2 drop-shadow-2xl w-5/12 h-full flex flex-col justify-center items-center active:mt-2 active:drop-shadow-xl active:bg-grinish-yellow`,
    signup: `bg-light-sky border-2 drop-shadow-2xl w-5/12 h-10 mx-auto active:mt-2 active:drop-shadow-xl active:bg-ocen_blue pl-4 pt-1`,
    large_input_box: `bg-white border-2 drop-shadow-2xl w-full h-full`,
  }
  return (
    <div className={styles.main}>
      <div className={styles.left_container}>
        <div className={styles.img_container}>
          <img src="/images/hospital.png" alt="" className='w-full h-full'  />
        </div>
        <div className={styles.txt_container}>
        <TypeAnimation
              sequence={[
              `Let's fix the Healthcare sectors by adding Hospitals into Blockchain`,
              1000,
              `Unleashing the Power of Blockchain in Healthcare: Transforming Hospitals for Improved Patient Outcomes.`,
              1000,
              `Revolutionizing Healthcare through the integration of Hospitals and Blockchain technology, creating a secure and efficient system for all`,
              1000
              ]}
              speed={70}
              deletionSpeed={99}
              className={styles.txt}
              wrapper="span"
              repeat={Infinity}
            />
          
        </div>
        <div className={styles.btn_container}>
          <Link href={"/components/DoctorDetails"} className={styles.btn_bg}>
            <span className='text-xl'>Doctor dashboard</span>
          </Link>
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.main_box}>
        <div className={styles.input_bg}>
          <div className={styles.small_input_box}>
            <input 
              type="text" 
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='name:'
              onChange={(e) => setHospitalDetails({ ...hospitalDetails, name: e.target.value })}
            />
          </div>
          <button className={styles.connect_wallet} onClick={handleConnect}>
            {
              connected ?
              <span>Connected</span> :
              <span>Connect Wallet</span>
            }
          </button>
        </div>
        <div className={styles.input_bg}>
          <div className={styles.large_input_box}>
            <input 
              type="email"
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='email:'
              onChange={(e) => setHospitalDetails({ ...hospitalDetails, email: e.target.value })}
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
              onChange={(e) => setHospitalDetails({ ...hospitalDetails, description: e.target.value })}
            ></textarea>
          </div>
        </div>

        <div className={styles.input_bg}>
          <div className="flex items-center">
            <label className={styles.l_small_input_box}>
              <span>{uploaded ? `Uploaded` : `Upload Image`}</span>
              <input type="file" ref={inputRef} onChange={uploadFile} className="hidden"/>
            </label>
            <span className="ml-3 text-gray-600">{filename}</span>
          </div>
        </div>
        <div className={styles.input_bg}>
          <div className={styles.large_input_box}>
            <input 
              type="text"
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='location:'
              onChange={(e) => setHospitalDetails({ ...hospitalDetails, location: e.target.value })}
            />
          </div>
        </div>
        <div className={styles.input_bg}>
          <div className={styles.large_input_box}>
            <input 
              type="tel"
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='phone:'
              onChange={(e) => setHospitalDetails({ ...hospitalDetails, phone: [e.target.value]})}
            />
          </div>
        </div>
        
        <div className={styles.input_bg}>
          <button className={styles.signup} onClick={handleSubmit}>
            <span>{`Add Hospital +`}</span>
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AddHospital