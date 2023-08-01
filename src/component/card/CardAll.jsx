import Card from "./Card";
import Sidebar from "../Sidebar";

const CardAll = () => {
  return (
    <div className="container" style={{ width:"100%", display: "flex", flexDirection: "row" }}>
      <div className="side" >
        <Sidebar />
      </div>
      <div className="content">
        <div className="cardss" >
          <Card />
        </div>
      </div>
    </div>
  );
};

export default CardAll;
