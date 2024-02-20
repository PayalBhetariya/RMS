import React, { useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../store/bookingSlice";
import { TIMINGS } from "../helpers/Constant";
function BookingForm() {
  const [formData, setFormData] = useState({
    date: "",
    time: "1",
    numberOfGuest: 1,
  });

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const reserveBooking = function (e) {
    // if admin hasn't approved / reject mean pending -> -1
    // approve : 1, reject : 0
    e.preventDefault();
    dispatch(
      createBooking({
        ...formData,
        user: userInfo.userName,
        id: Date.now(),
        status: -1,
        notification: 0,
      })
    );
    console.log(formData);
  };
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Form onSubmit={reserveBooking}>
        <Row>
          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => {
                  setFormData({ ...formData, date: e.target.value });
                }}
              />
            </Form.Group>
          </Col>

          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Time</Form.Label>
              <Form.Select
                value={formData.time}
                onChange={(e) => {
                  setFormData({ ...formData, time: e.target.value });
                }}
              >
                {TIMINGS.map((timing, id) => (
                  <option key={id} value={id}>
                    {timing}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col xs={12} sm={4}>
            <Form.Group>
              <Form.Label>Number of Guests</Form.Label>
              <Form.Control
                value={formData.numberOfGuest}
                type="number"
                onChange={(e) => {
                  setFormData({ ...formData, numberOfGuest: e.target.value });
                }}
              />
            </Form.Group>
          </Col>
          <Col sm={12} className="text-center mt-3">
            <Button variant="primary" type="submit">
              Create Booking Request
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default BookingForm;
