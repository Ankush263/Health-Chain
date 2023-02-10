import React, { useState, useRef } from 'react';
import Link from 'next/link';
import NotificationCard from '../../components/cards/NotificationCard';
import PatientCard from '../../components/cards/PatientCard';

function DoctorDetails() {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    setFilename(inputRef.current!.files![0].name);
  };

  const styles = {
    main: `w-full flex flex-col items-center`,
    upper: `w-full h-screen flex justify-around items-center`,
    left_container: `w-5/12 h-5/6 flex flex-col justify-between items-start ml-20`,
    img_container: `border-2 w-6/12 h-4/6 drop-shadow-2.5xl ml-10`,
    txt_container: `w-11/12 h-1/6 flex flex-col justify-center items-start ml-10`,
    name_container: `w-5/12 h-10 bg-white border-2 drop-shadow-2xl flex justify-center items-center`,
    btn_container: `w-11/12 h-1/6`,
    btn_bg: `w-7/12 h-5/6 bg-white border-2 drop-shadow-2xl ml-10 p-1 active:drop-shadow-xl active:bg-ocen_blue p-2 overflow-auto`,
    right_container: `w-4/12 h-5/6 mr-20`,
    main_box: `bg-dark_pink w-full h-full drop-shadow-2.5xl border-2 flex flex-col justify-start items-between p-10 overflow-auto`,
    lower: `w-8/12 mb-20 mt-20`
  }
  return (
    <div className={styles.main}>
      <div className={styles.upper}>
        <div className={styles.left_container}>
          <div className={styles.img_container}>
            <img src="/images/unnamed.png" alt="" className='w-full h-full'  />
          </div>
          <div className={styles.txt_container}>
          <div className={styles.name_container}>
            <span>Dr. ABC Dev Roy</span>
          </div>
          </div>
          <div className={styles.btn_container}>
            <div className={styles.btn_bg}>
              <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis placeat distinctio suscipit laudantium voluptate asperiores velit repellat odit, aspernatur ipsa?</span>
            </div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.main_box}>
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
            <NotificationCard />
          </div>
        </div>
      </div>
      <div className={styles.lower}>
        <PatientCard />
        <PatientCard />
        <PatientCard />
      </div>
    </div>
  )
}

export default DoctorDetails