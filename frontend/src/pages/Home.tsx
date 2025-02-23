import RoomList from "../components/RoomList";

function Home() {
  return (
    <div>
      <div>This is home page</div>
      <div>
        <RoomList fetchUrl="http://localhost:5000/rooms/latest" />
      </div>
    </div>
  );
}

export default Home;
