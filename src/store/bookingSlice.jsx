import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bookings: [],
};

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    initializeBookings: (state, action) => {
      state.bookings = action.payload;
    },
    createBooking: (state, action) => {
      state.bookings.unshift(action.payload);
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
    handleBooking: (state, action) => {
      state.bookings = state.bookings.map((booking) => {
        if (booking.id === action.payload.id)
          return { ...booking, status: action.payload.status };
        return booking;
      });
      localStorage.setItem("bookings", JSON.stringify(state.bookings));
    },
  },
});

// Action creators are generated for each case reducer function
export const { createBooking, initializeBookings, handleBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
