import './styles/base.css'
import Alpine from 'alpinejs'
import auth from './components/auth.js'
import login from './components/login.js'
import navbar from './components/navbar.js'
import dashboard from './components/dashboard.js'

// Register Alpine.js stores
Alpine.store('auth', auth)

// Register Alpine.js components
Alpine.data('login', login)
Alpine.data('navbar', navbar)
Alpine.data('dashboard', dashboard)

// Initialize auth store
Alpine.store('auth').init()

window.Alpine = Alpine
Alpine.start()