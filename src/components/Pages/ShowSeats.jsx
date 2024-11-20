import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSeatsDetailes } from "../../redux/reducer/seatSlice";
import VipSeat from "../seatComponents/VipSeat";
import BolconySeat from "../seatComponents/BalconySeat";
import RegularSeat from "../seatComponents/RegularSeat";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");
const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token"))
  : null;

const ShowSeats = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cinema_id, movie_id, timing } = useParams();
  const { seatsInfo, loading } = useSelector((state) => state.seat);

  const [seatArray, setSeatArray] = useState([]);
  const [showSeatsArray, setShowSeatsArray] = useState([]);
  const [regularSeat, setRegularSeat] = useState([]);
  const [balconySeat, setBalconySeat] = useState([]);
  const [vipSeat, setVipSeat] = useState([]);
  const [mySeats, setMySeats] = useState([]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" });
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours || 12; // Handle 0 as 12 for 12-hour clock

    // Format minutes to always have two digits
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    // Build the final formatted string
    return `${day} ${month}, ${hours}:${formattedMinutes} ${ampm}`;
  };

  // Handle seat click
  const toggleSeatSelection = (seat) => {
    setMySeats(
      (prevSeats) =>
        prevSeats.some((selectedSeat) => selectedSeat._id === seat._id)
          ? prevSeats.filter((selectedSeat) => selectedSeat._id !== seat._id) // Deselect seat
          : [...prevSeats, seat] // Select seat
    );
  };

  // Book Now functionality
  const handleBookNow = async () => {
    try {
      const seatIds = mySeats.map((seat) => seat._id);
      // console.log("Book: ", seatIds);
      const res = await axios.post(
        "https://movie-book-app-backend.vercel.app/api/v1/show/reserveSeats",
        {
          seatIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res?.data?.success) {
        // Navigate to the payment page and send seatIds as part of the state
        alert(res?.data?.message);
        navigate("/make-payment", { state: { seatIds } });
      }

      setMySeats([]); // Clear selected seats after booking
    } catch (error) {
      console.error("Error booking seats:", error?.response?.data?.message);
      alert(error.response?.data?.message);
      window.location.reload();
    }
  };

  // Update seat statuses via socket events
  const updateSeatStatuses = (updatedSeatIds, status) => {
    setShowSeatsArray((prevSeats) =>
      prevSeats.map((seat) =>
        updatedSeatIds.includes(seat._id) ? { ...seat, status: status } : seat
      )
    );
  };

  useEffect(() => {
    const handleSocketEvents = () => {
      console.log("Setting up socket listener");

      socket.on("seatsUpdated", (updatedSeatIds) => {
        console.log("on seatsUpdated:", updatedSeatIds);
        updateSeatStatuses(updatedSeatIds, "Booked");
      });

      socket.on("reservedSeats", (reservedSeatIds) => {
        console.log("on reservedSeats:", reservedSeatIds);
        updateSeatStatuses(reservedSeatIds, "Reserved");
      });

      socket.on("seatsToRevert", (seatsToRevertIds) => {
        console.log("on seatsToRevert:", seatsToRevertIds);
        updateSeatStatuses(seatsToRevertIds, "Available");
      });

      console.log("Socket listener is set up");
    };

    handleSocketEvents();

    return () => {
      // Cleanup socket listeners
      socket.off("seatsUpdated");
      socket.off("reservedSeats");
      socket.off("seatsToRevert");
    };
  }, []);

  useEffect(() => {
    const fetchSeatsData = async () => {
      const result = await dispatch(
        fetchSeatsDetailes({ movieId: movie_id, cinemaId: cinema_id })
      );

      if (fetchSeatsDetailes.fulfilled.match(result)) {
        console.log("Fetch successful");
      } else {
        console.error("Fetch failed");
      }
    };

    fetchSeatsData();
  }, [dispatch, cinema_id, movie_id]);

  useEffect(() => {
    const filterSeats = () => {
      if (seatsInfo?.length > 0) {
        // Filter by timing first
        const filteredData = seatsInfo.filter((item) => item.timing === timing);

        if (filteredData.length > 0) {
          // Assuming `filteredData` contains one object after filtering
          const { showSeats } = filteredData[0]; // Adjust logic if multiple shows can match

          // Update seats state
          setSeatArray(filteredData);
          setShowSeatsArray(showSeats);
          setRegularSeat(
            showSeats.filter((item) => item.seatId.seatType === "REGULAR")
          );
          setBalconySeat(
            showSeats.filter((item) => item.seatId.seatType === "BALCONY")
          );
          setVipSeat(
            showSeats.filter((item) => item.seatId.seatType === "VIP")
          );
        } else {
          setSeatArray([]);
          setShowSeatsArray([]);
          setRegularSeat([]);
          setBalconySeat([]);
          setVipSeat([]);
        }
      }
    };
    filterSeats();
  }, [seatsInfo]);

  useEffect(() => {
    const filterSeats = () => {
      if (showSeatsArray.length > 0) {
        setRegularSeat(
          showSeatsArray.filter((seat) => seat.seatId.seatType === "REGULAR")
        );
        setBalconySeat(
          showSeatsArray.filter((seat) => seat.seatId.seatType === "BALCONY")
        );
        setVipSeat(
          showSeatsArray.filter((seat) => seat.seatId.seatType === "VIP")
        );
      } else {
        setRegularSeat([]);
        setBalconySeat([]);
        setVipSeat([]);
      }
    };
    filterSeats();
  }, [showSeatsArray]);

  return (
    <div>
      {loading ? (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="custom-loader"></div>
        </div>
      ) : (
        <div>
          {seatArray.length === 0 ? (
            <div className="text-center">No Show Found</div>
          ) : (
            <div>
              <div className="w-screen flex flex-col items-center justify-start gap-2 p-4">
                <div>{seatArray[0].cinemaId.cinemaName}</div>
                <div className="flex items-center justify-start gap-3">
                  <div>{seatArray[0].cinemaId.cinemaName} : </div>
                  <div>{seatArray[0].cinemaId.cityId.cityName} |</div>
                  <div>{formatDate(seatArray[0].showStart)}</div>
                </div>
              </div>

              <div className="w-screen border-[1px] bg-[rgb(246,245,250)] h-[30px]"></div>

              <div className="w-screen max-h-max bg-[rgb(250,250,250)] flex items-center justify-center flex-col gap-4">
                {/* VIP Seats */}
                <div className="w-[50%] flex items-center justify-center gap-2 p-2">
                  {vipSeat.length !== 0 && (
                    <div className="w-full flex items-center justify-center flex-col">
                      <div className="w-[80%] border-b-[0.5px] border-b-[rgb(237,237,237)]">
                        {`Rs. ${vipSeat[0].seatId.seatPrice} VIP / LUXURY`}
                      </div>
                      <div className="grid grid-cols-5 gap-4 my-5">
                        {vipSeat.map((vip) => (
                          <VipSeat
                            vip={vip}
                            key={vip._id}
                            onClick={() => toggleSeatSelection(vip)}
                            isSelected={mySeats.some(
                              (seat) => seat._id === vip._id
                            )}
                            isBooked={vip.status === "Booked"}
                            isReserved={vip.status === "Reserved"}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Balcony Seats */}
                <div className="w-[50%] flex items-center justify-center gap-2 p-2">
                  {balconySeat.length !== 0 && (
                    <div className="w-full flex items-center justify-center flex-col">
                      <div className="w-[80%] border-b-[0.5px] border-b-[rgb(237,237,237)]">
                        {`Rs. ${
                          balconySeat[0].seatId?.seatPrice || "N/A"
                        } BALCONY`}
                      </div>
                      <div className="grid grid-cols-5 gap-4 my-5">
                        {balconySeat.map((balcony) => (
                          <BolconySeat
                            balcony={balcony}
                            key={balcony._id}
                            onClick={() => toggleSeatSelection(balcony)}
                            isSelected={mySeats.some(
                              (seat) => seat._id === balcony._id
                            )}
                            isBooked={balcony.status === "Booked"}
                            isReserved={balcony.status === "Reserved"}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Regular Seats */}
                <div className="w-[50%] flex items-center justify-center gap-2 p-2">
                  {regularSeat.length !== 0 && (
                    <div className="w-full flex items-center justify-center flex-col">
                      <div className="w-[80%] border-b-[0.5px] border-b-[rgb(237,237,237)]">
                        {`Rs. ${
                          regularSeat[0].seatId?.seatPrice || "N/A"
                        } REGULAR`}
                      </div>
                      <div className="grid grid-cols-5 gap-4 my-5">
                        {regularSeat.map((regular) => (
                          <RegularSeat
                            regular={regular}
                            key={regular._id}
                            onClick={() => toggleSeatSelection(regular)}
                            isSelected={mySeats.some(
                              (seat) => seat._id === regular._id
                            )}
                            isBooked={regular.status === "Booked"}
                            isReserved={regular.status === "Reserved"}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="text-center my-5">
                <button
                  className="bg-blue-500 text-white px-5 py-2 rounded"
                  onClick={handleBookNow}
                  disabled={mySeats.length === 0}
                >
                  Book Now
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShowSeats;
