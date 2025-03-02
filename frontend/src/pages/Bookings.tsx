import useBookings from "../util/useBookings";
import styles from "../styles/bookings.module.scss";

function Bookings() {
  const { bookings, loading, error, deleteBooking } = useBookings();

  if (loading) {
    return <p className={styles.message}>Loading bookings...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Your Bookings</h1>
      {bookings.length === 0 ? (
        <p className={styles.message}>No bookings found.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Room ID</th>
              <th>First Name</th>
              <th>Check-in Date</th>
              <th>Check-out Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.bookingid}>
                <td>{booking.bookingid}</td>
                <td>{booking.roomid}</td>
                <td>{booking.firstname}</td>
                <td>{booking.datestart}</td>
                <td>{booking.dateend}</td>
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteBooking(booking.bookingid)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Bookings;
