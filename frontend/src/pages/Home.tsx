import RoomList from "../components/RoomList";

function Home() {
  return (
    <div>
      <div></div>
      <div>
        <RoomList fetchUrl={`${process.env.REACT_APP_API_URL}/rooms/latest`} />
      </div>
    </div>
  );
}

export default Home;
