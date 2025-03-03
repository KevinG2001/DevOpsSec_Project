import RoomList from "../components/RoomList";

function Home() {
  return (
    <div>
      <div></div>
      <div>
        <RoomList fetchUrl={`/rooms/latest`} />
      </div>
    </div>
  );
}

export default Home;
