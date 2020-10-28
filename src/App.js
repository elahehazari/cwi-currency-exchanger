import { InputLabel, MenuItem, Select } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import axios from "axios";
import Test from "./Test"
const Container = styled.div`
  background-color: gold;
  margin: 20px;
  width: 200px;
`;

function App() {
  const [fromCurrency, setFromCurrency] = useState("usd"); //hook
  const [coefficient, setCoefficient] = useState({
    usd: 1,
    cad: 1.3,
    eur: 0.7,
  });

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

  useEffect(() => {
    axios.get("https://api.exchangeratesapi.io/latest").then((result) => {
      console.log("App -> result", result);
      setCoefficient({
        usd: result.data.rates.USD,
        cad: result.data.rates.CAD,
        eur: 1,
      });
    });
  }, []);

  // const getCurrencyColor = () => {
  //   if (fromCurrency === "usd") return "green";
  //   if (fromCurrency === "cad") return "gold";
  //   if (fromCurrency === "eur") return "white";
  //   return "blue;";
  // };

  return (
    <div className="App">
      <header className="App-header">
        <Test />
        <form autoComplete="off">
          <Container>
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
          </Container>
          <Container>
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
          </Container>
          <Container>
            <TextField
              id="from-amount"
              label="Amount"
              variant="outlined"
              value={fromAmount}
              type="number"
              onChange={handleFromAmountChange}
            />
          </Container>
          <Container>
            <TextField
              id="to-amount"
              label="Converted"
              variant="outlined"
              disabled
              value={toAmount}
            />
          </Container>
        </form>
      </header>
    </div>
  );
}

export default App;
