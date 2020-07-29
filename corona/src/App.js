import React, {useEffect, useState} from "react";
import {Card, CardContent, FormControl, Select, MenuItem} from "@material-ui/core";
import InfoCard from "./InfoCard";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {sortedData} from "./utils";
import 'leaflet/dist/leaflet.css';
import {beautyPrint} from './utils';
import PieChart from './PieChart';
import virus from './virus.jpg';
const proxyurl = "https://cors-anywhere.herokuapp.com/";

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [caseType, setCaseType] = useState('cases');
    const [pieData, setPieData] = useState({});

    const changeHandle = async (e) => {
        const countryCode = e.target.value;
        setCountry(countryCode);
        const url = countryCode === "worldwide"
            ? "https://disease.sh/v3/covid-19/all"
            : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        await fetch(proxyurl + url)
            .then((response) => response.json())
            .then((data) => {
                setCountryInfo(data);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setPieData(data);
            });
    };

    useEffect(() => {
        const countryData = async () => {
            await fetch(
                proxyurl + "https://disease.sh/v3/covid-19/all"
            )
                .then((response) => response.json())
                .then((data) => {
                    setCountryInfo(data);
                });
        };
        countryData();
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await fetch(
                proxyurl + "https://disease.sh/v3/covid-19/countries"
            )
                .then((response) => response.json())
                .then((data) => {
                    const countries = data.map(
                        (country) => ({name: country.country, value: country.countryInfo.iso3})
                    );

                    setCountries(countries);
                    const sortData = sortedData(data);
                    setMapCountries(data)
                    setTableData(sortData);
                });
        };

        getCountriesData();
    }, []);
    return (
        <div className='container'>
            <div className="header">
                <div className='virus__content'>
                    <h1 className="virus__title">Check out current country and global data on COVID19.</h1>
                    <p className="virus__p">Donate to WHO and be a part of the change</p>
                    <a
                        href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/donate"
                        target="_blank">
                        <button className="donate__btn">
                            <i class="fas fa-briefcase-medical"></i> Donate</button>
                    </a>
                </div>
                <img className="virus" src={virus} alt="image of virus"/>

            </div>
            <div className="app">
                <div className="app__left">
                    <div className="app__header">
                        <h1 className='logo'>Covid-19 Tracker</h1>
                        <FormControl className="app__dropdown">
                            <Select variant="outlined" value={country} onChange={changeHandle}>
                                <MenuItem value={"worldwide"}>WorldWide</MenuItem>
                                {
                                    countries.map(
                                        (country) => (<MenuItem value={country.value}>{country.name}</MenuItem>)
                                    )
                                }
                            </Select>
                        </FormControl>
                    </div>
                    <div className="app__infoCard">
                        <InfoCard
                            isRed="isRed"
                            icon={(<i class="fas fa-skull-crossbones"></i>)}
                            active={caseType === 'cases'}
                            onClick={e => setCaseType('cases')}
                            title="Corona Cases"
                            cases={beautyPrint(countryInfo.todayCases)}
                            total={beautyPrint(countryInfo.cases)}/>
                        <InfoCard
                            icon={(<i class="fas fa-lungs-virus"></i>)}
                            active={caseType === 'recovered'}
                            onClick={e => setCaseType('recovered')}
                            title="Recovered"
                            cases={beautyPrint(countryInfo.todayRecovered)}
                            total={beautyPrint(countryInfo.recovered)}/>
                        <InfoCard
                            icon ={(<i class="fas fa-virus-slash"></i>)}
                            isRed="isRed"
                            active={caseType === 'deaths'}
                            onClick={e => setCaseType('deaths')}
                            title="Death"
                            cases={beautyPrint(countryInfo.todayDeaths)}
                            total={beautyPrint(countryInfo.deaths)}/>
                    </div>
                    <Map
                        caseType={caseType}
                        center={mapCenter}
                        zoom={mapZoom}
                        countries={mapCountries}/>
                    <div className="app__barGraph"></div>

                </div>
                <div className="app__right">
                    <Card className="app_section">
                        <CardContent>
                            <h3>Live Corona Stats By country</h3>
                            <Table countries={tableData}/>
                            <h3 className='graph_title'>Whole World new {caseType}</h3>
                            <LineGraph className="app__graph" caseType={caseType}/>
                        </CardContent>
                    </Card>
                </div>

            </div>
                
                    <PieChart countries={pieData}/>
                    
           

        </div>

    );
}

export default App;
