import React from 'react';
import DoctorCard from '../../components/cards/DoctorCard';

function HospitalDetails() {

  const styles = {
    main: `w-full min-h-screen flex flex-col justify-center items-center`,
    top_container: `w-9/12 flex justify-between items-center`,
    top_left_container: `w-4/12 h-96 flex flex-col justify-around items-center`,
    top_right_container: `w-6/12 h-full`,
    img_container: `w-8/12 h-full mt-6 mb-1`,
    name_container: `h-10 bg-white border-2 drop-shadow-2xl p-2`,
    about_container: `h-28 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    location_container: `h-16 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    phone_container: `h-20 border-2 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    bottom_container: `w-8/12 mt-20 mb-20`,
    semibold_txt: `font-semibold text-lg`,
    search_area: `border-2 w-6/12 h-10 flex drop-shadow-2xl mb-5 mt-40`,
    sub_box: `w-3/12 bg-white`,
    btn: `w-3/12 bg-high_contrast_yellow border-l-2 active:bg-grinish-yellow`,
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
            <span className={styles.semibold_txt}>ABC HOSPITAL</span>
          </div>
        </div>
        <div className={styles.top_right_container}>
          <div className={styles.about_container}>
            <span className={styles.semibold_txt}>About:</span>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repellat repudiandae consequuntur, numquam impedit beatae iste commodi expedita ipsum atque doloribus vitae saepe temporibus possimus quibusdam quod hic quaerat natus dicta sit tenetur. Nesciunt magnam culpa deserunt officia, nostrum animi vitae natus officiis necessitatibus cumque facere quia consequuntur eos repellat!</span>
          </div>
          <div className={styles.location_container}>
            <span className={styles.semibold_txt}>Location:</span>
            <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est repellat repudiandae consequuntur, numquam impedit beatae iste commod</span>
          </div>
          <div className={styles.phone_container}>
            <span className={styles.semibold_txt}>Phone:</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
            <span>+2464646264</span>
          </div>
        </div>
      </div>

      <div className={styles.search_area}>
        <div className={styles.sub_box}>
          <select name="type" id="" className='h-full border-r-2'>
            <option value="">Search by type...</option>
            <option value="name">name</option>
          </select>
        </div>
        <input 
          type="search" 
          className='w-full h-full p-2 pl-5' 
          placeholder='search'
        />
        <button className={styles.btn}>
          <span className='text-2xl'>Search</span>
        </button>
      </div>

      <div className={styles.bottom_container}>
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
        <DoctorCard />
      </div>
    </div>
  )
}

export default HospitalDetails