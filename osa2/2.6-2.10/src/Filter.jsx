const Filter = ({ persons, search, handleSearchChange }) => {


  return (
    <>
      Filter shown with<input 
        value={search} 
        onChange={handleSearchChange} 
        placeholder="Search..." 
      />
    </>
  )
}

export default Filter
