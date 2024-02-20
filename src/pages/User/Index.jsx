import React, { useEffect } from "react";
import BookingForm from "../../components/BookingForm";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BookingData from "../../components/BookingData";
function UserHome() {
  const userInfo = useSelector((state) => state.user);
  const bookings = useSelector((state) => state.booking.bookings);
  const userBookings = bookings.filter(
    (booking) => booking.user === userInfo.userName
  );
  useEffect(() => {
    if (userInfo.userName && bookings.length) {
      bookings.forEach((booking) => {
        if (booking.user === userInfo.userName) {
          if (booking.notification === 0 && booking.status !== -1) {
            toast(
              `Booking for date ${booking.date} is ${
                booking.status ? "Accepted" : "Rejected"
              }`
            );
          }
        }
      });
    }
  }, [bookings, userInfo]);
  return (
    <>
      <BookingForm />
      <BookingData type="user" bookings={userBookings} />
    </>
  );
}

export default UserHome;
