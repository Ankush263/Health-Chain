import React from 'react'

function BookingPopup() {

  const styles = {
    main: `flex flex-col justify-center items-center h-full w-full`,
    input: `w-8/12 border-2 bg-white drop-shadow-2xl h-16 mb-5`,
    btn: `bg-dark_pink w-28 h-10 border-2 drop-shadow-2xl active:mt-2 active:drop-shadow-xl`
  }

  return (
    <div className={styles.main}>
      <input type="date" className={styles.input} name="" id="" />
      <input type="time" className={styles.input} name="" id="" />
      <button type="submit" className={styles.btn}>Book Now</button>
    </div>
  )
}

export default BookingPopup