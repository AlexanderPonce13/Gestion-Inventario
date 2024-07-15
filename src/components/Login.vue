<template>
  <div id="panel">
    <div class="login-container">
      <h2>Inicio de Sesión</h2>
      <form @submit.prevent="login" id="loginForm">
        <input type="text" id="username" v-model="username" :class="{ 'error': usernameError }" placeholder="Usuario">
        <div class="error-message" v-if="usernameError">{{ usernameError }}</div>
        
        <input type="password" id="password" v-model="password" :class="{ 'error': passwordError }" placeholder="Contraseña">
        <div class="error-message" v-if="passwordError">{{ passwordError }}</div>
        
        <label>
          <input type="checkbox" v-model="rememberMe"> Recordarme
        </label>
        
        <button type="submit">Iniciar Sesión</button>
        <div class="error-message" v-if="generalError">{{ generalError }}</div>
      </form>
      
      <div class="additional-options">
        <router-link to="/registro">¿No tienes cuenta? Regístrate aquí</router-link>
        <router-link to="/olvido-contrasena">¿Olvidaste tu contraseña?</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IniciarSesion',
  data() {
    return {
      username: '',
      password: '',
      rememberMe: false,
      usernameError: '',
      passwordError: '',
      generalError: ''
    };
  },
  methods: {
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
    clearErrors() {
      this.usernameError = '';
      this.passwordError = '';
      this.generalError = '';
    }
  }
};
</script>
  <style scoped>
#panel {
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  background-image: url('@/assets/fondo.jpg');
  background-size: cover;
  color: #fff;
  font-family: 'Roboto', Arial, sans-serif;
}
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background: #fffcfcb4;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  input[type="text"],
  input[type="password"],
  button {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
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
  
  .error {
    border-color: red;
  }
  
  .error-message {
    color: red;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  /* Estilos personalizados para los inputs */
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
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }
  
  .login-container input:focus {
    background: #e0e0e0;
  }
  
  .login-container label {
    display: block;
    margin: 20px 0;
    color: #555;
  }
  
  /* Estilos personalizados para el botón de inicio de sesión */
  .login-container button[type="submit"],
  .login-container button[type="button"] {
    width: 100%;
    padding: 15px;
    margin-top: 20px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #007BFF, #0056b3);
    font-size: 1.2em;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 15px rgba(0, 123, 255, 0.4);
  }
  
  .login-container button[type="submit"]:hover,
  .login-container button[type="button"]:hover {
    background: linear-gradient(135deg, #0056b3, #003f7f);
    transform: translateY(-3px);
    box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6);
  }
  </style>

  