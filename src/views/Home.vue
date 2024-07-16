<template>
  <!-- Contenedor principal de fondo -->
  <div class="background-container">
    <!-- Imagen de fondo -->
    <img alt="Fondo" src="@/assets/fondo.jpg" class="background-image">
    
    <!-- Contenedor del primer plano -->
    <div class="foreground-container">
      <div class="home">
        <div class="container">
          <!-- Título de bienvenida -->
          <h1>Bienvenido al Sistema de Inventarios de Equipos Informáticos de la ULEAM</h1>
          <!-- Mensaje solicitando iniciar sesión -->
          <p>Por favor, inicie sesión para continuar.</p>
          
          <!-- Contenedor de imágenes relacionadas -->
          <div class="images">
            <img src="@/assets/panel1.jpg" alt="Imagen relacionada con inventarios">
            <img src="@/assets/panel2.jpg" alt="Imagen relacionada con tecnología">
          </div>
          
          <!-- Enlace para navegar a la página de inicio de sesión -->
          <router-link to="/login" class="btn">Iniciar Sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage', // Nombre del componente
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap'); 

/* Reset de márgenes y paddings, y estilo general */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

/* Estilo de la imagen de fondo */
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* Coloca la imagen de fondo detrás de otros elementos */
}

/* Contenedor del primer plano */
.foreground-container {
  position: relative;
  z-index: 1; /* Coloca el contenido del primer plano encima de la imagen de fondo */
}

/* Estilo del contenedor de la página principal */
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la ventana */
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  color: #fff; /* Texto blanco */
}

/* Estilo del contenedor central */
.container {
  text-align: center;
  background: rgba(255, 255, 255, 0.85); /* Fondo blanco con transparencia */
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Sombra alrededor del contenedor */
  border-radius: 12px;
  max-width: 700px; /* Máximo ancho del contenedor */
  width: 90%; /* Ancho del contenedor relativo al contenedor padre */
  animation: fadeIn 1.5s ease-in-out; /* Animación de entrada */
}

/* Definición de la animación de entrada */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9); /* Reduce ligeramente el tamaño al inicio */
  }
  to {
    opacity: 1;
    transform: scale(1); /* Tamaño normal al final */
  }
}

/* Estilo del título */
h1 {
  color: #333; /* Color del texto */
  margin-bottom: 20px;
  font-size: 2rem;
}

/* Estilo del párrafo */
p {
  color: #555; /* Color del texto */
  margin-bottom: 20px;
  font-size: 1.2rem;
}

/* Estilo del contenedor de imágenes */
.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px; /* Espacio entre las imágenes */
}

/* Estilo de las imágenes dentro del contenedor */
.images img {
  width: 45%;
  max-width: 300px; /* Ancho máximo de las imágenes */
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra alrededor de las imágenes */
  transition: transform 0.3s ease; /* Transición suave para la transformación */
}

/* Efecto hover en las imágenes */
.images img:hover {
  transform: scale(1.05); /* Aumenta ligeramente el tamaño al pasar el cursor */
}

/* Estilo del botón de inicio de sesión */
.btn {
  display: inline-block;
  background: linear-gradient(135deg, #007BFF, #0056b3); /* Fondo degradado */
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.4); /* Sombra alrededor del botón */
  transition: background 0.3s ease, transform 0.3s ease; /* Transición suave para el fondo y la transformación */
}

/* Efecto hover en el botón */
.btn:hover {
  background: linear-gradient(135deg, #0056b3, #003f7f); /* Cambia el fondo degradado */
  transform: translateY(-3px); /* Desplaza ligeramente hacia arriba al pasar el cursor */
  box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6); /* Aumenta la sombra */
}

/* Estilos responsivos para pantallas más pequeñas */
@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .images img {
    width: 100%; /* Las imágenes ocupan el 100% del ancho en pantallas pequeñas */
    max-width: 100%;
  }
  
  .btn {
    width: 100%; /* El botón ocupa el 100% del ancho en pantallas pequeñas */
    padding: 15px 0;
    font-size: 1rem;
  }
}
</style>
