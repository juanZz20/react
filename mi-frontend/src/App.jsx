import { useState, useEffect } from 'react'

function App() {
  // info tiene los datos actuales (cargando) y el set info carga los datos del servidor
  const [info, setInfo] = useState({ mensaje: "Cargando...", usuario: "" });

  useEffect(() => {
    // IMPORTANTE: Asegúrate de que este puerto sea el de tu API de C#
    // Lo encuentras en launchSettings.json de tu proyecto ASP.NET
    fetch("http://localhost:5003/api/saludo") 
      //el servidor envia un formato json para que javascript lo lea
      .then(res => res.json())
      //enviamos la informacion al setinfo para que se cargue
      .then(data => setInfo(data))
      .catch(err => console.error("API apagada o error de CORS:", err));
      //los corchetes le dicen a react que solo cargue esta info una vez 
  }, []);
  //esto es lo que el usuario ve 
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>React + ASP.NET Core</h1>
      <div style={{ border: '1px solid white', padding: '20px', borderRadius: '10px' }}>
        <p>Mensaje desde C#: <strong>{info.mensaje}</strong></p>
        <p>Programador: <strong>{info.usuario}</strong></p>
      </div>
    </div>
  )
}

export default App
