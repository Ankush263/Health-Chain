import React, { useState, useRef } from 'react'

function PatientCard() {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    setFilename(inputRef.current!.files![0].name);
  };

  const styles = {
    card_container: `border-2 w-full h-42 bg-white drop-shadow-2xl p-2 flex justify-between items-center mb-10`,
    left: `h-full w-7/12 flex flex-col p-2`,
    mid: `h-full w-2/12 mr-20`,
    right: `h-full w-2/12 p-2`,
    l_small_input_box: `bg-ocen_blue border-2 drop-shadow-2xl w-11/12 p-2 h-12 ml-auto cursor-pointer active:drop-shadow-xl active:mt-2`,
    btn: `bg-light-sky w-full h-10 drop-shadow-2xl active:drop-shadow-xl active:mt-2 border-2`
  }
  return (
    <div className={styles.card_container}>
      <div className={styles.left}>
        <span className='text-xl font-semibold'>Ankush Banik</span>
        <span>ankushbanik263@gmail.com</span>
        <span>0x905 .... 4faB8</span>
        <div className='flex w-3/12 justify-between'>
          <span>age: 21+</span>
          <span>Male</span>
        </div>
      </div>
      <div className={styles.mid}>
        <div className="flex items-center flex-col">
          <label className={styles.l_small_input_box}>
            <span>{`Upload report +`}</span>
            <input type="file" ref={inputRef} onChange={onFileChange} className="hidden"/>
          </label>
          <span className="ml-3 text-gray-600">{filename}</span>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles.btn}>
          <span>{"Send >>"}</span>
        </button>
      </div>
    </div>
  )
}

export default PatientCard