import React from 'react'

function DoctorDetailsCard() {

  const styles = {
    doc_container: `border-2 w-full mt-10 h-32 flex justify-start items-center bg-white drop-shadow-2.5xl`,
    sm_img_container: `border-2 h-full w-32 ml-10 rounded-full`,
    doc_detail_container: `h-full w-6/12 flex flex-col justify-center items-start ml-10`,
    btn_container: `h-full w-3/12 flex flex-col justify-around items-center`,
    yellow_btn: `w-6/12 h-10 bg-grinish-yellow border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    blue_btn: `w-6/12 h-10 bg-ocen_blue border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    semibold_txt: `font-semibold text-lg`
  }
  return (
    <div>
      <div className={styles.doc_container}>
          <div className={styles.sm_img_container}>
            <img src="/images/my_img.jpg" alt="" className='w-full h-full rounded-full' />
          </div>
          <div className={styles.doc_detail_container}>
            <span className={styles.semibold_txt}>Dr. Ankush Banik</span>
            <span className='text-sm'>0x90545F5cFfe5a25700542b32653fc884920E1aB8</span>
            <span>M.B.B.S General Physician, US ABC ueueu</span>
            <span>General Physician</span>
            <span>Mon-Fri 10:00am - 5:00 pm</span>
          </div>
        </div>
    </div>
  )
}

export default DoctorDetailsCard