import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSeats } from "../../redux/reducer/bookingSlice";

const BalconySeat = ({ balcony }) => {
  const dispatch = useDispatch();
  const seats = useSelector((state) => state.book.seats); // Access Redux state

  const bookClickHandler = (id) => {
    // Check if the seat ID is already selected
    if (seats.includes(id)) {
      // If it is, remove the seat ID from the selected seats
      dispatch(setSeats(seats.filter((seatId) => seatId !== id)));
    } else {
      // If it's not selected, add the seat ID to the selected seats
      dispatch(setSeats([...seats, id]));
    }
  };

  return (
    <div
      onClick={() => {
        // Only allow selecting seats that are not 'Booked'
        if (balcony.status !== "Booked") {
          bookClickHandler(balcony._id);
        }
      }}
      className={`w-[25px] h-[25px] rounded-[2px] border-[1px] text-center text-sm flex items-center justify-center 
        ${
          balcony.status === "Booked"
            ? "bg-red-500 text-white"
            : seats.includes(balcony._id)
            ? "bg-green-500 text-white" // Green for selected seats
            : "border-[#1ea83c] text-[#1ea83c]" // Default state
        }
      `}
    >
      {balcony.seatId.seatNumber}
    </div>
  );
};

export default BalconySeat;
