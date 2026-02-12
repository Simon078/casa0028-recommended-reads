import { useState } from "react";
import MapDisplay from "./components/MapDisplay";
import PlaqueModal from "./components/PlaqueModal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ✅提升状态：selectedPlaque 放在 App
  const [selectedPlaque, setSelectedPlaque] = useState(null);

  return (
    <div>
      {/* Map gets plaque state */}
      <MapDisplay
        longitude={-0.13731}
        latitude={51.521699}
        zoom={13}
        setIsModalOpen={setIsModalOpen}
        selectedPlaque={selectedPlaque}
        setSelectedPlaque={setSelectedPlaque}
      />

      {/* Modal also gets plaque state */}
      {isModalOpen ? (
        <PlaqueModal
          setIsModalOpen={setIsModalOpen}
          selectedPlaque={selectedPlaque}
        />
      ) : null}
    </div>
  );
}
