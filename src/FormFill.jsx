import { useState } from "react";
import "./FormFill.css";

const FormFill = ({
  cardName,
  setCardName,
  cardNumber,
  setCardNumber,
  expiryMonth,
  setExpiryMonth,
  expiryYear,
  setExpiryYear,
  cvc,
  setCvc,
}) => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState({});
  function formatWithDashes(str, size = 4) {
    // 1) remove non-digits
    const clean = str.replace(/\D/g, "");
    // 2) match in chunks of up to `size`
    const chunks = clean.match(new RegExp(`.{1,${size}}`, "g"));
    // 3) join or return empty string
    return chunks ? chunks.join(" ") : "";
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const namePattern = /^[A-Za-z\s]+$/;
    const newError = {};

    if (!cvc.trim() || cvc.length < 3) {
      newError.cvc = "Can't be blank, must be 3 digits";
    }

    if (!expiryMonth.trim()) {
      newError.expiryMonth = "Can't be blank";
    }
    if (!expiryYear.trim()) {
      newError.expiryYear = "Can't be blank";
    }

    if (cardNumber.length < 1) {
      newError.cardNumber = "Can't be blank";
    }

    if (!cardName.trim()) {
      newError.cardName = "Can't be blank";
    } else if (!namePattern.test(cardName)) {
      newError.cardName = "Name must only contain letters and spaces";
    }
    setError(newError);

    if (Object.keys(newError).length === 0) {
      console.log("form values:", {
        cardName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvc,
      });
      switchPage();
    }
    console.log(submit);
    setCardName("");
    setCardNumber("");
    setExpiryMonth("");
    setExpiryYear("");
    setCvc("");
  };

  const handleChange = (e) => {
    setCardNumber(formatWithDashes(e.target.value, 4));
  };

  const maxMonthLength = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 2);
    // 2) if we have two digits, clamp to 1–12
    if (v.length === 2) {
      let num = parseInt(v, 10);
      if (num < 1) num = 1;
      if (num > 12) num = 12;
      // 3) re-format with leading zero if needed
      v = num < 10 ? "0" + num : String(num);
    }
    setExpiryMonth(v);
  };
  const maxMonthYear = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 2);
    // 2) if we have two digits, clamp to 1–12
    if (v.length === 2) {
      let num = parseInt(v, 10);
      if (num < 1) num = 1;
      if (num > 99) num = 99;
      // 3) re-format with leading zero if needed
      v = num < 10 ? "0" + num : String(num);
    }
    setExpiryYear(v);
  };

  const maxcvc = (e) => {
    let v = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(v);
  };

  const switchPage = () => {
    setSubmit(!submit);
  };
  return (
    <div className="form-main">
      {!submit ? (
        <form className="form-box" onSubmit={handleSubmit}>
          <div className="form-box-input">
            <label htmlFor="card-name">CARDHOLDER NAME</label>
            <input
              className={error.cardName ? "input-box error" : "input-box"}
              type="text"
              name="card-name"
              placeholder="e.g Jane Appleseed"
              value={cardName}
              onChange={(e) => setCardName(e.target.value.toLocaleUpperCase())}
            />
            {error.cardName && (
              <p className="error">Can't be blank. Only letter allowed.</p>
            )}
          </div>

          <div className="form-box-input">
            <label htmlFor="card-number">CARD NUMBER</label>
            <input
              className={error.cardNumber ? "input-box error" : "input-box"}
              type="text"
              name="card-number"
              placeholder="e.g 1234 5678 9123 000"
              inputMode="numeric"
              value={cardNumber}
              maxLength={18}
              onChange={handleChange}
            />
            {error.cardNumber && <p className="error">Can't be blank</p>}
          </div>
          <div className="form-box-test">
            {/* EXPIRY group */}
            <div className="field expiry">
              <label htmlFor="MM">EXP. DATE (MM/YY)</label>
              <div className="expiry-inputs mm-yy">
                <input
                  className={`input-box form-box-test expire ${
                    error.expiryMonth ? "error" : ""
                  }`}
                  id="MM"
                  type="number"
                  name="MM"
                  placeholder="MM"
                  maxLength={2}
                  min={0}
                  max={12}
                  pattern="[0-9]{2}"
                  inputMode="numeric"
                  value={expiryMonth}
                  onChange={maxMonthLength}
                />
                <input
                  className={`input-box form-box-test expire ${
                    error.expiryYear ? "error" : ""
                  }`}
                  id="YY"
                  type="number"
                  min={0}
                  max={99}
                  name="YY"
                  placeholder="YY"
                  pattern="[0-9]{2}"
                  inputMode="numeric"
                  value={expiryYear}
                  onChange={maxMonthYear}
                />
              </div>
              {error.expiryMonth && (
                <p className="error">{error.expiryMonth}</p>
              )}
            </div>

            {/* CVC group */}
            <div className="field cvc">
              <label htmlFor="cvc">CVC</label>
              <input
                className={error.cvc ? "input-box error" : "input-box"}
                id="cvc"
                type="number"
                name="cvc"
                placeholder="e.g 123"
                maxLength={3}
                pattern="[0-9]{3}"
                inputMode="numeric"
                value={cvc}
                onChange={maxcvc}
              />
              {error.cvc && <p className="error">{error.cvc}</p>}
            </div>
          </div>

          <button className="btn" type="submit">
            Confirm
          </button>
        </form>
      ) : (
        <div className="success-page">
          <svg
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="40" cy="40" r="40" fill="url(#a)" />
            <path d="M28 39.92 36.08 48l16-16" stroke="#fff" strokeWidth="3" />
            <defs>
              <linearGradient
                id="a"
                x1="-23.014"
                y1="11.507"
                x2="0"
                y2="91.507"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#6348FE" />
                <stop offset="1" stop-color="#610595" />
              </linearGradient>
            </defs>
          </svg>
          <h2>THANK YOU!</h2>
          <p>We've added your card detail</p>
          <button className="btn success" onClick={switchPage}>
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default FormFill;
