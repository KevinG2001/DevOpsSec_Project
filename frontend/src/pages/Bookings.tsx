import useBookings from "../util/useBookings";

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
    <div style={{ padding: "20px" }}>
      <h1>Your Bookings</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #ddd" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>Booking ID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Room ID</th>
            <th style={{ textAlign: "left", padding: "8px" }}>First Name</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Check-in Date</th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Check-out Date
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr
              key={booking.bookingid}
              style={{ borderBottom: "1px solid #eee" }}
            >
              <td style={{ padding: "8px" }}>{booking.bookingid}</td>
              <td style={{ padding: "8px" }}>{booking.roomid}</td>
              <td style={{ padding: "8px" }}>{booking.firstname}</td>
              <td style={{ padding: "8px" }}>{booking.datestart}</td>
              <td style={{ padding: "8px" }}>{booking.dateend}</td>
              <button onClick={() => deleteBooking(booking.bookingid)}>
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Bookings;
