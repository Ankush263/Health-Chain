import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

function FontPage() {

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
      }
    }catch(err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleConnect()
  }, [])

  const styles = {
    main: `w-full min-h-screen flex flex-col`,
    animation_box: `w-8/12 flex justify-center items-center mt-10 p-0 border-4 h-48 ml-10 bg-white drop-shadow-3xl`,
    animation_txt: `w-10/12 p-0 text-black font-bold`,
    wave_bg: `w-full h-full mb-10`,
    content_box: `flex justify-around items-center w-full h-full mt-10`,
    img_container: `mt-10 ml-0 w-4/12 h-4/6`,
    img_box: `w-full h-full`,
    img: `w-full h-full drop-shadow-3xl border-4`,
    btn_box: `w-4/12 h-96 flex flex-col justify-between items-center`,
    btn_light_pink: `w-36 h-12 border-2 bg-light-pink drop-shadow-2xl active:bg-dark_pink active:mt-2 active:drop-shadow-xl`,
    btn_light_sky: `w-36 h-12 border-2 bg-light-sky drop-shadow-2xl active:bg-ocen_blue active:mt-2 active:drop-shadow-xl`,
    btn_txt: `text-2xl`,
    small_animation_box: `bg-white w-5/12 h-48 border-2 drop-shadow-2.5xl p-2 flex justify-center items-center`
  }

  return (
      <div className={styles.main}>
        <div className={styles.wave_bg}>
          <div className={styles.animation_box}>
            <TypeAnimation
              sequence={[
              'HealthChain: A Decentralized Health Care Solution powered by Blockchain and Web3 Technology!!!',
              1000,
              'HealthChain: Empowering Secure and Transparent Health Care through Blockchain and Web3!!!',
              1000,
              'HealthChain: Revolutionizing Health Care through Blockchain and Web3 Technology!!!',
              1000,
              'HealthChain: A Blockchain and Web3-based Health Care Platform for Secure and Efficient Care!!!',
              1000,
              'HealthChain: A Blockchain and Web3-Powered Healthcare Network for Seamless Patient Care!!!',
              1000,
              'HealthChain: Connecting Traditional Health Care with Blockchain and Web3 Technology!!!',
              1000,
              ]}
              speed={70} // Custom Speed from 1-99 - Default Speed: 40
              style={{ fontSize: '2em' }}
              deletionSpeed={99}
              className={styles.animation_txt}
              wrapper="span" // Animation will be rendered as a <span>
              repeat={Infinity} // Repeat this Animation Sequence infinitely
            />
          </div>
          <div className={styles.content_box}>
            <div className={styles.img_container}>
              <div className={styles.img_box}>
                <img src="/images/font-img2.png" alt="" className={styles.img} />
              </div>
            </div>
            <div className={styles.btn_box}>
              <Link className={styles.btn_light_pink} href={"/components/AddHospital"} onClick={handleConnect}>
                <span className='text-4xl'>{"<-"}</span>
                <span className={styles.btn_txt}> {"Hospital"} </span>
              </Link>

              <button className={styles.btn_light_sky}>
                <Link href="/#PatientSignup">
                  <span className={styles.btn_txt}> lets Go </span>
                  <span className='text-4xl'>{"- >"}</span>
                </Link>
              </button>

            </div>
          </div>
        </div>
        <div className="mb-60 flex justify-end mr-32">
          <div className={styles.small_animation_box}>
            <TypeAnimation
              sequence={[
              'Transforming Healthcare through the Power of Blockchain and Web3 Technology',
              1000,
              'Empowering Secure and Efficient Patient Care with Blockchain and Web3',
              1000,
              'Connecting Traditional Healthcare with the Innovations of Blockchain and Web3 Technology',
              ]}
              speed={70} // Custom Speed from 1-99 - Default Speed: 40
              style={{ fontSize: '1.5em' }}
              deletionSpeed={99}
              className={styles.animation_txt}
              wrapper="span" // Animation will be rendered as a <span>
              repeat={Infinity} // Repeat this Animation Sequence infinitely
            />
          </div>
        </div>
      </div>
  )
}

export default FontPage