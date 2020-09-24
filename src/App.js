import { InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import "./App.css";

const coefficient = {
  usd: 1,
  cad: 1.3,
  eur: 0.7,
};

function App() {
  const [fromCurrency, setFromCurrency] = useState("usd"); //hook
  const handleFromCurrencyChange = (event) => {
    const from = event.target.value;
    setFromCurrency(from);

    setToAmount((fromAmount * coefficient[toCurrency]) / coefficient[from]);
  };
  const [toCurrency, setToCurrency] = useState("cad");
  const handleToCurrencyChange = (event) => {
    const to = event.target.value;
    setToCurrency(to);
    setToAmount((fromAmount * coefficient[to]) / coefficient[fromCurrency]);
  };

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const handleFromAmountChange = (event) => {
    const from = Number(event.target.value);
    setFromAmount(from);
    setToAmount((from * coefficient[toCurrency]) / coefficient[fromCurrency]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form autoComplete="off">
          <div>
            <InputLabel id="from-currency-label">From</InputLabel>
            <Select
              labelId="from-currency-label"
              id="from-currency"
              value={fromCurrency}
              onChange={handleFromCurrencyChange}
              label="From"
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="cad">CAD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
            </Select>
          </div>
          <div>
            <InputLabel id="to-currency-label">To</InputLabel>
            <Select
              labelId="to-currency-label"
              id="to-currency"
              value={toCurrency}
              onChange={handleToCurrencyChange}
              label="To"
            >
              <MenuItem value="usd">USD</MenuItem>
              <MenuItem value="cad">CAD</MenuItem>
              <MenuItem value="eur">EUR</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              id="from-amount"
              label="Amount"
              variant="outlined"
              value={fromAmount}
              type="number"
              onChange={handleFromAmountChange}
            />
          </div>
          <div>
            <TextField
              id="to-amount"
              label="Converted"
              variant="outlined"
              disabled
              value={toAmount}
            />
          </div>
        </form>
      </header>
    </div>
  );
}

export default App;
