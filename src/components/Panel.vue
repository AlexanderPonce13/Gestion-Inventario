<template>
  <div id="panel">
    <header>
      <!-- Sección del logo -->
      <div class="logo">
        <img class="logo-img" src="@/assets/logo-uleam.jpg" alt="Logo Uleam">
      </div>
      <!-- Navegación principal -->
      <nav>
        <ul>
          <li><a href="/busqueda"><i class="fas fa-search"></i> Buscar</a></li>
          <li><a href="/gestion-equipos"><i class="fas fa-tasks"></i> Gestionar Equipos</a></li>
          <li><a href="/agregar-equipos"><i class="fas fa-tasks"></i> Agregar Equipos</a></li>
          <li class="sidebar-icon" @click="toggleSidebar"><i class="fas fa-bars">≡</i></li>
        </ul>
      </nav>
    </header>

    <!-- Barra lateral (sidebar) -->
    <div :class="['sidebar', { 'sidebar-visible': isSidebarVisible }]">
      <a href="/perfil"><i class="fas fa-user"></i> Perfil</a>
      <a href="/ajustes"><i class="fas fa-cog"></i> Ajustes</a>
      <a href="/ayuda"><i class="fas fa-question-circle"></i> Ayuda</a>
      <a href="/login"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a>
    </div>

    <!-- Contenido principal -->
    <main>
      <div class="cards-container">
        <!-- Tarjetas de estadísticas -->
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
        <!-- Listas de equipos -->
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
    <!-- Pie de página -->
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
      isSidebarVisible: false, // Estado de visibilidad de la barra lateral
      isModalVisible: false, // Estado de visibilidad del modal
      modalContent: '', // Contenido del modal
      totalEquipos: 0, // Total de equipos
      equiposActivos: 0, // Total de equipos activos
      equiposMantenimiento: 0, // Total de equipos en mantenimiento
      recentlyAdded: [], // Lista de equipos recientemente añadidos
      maintenance: [], // Lista de equipos en mantenimiento
      oldest: [] // Lista de equipos más antiguos
    };
  },
  mounted() {
    this.updateMainPageStats(); // Actualiza las estadísticas principales al montar el componente
    this.updateEquipmentLists(); // Actualiza las listas de equipos al montar el componente
  },
  methods: {
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible; // Alterna la visibilidad de la barra lateral
    },
    toggleFullList(type) {
      this.isModalVisible = true; // Muestra el modal
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
      `).join(''); // Genera el contenido del modal basado en el tipo de lista
    },
    closeModal() {
      this.isModalVisible = false; // Cierra el modal
    },
    updateMainPageStats() {
      const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
      this.totalEquipos = equipmentData.length; // Calcula el total de equipos
      this.equiposActivos = equipmentData.filter(item => item.status === "activo").length; // Calcula el total de equipos activos
      this.equiposMantenimiento = equipmentData.filter(item => item.status === "mantenimiento").length; // Calcula el total de equipos en mantenimiento
    },
    updateEquipmentLists() {
      const equipmentData = JSON.parse(localStorage.getItem("equipmentList")) || [];
      this.recentlyAdded = equipmentData.slice(0, 5); // Lista de los 5 equipos más recientemente añadidos
      this.maintenance = equipmentData.filter(item => item.status === "mantenimiento").slice(0, 5); // Lista de los 5 equipos en mantenimiento
      this.oldest = equipmentData.filter(item => new Date(item.acquisitionDate).getFullYear() <= 2019); // Lista de los equipos más antiguos (adquiridos antes de 2019)
    }
  }
};
</script>



<style scoped>
/* Estilo del contenedor principal del panel */
#panel {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-image: url('https://img.freepik.com/vector-gratis/fondo-tecnologia-cibernetica_23-2148390330.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1716163200&semt=ais_user');
  background-size: cover;
  color: #fff;
  font-family: 'Roboto', Arial, sans-serif;
}

/* Estilo del logo en el header */
.logo img {
  height: 70px;
  width: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Estilo del header */
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

/* Estilo de la lista de navegación en el header */
header nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Estilo de los elementos de la lista de navegación */
header nav ul li {
  margin: 0 15px;
}

/* Estilo de los enlaces de navegación */
header nav ul li a {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s;
}

/* Efecto hover en los enlaces de navegación */
header nav ul li a:hover {
  color: #ffcc00;
}

/* Estilo del icono de la barra lateral en el header */
header nav .sidebar-icon {
  cursor: pointer;
  color: white;
  font-size: 1.5em;
}

/* Estilo de la barra lateral (sidebar) */
.sidebar {
  position: fixed;
  left: -250px; /* Ocultar la barra lateral fuera de la vista */
  width: 250px;
  height: 100%;
  background-color: #333;
  transition: left 0.3s ease;
  z-index: 900; /* Asegurar que esté detrás del header */
}

/* Clase para hacer visible la barra lateral */
.sidebar-visible {
  left: 0; /* Mostrar la barra lateral */
}

/* Estilo de los enlaces en la barra lateral */
.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px;
}

/* Estilo del contenido principal */
main {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin-top: 80px; /* Ajustar para que el contenido no quede debajo del header */
}

/* Estilo del contenedor de tarjetas */
.cards-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

/* Estilo de cada tarjeta */
.card {
  background-color: rgba(158, 12, 12, 0.842);
  border-radius: 10px;
  padding: 20px;
  width: calc(33.333% - 40px); /* Ajustar el ancho de las tarjetas */
  box-sizing: border-box;
  text-align: center;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
}

/* Efecto hover en las tarjetas */
.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
}

/* Estilo del título en las tarjetas */
.card h3 {
  font-size: 1.8em;
  margin-bottom: 10px;
}

/* Estilo del texto en las tarjetas */
.card p {
  font-size: 2em;
  margin-top: 10px;
}

/* Estilo del pie de página */
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

/* Estilo de los enlaces de navegación en el pie de página */
footer nav.footer-nav a {
  color: white;
  text-decoration: none;
  margin: 0 10px;
}

/* Estilo de la sección de contacto en el pie de página */
footer .contacto p {
  margin: 5px 0;
}

/* Estilo del modal */
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

/* Estilo del contenido del modal */
.modal-content {
  background-color: #333;
  margin: 10% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 10px;
  color: white;
}

/* Estilo del botón de cierre del modal */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

/* Efecto hover en el botón de cierre del modal */
.close:hover,
.close:focus {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

/* Clase para animaciones */
.animated {
  animation: fadeIn 1s ease-in-out;
}

/* Keyframes para la animación de fadeIn */
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
