import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeats } from "../../redux/reducer/bookingSlice";

const RegularSeat = ({ regular }) => {
  const dispatch = useDispatch();
  const seats = useSelector((state) => state.book.seats); // Access Redux state

  const bookClickHandler = (id) => {
    // If the seat ID is already in the seats array, remove it
    if (seats.includes(id)) {
      // Remove the seat ID from the seats array
      dispatch(setSeats(seats.filter((seatId) => seatId !== id)));
    } else {
      // If the seat is not in the array, add it
      dispatch(setSeats([...seats, id]));
    }
  };
  

  return (
    <div
      onClick={() => {
        if (regular.status !== "Booked" ) {
          // Only allow booking if the seat is not already booked and not already selected
          bookClickHandler(regular._id);
        }
      }}
      className={`w-[25px] h-[25px] rounded-[2px] border-[1px] text-center text-sm flex items-center justify-center 
        ${
          regular.status === "Booked"
            ? "bg-red-500 text-white" // Red if booked
            : seats.includes(regular._id)
            ? "bg-green-500 text-white" // Green if the seat is selected
            : "border-[#1ea83c] text-[#1ea83c]" // Default green border if available
        }`}
    >
      {regular.seatId.seatNumber}
    </div>
  );
};

export default RegularSeat;
