import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSeatsDetailes } from "../../redux/reducer/seatSlice";
import VipSeat from "../seatComponents/VipSeat";
import BolconySeat from "../seatComponents/BalconySeat";
import RegularSeat from "../seatComponents/RegularSeat";
import AxiosInstance from "../../redux/utils/apiConnector";
import {
  capturePayment,
  verifyPayment,
} from "../../redux/reducer/paymentSlice";
const ShowSeats = () => {
  const dispatch = useDispatch();
  const { cinema_id, movie_id, timing } = useParams();
  const { seatsInfo, loading } = useSelector((state) => state.seat);

  const [seatArray, setSeatArray] = useState([]);
  const [regularSeat, setRegularSeat] = useState([]);
  const [balconySeat, setBalconySeat] = useState([]);
  const [vipSeat, setVipSeat] = useState([]);
  const [showId, setShowId] = useState(null);

  const seats = useSelector((state) => state.book.seats);

  const { capturePaymentData } = useSelector((state) => state.payment);

  

  useEffect(() => {
    const fetchSeatsData = async () => {
      const result = await dispatch(
        fetchSeatsDetailes({ movieId: movie_id, cinemaId: cinema_id })
      );

      if (fetchSeatsDetailes.fulfilled.match(result)) {
        // console.log("Fetch successful");
      } else {
        // console.error("Fetch failed");
      }
    };

    fetchSeatsData();
  }, [dispatch, cinema_id, movie_id]);

  useEffect(() => {
    // Filter data when seatsInfo changes
    if (seatsInfo?.length > 0) {
      // Filter by timing first
      const filteredData = seatsInfo.filter((item) => item.timing === timing);

      setShowId(filteredData[0]._id);
      // console.log("SeastsINfo :",seatsInfo);
      if (filteredData.length > 0) {
        // Assuming `filteredData` contains one object after filtering
        const selectedShow = filteredData[0]; // Adjust logic if multiple shows can match

        // Extract showSeats from the selected show
        const { showSeats } = selectedShow;

        // Further filtering of seats by type
        const regularSeatFilter = showSeats.filter(
          (item) => item.seatId.seatType === "REGULAR"
        );
        const bolconySeatFilter = showSeats.filter(
          (item) => item.seatId.seatType === "BALCONY"
        );
        const vipSeatFilter = showSeats.filter(
          (item) => item.seatId.seatType === "VIP"
        );

        // Update state
        setSeatArray(filteredData);
        setRegularSeat(regularSeatFilter);
        setBalconySeat(bolconySeatFilter);
        setVipSeat(vipSeatFilter);
      } else {
        // Handle the case where no show matches the timing
        setSeatArray([]);
        setRegularSeat([]);
        setBalconySeat([]);
        setVipSeat([]);
      }
    }
  }, [seatsInfo]);

  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);

    // Get day
    const day = date.getDate();

    // Get month in abbreviated format
    const month = date.toLocaleString("en-US", { month: "short" });

    // Get hours and minutes
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

  const bookTicketsHandler = async () => {
    const requestData = { showId, seatsBook: seats };

  
    try {
      // Dispatch capturePayment thunk
      const captureResponse = await dispatch(capturePayment(requestData));


      const amount = capturePaymentData.data.amount;

      console.log(amount);
      // Razorpay payment options
      const options = {
        key: "rzp_test_4Pd7FCcIYATYXN", // Razorpay test key
        amount,
        currency: "INR",
        name: "Book my Cinema", // Business name
        order_id: capturePaymentData.data.id, // Order ID from capture response
        callback_url: `${AxiosInstance.defaults.baseURL}/payment/verifyPayment`, // Verification endpoint
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9977347016",
        },
        notes: {
          address: "ABC Office",
        },
        handler: async (razorpayResponse) => {
          try {
            // Prepare data for verification
            const verificationData = {
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
              showId,
              seatsForBook: seats,
              totalAmount: amount,
            };

            // Dispatch verifyPayment thunk
            const verifyResponse = await dispatch(
              verifyPayment(verificationData)
            );
            // console.log("Payment Verified:", verifyResponse);
          } catch (error) {
             console.error("Payment Verification Failed:", error.message);
          }
        },
      };

      // Initialize Razorpay and open the payment window
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      // console.error("Error capturing payment:", error.message);
    }
  };

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
                        {vipSeat.map((vip, index) => (
                          <VipSeat vip={vip} key={vip._id} />
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
                        {balconySeat.map((balcony, index) => (
                          <BolconySeat balcony={balcony} key={balcony._id} />
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
                        {regularSeat.map((regular, index) => (
                          <RegularSeat regular={regular} key={regular._id} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="w-full flex items-center justify-center mt-4">
        <button
          onClick={bookTicketsHandler}
          className="w-[150px] h-[40px] bg-red-500 text-white outline-none"
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default ShowSeats;
