import './styles/base.css'
import Alpine from 'alpinejs'
import auth from './components/auth.js'
import login from './components/login.js'
import navbar from './components/navbar.js'
import dashboard from './components/dashboard.js'
import dynamicTable from './components/dynamic_table.js'
// import collapse from '@alpinejs/collapse'

window.Alpine = Alpine

// Register Alpine.js stores
Alpine.store('auth', auth)

// Register Alpine.js components
Alpine.data('loginForm', login)
Alpine.data('navbar', navbar)
Alpine.data('dashboard', dashboard)
Alpine.data('dynamicTable', dynamicTable)

// Initialize auth store
document.addEventListener('alpine:init', () => {
  Alpine.store('auth').init()
})

// Alpine.plugin(collapse)

Alpine.directive('include', (el, { expression }) => {
  console.log(expression);
  fetch(`/templates/${expression}`)
    .then((response) => response.text())
    .then((html) => {
      el.innerHTML = html;
    })
    .catch((error) => {
      console.error(`Failed to load template: ${expression}`, error);
    });
});

Alpine.start()