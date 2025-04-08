import vehiclesData from "../data/vehicles";

const SearchFilter = ({ searchQuery, setSearchQuery, filterType, setFilterType, filterValue, setFilterValue, vehicles }) => {
  
  const brands = [...new Set(vehicles?.map((bike) => bike.brand) || [])];
  const types = [...new Set(vehicles?.map((bike) => bike.type) || [])];

  return (
    <div style={styles.container}>
      {/* Search Bar */}
      <input 
        type="text" 
        placeholder="Search for a bike..." 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        style={styles.searchBox}
      />

      {/* Filter Dropdown */}
      <select onChange={(e) => setFilterType(e.target.value)} style={styles.dropdown}>
        <option value="">Filter by</option>
        <option value="type">Type</option>
        <option value="brand">Brand</option>
      </select>

      {filterType && (
        <select onChange={(e) => setFilterValue(e.target.value)} style={styles.dropdown}>
          <option value="">Select {filterType}</option>
          {(filterType === "brand" ? brands : types).map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      )}
    </div>
  );
};

const styles = {
  container: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px" },
  searchBox: { padding: "8px", width: "250px", border: "1px solid #ccc", borderRadius: "5px" },
  dropdown: { padding: "8px", borderRadius: "5px", cursor: "pointer" },
};

export default SearchFilter;
