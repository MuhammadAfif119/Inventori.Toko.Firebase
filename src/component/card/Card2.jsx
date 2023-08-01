import Sidebar from "../Sidebar";
import InitialFocus from "../Basket";

const Card2 = () => {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "row" }}>
      <div className="side">
        <Sidebar />
      </div>
      <div className="content">
        <div className="Opening">
          <p>Your Order,</p>
        </div>
        <div className="cardss" style={{display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <InitialFocus />
        </div>
      </div>
    </div>
  );
};

export default Card2;
