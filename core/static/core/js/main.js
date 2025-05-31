// static/core/js/main.js
// ----------------------

// Este archivo actúa como “punto de entrada”. Importamos la función de auth-logic
// y la ejecutamos inmediatamente.

import { initAuthLogic } from "./auth-logic.js";

// Al cargar este script, inicializamos TODO lo relacionado con Firebase
initAuthLogic();


