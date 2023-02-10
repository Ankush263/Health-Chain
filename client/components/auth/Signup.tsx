import React from 'react'

function Signup() {

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
      <div className={styles.input_bg}>
        <div className={styles.small_input_box}>
          <input 
            type="number" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='age:'
          />
        </div>

        <div className={styles.small_input_box}>
          <input 
            type="text" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='gender:'
          />
        </div>
      </div>
      <div className={styles.input_bg}>
        <div className={styles.small_input_box}>
          <input 
            type="text" 
            className='w-full h-full p-2 placeholder:text-2xl'
            placeholder='password:'
          />
        </div>

        <div className={styles.small_input_box}>
          <input 
            type="text" 
            className='w-full h-full p-2 placeholder:text-lg'
            placeholder='confirm password:'
          />
        </div>
      </div>
      <div className={styles.input_bg}>
        <button className={styles.signup}>
          <span>Signup</span>
        </button>
      </div>
    </div>
  )
}

export default Signup