import React from 'react'

function LoggedIn() {

  const styles = {
    main: `w-96 h-96 flex flex-col justify-center items-center`,
    main_box: `bg-white drop-shadow-3xl border-4 mt-20`,
    box: `bg-white drop-shadow-2xl border-4 mt-10 p-2`,
  }
  return (
    <div className={styles.main}>
      <div className={styles.main_box}>
        <img src="/images/varify.png" alt="" />
      </div>
      <div className={styles.box}>
        <span className='text-2xl'>User Varified ✅</span>
      </div>

    </div>
  )
}

export default LoggedIn