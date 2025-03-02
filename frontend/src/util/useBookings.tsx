import { useState, useEffect } from "react";
import axios from "axios";
import { Booking } from "../util/types";
import useUser from "../util/useUser";

function useBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useUser();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookings/all/${userId}`
        );
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.bookings || [];
        setBookings(data);
      } catch (err: any) {
        setError(err.response?.data?.error || "Error fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const deleteBooking = async (bookingid: number) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/delete/${bookingid}`
      );
      setBookings((prevBookings) =>
        prevBookings.filter((b) => b.bookingid !== bookingid)
      );
    } catch (err) {
      console.error("Problem deleting booking", err);
    }
  };

  return { bookings, loading, error, deleteBooking };
}

export default useBookings;
