import Country from './Country';

function Countries({ countries }) {
  return (
    <div className="countries">
      {countries.map((country, index) => (
        <Country key={index} country={country} />
      ))}
    </div>
  );
}

export default Countries;
