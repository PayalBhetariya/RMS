import Table from "react-bootstrap/Table";
import { Container, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { BOOKING_STATUS, TIMINGS } from "../helpers/Constant";
import { handleBooking } from "../store/bookingSlice";
function BookingData({ bookings, type }) {
  const dispatch = useDispatch();
  const manageBooking = function (id, status) {
    dispatch(handleBooking({ id, status }));
  };
  return (
    <Container>
      <h2 className="text-center my-5">All Bookings</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            {type === "admin" && <th>User</th>}
            <th>Date</th>
            <th>Time</th>
            <th>No of guest</th>
            {type === "admin" ? <th>Action</th> : <th>Status</th>}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, id) => {
            return (
              <tr key={booking.id}>
                <td>{id + 1}</td>
                {type === "admin" && <td>{booking.user}</td>}
                <td>{booking.date}</td>
                <td>{TIMINGS[booking.time]}</td>
                <td>{booking.numberOfGuest}</td>
                {type === "admin" ? (
                  <td className="d-flex gap-4">
                    {booking.status === -1 ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={manageBooking.bind(null, booking.id, 1)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => manageBooking(booking.id, 0)}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      BOOKING_STATUS[booking.status + 1]
                    )}
                  </td>
                ) : (
                  <td>{BOOKING_STATUS[booking.status + 1]}</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

export default BookingData;
