const CountrySearch = function({ onChangeCb, disabled }) {
  return (
    <>
    <label htmlFor='country_search'>find countries</label>
    <input id='country_search' type='text' 
      onChange={ onChangeCb }
      placeholder="search for a country"
      disabled={disabled}
      />
    </>
  )
}



  export default CountrySearch;