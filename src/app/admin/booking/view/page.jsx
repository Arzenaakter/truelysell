"use client";
import React, { use } from "react";

const BookingDetailsPage = ({ searchParams }) => {
  const { id } = use(searchParams);
  return <div>Booking Id: {id} </div>;
};

export default BookingDetailsPage;
