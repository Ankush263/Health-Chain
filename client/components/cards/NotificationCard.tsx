import React from 'react'

function NotificationCard() {

  const styles = {
    card_container: `border-2 w-11/12 h-32 bg-white mb-10 drop-shadow-2xl flex justify-between`,
    left_container: `w-7/12 h-full flex flex-col p-2`,
    right_container: `w-3/12 h-full flex justify-center items-center`,
    btn: `bg-light-sky p-2 border-2 w-11/12 h-10 drop-shadow-2xl mr-5 active:mt-5 active:drop-shadow-xl`
  }
  return (
    <div className={styles.card_container}>
      <div className={styles.left_container}>
        <span>Ankush Banik</span>
        <span>ankushbanfdfsik263</span>
        <span>0x903....ieu72</span>
        <div className='flex w-7/12 justify-between'>
          <span>age: 21+</span>
          <span>Male</span>
        </div>
      </div>
      <div className={styles.right_container}>
        <button className={styles.btn}>{"Add +"}</button>
      </div>
    </div>
  )
}

export default NotificationCard