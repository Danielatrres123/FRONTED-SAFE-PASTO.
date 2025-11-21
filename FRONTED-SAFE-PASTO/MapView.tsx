'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Alert } from '@/lib/types';

const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(m => m.Popup), { ssr: false });

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

type Props = {
  alerts: Alert[];
  onRefresh?: () => void;
  wsConnected?: boolean;
};

export default function MapView({ alerts, onRefresh, wsConnected }: Props) {
  const [center, setCenter] = useState<[number, number]>([1.2136, -77.2811]);
  const [zoom, setZoom] = useState<number>(13);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setCenter([pos.coords.latitude, pos.coords.longitude]);
          setZoom(14);
        },
        () => {}
      );
    }
  }, []);

  const markers = useMemo(() => alerts, [alerts]);

  return (
    <div className="mapContainer">
      <div className="mapHeader">
        <span>Mapa de alertas</span>
        <div className="row" style={{ alignItems: 'center' }}>
          {typeof wsConnected !== 'undefined' && (
            <span className={wsConnected ? 'text-green-400' : 'text-red-400'}>
              {wsConnected ? 'WS conectado' : 'WS desconectado'}
            </span>
          )}
          {onRefresh && (
            <button className="btn" onClick={onRefresh}>Actualizar</button>
          )}
        </div>
      </div>
      <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap" />
        {markers.map(alert => (
          <Marker key={alert.id} position={[alert.latitud, alert.longitud]}>
            <Popup>
              <div>
                <strong>{alert.titulo}</strong>
                <div>Severidad: {alert.severidad}</div>
                <div>{new Date(alert.fechaCreacion).toLocaleString()}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
