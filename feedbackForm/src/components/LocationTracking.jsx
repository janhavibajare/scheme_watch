import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "./Firebase";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

// Fix for default Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LocationTracking() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check authentication status
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("No authenticated user, redirecting to login");
        navigate("/login");
      }
      setLoading(false);
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  // Fetch locations from Firestore
  useEffect(() => {
    if (loading) return;

    const unsubscribe = onSnapshot(
      collection(db, "Locations"),
      (snapshot) => {
        const locationData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (locationData.length === 0) {
          setError("No location data available.");
        } else {
          setError("");
        }
        setLocations(locationData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching locations:", error);
        setError("Failed to fetch locations: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [loading]);

  return (
    <Container className="py-4" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)" }}>
      <div className="mb-3">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => navigate("/admin_dashboard")}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
          Back to Admin Dashboard
        </Button>
      </div>
      <Card className="shadow-lg border-0" style={{ borderRadius: "15px", background: "white" }}>
        <Card.Body className="p-4">
          <h3 className="text-center mb-4 fw-bold" style={{ color: "#333" }}>
            User Location Tracking
          </h3>
          {loading ? (
            <div className="text-center mt-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <div style={{ height: "600px", width: "100%" }}>
              <MapContainer
                center={[20.5937, 78.9629]} // Center of India
                zoom={5}
                style={{ height: "100%", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {locations.map((location) => (
                  location.latitude && location.longitude ? (
                    <Marker
                      key={location.id}
                      position={[location.latitude, location.longitude]}
                    >
                      <Popup>
                        <strong>User ID:</strong> {location.userId}<br />
                        <strong>Timestamp:</strong>{" "}
                        {location.timestamp?.toDate
                          ? location.timestamp.toDate().toLocaleString()
                          : "N/A"}
                      </Popup>
                    </Marker>
                  ) : null
                ))}
              </MapContainer>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LocationTracking;