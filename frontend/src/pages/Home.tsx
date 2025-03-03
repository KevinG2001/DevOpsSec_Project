import RoomList from "../components/RoomList";

function Home() {
  return (
    <div>
      <div></div>
      <div>
        <RoomList fetchUrl={`${import.meta.env.VITE_API_URL}/rooms/latest`} />
      </div>
    </div>
  );
}

export default Home;
