import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/Home.vue';
import IniciarSesion from './components/Login.vue';
import RegistroUsuarios from './components/Registro.vue';
import PanelControl from './components/Panel.vue';
import GestionEquipos from './components/GestionEquipos.vue';
import AgregarEquipos from './components/AgregarEquipos.vue';
import BusquedaBasica from './components/Busqueda.vue';

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/login', name: 'login', component: IniciarSesion },
  { path: '/registro', name: 'registro', component: RegistroUsuarios },
  { path: '/panel', name: 'panel', component: PanelControl },
  { path: '/gestion-equipos', name: 'gestionEquipos', component: GestionEquipos },
  { path: '/agregar-equipos', name: 'agregarEquipos', component: AgregarEquipos },
  { path: '/busqueda', name: 'busqueda', component: BusquedaBasica },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
