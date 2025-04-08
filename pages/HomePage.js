import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
//import vehiclesData from "../data/vehicles";
import VehicleCard from "../components/VehicleCard";
import SearchFilter from "../components/SearchFilter";
import initialVehiclesData from "../data/vehicles";
import BikeStatistics from "../components/BikeStatistics";


const ITEMS_PER_PAGE = 4;

const HomePage = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState(initialVehiclesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState(""); 
  const [filterValue, setFilterValue] = useState(""); 
  const [sortAscending, setSortAscending] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem("vehicles")) || [];
    const mergedVehicles = storedVehicles.length > 0 ? storedVehicles : initialVehiclesData; 
    setVehicles(mergedVehicles);
  }, []);

  // Delete a vehicle
  const handleDelete = (id) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  // Edit a vehicle
  const handleEdit = (updatedVehicle) => {
    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    );
    setVehicles(updatedVehicles);
    localStorage.setItem("vehicles", JSON.stringify(updatedVehicles));
  };

  let filteredBikes = vehicles.filter((bike) => {
    const matchesSearch = bike.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType ? bike[filterType].toLowerCase() === filterValue.toLowerCase() : true;
    return matchesSearch && matchesFilter;
  });

  if (sortAscending) {
    filteredBikes = [...filteredBikes].sort((a, b) => parseInt(a.topSpeed) - parseInt(b.topSpeed));
  }

  const totalPages = Math.ceil(filteredBikes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedBikes = filteredBikes.slice(startIndex, startIndex + ITEMS_PER_PAGE);


  return (
    <div style={styles.container}>
      <h1>Add your bike</h1>
      <p>Add your motorcycle to the vast gallery of Moto World.</p>

      <div style={styles.addBikeSection}>
        <div style={styles.uploadPlaceholder}>
          <span style={styles.icon}>➕</span>
          <button style={styles.addButton} onClick={() => navigate("/add-vehicle")}>Add</button>
        </div>
      </div>

      {/* Search & Filter Component */}
      <SearchFilter 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        filterType={filterType} 
        setFilterType={setFilterType} 
        filterValue={filterValue} 
        setFilterValue={setFilterValue}
      />

      {/* Sort Button */}
      <button 
        onClick={() => setSortAscending(!sortAscending)} 
        style={styles.sortButton}
      >
        Sort Bikes (Top Speed) {sortAscending ? "↑" : "↓"}
      </button>

      <h2>Motorcycles</h2>
      <div style={styles.bikeGrid}>
        {displayedBikes.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={handleDelete} onEdit={handleEdit} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div style={styles.pagination}>
        <button 
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          Previous
        </button>

        <span> Page {currentPage} of {totalPages} </span>

        <button 
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          Next
        </button>
      </div>

      {/* Statistics Section */}
      <div style={styles.statisticsSection}>
        <h2>Motorcycle Statistics</h2>
        <BikeStatistics bikes={vehicles} />
      </div>

    </div>
  );
};


const styles = {
  container: { 
    padding: "20px", 
    textAlign: "center" },

  addBikeSection: { 
    display: "flex", 
    justifyContent: "center", 
    gap: "20px", 
    alignItems: "center",
    margin: "20px 0" },

  uploadPlaceholder: { 
    width: "150px", 
    height: "150px", 
    background: "#eee", 
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: "10px" },

  icon: { 
    fontSize: "30px" },
  addButton: { 
    marginTop: "10px", 
    padding: "8px 16px", 
    background: "black", 
    color: "white", 
    borderRadius: "5px", 
    cursor: "pointer" },

  previewImage: { 
    width: "200px", 
    height: "150px", 
    objectFit: "cover", 
    borderRadius: "10px" },

  bikeGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", 
    gap: "20px", 
    marginTop: "20px",
    alignItems: "stretch", 
  },

  sortButton: { 
    marginLeft: "10px", 
    padding: "8px 12px", 
    background: "red", 
    color: "white", 
    borderRadius: "5px", 
    cursor: "pointer", 
    border: "none" 
  },

  pagination: { marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" },
  pageButton: { padding: "8px 12px", background: "#333", color: "white", borderRadius: "5px", cursor: "pointer", border: "none", disabled: { opacity: 0.5, cursor: "default" } },
  statisticsSection: { display: "flex", marginTop: "40px", padding: "20px", background: "#f9f9f9", borderRadius: "10px" },


    
};

export default HomePage;
