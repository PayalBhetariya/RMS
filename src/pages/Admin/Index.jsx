import React from "react";
import BookingData from "../../components/BookingData";
import { useSelector } from "react-redux";

function AdminHome() {
  const allBookings = useSelector((state) => state.booking.bookings);
  return <BookingData type="admin" bookings={allBookings} />;
}

export default AdminHome;
