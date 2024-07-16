<template>
  <div class="background-container">
    <img alt="Fondo" src="@/assets/fondo.jpg" class="background-image">
    <div class="foreground-container">
      <div class="home">
        <div class="container">
          <h1>Bienvenido al Sistema de Inventarios de Equipos Informáticos de la ULEAM</h1>
          <p>Por favor, inicie sesión para continuar.</p>
          <div class="images">
            <img src="@/assets/panel1.jpg" alt="Imagen relacionada con inventarios">
            <img src="@/assets/panel2.jpg" alt="Imagen relacionada con tecnología">
          </div>
          <router-link to="/login" class="btn">Iniciar Sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'HomePage',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
}

.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

.foreground-container {
  position: relative;
  z-index: 1;
}

.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
  color: #fff;
}

.container {
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  padding: 2rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  max-width: 700px;
  width: 90%;
  animation: fadeIn 1.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

h1 {
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
}

p {
  color: #555;
  margin-bottom: 20px;
  font-size: 1.2rem;
}

.images {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
}

.images img {
  width: 45%;
  max-width: 300px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.images img:hover {
  transform: scale(1.05);
}

.btn {
  display: inline-block;
  background: linear-gradient(135deg, #007BFF, #0056b3);
  color: #fff;
  padding: 15px 30px;
  text-decoration: none;
  border-radius: 30px;
  font-size: 1.2rem;
  font-weight: bold;
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.4);
  transition: background 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background: linear-gradient(135deg, #0056b3, #003f7f);
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6);
}

@media (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
  
  .images img {
    width: 100%;
    max-width: 100%;
  }
  
  .btn {
    width: 100%;
    padding: 15px 0;
    font-size: 1rem;
  }
}
</style>
