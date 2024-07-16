<template>
  <!-- Contenedor principal de fondo -->
  <div class="background-container">
    <!-- Imagen de fondo -->
    <img alt="Fondo" src="@/assets/fondo.jpg" class="background-image">
    
    <!-- Contenedor del primer plano -->
    <div class="foreground-container">
      <div id="panel">
        <div class="login-container">
          <!-- Título de inicio de sesión -->
          <h2>Inicio de Sesión</h2>
          
          <!-- Formulario de inicio de sesión -->
          <form @submit.prevent="login" id="loginForm">
            <!-- Campo de entrada para el nombre de usuario -->
            <input
              type="text"
              id="username"
              v-model="username"
              :class="{ 'error': usernameError }"
              placeholder="Usuario"
            />
            <div class="error-message" v-if="usernameError">{{ usernameError }}</div>

            <!-- Campo de entrada para la contraseña -->
            <input
              type="password"
              id="password"
              v-model="password"
              :class="{ 'error': passwordError }"
              placeholder="Contraseña"
            />
            <div class="error-message" v-if="passwordError">{{ passwordError }}</div>

            <!-- Checkbox para recordar sesión -->
            <label>
              <input type="checkbox" v-model="rememberMe" /> Recordarme
            </label>

            <!-- Botón para iniciar sesión -->
            <button type="submit">Iniciar Sesión</button>
            <div class="error-message" v-if="generalError">{{ generalError }}</div>
          </form>

          <!-- Opciones adicionales como el enlace para registrarse -->
          <div class="additional-options">
            <router-link to="/registro">¿No tienes cuenta? Regístrate aquí</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IniciarSesion', // Nombre del componente
  data() {
    return {
      username: '', // Nombre de usuario
      password: '', // Contraseña
      rememberMe: false, // Estado del checkbox "Recordarme"
      usernameError: '', // Mensaje de error para el nombre de usuario
      passwordError: '', // Mensaje de error para la contraseña
      generalError: '' // Mensaje de error general
    };
  },
  methods: {
    // Método para manejar el inicio de sesión
    login() {
      this.clearErrors();

      // Validación del nombre de usuario
      if (this.username.trim() === '') {
        this.usernameError = 'El nombre de usuario es obligatorio.';
      } else if (this.username.length < 3 || this.username.length > 20) {
        this.usernameError = 'El nombre de usuario debe tener entre 3 y 20 caracteres.';
      }

      // Validación de la contraseña
      if (this.password.trim() === '') {
        this.passwordError = 'La contraseña es obligatoria.';
      } else if (this.password.length < 6 || this.password.length > 20) {
        this.passwordError = 'La contraseña debe tener entre 6 y 20 caracteres.';
      }

      // Si no hay errores de validación, proceder con la autenticación
      if (!this.usernameError && !this.passwordError) {
        const storedUser = localStorage.getItem('user_' + this.username);
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (user.password === this.password) {
            this.generalError = ''; // Limpiar cualquier mensaje de error previo
            if (this.rememberMe) {
              localStorage.setItem('loggedInUser', JSON.stringify(user));
            } else {
              sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            }
            // Redirigir al usuario a la página de dashboard o a donde corresponda
            this.$router.push('/panel');
          } else {
            this.generalError = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
          }
        } else {
          this.generalError = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
        }
      }
    },
    // Método para limpiar mensajes de error
    clearErrors() {
      this.usernameError = '';
      this.passwordError = '';
      this.generalError = '';
    }
  }
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Ocupa toda la altura de la ventana */
}

/* Estilo del panel */
#panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;
  padding: 0;
  color: #fff;
  font-family: 'Roboto', Arial, sans-serif;
}

/* Estilo del contenedor de inicio de sesión */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: rgba(19, 18, 18, 0.534); /* Fondo con transparencia */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra alrededor del contenedor */
  box-sizing: border-box;
}

/* Estilo del formulario */
form {
  display: flex;
  flex-direction: column;
}

/* Estilo de los campos de entrada y el botón */
input[type="text"],
input[type="password"],
button {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Estilo del botón */
button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049; /* Color del botón al pasar el cursor */
}

/* Opciones adicionales como enlaces */
.additional-options {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.additional-options a {
  color: #1e90ff;
  text-decoration: none;
}

.additional-options a:hover {
  text-decoration: underline;
}

/* Estilo para los mensajes de error */
.error {
  border-color: red; /* Borde rojo para los campos con error */
}

.error-message {
  color: red; /* Texto rojo para los mensajes de error */
  font-size: 0.9em;
  margin-top: 5px;
}

/* Estilo de los campos de entrada */
.login-container input {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-size: 1em;
  outline: none;
  box-sizing: border-box;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra alrededor de los campos */
  transition: all 0.3s ease;
}

.login-container input:focus {
  background: #fdfbfb; /* Fondo más claro al enfocar */
}

/* Estilo de la etiqueta del checkbox */
.login-container label {
  display: block;
  margin: 20px 0;
  color: #555;
}

/* Estilo de los botones de envío y de acción */
.login-container button[type="submit"],
.login-container button[type="button"] {
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #007bff, #0056b3); /* Fondo degradado */
  font-size: 1.2em;
  font-weight: bold;
  color: rgb(19, 18, 18);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.4); /* Sombra alrededor del botón */
}

.login-container button[type="submit"]:hover,
.login-container button[type="button"]:hover {
  background: linear-gradient(135deg, #0056b3, #003f7f); /* Fondo degradado al pasar el cursor */
  transform: translateY(-3px); /* Desplaza ligeramente hacia arriba al pasar el cursor */
  box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6); /* Aumenta la sombra */
}
</style>
