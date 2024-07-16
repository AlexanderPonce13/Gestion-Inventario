<template>
  <div>
    <!-- Encabezado del sitio -->
    <header>
      <div class="logo">
        <!-- Imagen del logo -->
        <img class="logo-img" src="@/assets/logo-uleam.jpg" alt="Logo Uleam" />
      </div>
      <nav>
        <!-- Barra de navegación -->
        <ul>
          <!-- Enlace a la página de inicio -->
          <li><router-link to="panel"><i class="fas fa-home"></i> Inicio</router-link></li>
          <!-- Enlace a la página de búsqueda -->
          <li><router-link to="busqueda"><i class="fas fa-search"></i> Buscar</router-link></li>
          <!-- Enlace a la página de agregar equipos -->
          <li><router-link to="/agregar-equipos"><i class="fas fa-tasks"></i> Agregar Equipos</router-link></li>
          <!-- Icono para abrir la barra lateral -->
          <li class="sidebar-icon" @click="toggleSidebar"><i class="fas fa-bars"></i></li>
        </ul>
      </nav>
    </header>

    <!-- Barra lateral -->
    <aside :class="{ sidebar: true, 'sidebar--open': sidebarOpen }" id="sidebar">
      <!-- Botón para cerrar la barra lateral -->
      <div class="close-btn" @click="toggleSidebar">×</div>
      <div class="user-info">
        <!-- Información del usuario -->
        <p>Nombre Apellido</p>
        <p>correo@ejemplo.com</p>
      </div>
      <hr />
      <!-- Enlace para salir (cerrar sesión) -->
      <router-link to="/login">Salir</router-link>
      <hr />
    </aside>

    <!-- Contenedor principal -->
    <div class="container">
      <h2>Gestión de Equipos</h2>
      <!-- Tabla de equipos -->
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
          <!-- Itera sobre los datos de los equipos y genera una fila para cada uno -->
          <tr v-for="(item, index) in equipmentData" :key="index">
            <td>{{ item.serialNumber }}</td>
            <td>{{ item.equipmentName }}</td>
            <td>{{ item.acquisitionDate }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.department }}</td>
            <td>{{ item.assignee }}</td>
            <td>
              <!-- Botones de acción para editar y eliminar equipos -->
              <button @click="editEquipment(index)">Editar</button>
              <button @click="deleteEquipment(index)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar equipos -->
    <div v-if="isModalOpen" id="editModal" class="modal">
      <div class="modal-content">
        <!-- Botón para cerrar el modal -->
        <span class="close-btn" @click="isModalOpen = false">&times;</span>
        <h2>Editar Equipo</h2>
        <!-- Formulario para editar equipos -->
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


<script >
export default {
  name: 'GestionEquipos',
  data() {
    return {
      // Estado para manejar la apertura de la barra lateral
      sidebarOpen: false,
      // Estado para manejar la apertura del modal de edición
      isModalOpen: false,
      // Datos de los equipos, obtenidos del almacenamiento local
      equipmentData: JSON.parse(localStorage.getItem("equipmentList")) || [],
      // Datos del formulario de edición
      editForm: {
        serialNumber: "",
        equipmentName: "",
        acquisitionDate: "",
        status: "",
        department: "",
        assignee: ""
      },
      // Índice del equipo que se está editando actualmente
      currentEditIndex: null
    };
  },
  methods: {
    // Abre el modal de edición y carga los datos del equipo seleccionado
    editEquipment(index) {
      // Copia los datos del equipo a editar al formulario de edición
      this.editForm = { ...this.equipmentData[index] };
      this.currentEditIndex = index;
      // Abre el modal de edición
      this.isModalOpen = true;
    },
    // Guarda los cambios realizados en el equipo
    saveChanges() {
      // Reemplaza el equipo editado en la lista con los nuevos datos
      this.equipmentData.splice(this.currentEditIndex, 1, { ...this.editForm });
      // Guarda la lista actualizada en el almacenamiento local
      localStorage.setItem("equipmentList", JSON.stringify(this.equipmentData));
      // Cierra el modal de edición
      this.isModalOpen = false;
    },
    // Elimina un equipo de la lista
    deleteEquipment(index) {
      // Confirma la acción de eliminación
      if (confirm("¿Está seguro de que desea eliminar este equipo?")) {
        // Elimina el equipo de la lista
        this.equipmentData.splice(index, 1);
        // Guarda la lista actualizada en el almacenamiento local
        localStorage.setItem("equipmentList", JSON.stringify(this.equipmentData));
      }
    },
    // Alterna la visibilidad de la barra lateral
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
};
</script>


<style scoped>
/* Estilos generales */
body {
  background-image: url('https://img.freepik.com/vector-gratis/fondo-tecnologia-cibernetica_23-2148390330.jpg?size=626&ext=jpg&ga=GA1.1.1788068356.1716163200&semt=ais_user'); /* Establece una imagen de fondo */
  font-family: 'Poppins', sans-serif; /* Define la familia de fuentes para todo el documento */
  margin: 0; /* Elimina el margen exterior del cuerpo del documento */
  padding: 0; /* Elimina el relleno interior del cuerpo del documento */
  background-size: cover; /* Ajusta la imagen de fondo para cubrir todo el tamaño visible */
  color: #333; /* Color de texto principal */
  display: flex; /* Usa el modelo de caja flexible para el diseño */
  flex-direction: column; /* Establece la dirección de los elementos hijos en columna */
  min-height: 100vh; /* Establece la altura mínima del cuerpo al 100% del viewport */
}

/* Estilos del encabezado */
header {
  background-color: #b10707; /* Color de fondo del encabezado */
  display: flex; /* Usa el modelo de caja flexible para el diseño del encabezado */
  align-items: center; /* Alinea los elementos verticalmente en el centro */
  position: fixed; /* Fija el encabezado en la parte superior de la ventana */
  top: 0; /* Ubica el encabezado en la parte superior */
  width: 100%; /* Establece el ancho del encabezado al 100% del contenedor padre */
  z-index: 1000; /* Establece la posición en la pila z para que esté sobre otros elementos */
  padding: 10px; /* Espaciado interno del encabezado */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5); /* Sombra para dar profundidad al encabezado */
}

header .logo {
  margin-right: auto; /* Empuja el elemento a la derecha del encabezado */
}

header .logo img {
  height: 70px; /* Altura de la imagen del logo */
  width: 70px; /* Ancho de la imagen del logo */
  border-radius: 50%; /* Aplica un borde redondeado al logo */
  object-fit: cover; /* Ajusta la imagen dentro de su contenedor manteniendo su relación de aspecto */
}

header nav {
  margin-left: 20px; /* Espaciado a la izquierda del elemento de navegación */
}

header nav ul {
  display: flex; /* Usa el modelo de caja flexible para el diseño de la lista de navegación */
  list-style: none; /* Elimina los estilos de viñeta de la lista */
  padding: 0; /* Elimina el relleno interior de la lista */
  margin: 0; /* Elimina el margen exterior de la lista */
}

header nav ul li {
  margin: 0 15px; /* Espaciado horizontal entre los elementos de la lista */
}

header nav ul li a {
  text-decoration: none; /* Elimina el subrayado predeterminado de los enlaces */
  color: white; /* Color de texto de los enlaces */
  font-weight: bold; /* Peso de fuente en negrita */
  transition: color 0.3s; /* Transición suave para el cambio de color de texto */
}

header nav ul li a:hover {
  color: #ffcc00; /* Color de texto al pasar el mouse sobre los enlaces */
}

header nav .sidebar-icon {
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa sobre el icono de la barra lateral */
  color: white; /* Color de texto del icono de la barra lateral */
  font-size: 1.5em; /* Tamaño del icono de la barra lateral */
}

/* Estilos de la barra lateral */
.sidebar {
  background-color: #1a1a1a; /* Color de fondo de la barra lateral */
  position: fixed; /* Fija la barra lateral en la ventana */
  top: 0; /* Ubica la barra lateral en la parte superior */
  right: 0; /* Ubica la barra lateral en la parte derecha */
  height: 100vh; /* Establece la altura de la barra lateral al 100% del viewport */
  width: 250px; /* Ancho de la barra lateral */
  box-shadow: -2px 0 5px rgba(0,0,0,0.5); /* Sombra para dar profundidad a la barra lateral */
  padding: 20px; /* Espaciado interno de la barra lateral */
  overflow-y: auto; /* Permite desplazamiento vertical cuando el contenido excede el tamaño */
  z-index: 1000; /* Establece la posición en la pila z para que esté sobre otros elementos */
  display: none; /* Inicialmente oculta la barra lateral */
}

.sidebar--open {
  display: block; /* Muestra la barra lateral cuando está abierta */
}

.sidebar .close-btn {
  font-size: 30px; /* Tamaño del icono de cierre de la barra lateral */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa sobre el botón de cierre */
  color: white; /* Color de texto del botón de cierre */
  text-align: right; /* Alinea el texto del botón de cierre a la derecha */
}

.sidebar .user-info p {
  color: white; /* Color de texto del texto de información del usuario */
  margin: 5px 0; /* Espaciado alrededor del texto de información del usuario */
  font-size: 1.2em; /* Tamaño de fuente del texto de información del usuario */
}

.sidebar a {
  display: block; /* Convierte los enlaces en bloques para ocupar el ancho completo de la barra lateral */
  margin: 20px 0; /* Espaciado vertical entre los enlaces */
  text-decoration: none; /* Elimina el subrayado predeterminado de los enlaces */
  color: white; /* Color de texto de los enlaces */
  font-size: 1.2em; /* Tamaño de fuente de los enlaces */
  transition: color 0.3s; /* Transición suave para el cambio de color de texto de los enlaces */
}

.sidebar a:hover {
  color: #ffcc00; /* Color de texto al pasar el mouse sobre los enlaces */
}

/* Estilos del contenedor principal */
.container {
  width: 90%; /* Ancho del contenedor principal */
  margin: 80px auto; /* Margen superior e inferior automático y margen lateral automático */
  background: rgba(255, 255, 255, 0.8); /* Color de fondo del contenedor principal con transparencia */
  padding: 20px; /* Espaciado interno del contenedor principal */
  border-radius: 10px; /* Borde redondeado del contenedor principal */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra para dar profundidad al contenedor principal */
}

h2 {
  text-align: center; /* Alineación central del título h2 */
  margin-bottom: 20px; /* Margen inferior del título h2 */
}

/* Estilos de los botones */
button {
  margin: 5px; /* Espaciado exterior de los botones */
  padding: 8px 15px; /* Espaciado interno de los botones */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa sobre los botones */
  border: none; /* Elimina el borde de los botones */
  border-radius: 5px; /* Borde redondeado de los botones */
  background-color: #4CAF50; /* Color de fondo de los botones */
  color: white; /* Color de texto de los botones */
  transition: background-color 0.3s ease, transform 0.3s ease; /* Transiciones suaves para el color de fondo y transformación de los botones */
}

button:hover {
  background-color: #45a049; /* Color de fondo de los botones al pasar el mouse sobre ellos */
  transform: scale(1.05); /* Escala ligeramente los botones al pasar el mouse sobre ellos */
}

/* Estilos del modal */
.modal {
  display: none; /* Inicialmente oculta el modal */
  position: fixed; /* Fija el modal en la ventana */
  z-index: 1000; /* Establece la posición en la pila z para que esté sobre otros elementos */
  left: 0; /* Ubica el modal en la parte izquierda de la ventana */
  top: 0; /* Ubica el modal en la parte superior de la ventana */
  width: 100%; /* Ancho del modal al 100% del viewport */
  height: 100%; /* Altura del modal al 100% del viewport */
  overflow: auto; /* Permite desplazamiento cuando el contenido excede el tamaño del modal */
  background-color: rgba(0, 0, 0, 0.4); /* Color de fondo del modal con transparencia */
  padding-top: 60px; /* Espaciado superior del modal */
  transition: opacity 0.3s ease; /* Transición suave para la opacidad del modal */
}

.modal-content {
  background-color: #fefefe; /* Color de fondo del contenido del modal */
  margin: 5% auto; /* Margen superior e inferior automático y margen lateral automático */
  padding: 20px; /* Espaciado interno del contenido del modal */
  border: 1px solid #888; /* Borde del contenido del modal */
  width: 80%; /* Ancho del contenido del modal */
  max-width: 500px; /* Ancho máximo del contenido del modal */
  border-radius: 10px; /* Borde redondeado del contenido del modal */
  transition: transform 0.3s ease; /* Transición suave para la transformación del contenido del modal */
}

.close-btn {
  color: #aaa; /* Color de texto del botón de cierre */
  float: right; /* Flota el botón de cierre a la derecha */
  font-size: 28px; /* Tamaño de fuente del botón de cierre */
  font-weight: bold; /* Peso de fuente en negrita del botón de cierre */
  transition: color 0.3s ease; /* Transición suave para el cambio de color de texto del botón de cierre */
}

.close-btn:hover,
.close-btn:focus {
  color: black; /* Color de texto del botón de cierre al pasar el mouse sobre él o al estar enfocado */
  text-decoration: none; /* Elimina el subrayado predeterminado del botón de cierre */
  cursor: pointer; /* Cambia el cursor al puntero cuando se pasa sobre el botón de cierre */
}

/* Estilos de la tabla */
table {
  width: 100%; /* Ancho de la tabla al 100% del contenedor */
  border-collapse: collapse; /* Colapsa los bordes de las celdas de la tabla */
}

th, td {
  padding: 10px; /* Espaciado interno de las celdas de encabezado y datos */
  text-align: left; /* Alineación del texto a la izquierda en las celdas */
  border-bottom: 1px solid #ddd; /* Borde inferior de las celdas */
}

th {
  background-color: #4CAF50; /* Color de fondo del encabezado de la tabla */
  color: white; /* Color de texto del encabezado de la tabla */
}

tr:hover {
  background-color: #f5f5f5; /* Color de fondo de la fila al pasar el mouse sobre ella */
}

/* Estilos de los iconos */
.fa {
  font-size: 1.2em; /* Tamaño de fuente de los iconos */
}
</style>
