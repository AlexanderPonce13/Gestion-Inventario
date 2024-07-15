<template>
  <div>
    <header>
      <div class="logo">
        <img class="logo-img" src="@/assets/logo-uleam.jpg" alt="Logo Uleam" />
      </div>
      <nav>
        <ul>
          <li><router-link to="panel"><i class="fas fa-home"></i> Inicio</router-link></li>
          <li><router-link to="busqueda"><i class="fas fa-search"></i> Buscar</router-link></li>
          <li><router-link to="/agregar-equipos"><i class="fas fa-tasks"></i> Agregar Equipos</router-link></li>
          <li class="sidebar-icon" @click="toggleSidebar"><i class="fas fa-bars"></i></li>
        </ul>
      </nav>
    </header>

    <aside :class="{ sidebar: true, 'sidebar--open': sidebarOpen }" id="sidebar">
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <p>Nombre Apellido</p>
        <p>correo@ejemplo.com</p>
      </div>
      <hr />
      <router-link to="/login">Salir</router-link>
      <hr />
    </aside>

    <div class="container">
      <h2>Gestión de Equipos</h2>
      <table id="equipmentTable">
        <thead>
          <tr>
            <th>Número de Serie</th>
            <th>Nombre del Equipo</th>
            <th>Fecha de Adquisición</th>
            <th>Estado</th>
            <th>Departamento</th>
            <th>Asignar a</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in equipmentData" :key="index">
            <td>{{ item.serialNumber }}</td>
            <td>{{ item.equipmentName }}</td>
            <td>{{ item.acquisitionDate }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.assignee }}</td>
            <td>
              <button @click="editEquipment(index)">Editar</button>
              <button @click="deleteEquipment(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="isModalOpen" id="editModal" class="modal">
      <div class="modal-content">
        <span class="close-btn" @click="isModalOpen = false">&times;</span>
        <h2>Editar Equipo</h2>
        <form @submit.prevent="saveChanges">
          <div class="form-group">
            <label for="editSerialNumber">Número de Serie:</label>
            <input type="text" id="editSerialNumber" v-model="editForm.serialNumber" readonly />
          </div>
          <div class="form-group">
            <label for="editEquipmentName">Nombre del Equipo:</label>
            <input type="text" id="editEquipmentName" v-model="editForm.equipmentName" required />
          </div>
          <div class="form-group">
            <label for="editAcquisitionDate">Fecha de Adquisición:</label>
            <input type="date" id="editAcquisitionDate" v-model="editForm.acquisitionDate" required />
          </div>
          <div class="form-group">
            <label for="editStatus">Estado:</label>
            <select id="editStatus" v-model="editForm.status" required>
              <option value="activo">Activo</option>
              <option value="mantenimiento">En Mantenimiento</option>
              <option value="baja">Dado de Baja</option>
            </select>
          </div>
          <div class="form-group">
            <label for="editDepartment">Departamento:</label>
            <input type="text" id="editDepartment" v-model="editForm.department" required />
          </div>
          <div class="form-group">
            <label for="editAssignee">Asignar a:</label>
            <input type="text" id="editAssignee" v-model="editForm.assignee" required />
          </div>
          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GestionEquipos',
  data() {
    return {
      sidebarOpen: false,
      isModalOpen: false,
      equipmentData: JSON.parse(localStorage.getItem("equipmentList")) || [],
      editForm: {
        serialNumber: "",
        equipmentName: "",
        acquisitionDate: "",
        status: "",
        department: "",
        assignee: ""
      },
      currentEditIndex: null
    };
  },
  methods: {
    editEquipment(index) {
  this.editForm = { ...this.equipmentData[index] };
  this.currentEditIndex = index;
  this.isModalOpen = true;
},

    saveChanges() {
      this.equipmentData.splice(this.currentEditIndex, 1, { ...this.editForm });
      localStorage.setItem("equipmentList", JSON.stringify(this.equipmentData));
      this.isModalOpen = false;
    },
    deleteEquipment(index) {
      if (confirm("¿Está seguro de que desea eliminar este equipo?")) {
        this.equipmentData.splice(index, 1);
        localStorage.setItem("equipmentList", JSON.stringify(this.equipmentData));
      }
    }
  }
};
</script>

<style scoped>
/* Estilos específicos del componente */
</style>


<style scoped>
/* Estilos generales */
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
  align-items: center;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

header .logo {
  margin-right: auto; /* Esto empuja el nav hacia la izquierda */
}

header .logo img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
}

header nav {
  margin-left: 20px; /* Ajusta este valor para mover el nav hacia la izquierda */
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
  display: none;
}

.sidebar--open {
  display: block;
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
/* Contenedor principal */
.container {
  width: 90%;
  margin: 80px auto;
  background: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

/* Botones */
button {
  margin: 5px;
  padding: 8px 15px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

/* Modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 60px;
  transition: opacity 0.3s ease;
}

.modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.close-btn {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.close-btn:hover,
.close-btn:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* Tabla */
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #4CAF50;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

/* Iconos */
.fa {
  font-size: 1.2em;
}
</style>
