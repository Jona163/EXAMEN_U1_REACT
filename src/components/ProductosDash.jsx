import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "bootstrap-icons/font/bootstrap-icons.min.css";


export default function PanelProductos() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [mostrarGrafica, setMostrarGrafica] = useState(false);

  useEffect(() => {
    // Uso de API de FakeStore: https://fakestoreapi.com/
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((datos) => setProductos(datos));
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.title.toLowerCase().includes(busqueda.toLowerCase())
  );

  const datosCategoria = Object.entries(
    productosFiltrados.reduce((acc, producto) => {
      acc[producto.category] = (acc[producto.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([categoria, cantidad]) => ({ categoria, cantidad }));

  return (
    <div className="p-6 max-w-4xl mx-auto  rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Tabla de Productos</h1>
      
      <input
        type="text"
        placeholder="Buscar producto..."
        className="bi bi-search p-2 border rounded w-full mb-4"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      
      <table className="w-full border-collapse border border-gray-300 mb-6 bg-white shadow">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Categoría</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map((producto) => (
            <tr key={producto.id} className="border">
              <td className="border p-2">{producto.title}</td>
              <td className="border p-2">${producto.price}</td>
              <td className="border p-2">{producto.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      

      <button 
        onClick={() => setMostrarGrafica(!mostrarGrafica)}
        className="bi bi-table bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {mostrarGrafica ? "Ocultar Gráfica" : "Mostrar Gráfica"}
      </button>
      
      {mostrarGrafica && (
        <>
          <h2 className="text-xl font-bold mb-2 text-center">Cantidad de productos por categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={datosCategoria}>
              <XAxis dataKey="categoria" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#0f47ff" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}
