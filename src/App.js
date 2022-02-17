import "./styles.css";
import tsIcon from "./demo-icon.png";

export default function App() {
  return (
    <div className="App">
      <div className="demo">
        <div className="box">
          <img src={tsIcon} />
        </div>
        <div className="box cover">
          <img src={tsIcon} />
        </div>
      </div>

      <div className="bg-img"></div>
    </div>
  );
}
