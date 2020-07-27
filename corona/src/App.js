import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import InfoCard from "./InfoCard";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import { sortedData } from "./utils";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);

  const changeHandle = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);
    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(proxyurl + url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  };

  useEffect(() => {
    const countryData = async () => {
      await fetch(proxyurl + "https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountryInfo(data);
        });
    };
    countryData();
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(proxyurl+ "https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso3,
          }));

          setCountries(countries);
          const sortData = sortedData(data);
          setTableData(sortData);
        });
    };

    getCountriesData();
  }, []);
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Corona-19 Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={changeHandle}>
              <MenuItem value={"worldwide"}>WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__infoCard">
          <InfoCard
            title="Corona Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoCard
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoCard
            title="Death"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
          <Map center={mapCenter} zoom={mapZoom}/>
      </div>
      <div className="app__right">
        <Card className="app_section">
          <CardContent>
            <h3>Live Corona Stats By country</h3>
            <Table countries={tableData} />
            <h3>Live Corona stats of the whole world</h3>

            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
