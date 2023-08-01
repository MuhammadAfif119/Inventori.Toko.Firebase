import Sidebar from "../Sidebar";
import InitialFocus from "../Basket";
import Invoice from "../Invoice";

const Card3 = () => {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "row" }}>
      <div className="side">
        <Sidebar />
      </div>
      <div className="content">
        <div className="cardss" style={{display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Invoice />
        </div>
      </div>
    </div>
  );
};

export default Card3;
