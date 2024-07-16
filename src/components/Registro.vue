<template>
  <div class="background-container">
    <img alt="Fondo" src="@/assets/fondo.jpg" class="background-image">
    <div class="foreground-container">
      <div class="container">
        <h2>Registro de Usuarios</h2>
        <form id="registerForm" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input type="text" v-model="newUsername" placeholder="Nombre de Usuario">
            <span class="error-message" v-if="newUsernameError">{{ newUsernameError }}</span>
          </div>
          <div class="form-group">
            <input type="password" v-model="newPassword" placeholder="Contraseña">
            <span class="error-message" v-if="newPasswordError">{{ newPasswordError }}</span>
          </div>
          <div class="form-group">
            <input type="password" v-model="confirmPassword" placeholder="Confirmar Contraseña">
            <span class="error-message" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>
          </div>
          <div class="form-group">
            <input type="email" v-model="email" placeholder="Correo Electrónico">
            <span class="error-message" v-if="emailError">{{ emailError }}</span>
          </div>
          <div class="form-group">
            <label for="role">Rol:</label>
            <select v-model="role">
              <option value="">Seleccione un rol</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
            </select>
            <span class="error-message" v-if="roleError">{{ roleError }}</span>
          </div>
          <button type="submit">Registrar Usuario</button>
          <button type="button" @click="goToLogin">Iniciar Sesión</button>
        </form>
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
      newUsername: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
      role: '',
      newUsernameError: '',
      newPasswordError: '',
      confirmPasswordError: '',
      emailError: '',
      roleError: ''
    };
  },
  methods: {
    handleSubmit() {
      this.clearErrors();

      let valid = true;
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

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

      if (valid) {
        const user = {
          username: this.newUsername,
          password: this.newPassword,
          email: this.email,
          role: this.role
        };

        localStorage.setItem('user_' + this.newUsername, JSON.stringify(user));
        alert('Usuario registrado exitosamente.');
        this.resetForm();
      }
    },
    clearErrors() {
      this.newUsernameError = '';
      this.newPasswordError = '';
      this.confirmPasswordError = '';
      this.emailError = '';
      this.roleError = '';
    },
    resetForm() {
      this.newUsername = '';
      this.newPassword = '';
      this.confirmPassword = '';
      this.email = '';
      this.role = '';
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
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



.container {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  text-align: center;
  animation: fadeIn 1.5s ease-in-out;
  max-width: 600px; /* Ajusta el ancho máximo según sea necesario */
  width: 80%;
  padding: 20px;
  margin: 0 auto;
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

.container h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

.container input,
.container select {
  width: 100%;
  padding: 15px;
  margin-top: 10px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-size: 1em;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.container input:focus,
.container select:focus {
  background: #e0e0e0;
}

.container button[type="submit"],
.container button[type="button"] {
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

.container button[type="submit"]:hover,
.container button[type="button"]:hover {
  background: linear-gradient(135deg, #0056b3, #003f7f);
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0, 123, 255, 0.6);
}

.container label {
  display: block;
  margin: 20px 0;
  color: #555;
}

.container .psw {
  margin-top: 20px;
  color: #555;
}

.container .psw a {
  color: #007BFF;
}

.container .psw a:hover {
  color: #0056b3;
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
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .container {
    padding: 10px;
  }
}
</style>
