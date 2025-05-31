// main.js

// 1) Configura tu Firebase (reemplaza con tus datos reales)
const firebaseConfig = {
  apiKey: "AIzaSyDBcoekIwqAIsRXGEAfWriq4Lznhab_Vgg",
  authDomain: "homestate-web.firebaseapp.com",
  projectId: "homestate-web",
  storageBucket: "homestate-web.appspot.com",
  messagingSenderId: "738439557061",
  appId: "1:738439557061:web:1ac96b5c9ad1cd2fe3a5ac",
  measurementId: "G-J7YCQB6HBV"
};

// 2) Inicializa Firebase solo si no ha sido inicializado antes
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// 3) Crea la instancia de auth UNA VEZ
const auth = firebase.auth();

console.log("Firebase Auth initialized");

// 4) Listener único de onAuthStateChanged:
//    - Si hay usuario, va a /admin/
//    - Si NO hay usuario y estamos en una ruta distinta de /admin-login/, va a /admin-login/
auth.onAuthStateChanged((user) => {
  const currentPath = window.location.pathname;

  // Caso 1: usuario NO autenticado intentando acceder a /admin/ (o a cualquier subruta de /admin/),
  //          excepto /admin-login/, en cuyo caso no hacemos nada aquí.
  if (!user) {
    // Solo si la ruta es exactamente "/admin/" o empieza con "/admin/" (pero no "/admin-login/")
    const isTryingAdmin =
      currentPath === "/admin/" ||
      (currentPath.startsWith("/admin/") && !currentPath.startsWith("/admin-login/"));

    if (isTryingAdmin) {
      window.location.href = "/admin-login/";
    }
    return;
  }

  // Caso 2: usuario autenticado, pero está en la página de login (/admin-login/)
  //          => lo enviamos al dashboard /admin/.
  if (user && currentPath === "/admin-login/") {
    window.location.href = "/admin/";
  }

  // En cualquier otro caso (usuario autenticado y/o ruta distinta a /admin/ o /admin-login/),
  // no hacemos nada.
});


// 5) Espera a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
  // 6) Toggle eye/eye-slash para mostrar/ocultar contraseña
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  const rememberCheckbox = document.getElementById('remember');

  // 7) Cargar credenciales guardadas (si existe “Recuérdame”)
  const savedUsername = localStorage.getItem('username');
  const savedPassword = localStorage.getItem('password');
  if (savedUsername && savedPassword) {
    document.getElementById('email').value = savedUsername;
    passwordInput.value = savedPassword;
    rememberCheckbox.checked = true;
  }

  if (togglePassword) {
    togglePassword.addEventListener('click', () => {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      togglePassword.querySelector('i').classList.toggle('fa-eye');
      togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
    });
  }

  // 8) Enlaces de “Registrarme” y “Olvidé mi contraseña”
  const registerLink = document.getElementById('registerLink');
  if (registerLink) {
    registerLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Funcionalidad de registro en desarrollo');
    });
  }
  const forgotLink = document.querySelector('.forgot-password');
  if (forgotLink) {
    forgotLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Funcionalidad de recuperación de contraseña en desarrollo');
    });
  }

  // 9) Vinculamos la función login() al submit del formulario
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', login);
  }

  // 10) Vinculamos la función logout() al botón correspondiente
  const btnLogout = document.getElementById('logoutBtn');
  if (btnLogout) {
    btnLogout.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  }
});

// 11) Función para mostrar mensajes temporales (alertas)
function showMessage(message, type = 'warning') {
  const container = document.getElementById('messageContainer');
  container.textContent = message;
  container.className = 'alert alert-' + type + ' mx-4';
  container.classList.remove('d-none');
  setTimeout(() => {
    container.classList.add('d-none');
  }, 5000);
}

// 12) Función de login usando la instancia de auth
function login(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const rememberCheckbox = document.getElementById('remember');

  auth.signInWithEmailAndPassword(email, pass)
    .then(() => {
      showMessage('¡Inicio de sesión exitoso! Redirigiendo...', 'success');

      if (rememberCheckbox.checked) {
        localStorage.setItem('username', email);
        localStorage.setItem('password', pass);
      } else {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
      }

      // La redirección efectiva se hará por el onAuthStateChanged
    })
    .catch(error => {
      console.log(error.code);
      switch (error.code) {
        case 'auth/invalid-login-credentials':
          showMessage('Usuario no existe o la contraseña es incorrecta', 'danger');
          break;
        default:
          showMessage('Corroborando su identidad.', 'warning');
      }
    });
}

// 13) Función de logout
function logout() {
  auth.signOut()
    .then(() => {
      // El listener onAuthStateChanged redirigirá a /admin-login/
      console.log("Sesión cerrada correctamente");
    })
    .catch((error) => {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión. Intenta de nuevo.");
    });
}
