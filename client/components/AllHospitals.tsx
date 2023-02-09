import React from 'react';
import HospitalCard from './cards/HospitalCard';
import Link from 'next/link';

function AllHospitals() {

  const styles = {
    main: `min-h-screen flex flex-col`,
    // wave_bg: `bg-[url('../public/images/wave3.png')] bg-no-repeat bg-top min-h-screen flex flex-col items-center justify-around`
    wave_bg: `bg-top min-h-screen flex flex-col items-center justify-start`,
    search_area: `border-2 w-6/12 h-10 flex drop-shadow-2xl mb-40`,
    sub_box: `w-3/12 bg-white`,
    btn: `w-3/12 bg-high_contrast_yellow border-l-2`,
    hospital_container: `w-10/12 grid grid-cols-3 mb-20`
  }

  return (
    <div className={styles.main}>
      <div className={styles.wave_bg}>
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
        <div className={styles.hospital_container}>
          <Link href="/components/HospitalDetails">
            <HospitalCard />
          </Link>
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
          <HospitalCard />
        </div>
      </div>
    </div>
  )
}

export default AllHospitals