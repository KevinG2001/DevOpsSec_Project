import { useState, useEffect } from "react";
import axios from "axios";
import { Booking } from "../util/types";
import useUser from "../util/useUser";

function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const { userId } = useUser();

  useEffect(() => {
    if (!userId) return;

    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/bookings/all/${Number(userId)}`);
        setBookings(response.data);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError(err.response?.data?.error || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const createBooking = async (newBooking: Omit<Booking, "bookingid">) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await axios.post("/api/bookings/create", newBooking);
      setSuccess(true);
      if (userId) {
        const response = await axios.get(`/api/bookings/all/${Number(userId)}`);
        setBookings(response.data);
      }
    } catch (err: any) {
      console.error("Error creating booking:", err);
      setError(
        err.response?.data?.error || "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (bookingid: number) => {
    try {
      await axios.delete(`/api/bookings/delete/${bookingid}`);
      setBookings((prev) => prev.filter((b) => b.bookingid !== bookingid));
    } catch (err) {
      console.error("Problem deleting booking:", err);
      setError("Error deleting booking. Please try again.");
    }
  };

  return { bookings, loading, error, success, createBooking, deleteBooking };
}

export default useBookings;
