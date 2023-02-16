import React, { useEffect } from 'react';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 5,
    props: {
      name: '',
      image: ''
    }
  }
}

function HospitalCard(props: any) {

  const styles = {
    main_container: `w-96 h-96 flex flex-col justify-between items-center`,
    img_container: `w-8/12 h-4/6 drop-shadow-2.5xl active:mt-2 active:drop-shadow-2xl`,
    name_container: `border-2 mb-10 h-10 min-w-6/12 bg-white drop-shadow-2xl p-2 contain active:mt-2 active:drop-shadow-xl`
  }

  return (
    <div className={styles.main_container}>
      <div className={styles.img_container}>
        <img src={`${props.image}`} alt="" className='w-full h-full border-2' />
      </div>
      <div className={styles.name_container}>
        <span>{props.name}</span>
      </div>
    </div>
  )
}

export default HospitalCard