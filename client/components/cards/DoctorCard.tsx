import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import jwt from 'jwt-decode';
// import { createBooking } from '../../Api';
import { createBooking } from '../../pages/api/index';
import { ethers } from 'ethers';
import ABI from '../../utils/Healthcare.json';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    revalidate: 5,
    props: {
      id: '',
      name: '',
      image: '',
      description: '',
      specialistAt: '',
      day: '',
      time: ''
    }
  }
}

function DoctorCard(props: any) {
  const [booked, setBooked] = useState(false)
  const [bookingDetails, setBookingDetails] = useState({
    doctorId: '',
    patientId: '',
    patientAddress: '',
    date: '',
    time: ''
  })
  

  const deployAddress = "0x2a2D6a534Fab584A10A1d09BAeCF81E0977bC124"
  let provider: any
  let signer: any
  if(typeof window !== 'undefined') {
    provider = new ethers.providers.Web3Provider(window.ethereum)
    signer = provider.getSigner()
  }


  const handleBooking = async () => {
    try{
      const token = JSON.parse(localStorage.getItem("Token") || '{}').value
      let decodedToken = {} as any
      decodedToken = jwt(token)

      Swal.fire({
        title: 'Booking Form',
        html: `<input type="date" id="date" class="swal2-input" placeholder="date">
        <input type="time" id="time" class="swal2-input" placeholder="time">`,
        confirmButtonText: 'Book now',
        focusConfirm: false,
        preConfirm: () => {
          const date = (Swal.getPopup()?.querySelector('#date') as HTMLInputElement)?.value
          const time = (Swal.getPopup()?.querySelector('#time') as HTMLInputElement)?.value
          if (!date || !time) {
            Swal.showValidationMessage(`Please enter date and time`)
          }
          return { date: date, time: time }
        }
      }).then(async (result: any) => {
        console.log("Clicked")
        setBookingDetails(
          { 
            doctorId: props.id, 
            patientId: decodedToken.id, 
            patientAddress: await signer.getAddress(),
            date: result.value?.date, 
            time: result.value?.time 
          }
        )
        Swal.fire(`
          Time: ${result.value?.date}
          Date: ${result.value?.time}
        `.trim())
      })
      setBooked(prev => !prev)

    }catch(err) {
      console.log(err)
    }
  }

  const book = async () => {
    try {
      console.log("booking Details: ", bookingDetails)
      const response = await createBooking({
        doctorID: bookingDetails.doctorId,
        patientID: bookingDetails.patientId,
        patientAddress: bookingDetails.patientAddress,
        bookingTime: bookingDetails.time,
        bookingDate: bookingDetails.date
      })
      console.log(response)
      setBooked(prev => !prev)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'You Successfully book your slot',
        showConfirmButton: false,
        timer: 1500
      })
    } catch (error) {
      console.log(error)
    }
  }

  const show = async () => {
    try {
      const contract = new ethers.Contract(deployAddress, ABI.abi, signer)
      const response = await contract.showMyReports()
      console.log(response)
      Swal.fire({
        title: 'All Reports',
        html: '<ul>' +
          response.map(
            (report: any) => 
            `<li>
              <span class='text-2xl text-semibold text-black'>
                ${report.name}:
              </span> 
              <a href=${report.prescription} target=”_blank” class='text-ocen_blue'>
                ${report.prescription}
              </a>
            </li>`).join('') +
          '</ul>',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    doc_container: `border-2 w-full mt-10 h-32 flex justify-between items-center bg-white drop-shadow-2.5xl`,
    sm_img_container: `border-2 h-full w-32 ml-10 rounded-full`,
    doc_detail_container: `h-full w-6/12 flex flex-col justify-center items-start`,
    btn_container: `h-full w-3/12 flex flex-col justify-around items-center`,
    yellow_btn: `w-6/12 h-10 bg-grinish-yellow border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    green_btn: `w-6/12 h-10 bg-deep_green border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    blue_btn: `w-6/12 h-10 bg-ocen_blue border-2 drop-shadow-2xl active:mt-1 active:drop-shadow-xl`,
    semibold_txt: `font-semibold text-lg`,
    popup_box: `border-2 w-96 h-96 bg-ocen_blue absolute z-10 left-40 right-0 bottom-0 `
  }
  return (
    <div>
      <div className={styles.doc_container}>
          <div className={styles.sm_img_container}>
            <img src={`${props.image}`} alt="" className='w-full h-full rounded-full' />
          </div>
          <div className={styles.doc_detail_container}>
            <span className={styles.semibold_txt}>{props.name}</span>
            <span>{props.description}</span>
            <span>{props.specialistAt}</span>
            <span>{props.day} {props.time}</span>
          </div>
          <div className={styles.btn_container}>
            {
              !booked ?
              <button className={styles.yellow_btn} onClick={handleBooking}>
                <span className='text-xl'>{"Book Now"}</span>
              </button>
              :
              <button className={styles.green_btn} onClick={book}>
                <span className='text-xl'>{"Book"}</span>
              </button>
            }
            <button className={styles.blue_btn} onClick={show}>
              <span className='text-xl'>Show report</span>
            </button>
          </div>
        </div>
    </div>
  )
}

export default DoctorCard