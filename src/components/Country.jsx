function Country({ country }) {
  
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(country.name.common)}`;

  return (
    <div className="country-card">
      <img src={country.flags.svg} alt={`${country.name.common} flag`} className="country-flag" />
      <h2 className="country-name">{country.name.common}</h2>
      <div className="country-info">
        <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {country.area.toLocaleString()} km²</p>
        <p><strong>Continent:</strong> {country.continents.join(', ')}</p>
        <p><strong>Subregion:</strong> {country.subregion}</p>
        <p><strong>Border:</strong> {country.borders}</p>
      </div>
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="google-maps-link">
        Show on Google Maps
      </a>
    </div>
  );
}

export default Country;
