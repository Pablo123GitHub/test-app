import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [dataTable, setDataTable] = useState([]);

  const currency = {
    "e518736c-49d7-4944-921d-d2ce5924dc5f": "BAL",
    "12a54863-f992-4c1d-8e54-a1eb65a74d15": "WETH",
  };

  useEffect(() => {
    axios
      .get("/api/movement", {
        params: {
          transaction_hashes:
            "0xfdf027f88de3290e8493086abdf24b2b1316c3159be2b5ef06109784c81cbbc7",
        },
        headers: {
          accept: "application/json",
          "cryptio-api-key": process.env.REACT_APP_CRYPTIO_API_KEY,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setDataTable(
          response.data.data.map((row) => {
            return {
              date: new Date(row.transaction_date * 1000).toLocaleDateString(),
              incoming: row.direction,
              asset: currency[row.asset],
              volume: row.volume,
            };
          })
        );
      })
      .catch((error) => console.error("error:" + error));
  }, []);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Incoming</th>
            <th>Asset</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {dataTable.map((row, index) => (
            <tr key={index}>
              <td>{row.date}</td>
              <td>{row.incoming}</td>
              <td>{row.asset}</td>
              <td>{row.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
