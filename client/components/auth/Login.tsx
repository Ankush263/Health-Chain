import React, { useState, useEffect, useContext } from 'react'
import { LoginContext } from '../../Helper/Context'
import { ethers } from 'ethers'
// import { login } from '../../Api'
import { login } from '../../pages/api/index'
import Swal from 'sweetalert2'

function Login() {
  const [connected, setConnected] = useState(false)
  const context = useContext(LoginContext)
  const [loginForm, setLoginForm] = useState({
    walletAddress: '',
    email: '',
    password: ''
  })

  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }

  const handleLogin = async () => {
    try {
      const response = await login({
        email: loginForm.email,
        password: loginForm.password
      })

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Congratulation, You successfully Login...',
        showConfirmButton: false,
        timer: 1500
      })

      // context.setLogin(true)
      const token = response.data.token
      let expiration = new Date().getTime() + 60 * 60 * 24 * 30 * 1000  // 30 days
      localStorage.setItem("Token", JSON.stringify({ value: `${token}`, expires: expiration }))
      // console.log(token)
      window.location.reload()

    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
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
        setLoginForm({...loginForm, walletAddress: await signer.getAddress()})
      }
    }catch(err) {
      console.log(err)
    }
  }

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
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.input_bg}>
        <div className={styles.large_input_box}>
          <input 
            type="password"
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='password:'
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
        </div>
      </div>

      <div className={styles.input_bg}>
        <button className={styles.signup} onClick={handleLogin}>
          <span>login</span>
        </button>
      </div>
      <div className='w-full flex justify-center items-center'>
        <span onClick={() => {
          window.location.reload()
        }} className='text-sm cursor-pointer border-b-2'>
          {"Don't have an account, Signup..."}
        </span>
      </div>
    </div>
  )
}

export default Login