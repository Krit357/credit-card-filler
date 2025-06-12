import "./App.css";
import cardFront from "./images/bg-card-front.png";
import cardBack from "./images/bg-card-back.png";
import FormFill from "./FormFill";
import { useState } from "react";

function App() {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvc, setCvc] = useState("");

  return (
    <div className="main-pattern">
      {/* mainPage */}
      <div className="main-card">
        <div className="main-credit-card front">
          <svg
            className="main-credit-logo"
            width="84"
            height="53"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="23.478" cy="23.5" rx="23.478" ry="23.5" fill="#fff" />
            <path
              d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
              stroke="#fff"
            />
          </svg>
          <h2 className="main-card-input-number">
            {cardNumber === "" ? "1234 5678 9123 000" : cardNumber}
          </h2>
          <div className="main-card-bottom">
            <p className="main-card-name">
              {cardName === "" ? "JANE APPLESEED" : cardName}
            </p>
            <p className="main-card-expire">
              {String(expiryMonth).padStart(2, "0")} /{" "}
              {String(expiryYear).padStart(2, "0")}
            </p>
          </div>
          <img className="card-front" src={cardFront} alt="card-front" />
        </div>

        <div className="main-credit-card back">
          <p className="main-credit-card-back">{cvc === "" ? "000" : cvc}</p>
          <img className="card-back" src={cardBack} alt="card-back" />
        </div>
      </div>

      <div className="second-card">
        <FormFill
          cardName={cardName}
          setCardName={setCardName}
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expiryMonth={expiryMonth}
          setExpiryMonth={setExpiryMonth}
          expiryYear={expiryYear}
          setExpiryYear={setExpiryYear}
          cvc={cvc}
          setCvc={setCvc}
        />
      </div>
    </div>
  );
}

export default App;
