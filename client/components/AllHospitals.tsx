import React, { useEffect, useState } from 'react';
import HospitalCard from './cards/HospitalCard';
import Link from 'next/link';
// import { getAllHospitals } from '../Api';
import { getAllHospitals } from '../pages/api/index';

function AllHospitals() {
  const [allHospitals, setAllHospitals] = useState([])

  const fetch = async () => {
    try {
      const response = await getAllHospitals()
      console.log(response.data.data.hospital)
      setAllHospitals(response.data.data.hospital)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    main: `min-h-screen flex flex-col`,
    wave_bg: `bg-top min-h-screen flex flex-col items-center justify-start`,
    search_area: `border-2 w-6/12 h-10 flex drop-shadow-2xl mb-40`,
    sub_box: `w-3/12 bg-white`,
    btn: `w-3/12 bg-high_contrast_yellow border-l-2 active:bg-grinish-yellow`,
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

          {
            allHospitals.map((hospital: any) => {
              return (
                <Link 
                  key={hospital._id}
                  href={{
                    pathname: "/components/HospitalDetails",
                    query: {data: hospital._id}
                  }}
                >
                  <HospitalCard 
                    key={hospital._id}
                    name={hospital.name} 
                    image={hospital.image} 
                  />
                </Link>
              )
            })
          }   
        </div>
      </div>
    </div>
  )
}

export default AllHospitals