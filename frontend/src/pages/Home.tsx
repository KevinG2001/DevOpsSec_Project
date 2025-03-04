import RoomList from "../components/RoomList";

function Home() {
  return (
    <div>
      <div></div>
      <div>
        <RoomList fetchUrl="api/rooms/latest" />
      </div>
    </div>
  );
}

export default Home;
