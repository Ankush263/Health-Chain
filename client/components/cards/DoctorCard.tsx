import React, { useState } from 'react';
import BookingPopup from './BookingPopup';

function DoctorCard() {
  const [bookingStart, setBookingStart] = useState(false)

  const handleBooking = () => {
    try{
      setBookingStart(prev => !prev)


    }catch(err) {
      console.log(err)
    }
  }

  const styles = {
    doc_container: `border-2 w-full mt-10 h-32 flex justify-between items-center bg-white drop-shadow-2.5xl`,
    sm_img_container: `border-2 h-full w-32 ml-10 rounded-full`,
    doc_detail_container: `h-full w-6/12 flex flex-col justify-center items-start`,
    btn_container: `h-full w-3/12 flex flex-col justify-around items-center`,
    yellow_btn: `w-6/12 h-10 bg-grinish-yellow border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    blue_btn: `w-6/12 h-10 bg-ocen_blue border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    semibold_txt: `font-semibold text-lg`,
    popup_box: `border-2 w-96 h-96 bg-ocen_blue absolute z-10 left-40 right-0 bottom-0 `
  }
  return (
    <div>
      <div className={styles.doc_container}>
          <div className={styles.sm_img_container}>
            <img src="/images/my_img.jpg" alt="" className='w-full h-full rounded-full' />
          </div>
          <div className={styles.doc_detail_container}>
            <span className={styles.semibold_txt}>Dr. Ankush Banik</span>
            <span>M.B.B.S General Physician, US ABC ueueu</span>
            <span>General Physician</span>
            <span>Mon-Fri 10:00am - 5:00 pm</span>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.yellow_btn} onClick={handleBooking}>
              <span className='text-xl'>Book Now</span>
            </button>
            {
              bookingStart &&
              <div className={styles.popup_box}>
                <BookingPopup />
              </div>
            }
            <button className={styles.blue_btn}>
              <span className='text-xl'>Show report</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default DoctorCard