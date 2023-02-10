import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

function AddHospital() {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    setFilename(inputRef.current!.files![0].name);
  };

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
              speed={70} // Custom Speed from 1-99 - Default Speed: 40
              // style={{ fontSize: '2em' }}
              deletionSpeed={99}
              className={styles.txt}
              wrapper="span" // Animation will be rendered as a <span>
              repeat={Infinity} // Repeat this Animation Sequence infinitely
            />
          {/* <span className={styles.txt_up}>{`Let's fix the Healthcare sectors`}</span>
          <span className={styles.txt}>{`by adding Hospitals into Blockchain`}</span> */}
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
            />
          </div>
          <button className={styles.connect_wallet}>
            <span>Connect Wallet</span>
          </button>
        </div>
        <div className={styles.input_bg}>
          <div className={styles.large_input_box}>
            <input 
              type="email"
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='email:'
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
            ></textarea>
          </div>
        </div>

        <div className={styles.input_bg}>
          {/* <div className={styles.l_small_input_box}>
            <input 
              type="file" 
              className='w-full h-full p-2 placeholder:text-2xl bg-ocen_blue'
              placeholder=''
            />
          </div> */}
          <div className="flex items-center">
            <label className={styles.l_small_input_box}>
              <span>{`Upload Image`}</span>
              <input type="file" ref={inputRef} onChange={onFileChange} className="hidden"/>
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
            />
          </div>
        </div>
        <div className={styles.input_bg}>
          <div className={styles.large_input_box}>
            <input 
              type="tel"
              className='w-full h-full p-2 placeholder:text-2xl'
              placeholder='phone:'
            />
          </div>
        </div>
        
        <div className={styles.input_bg}>
          <Link href={"/components/HospitalDashboard"} className={styles.signup}>
            <span>{`Add Hospital +`}</span>
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AddHospital