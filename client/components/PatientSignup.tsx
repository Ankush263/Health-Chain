import React from 'react';
import Signup from './auth/Signup';
import Login from './auth/Login';

function PatientSignup() {

  const styles = {
    main: `min-h-screen flex flex-col`,
    // wave_bg: `bg-[url('../public/images/wave1.png')] bg-no-repeat bg-bottom min-h-screen flex flex-col items-center justify-around`,
    wave_bg: `bg-bottom min-h-screen flex flex-col items-center justify-around`,
    banner: `w-68 mb-20 p-2 bg-white border-2 drop-shadow-2xl`,
    content_box: `min-h-screen w-full flex justify-around items-start`,
    signup_Box: `bg-dark_pink w-4/12 h-5/6 drop-shadow-3xl border-4`,
  }
  return (
    <div id='PatientSignup' className={styles.main}>
      <div className={styles.wave_bg}>
        <div className={styles.banner}>
          <span className='text-4xl'>Patient Details</span>
        </div>
        <div className={styles.content_box}>
          <img src="/images/patient_font.png" alt="" className="w-4/12 drop-shadow-3xl border-4" />
          <div className='w-4/12 min-h-3/6'>
            <Signup />
            {/* <Login /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientSignup