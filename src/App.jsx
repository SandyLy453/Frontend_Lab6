import { useEffect, useState } from 'react';
import Countries from './components/Countries';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [continents, setContinents] = useState([]);
  const [subregions, setSubregions] = useState([]);
  const [continentFilter, setContinentFilter] = useState('');
  const [subregionFilter, setSubregionFilter] = useState('');
  const [sortAlphabetical, setSortAlphabetical] = useState(false);
  const [top10By, setTop10By] = useState(''); // 'population' or 'area'

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);

        const uniqueContinents = [...new Set(data.flatMap(country => country.continents))];
        const uniqueSubregions = [...new Set(data.map(country => country.subregion).filter(Boolean))];

        setContinents(uniqueContinents);
        setSubregions(uniqueSubregions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSort = () => {
    let filteredCountries = countries
      .filter(country => 
        (continentFilter ? country.continents.includes(continentFilter) : true) &&
        (subregionFilter ? country.subregion === subregionFilter : true)
      );

    if (sortAlphabetical) {
      filteredCountries.sort((a, b) => a.name.common.localeCompare(b.name.common));
    }

    if (top10By) {
      filteredCountries.sort((a, b) => b[top10By] - a[top10By]);
      filteredCountries = filteredCountries.slice(0, 10);
    }

    return filteredCountries;
  };

  return (
    <div className="app">
      <h1>Countries of the World</h1>
      <div className="filters">
        <label>
          <input 
            type="checkbox" 
            checked={sortAlphabetical} 
            onChange={() => setSortAlphabetical(!sortAlphabetical)} 
          />
          Alphabetical
        </label>
        <label>
          Top 10:
          <input type="radio" name="top10" value="population" onChange={() => setTop10By('population')} /> by population
          <input type="radio" name="top10" value="area" onChange={() => setTop10By('area')} /> by area
        </label>
        <label>
          By continent:
          <select value={continentFilter} onChange={(e) => {
            setContinentFilter(e.target.value);
            setSubregionFilter(''); // clear subregion 
          }}>
            <option value="">All</option>
            {continents.map(continent => (
              <option key={continent} value={continent}>{continent}</option>
            ))}
          </select>
        </label>
        <label>
          By subregion:
          <select value={subregionFilter} onChange={(e) => {
            setSubregionFilter(e.target.value);
            setContinentFilter(''); // clear continent 
          }}>
            <option value="">All</option>
            {subregions.map(subregion => (
              <option key={subregion} value={subregion}>{subregion}</option>
            ))}
          </select>
        </label>
      </div>
      <Countries countries={handleSort()} />
    </div>
  );
}

export default App;
