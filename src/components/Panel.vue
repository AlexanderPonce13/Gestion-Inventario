<template>
  <div id="panel">
    <header>
        <div class="logo">
          <img class="logo-img" src="@/assets/logo-uleam.jpg" alt="Logo Uleam">
        </div>
        <nav>
          <ul>
            <li><a href="/busqueda"><i class="fas fa-search"></i> Buscar</a></li>
            <li><a href="/gestion-equipos"><i class="fas fa-tasks"></i> Gestionar Equipos</a></li>
            <li><a href="/agregar-equipos"><i class="fas fa-tasks"></i> Agregar Equipos</a></li>
            <li class="sidebar-icon" @click="toggleSidebar"><i class="fas fa-bars"></i></li>
          </ul>
        </nav>
      </header>
    
    <main>
      <div class="cards-container">
        <section class="card animated">
          <h3>Total de Equipos</h3>
          <p>{{ totalEquipos }}</p>
        </section>
        <section class="card animated">
          <h3>Equipos Activos</h3>
          <p>{{ equiposActivos }}</p>
        </section>
        <section class="card animated">
          <h3>Equipos en Mantenimiento</h3>
          <p>{{ equiposMantenimiento }}</p>
        </section>
        <section class="card animated" @click="toggleFullList('recentlyAdded')">
          <h3>Equipos Recientemente Añadidos</h3>
          <div class="list-container">
            <p v-for="item in recentlyAdded" :key="item.id">{{ item.equipmentName || 'Nombre no disponible' }}</p>
          </div>
        </section>
        <section class="card animated" @click="toggleFullList('maintenance')">
          <h3>Equipos en Mantenimiento</h3>
          <div class="list-container">
            <p v-for="item in maintenance" :key="item.id">{{ item.equipmentName || 'Nombre no disponible' }}</p>
          </div>
        </section>
        <section class="card animated" @click="toggleFullList('oldest')">
          <h3>Equipos Más Antiguos</h3>
          <div class="list-container">
            <p v-for="item in oldest" :key="item.id">{{ item.equipmentName || 'Nombre no disponible' }}</p>
          </div>
        </section>
      </div>
    </main>
    <footer>
      <nav class="footer-nav">
        <a href="politica_privacidad.html">Política de Privacidad</a>
        <a href="terminos_condiciones.html">Términos y Condiciones</a>
      </nav>
      <div class="contacto">
        <p>Contact Info: correo@ejemplo.com</p>
        <p>Teléfono: 123-456-7890</p>
      </div>
    </footer>
  </div>
</template>


<script>
export default {
  name: 'PanelControl',
  data() {
    return {
      isSidebarVisible: false,
      isModalVisible: false,
      modalContent: '',
      totalEquipos: 0,
      equiposActivos: 0,
      equiposMantenimiento: 0,
      recentlyAdded: [],
      maintenance: [],
      oldest: []
    };
  },
  mounted() {
    this.updateMainPageStats();
    this.updateEquipmentLists();
  },
  methods: {
    toggleFullList(type) {
      this.isModalVisible = true;
      this.modalContent = this[type].map(item => `
        <div class="device-info">
          <p><strong>Nombre:</strong> ${item.equipmentName || 'Nombre no disponible'}</p>
          <p><strong>Número de Serie:</strong> ${item.serialNumber || 'No disponible'}</p>
          <p><strong>Fecha de Adquisición:</strong> ${item.acquisitionDate || 'No disponible'}</p>
          <p><strong>Estado:</strong> ${item.status || 'No disponible'}</p>
          <p><strong>Departamento:</strong> ${item.department || 'No disponible'}</p>
          <p><strong>Asignado a:</strong> ${item.assignee || 'No disponible'}</p>
        </div>
        <hr>
      `).join('');
    },
    closeModal() {
      this.isModalVisible = false;
    },
    updateMainPageStats() {
      const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
      this.totalEquipos = equipmentData.length;
      this.equiposActivos = equipmentData.filter(item => item.status === "activo").length;
      this.equiposMantenimiento = equipmentData.filter(item => item.status === "mantenimiento").length;
    },
    updateEquipmentLists() {
  const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
  this.recentlyAdded = equipmentData.slice(0, 5);
  this.maintenance = equipmentData.filter(item => item.status === "mantenimiento").slice(0, 5);

  // Filtrar los equipos más antiguos (antes de 2019)
  const cutoffDate = new Date("2019-01-01");
  this.oldest = equipmentData.filter(item => {
    const acquisitionDate = new Date(item.acquisitionDate);
    return acquisitionDate < cutoffDate;
  }).slice(0, 5);
}

  }
};
</script>


<style scoped>
#panel {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('https://img.freepik.com/vector-gratis/fondo-tecnologia-cibernetica_23-2148390330.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1716163200&semt=ais_user');
  background-size: cover;
  color: #fff;
  font-family: 'Roboto', Arial, sans-serif;
}

.logo img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
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


main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 80px; /* Ajustar para que el contenido no quede debajo del header */
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  background-color: rgba(158, 12, 12, 0.842);
  border-radius: 10px;
  padding: 20px;
  width: calc(33.333% - 40px);
  box-sizing: border-box;
  text-align: center;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

.card h3 {
  font-size: 1.8em;
  margin-bottom: 10px;
}

.card p {
  font-size: 2em;
  margin-top: 10px;
}

footer {
  background-color: #252424;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: auto;
}

footer nav.footer-nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

footer .contacto p {
  margin: 5px 0;
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
}

.modal-content {
  background-color: #333;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
  color: white;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.animated {
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

</style>