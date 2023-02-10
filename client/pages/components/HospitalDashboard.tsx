import Link from 'next/link'
import React, { useState, useRef } from 'react'
import DoctorDetailsCard from '../../components/cards/DoctorDetailsCard';

function HospitalDashboard() {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    setFilename(inputRef.current!.files![0].name);
  };


  const styles = {
    main: `w-full min-h-screen flex flex-col justify-center items-center`,
    top_container: `w-9/12 flex justify-between items-center`,
    top_left_container: `w-4/12 mt-16 flex flex-col justify-around items-center`,
    top_right_container: `w-6/12 h-full`,
    img_container: `w-10/12 h-full mt-6 mb-6`,
    doc_img_container: `w-10/12 h-3/6 mt-6 mb-6`,
    name_container: `h-10 bg-white border-2 drop-shadow-2xl p-2 mt-10`,
    about_container: `h-28 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    location_container: `h-16 border-2 mb-10 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    phone_container: `h-20 border-2 bg-white drop-shadow-2.5xl p-2 overflow-auto flex flex-col`,
    bottom_container: `w-full mt-40 mb-20 flex justify-around`,
    semibold_txt: `font-semibold text-lg`,
    search_area: `border-2 w-6/12 h-10 flex drop-shadow-2xl mb-5 mt-40`,
    sub_box: `w-3/12 bg-white`,
    btn: `w-3/12 bg-high_contrast_yellow border-l-2 active:bg-grinish-yellow`,
    btm_left: `w-3/12 flex flex-col justify-start items-center`,
    btm_right: `w-4/12 mr-20`,

    main_box: `bg-parrot_green w-full h-full drop-shadow-2.5xl border-2 flex flex-col justify-around p-10`,
    input_bg: `h-12 mt-3 mb-3 flex justify-between`,
    large_input_bg: `h-32 mt-5 mb-5`,
    small_input_box: `bg-white border-2 drop-shadow-2xl w-5/12 h-full`,
    l_small_input_box: `bg-ocen_blue border-2 drop-shadow-2xl w-full p-2 h-12 ml-auto cursor-pointer active:drop-shadow-xl active:mt-2`,
    connect_wallet: `bg-high_contrast_yellow border-2 drop-shadow-2xl w-5/12 h-full flex flex-col justify-center items-center active:mt-2 active:drop-shadow-xl active:bg-grinish-yellow`,
    signup: `bg-light-sky border-2 drop-shadow-2xl w-5/12 h-10 mx-auto active:mt-2 active:drop-shadow-xl active:bg-ocen_blue pl-10 pt-1`,
    large_input_box: `bg-white border-2 drop-shadow-2xl w-full h-full`,
  }
  return (
    <div className={styles.main}>
      <div className={styles.top_container}>
        <div className={styles.top_left_container}>
          <div className={styles.img_container}>
            <img 
              src="/images/hospital.png" 
              alt="" 
              className='drop-shadow-2.5xl border-4 w-full h-full' 
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

      <div className={styles.bottom_container}>
        <div className={styles.btm_left}>
          <div className={styles.doc_img_container}>
            <img 
              src="/images/doctor_poster2.png" 
              alt="" 
              className='drop-shadow-2.5xl border-2 w-full h-full' 
            />
          </div>
          <span className='text-2xl mt-10'>Add Doctors</span>
        </div>
        <div className={styles.btm_right}>

        <div className={styles.main_box}>
            <div className={styles.input_bg}>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='name:'
                />
              </div>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-xl'
                  placeholder='wallet address:'
                />
              </div>
              {/* <div className={styles.connect_wallet}>
                <span>Connect Wallet</span>
              </div> */}
            </div>
            <div className={styles.input_bg}>
              <div className={styles.large_input_box}>
                <input 
                  type="email"
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='email:'
                />
              </div>
            </div>

            <div className={styles.large_input_bg}>
              <div className={styles.large_input_box}>
                <textarea 
                  name="" 
                  className='w-full h-full p-2 placeholder:text-2xl'
                  placeholder='description:'
                  cols={30}
                  rows={10}
                ></textarea>
              </div>
            </div>

            <div className={styles.input_bg}>
              {/* <div className={styles.l_small_input_box}>
                <input 
                  type="file" 
                  className='w-full h-full p-2 placeholder:text-2xl bg-ocen_blue'
                  placeholder=''
                />
              </div> */}
              <div className="flex items-center">
                <label className={styles.l_small_input_box}>
                  <span>{`Upload Image`}</span>
                  <input type="file" ref={inputRef} onChange={onFileChange} className="hidden"/>
                </label>
                <span className="ml-3 text-gray-600">{filename}</span>
              </div>

              <div className={styles.small_input_box}>
                {/* <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-xl'
                  placeholder='Specialist At:'
                /> */}
                <select name="type" id="" className='h-full w-full'>
                  <option value="">Specialist At...</option>
                  <option value="name">General Physician</option>
                  <option value="name">Darma</option>
                  <option value="name">Nurologic</option>
                </select>
              </div>

            </div>
            <div className={styles.input_bg}>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-sm'
                  placeholder='Time: 9:00am - 5:00pm'
                />
              </div>
              <div className={styles.small_input_box}>
                <input 
                  type="text" 
                  className='w-full h-full p-2 placeholder:text-lg'
                  placeholder='Day: Mon - Fri'
                />
              </div>
            </div>
            
            <div className={styles.input_bg}>
              <Link href={"/components/DoctorDetails"} className={styles.signup}>
                <span>{`Add Doctor +`}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-8/12 mb-20 mt-10">
        <DoctorDetailsCard />
        <DoctorDetailsCard />
        <DoctorDetailsCard />
      </div>
    </div>
  )
}

export default HospitalDashboard