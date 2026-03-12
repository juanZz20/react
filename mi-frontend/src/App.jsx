import { useState, useEffect, use } from 'react'

function App() {
  // info tiene los datos actuales (cargando) y el set info carga los datos del servidor
  const [info, setInfo] = useState({ mensaje: "Cargando...", usuario: "" });
  const[tareas,setTareas]=useState([])
  const [texto, setTexto] = useState("")

  const obtenertareas=()=> {
    fetch("http://localhost:5003/api/tareas")
    .then(res =>res.json())
    .then(data =>  setTareas(data));
  }

  useEffect(() => {
    obtenertareas();
      //los corchetes le dicen a react que solo cargue esta info una vez 
  }, []);

  const guardarTarea = async () =>{

    if (texto === ""){
      return;
    }
    await fetch("http://localhost:5003/api/tareas",{
    method:"POST",
    headers: {"content-type": "application/json" },
    body:JSON.stringify({nombre:texto})
    })
    setTexto("");
    obtenertareas();
  }
  //esto es lo que el usuario ve 
  return (
    <div style={{ padding: '40px', color: 'white'}}>
      <h1>📝 Mis Tareas Pendientes</h1>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Escribe una tarea..."
          style={{ padding: '10px', borderRadius: '5px', border: 'none' }}
        />
        <button onClick={guardarTarea} style={{ marginLeft: '10px', padding: '10px' }}>
          Agregar Tarea
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareas.map(t => (
          <li key={t.id} style={{ background: '#444', margin: '10px 0', padding: '15px', borderRadius: '8px' }}>
            ✅ {t.nombre}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
