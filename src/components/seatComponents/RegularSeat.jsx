import React from 'react'

const RegularSeat = ({regular}) => {

    console.log("regular :",regular)
  return (
    <div className='w-[25px] h-[25px] rounded-[2px] border-[#1ea83c] border-[1px] text-center text-sm flex items-center justify-center text-[#1ea83c]'>{regular.seatId.seatNumber}</div>
  )
}

export default RegularSeat