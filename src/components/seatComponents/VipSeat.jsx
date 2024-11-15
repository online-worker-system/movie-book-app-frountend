import React from 'react'

const VipSeat = ({vip}) => {

    console.log("vip :",vip)
  return (
    <div className='w-[25px] h-[25px] rounded-[2px] border-[#1ea83c] border-[1px] text-center text-sm flex items-center justify-center text-[#1ea83c]'>{vip.seatId.seatNumber}</div>
  )
}

export default VipSeat