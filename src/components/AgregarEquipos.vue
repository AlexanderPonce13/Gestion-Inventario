<template>
    <div>
      <header>
        <div class="logo">
          <img class="logo-img" src="@/assets/logo-uleam.jpg" alt="Logo Uleam">
        </div>
        <nav>
          <ul>
            <li><a href="/panel"><i class="fas fa-home"></i> Inicio</a></li>
            <li><a href="/busqueda"><i class="fas fa-search"></i> Buscar</a></li>
            <li><a href="/gestion-equipos"><i class="fas fa-tasks"></i> Gestionar Equipos</a></li>
            <li class="sidebar-icon" @click="toggleSidebar"><i class="fas fa-bars"></i></li>
          </ul>
        </nav>
      </header>
  
      <main>
        <div class="container">
          <h2>Gestión de Equipos</h2>
          <form id="equipmentForm" @submit.prevent="submitForm">
            <div class="form-group">
              <label for="serialNumber">Número de Serie:</label>
              <input type="text" id="serialNumber" name="serialNumber" pattern="\d+" title="Ingrese solo números" required v-model="form.serialNumber">
              <span class="error-message" id="serialNumberError">{{ errors.serialNumber }}</span>
            </div>
            <div class="form-group">
              <label for="equipmentName">Nombre del Equipo:</label>
              <input type="text" id="equipmentName" name="equipmentName" pattern="[A-Za-z0-9 ]+" title="Ingrese solo letras y números" required v-model="form.equipmentName">
              <span class="error-message" id="equipmentNameError">{{ errors.equipmentName }}</span>
            </div>
            <div class="form-group">
              <label for="acquisitionDate">Fecha de Adquisición:</label>
              <input type="date" id="acquisitionDate" name="acquisitionDate" required v-model="form.acquisitionDate">
              <span class="error-message" id="acquisitionDateError">{{ errors.acquisitionDate }}</span>
            </div>
            <div class="form-group">
              <label for="status">Estado:</label>
              <select id="status" name="status" required v-model="form.status">
                <option value="">Seleccione un estado</option>
                <option value="activo">Activo</option>
                <option value="mantenimiento">En Mantenimiento</option>
                <option value="baja">Dado de Baja</option>
              </select>
              <span class="error-message" id="statusError">{{ errors.status }}</span>
            </div>
            <div class="form-group">
              <label for="department">Departamento:</label>
              <input type="text" id="department" name="department" pattern="[A-Za-z0-9 ]+" title="Ingrese solo letras y números" required v-model="form.department">
              <span class="error-message" id="departmentError">{{ errors.department }}</span>
            </div>
            <div class="form-group">
              <label for="assignee">Asignar a:</label>
              <input type="text" id="assignee" name="assignee" pattern="[A-Za-z ]+" title="Ingrese solo letras" required v-model="form.assignee">
              <span class="error-message" id="assigneeError">{{ errors.assignee }}</span>
            </div>
            <button type="submit">Agregar Equipo</button>
          </form>
        </div>
      </main>
  
      <aside id="sidebar" class="sidebar">
        <div class="close-btn" @click="toggleSidebar">×</div>
        <div class="user-info">
          <p>Nombre Apellido</p>
          <p>correo@ejemplo.com</p>
        </div>
        <hr>
        <a href="../login/login.html">Salir</a>
        <hr>
      </aside>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AgregarEquipos',
    data() {
      return {
        form: {
          serialNumber: '',
          equipmentName: '',
          acquisitionDate: '',
          status: '',
          department: '',
          assignee: ''
        },
        errors: {}
      };
    },
    methods: {
      submitForm() {
        // Validar la fecha de adquisición para que no sea futura
        const today = new Date().toISOString().split('T')[0];
        if (this.form.acquisitionDate > today) {
          this.errors.acquisitionDate = "La fecha no puede ser futura";
          return;
        }
  
        // Limpiar mensaje de error si la fecha es válida
        this.errors.acquisitionDate = "";
  
        // Guardar el formulario en localStorage
        let equipmentList = JSON.parse(localStorage.getItem('equipmentList')) || [];
        equipmentList.push(this.form);
        localStorage.setItem('equipmentList', JSON.stringify(equipmentList));
  
        // Mostrar mensaje de éxito
        alert("Equipo agregado correctamente");
  
        // Reiniciar el formulario después de enviar
        this.resetForm();
      },
      resetForm() {
        this.form = {
          serialNumber: '',
          equipmentName: '',
          acquisitionDate: '',
          status: '',
          department: '',
          assignee: ''
        };
      },
      toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.style.display = sidebar.style.display === 'block' ? 'none' : 'block';
      }
    }
  };
  </script>
  
  <style scoped>
  /* General */
  body {
    background-image: url('https://img.freepik.com/vector-gratis/fondo-tecnologia-cibernetica_23-2148390330.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1716163200&semt=ais_user');
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-size: cover;
    color: #333;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: #b10707;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
    padding: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  
  header .logo img {
    height: 70px;
    width: 70px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  header nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  header nav ul li {
    margin: 0 15px;
  }
  
  header nav ul li a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    transition: color 0.3s;
  }
  
  header nav ul li a:hover {
    color: #ffcc00;
  }
  
  header nav .sidebar-icon {
    cursor: pointer;
    color: white;
    font-size: 1.5em;
  }
  
  .sidebar {
    display: none;
    background-color: #1a1a1a;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 250px;
    box-shadow: -2px 0 5px rgba(0,0,0,0.5);
    padding: 20px;
    overflow-y: auto;
    z-index: 1000;
  }
  
  .sidebar .close-btn {
    font-size: 30px;
    cursor: pointer;
    color: white;
    text-align: right;
  }
  
  .sidebar .user-info p {
    color: white;
    margin: 5px 0;
    font-size: 1.2em;
  }
  
  .sidebar a {
    display: block;
    margin: 20px 0;
    text-decoration: none;
    color: white;
    font-size: 1.2em;
    transition: color 0.3s;
  }
  
  .sidebar a:hover {
    color: #ffcc00;
  }
  
  /* Container */
  .container {
    max-width: 800px;
    margin: 80px auto;
    background: rgba(34, 33, 33, 0.589);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(252, 250, 250, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  /* Form */
  form {
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    margin-bottom: 15px;
    width: 100%;
  }
  
  .form-group label {
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group select {
    padding: 10px;
    border: 1px solid #000000;
    border-radius: 5px;
    font-size: 1em;
    width: calc(100% - 22px); /* Considerando el borde */
    transition: border 0.3s;
  }
  
  .form-group input:focus,
  .form-group select:focus {
    border-color: #4CAF50;
  }
  
  .error-message {
    color: red;
    font-size: 0.8em;
    margin-top: 5px;
  }
  
  /* Buttons */
  button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  button:hover {
    background-color: #45a049;
    transform: scale(1.05);
  }
  </style>
  