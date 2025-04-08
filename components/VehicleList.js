import { useState, useEffect } from "react";
import VehicleCard from "./VehicleCard";
import { getBikes, deleteBike, updateBike } from "../api"; // Import API functions

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const highestSpeed = Math.max(...vehicles.map(vehicle => parseInt(vehicle.topSpeed)), 0);
  const slowestSpeed = Math.min(...vehicles.map(vehicle => parseInt(vehicle.topSpeed)), Infinity);

  useEffect(() => {
    // Fetch vehicles from the API
    const fetchVehicles = async () => {
      try {
        const data = await getBikes();
        setVehicles(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bikes:", error);
        setLoading(false);
      }
    };
    
    fetchVehicles();
  }, []);

  // Delete a vehicle
  const handleDelete = async (id) => {
    try {
      await deleteBike(id);
      setVehicles(vehicles.filter(vehicle => vehicle.id !== id));
    } catch (error) {
      console.error("Error deleting bike:", error);
    }
  };

  // Edit a vehicle
  const handleEdit = async (updatedVehicle) => {
    try {
      await updateBike(updatedVehicle.id, updatedVehicle);
      setVehicles(vehicles.map(vehicle =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      ));
    } catch (error) {
      console.error("Error updating bike:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.bikeGrid}>
      {vehicles.map(vehicle => (
        <VehicleCard 
          key={vehicle.id}
          vehicle={vehicle}
          isFastest={parseInt(vehicle.topSpeed) === highestSpeed}
          isSlowest={parseInt(vehicle.topSpeed) === slowestSpeed}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  );
};

const styles = {
  bikeGrid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center", 
    gap: "20px", 
    marginTop: "20px",
    alignItems: "stretch", 
  },
};

export default VehicleList;
