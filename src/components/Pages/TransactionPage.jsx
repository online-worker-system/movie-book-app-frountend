import React, { useEffect, useState } from "react";
import TicketBox from "../common/TicketBox";
import { fetchAllBookings } from "../../redux/reducer/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.book);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const ticketClickHandler = (booking) => {
    setSelectedBooking(booking); // Set the clicked booking for display
  };

  useEffect(() => {
    dispatch(fetchAllBookings());
  }, [dispatch]);

  if (loading) return <p>Loading bookings...</p>;
  if (!bookings || bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <div>
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <p className="text-xl font-semibold text-gray-800">
              Booking ID: <span className="text-gray-600">{booking._id}</span>
            </p>
            {booking?.showId && (
              <>
                <p className="text-lg font-medium text-gray-700">
                  Movie:{" "}
                  <span className="text-blue-600">
                    {booking.showId.movieId?.movieName || "N/A"}
                  </span>
                </p>
                <p className="text-lg text-gray-600">
                  Release Date:{" "}
                  <span className="text-gray-500">
                    {booking.showId.movieId?.releaseDate
                      ? formatDate(booking.showId.movieId.releaseDate)
                      : "N/A"}
                  </span>
                </p>
                <p className="text-lg font-medium text-gray-700">
                  Cinema:{" "}
                  <span className="text-blue-600">
                    {booking.showId.cinemaId?.cinemaName || "N/A"}
                  </span>
                </p>
              </>
            )}
            <button
              onClick={() => ticketClickHandler(booking)}
              className="w-[150px] h-[30px] bg-red-500 text-white"
            >
              View Ticket
            </button>
          </div>
        </div>
      ))}

      {selectedBooking && (
        <TicketBox
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      )}
    </div>
  );
};

export default TransactionPage;
