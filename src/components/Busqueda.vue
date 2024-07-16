<template>
    <div>
      <!-- Encabezado con logo y navegación -->
      <header>
        <div class="logo">
          <img src="../assets/logo-uleam.jpg" alt="Logo Uleam">
        </div>
        <nav>
          <!-- Enlaces de navegación usando Router Links -->
          <router-link to="/panel"><i class="fas fa-search"></i><b>Inicio</b></router-link>
          <router-link to="/gestion-equipos"><i class="fas fa-tasks"></i><b> Gestionar Equipos</b></router-link>
          <router-link to="/agregar-equipos"><i class="fas fa-tasks"></i><b> Agregar Equipos</b></router-link>
        </nav>
      </header>
  
      <div class="container">
        <h2>Búsqueda de Equipos</h2>
        <!-- Formulario de búsqueda -->
        <form id="searchForm" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="searchCriteria">Buscar por Nombre, Número de Serie, etc.</label>
            <!-- Entrada de texto vinculada a v-model -->
            <input type="text" id="searchCriteria" v-model="searchCriteria" required>
            <!-- Mensaje de error condicional -->
            <span class="error-message" v-if="searchCriteriaError">{{ searchCriteriaError }}</span>
          </div>
          <!-- Botón de enviar formulario -->
          <button type="submit">Buscar</button>
        </form>
        <!-- Contenedor para mostrar resultados de búsqueda -->
        <div id="searchResults" class="results-container"></div>
      </div>
    </div>
  </template>
  

  <script>
  export default {
    name: "BusquedaBasica",
    data() {
      return {
        // Datos del componente
        searchCriteria: '',         // Criterio de búsqueda
        searchCriteriaError: '',    // Error de validación del criterio
        searchResults: []           // Resultados de la búsqueda
      };
    },
    methods: {
      // Método para navegar a una URL
      navigateTo(url) {
        window.location.href = url;
      },
      // Método para manejar el envío del formulario
      handleSubmit() {
        if (this.searchCriteria.trim() === '') {
          // Validación: si el criterio está vacío
          this.searchCriteriaError = 'El criterio de búsqueda es obligatorio.';
        } else {
          // Resetear el mensaje de error
          this.searchCriteriaError = '';
          // Obtener la lista de equipos desde el almacenamiento local
          const equipmentList = JSON.parse(localStorage.getItem("equipmentList")) || [];
          const searchCriteria = this.searchCriteria.toLowerCase().trim();
  
          // Filtrar resultados basados en el criterio de búsqueda
          const filteredResults = equipmentList.filter(equipment => {
            return equipment.serialNumber.toLowerCase().includes(searchCriteria) || 
                   equipment.equipmentName.toLowerCase().includes(searchCriteria);
          });
  
          // Mostrar los resultados filtrados
          this.displaySearchResults(filteredResults);
        }
      },
      // Método para mostrar los resultados de búsqueda en el DOM
      displaySearchResults(results) {
        this.searchResults = results;
  
        // Obtener el contenedor de resultados de búsqueda
        const searchResultsContainer = document.getElementById('searchResults');
        searchResultsContainer.innerHTML = ""; // Limpiar resultados anteriores
  
        // Si no hay resultados, mostrar un mensaje
        if (results.length === 0) {
          searchResultsContainer.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }
  
        // Crear una lista ul para mostrar los resultados
        const resultList = document.createElement("ul");
  
        // Iterar sobre los resultados y crear elementos li para cada uno
        results.forEach(result => {
          const listItem = document.createElement("li");
          listItem.textContent = `Número de Serie: ${result.serialNumber}, Nombre del Equipo: ${result.equipmentName}`;
          resultList.appendChild(listItem);
        });
  
        // Agregar la lista de resultados al contenedor
        searchResultsContainer.appendChild(resultList);
      }
    }
  };
  </script>
  

<style scoped>
/* General */
body {
background: linear-gradient(to right, #f0f2f5, #ffffff);
font-family: 'Poppins', sans-serif;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
min-height: 100vh;
}

/* Header */
header {
background-color: #990000;
color: #fff;
padding: 15px;
position: fixed;
width: 100%;
top: 0;
display: flex;
justify-content: space-between;
align-items: center;
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

header nav {
display: flex;
align-items: center;
}

header nav a {
color: white;
margin: 0 20px;
text-decoration: none;
font-weight: bold;
transition: color 0.3s ease, transform 0.3s ease;
}

header nav a:hover {
color: #ffcc00;
transform: translateY(-2px);
}

header .logo img {
height: 50px;
margin-right: 20px;
}


/* Container */
.container {
margin-top: 100px;
padding: 20px;
max-width: 800px;
margin-left: auto;
margin-right: auto;
background-color: #ffffff;
border-radius: 8px;
box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
text-align: center;
color: #004d99;
}

/* Form */
.form-group label {
color: #333;
font-weight: 600;
}

.form-group input {
border: 1px solid #ccc;
border-radius: 4px;
padding: 10px;
margin-top: 5px;
width: 100%;
}

.form-group input:focus {
border-color: #004d99;
outline: none;
}

button {
background-color: #004d99;
color: white;
border: none;
padding: 10px 20px;
border-radius: 4px;
cursor: pointer;
transition: background-color 0.3s;
}

button:hover {
background-color: #003366;
}

.results-container {
margin-top: 20px;
}

.result-item {
padding: 10px;
border: 1px solid #eee;
border-radius: 4px;
margin-bottom: 10px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
</style>
