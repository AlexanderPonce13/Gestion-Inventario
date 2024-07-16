<template>
  <!-- Contenedor principal con fondo y formulario de registro -->
  <div class="background-container">
    <img alt="Fondo" src="@/assets/fondo.jpg" class="background-image">
    <div class="foreground-container">
      <div class="container">
        <!-- Título del formulario -->
        <h2>Registro de Usuarios</h2>
        <!-- Formulario de registro -->
        <form id="registerForm" @submit.prevent="handleSubmit">
          <!-- Campo para el nombre de usuario -->
          <div class="form-group">
            <input type="text" v-model="newUsername" placeholder="Nombre de Usuario">
            <span class="error-message" v-if="newUsernameError">{{ newUsernameError }}</span>
          </div>
          <!-- Campo para la contraseña -->
          <div class="form-group">
            <input type="password" v-model="newPassword" placeholder="Contraseña">
            <span class="error-message" v-if="newPasswordError">{{ newPasswordError }}</span>
          </div>
          <!-- Campo para confirmar contraseña -->
          <div class="form-group">
            <input type="password" v-model="confirmPassword" placeholder="Confirmar Contraseña">
            <span class="error-message" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
          </div>
          <!-- Campo para el correo electrónico -->
          <div class="form-group">
            <input type="email" v-model="email" placeholder="Correo Electrónico">
            <span class="error-message" v-if="emailError">{{ emailError }}</span>
          </div>
          <!-- Selector para el rol del usuario -->
          <div class="form-group">
            <label for="role">Rol:</label>
            <select v-model="role">
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            <span class="error-message" v-if="roleError">{{ roleError }}</span>
          </div>
          <!-- Botón para enviar el formulario -->
          <button type="submit">Registrar Usuario</button>
          <!-- Botón para ir a la página de inicio de sesión -->
          <button type="button" @click="goToLogin">Iniciar Sesión</button>
        </form>
        <!-- Texto de aceptación de términos y privacidad -->
        <p>Al crear una cuenta, acepta nuestros <a href="#" style="color:dodgerblue">Términos y Privacidad</a>.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistroUsuarios',
  data() {
    return {
      // Datos del formulario
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
      role: '',
      // Errores del formulario
      newUsernameError: '',
      newPasswordError: '',
      confirmPasswordError: '',
      emailError: '',
      roleError: ''
    };
  },
  methods: {
    // Método para manejar el envío del formulario
    handleSubmit() {
      this.clearErrors();

      let valid = true;
      // Expresión regular para validar la contraseña
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      // Validación de cada campo del formulario
      if (!this.newUsername.trim()) {
        valid = false;
        this.newUsernameError = 'El nombre de usuario es obligatorio.';
      }

      if (!passwordPattern.test(this.newPassword)) {
        valid = false;
        this.newPasswordError = 'La contraseña debe tener al menos 8 caracteres, incluir una letra mayúscula, un número y un caracter especial (@#$%&).';
      }

      if (this.confirmPassword.trim() === '' || this.confirmPassword !== this.newPassword) {
        valid = false;
        this.confirmPasswordError = 'Las contraseñas no coinciden.';
      }

      if (this.email.trim() === '') {
        valid = false;
        this.emailError = 'El correo electrónico es obligatorio.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        valid = false;
        this.emailError = 'El formato del correo electrónico no es válido.';
      }

      if (this.role.trim() === '') {
        valid = false;
        this.roleError = 'El rol es obligatorio.';
      }

      // Si todos los campos son válidos, se registra el usuario
      if (valid) {
        const user = {
          username: this.newUsername,
          password: this.newPassword,
          email: this.email,
          role: this.role
        };

        // Almacenamiento local del usuario registrado
        localStorage.setItem('user_' + this.newUsername, JSON.stringify(user));
        alert('Usuario registrado exitosamente.');
        this.resetForm();
      }
    },
    // Método para limpiar los mensajes de error
    clearErrors() {
      this.newUsernameError = '';
      this.newPasswordError = '';
      this.confirmPasswordError = '';
      this.emailError = '';
      this.roleError = '';
    },
    // Método para reiniciar el formulario
    resetForm() {
      this.newUsername = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.email = '';
      this.role = '';
    },
    // Método para navegar a la página de inicio de sesión
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
/* Importación de la fuente Montserrat desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

/* Estilos globales para el documento */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif; /* Establece Montserrat como la fuente predeterminada */
}

/* Estilos para la imagen de fondo */
.background-image {
  position: fixed; /* Fija la imagen en la ventana del navegador */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen para cubrir toda la pantalla */
  z-index: -1; /* Coloca la imagen detrás de los demás elementos */
}

/* Estilos para el contenedor principal */
.container {
  background: rgba(255, 255, 255, 0.85); /* Fondo semi-transparente blanco */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Sombra ligera */
  border-radius: 12px; /* Bordes redondeados */
  text-align: center; /* Alineación centrada del contenido */
  animation: fadeIn 1.5s ease-in-out; /* Animación de aparición */
  max-width: 600px; /* Ancho máximo del contenedor */
  width: 80%; /* Ancho del contenedor */
  padding: 20px; /* Espaciado interno */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
}

/* Animación de fadeIn */
@keyframes fadeIn {
  from {
    opacity: 0; /* Opacidad inicial */
    transform: scale(0.9); /* Escala inicial */
  }
  to {
    opacity: 1; /* Opacidad al final de la animación */
    transform: scale(1); /* Escala al final de la animación */
  }
}

/* Estilos para el título del formulario */
.container h2 {
  font-size: 2em; /* Tamaño de fuente */
  margin-bottom: 20px; /* Espaciado inferior */
  color: #333; /* Color de texto */
}

/* Estilos para los grupos de formulario */
.form-group {
  margin-bottom: 20px; /* Espaciado inferior */
}

/* Estilos para los campos de entrada y select del formulario */
.container input,
.container select {
  width: 100%; /* Ancho completo */
  padding: 15px; /* Relleno */
  margin-top: 10px; /* Espaciado superior */
  border: none; /* Borde ninguno */
  border-radius: 8px; /* Bordes redondeados */
  background: #f2f2f2; /* Fondo gris claro */
  font-size: 1em; /* Tamaño de fuente */
  outline: none; /* Estilo de foco */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  transition: all 0.3s ease; /* Transición suave */
}

/* Estilos al enfocar los campos de entrada y select */
.container input:focus,
.container select:focus {
  background: #e0e0e0; /* Cambia el fondo al enfocar */
}

/* Estilos para los botones de submit y button */
.container button[type="submit"],
.container button[type="button"] {
  width: 100%; /* Ancho completo */
  padding: 15px; /* Relleno */
  margin-top: 20px; /* Espaciado superior */
  border: none; /* Borde ninguno */
  border-radius: 8px; /* Bordes redondeados */
  background: linear-gradient(135deg, #007BFF, #0056b3); /* Degradado azul */
  font-size: 1.2em; /* Tamaño de fuente */
  font-weight: bold; /* Peso de fuente */
  color: white; /* Color de texto */
  cursor: pointer; /* Cursor apuntador */
  transition: all 0.3s ease; /* Transición suave */
  box-shadow: 0 8px 15px rgba(0, 123, 255, 0.4); /* Sombra */
}

/* Estilos al pasar el mouse por encima de los botones */
.container button[type="submit"]:hover,
.container button[type="button"]:hover {
  background: linear-gradient(135deg, #0056b3, #003f7f); /* Cambia el degradado al pasar el mouse */
  transform: translateY(-3px); /* Translación hacia arriba */
  box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6); /* Sombra más pronunciada */
}

/* Estilos para las etiquetas del formulario */
.container label {
  display: block; /* Muestra como bloque */
  margin: 20px 0; /* Espaciado exterior */
  color: #555; /* Color de texto */
}

/* Estilos para la sección de contraseña olvidada */
.container .psw {
  margin-top: 20px; /* Espaciado superior */
  color: #555; /* Color de texto */
}

/* Estilos para los enlaces dentro de la sección de contraseña olvidada */
.container .psw a {
  color: #007BFF; /* Color del enlace */
}

/* Estilos al pasar el mouse por encima de los enlaces dentro de la sección de contraseña olvidada */
.container .psw a:hover {
  color: #0056b3; /* Color del enlace al pasar el mouse */
}

/* Estilos para el modal (ventana emergente) */
.modal {
  display: none; /* Oculta el modal por defecto */
  position: fixed; /* Fija la posición */
  z-index: 1; /* Capa z */
  left: 0;
  top: 0;
  width: 100%; /* Ancho completo */
  height: 100%; /* Alto completo */
  overflow: auto; /* Habilita el desplazamiento */
  background-color: rgba(0, 0, 0, 0.4); /* Fondo semi-transparente */
}

/* Estilos para el contenido del modal */
.modal-content {
  background-color: #fefefe; /* Fondo blanco */
  margin: 15% auto; /* Margen */
  padding: 20px; /* Relleno */
  border: 1px solid #888; /* Borde */
  width: 80%; /* Ancho del contenido */
}

/* Estilos para el botón de cerrar el modal */
.close {
  color: #aaa; /* Color de texto gris */
  float: right; /* Flotar a la derecha */
  font-size: 28px; /* Tamaño de fuente */
  font-weight: bold; /* Peso de fuente */
}

/* Estilos al pasar el mouse por encima o al enfocar el botón de cerrar el modal */
.close:hover,
.close:focus {
  color: black; /* Cambia el color de texto al pasar el mouse */
  text-decoration: none; /* Sin subrayado */
  cursor: pointer; /* Cursor apuntador */
}

/* Estilos responsivos para pantallas pequeñas */
@media screen and (max-width: 768px) {
  .container {
    padding: 10px; /* Reduce el padding en pantallas pequeñas */
  }
}
</style>
