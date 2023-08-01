import Sidebar from "../Sidebar";
import InitialFocus from "../Basket";
import Invoice from "../Invoice";
import Team1 from "../Team";
import Team2 from "../Team2";
import Team3 from "../Team3";

const Card4 = () => {
  return (
    <div className="container" style={{ display: "flex", flexDirection: "row" }}>
      <div className="side">
        <Sidebar />
      </div>
      <div className="content">
        <div className="cardss" style={{display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
          <Team1 />
          <Team2 />
          <Team3 />
        </div>
      </div>
    </div>
  );
};

export default Card4;
