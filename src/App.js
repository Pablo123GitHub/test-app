import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const options = {
  method: "POST",
  url: "use correct url",
  headers: {
    "content-type": "application/json",
    "cryptio-api-key": process.env.REACT_APP_CRYPTIO_API_KEY,
  },
  data: {
    transaction_hashes: [
      "0xfdf027f88de3290e8493086abdf24b2b1316c3159be2b5ef06109784c81cbbc7",
    ],
    movements: ["626c2c57-520a-4552-9661-d0130bf203f8"],
  },
};

const optionsRevenue = {
  ...options,
  url: "/api/label/1e7c5038-52f6-452b-9d40-cac8e572920a/apply",
};

const optionsIgnore = {
  ...options,
  url: "/api/label/845eb3d0-2f73-4848-93fe-2f90efbc4d43/apply",
};

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
              label: row.label,
            };
          })
        );
      })
      .catch((error) => console.error("error:" + error));
  }, []);

  function setLabels(options) {
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  return (
    <div className="App">
      <button onClick={() => setLabels(optionsRevenue)}>
        Add Revenue Labels to All
      </button>
      <button onClick={() => setLabels(optionsIgnore)}>
        Add Ignore Labels to All
      </button>
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
