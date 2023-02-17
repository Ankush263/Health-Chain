import React, { useState, useEffect, useContext } from 'react'
import { SignupContext } from '../../Helper/Context'
import { ethers } from 'ethers'
import Swal from 'sweetalert2'
// import { signup } from '../../Api'
import { signup } from '../../pages/api/index'

function Signup() {
  const [connected, setConnected] = useState(false)
  const context = useContext(SignupContext)
  const [signupForm, setSignupForm] = useState({
    name: '',
    walletAddress: '',
    email: '',
    age: '',
    gender: '',
    password: '',
    confirmPassword: ''
  })

  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
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
        setSignupForm({...signupForm, walletAddress: await signer.getAddress()})
      }
    }catch(err) {
      console.log(err)
    }
  }

  const handleSignup = async () => {
    try {
      if(!signupForm.name || 
        !signupForm.walletAddress || 
        !signupForm.email || 
        !signupForm.age || 
        !signupForm.gender || 
        !signupForm.password || 
        !signupForm.confirmPassword) 
        {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '⛔Some values are missing in the signup form!',
          footer: '<a href="">Please fill the signup form again</a>'
        })
        return
      }

      if(signupForm.password !== signupForm.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '⛔Please type the correct password'
        })
        return
      }

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: '😃 Signup complete',
        showConfirmButton: false,
        timer: 1500
      })
      context.setSignUp(true)
      const response = await signup(
        {
          name: signupForm.name,
          walletAddress: signupForm.walletAddress,
          age: signupForm.age,
          gender: signupForm.gender,
          email: signupForm.email,
          password: signupForm.password,
          passwordConfirm: signupForm.confirmPassword
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', (account: any) => {
      window.location.replace(location.pathname)
    })
  }, [])

  const styles = {
    main_box: `bg-dark_pink w-full drop-shadow-3xl border-4 flex flex-col justify-around p-10`,
    input_bg: `h-12 mt-5 mb-5 flex justify-between`,
    small_input_box: `bg-white border-2 drop-shadow-2xl w-5/12 h-full`,
    connect_wallet: `bg-high_contrast_yellow border-2 drop-shadow-2xl w-5/12 h-full flex flex-col justify-center items-center active:mt-2 active:drop-shadow-xl active:bg-grinish-yellow`,
    signup: `bg-light-sky border-2 drop-shadow-2xl w-5/12 h-full mx-auto active:mt-2 active:drop-shadow-xl active:bg-ocen_blue`,
    large_input_box: `bg-white border-2 drop-shadow-2xl w-full h-full`,
  }

  return (
    <div className={styles.main_box}>
      <div className={styles.input_bg}>
        <div className={styles.small_input_box}>
          <input 
            type="text" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='name:'
            onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value})}
          />
        </div>
        <button className={styles.connect_wallet} onClick={handleConnect}>
          <span>{connected ? "Connected" : "Connect Wallet"}</span>
        </button>
      </div>
      <div className={styles.input_bg}>
        <div className={styles.large_input_box}>
          <input 
            type="email"
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='email:'
            onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value})}
          />
        </div>
      </div>
      <div className={styles.input_bg}>
        <div className={styles.small_input_box}>
          <input 
            type="number" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='age:'
            onChange={(e) => setSignupForm({ ...signupForm, age: e.target.value})}
          />
        </div>

        <div className={styles.small_input_box}>
          <select 
            className='w-full h-full p-2 placeholder:text-2xl'
            onChange={(e) => setSignupForm({ ...signupForm, gender: e.target.value})}
          >
            <option value="">gender...</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      <div className={styles.input_bg}>
        <div className={styles.small_input_box}>
          <input 
            type="password" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='password:'
            onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value})}
          />
        </div>

        <div className={styles.small_input_box}>
          <input 
            type="password" 
            className='w-full h-full p-2 placeholder:text-lg'
            placeholder='confirm password:'
            onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value})}
          />
        </div>
      </div>
      <div className={styles.input_bg}>
        <button className={styles.signup}>
          <span onClick={handleSignup}>Signup</span>
        </button>
      </div>
      <div className='w-full flex justify-center items-center'>
        <span onClick={() => context.setSignUp(true)} className='text-sm cursor-pointer border-b-2'>
          Already have an account, Login...
        </span>
      </div>
    </div>
  )
}

export default Signup