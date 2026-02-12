import { useMemo, useRef, useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl/maplibre";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export default function MapDisplay(props) {
  const mapRef = useRef(null);

  const [viewState, setViewState] = useState({
    longitude: props.longitude,
    latitude: props.latitude,
    zoom: props.zoom,
  });

  // Popup 经纬度
  const [popupLngLat, setPopupLngLat] = useState(null);

  // ✅兼容 dev + GitHub Pages
  const geojsonUrl = useMemo(
    () => `${import.meta.env.BASE_URL}data/plaques.geojson`,
    []
  );

  // ✅稳定底图：OSM raster
  const rasterStyle = useMemo(
    () => ({
      version: 8,
      sources: {
        osm: {
          type: "raster",
          tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
          tileSize: 256,
          attribution: "© OpenStreetMap contributors",
        },
      },
      layers: [{ id: "osm", type: "raster", source: "osm" }],
    }),
    []
  );

  // ✅点图层
  const plaquesLayer = useMemo(
    () => ({
      id: "plaques",
      type: "circle",
      filter: ["==", ["geometry-type"], "Point"],
      paint: {
        "circle-radius": 10,
        "circle-color": "#2563eb",
        "circle-stroke-width": 2,
        "circle-stroke-color": "#ffffff",
      },
    }),
    []
  );

  // ✅点击地图事件
  function handleMapClick(event) {
    const map = mapRef.current?.getMap?.();
    if (!map) return;

    // 只检测 plaques 图层
    const plaques = map.queryRenderedFeatures(event.point, {
      layers: ["plaques"],
    });

    // 没点到 marker 就返回
    if (!plaques.length) return;

    // 点到 plaque feature
    const feature = plaques[0];

    // 保存选中 plaque（提升状态到 App）
    props.setSelectedPlaque(feature);

    // Popup 显示位置
    setPopupLngLat(event.lngLat);
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapLib={maplibregl}
        mapStyle={rasterStyle}
        interactiveLayerIds={["plaques"]}
        onClick={handleMapClick}
      >
        {/* GeoJSON 数据 */}
        <Source id="plaques-source" type="geojson" data={geojsonUrl}>
          <Layer {...plaquesLayer} />
        </Source>

        {/* Popup */}
        {popupLngLat && props.selectedPlaque ? (
          <Popup
            longitude={popupLngLat.lng}
            latitude={popupLngLat.lat}
            anchor="top"
            closeOnClick={false}
            onClose={() => setPopupLngLat(null)}
          >
            <div style={{ maxWidth: 240 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 10 }}>
                {props.selectedPlaque.properties?.name ||
                  props.selectedPlaque.properties?.title ||
                  "Plaque"}
              </h3>

              {/* ✅关键：按钮必须 stopPropagation */}
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ddd",
                  borderRadius: 6,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation(); // ✅防止地图吞掉点击
                  props.setIsModalOpen(true);
                }}
              >
                Recommended Reading
              </button>
            </div>
          </Popup>
        ) : null}
      </Map>
    </div>
  );
}
