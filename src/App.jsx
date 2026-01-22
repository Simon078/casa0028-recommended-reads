import { useState } from 'react'
import './tw-styles.css'
import TitleBar from './components/TitleBar'
import MapDisplay from './components/MapDisplay'
import PlaqueModal from './components/PlaqueModal'


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)

return (
  <div className="mx-auto max-w-screen-xl bg-gray-50 min-h-screen">
    <TitleBar title="📚 OpenPlaques Reading Recommendations" />
    <MapDisplay longitude={-2.78479} latitude={54.05213} zoom={16} />
    {isModalOpen ? <PlaqueModal /> : null}
  </div>
)


}

export default App
