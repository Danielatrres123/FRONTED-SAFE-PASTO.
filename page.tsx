'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function NewAlertPage() {
  const [tipo, setTipo] = useState('OTRO');
  const [severidad, setSeveridad] = useState('MEDIA');
  const [descripcion, setDescripcion] = useState('');
  const [latitud, setLatitud] = useState<number | null>(null);
  const [longitud, setLongitud] = useState<number | null>(null);
  const [direccion, setDireccion] = useState('');
  const [barrio, setBarrio] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        setLatitud(pos.coords.latitude);
        setLongitud(pos.coords.longitude);
      });
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    try {
      const payload = { titulo: tipo, tipo, severidad, descripcion, latitud, longitud, direccion, barrio };
      const res = await api.post('/alertas', payload);
      setMessage(`Alerta creada: ${res.data.id}`);
    } catch (err: any) {
      setMessage(err?.response?.data?.message || 'Error creando alerta');
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Nueva alerta</h1>
      <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 480 }}>
        <label>
          Tipo
          <select value={tipo} onChange={e => setTipo(e.target.value)}>
            <option>OTRO</option>
            <option>SEGURIDAD_ROBO</option>
            <option>ACCIDENTE_TRANSITO</option>
            <option>INCENDIO</option>
          </select>
        </label>
        <label>
          Severidad
          <select value={severidad} onChange={e => setSeveridad(e.target.value)}>
            <option>MEDIA</option>
            <option>ALTA</option>
            <option>URGENTE</option>
          </select>
        </label>
        <textarea placeholder="Descripción" value={descripcion} onChange={e => setDescripcion(e.target.value)} />
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Latitud" value={latitud ?? ''} onChange={e => setLatitud(parseFloat(e.target.value))} />
          <input placeholder="Longitud" value={longitud ?? ''} onChange={e => setLongitud(parseFloat(e.target.value))} />
        </div>
        <input placeholder="Dirección" value={direccion} onChange={e => setDireccion(e.target.value)} />
        <input placeholder="Barrio" value={barrio} onChange={e => setBarrio(e.target.value)} />
        <button type="submit">Crear</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
}