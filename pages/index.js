import { useEffect, useState } from 'react';

export default function Home() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContactos() {
      try {
        const res = await fetch('/api/contactos');
        if (!res.ok) throw new Error('Error al obtener datos');
        const data = await res.json();
        setContactos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContactos();
  }, []);

  if (loading) return <p>Cargando contactos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Contactos</h1>
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            {contactos.length > 0 &&
              Object.keys(contactos[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {contactos.map((contacto, i) => (
            <tr key={i}>
              {Object.values(contacto).map((val, j) => (
                <td key={j}>{val?.toString()}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
