import React from 'react'

function HospitalDetails() {

  const styles = {
    main: `w-full min-h-screen flex flex-col justify-center items-center`,
    top_container: `w-9/12 flex justify-between items-center`,
    top_left_container: `w-4/12 h-96 flex flex-col justify-around items-center`,
    top_right_container: `w-6/12 h-full`,
    img_container: `w-8/12 h-4/6 mb-6`,
    name_container: `h-10 bg-white border-2 drop-shadow-2xl p-2`,
    about_container: `h-28 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto`,
    location_container: `h-16 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto`,
    phone_container: `h-20 border-2 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    bottom_container: `w-8/12 mt-20`,
    doc_container: `border-2 w-full mt-10 h-32 flex justify-between items-center bg-white drop-shadow-2.5xl`,
    sm_img_container: `border-2 h-full w-32 ml-10 rounded-full`,
    doc_detail_container: `h-full w-6/12 flex flex-col justify-center items-start`,
    btn_container: `h-full w-3/12 flex flex-col justify-around items-center`,
    yellow_btn: `w-6/12 h-10 bg-grinish-yellow border-2 drop-shadow-2xl`,
    blue_btn: `w-6/12 h-10 bg-ocen_blue border-2 drop-shadow-2xl`
  }
  return (
    <div className={styles.main}>
      <div className={styles.top_container}>
        <div className={styles.top_left_container}>
          <div className={styles.img_container}>
            <img 
              src="/images/hospital.png" 
              alt="" 
              className='drop-shadow-2.5xl border-4' 
            />
          </div>
          <div className={styles.name_container}>
            <span>ABC HOSPITAL</span>
          </div>
        </div>
        <div className={styles.top_right_container}>
          <div className={styles.about_container}>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repellat repudiandae consequuntur, numquam impedit beatae iste commodi expedita ipsum atque doloribus vitae saepe temporibus possimus quibusdam quod hic quaerat natus dicta sit tenetur. Nesciunt magnam culpa deserunt officia, nostrum animi vitae natus officiis necessitatibus cumque facere quia consequuntur eos repellat!</span>
          </div>
          <div className={styles.location_container}>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repellat repudiandae consequuntur, numquam impedit beatae iste commod</span>
          </div>
          <div className={styles.phone_container}>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
          </div>
        </div>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.doc_container}>
          <div className={styles.sm_img_container}>
            <img src="/images/my_img.jpg" alt="" className='w-full h-full rounded-full' />
          </div>
          <div className={styles.doc_detail_container}>
            <span className='font-semibold text-lg'>Dr. Ankush Banik</span>
            <span>M.B.B.S General Physician, US ABC ueueu</span>
            <span>General Physician</span>
            <span>Mon-Fri 10:00am - 5:00 pm</span>
          </div>
          <div className={styles.btn_container}>
            <button className={styles.yellow_btn}>
              <span className='text-xl'>Book Now</span>
            </button>
            <button className={styles.blue_btn}>
              <span className='text-xl'>Show report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HospitalDetails