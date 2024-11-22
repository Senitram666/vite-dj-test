import './styles/base.css';
import Alpine from 'alpinejs';
import auth from './components/store/auth.js';
import login from './components/login.js';
import navbar from './components/navbar.js';
import dashboard from './components/dashboard.js';
import dynamicTable from './components/dynamic_table.js';
import dateRangePicker from './components/date_range_picker.js';
import tabs from './components/store/tabs.js';
import charts from './components/charts.js';
import icons from './components/icons.js';

window.Alpine = Alpine;

// Register Alpine.js stores
Alpine.store('auth', auth);
Alpine.store('tabs', tabs);

// Register Alpine.js components
Alpine.data('loginForm', login);
Alpine.data('navbar', navbar);
Alpine.data('dashboard', dashboard);
Alpine.data('dynamicTable', dynamicTable);
Alpine.data('dateRangePicker', dateRangePicker);
Alpine.data('charts', charts);

Alpine.plugin(icons)

// Initialize auth store
document.addEventListener('alpine:init', () => {
  Alpine.store('auth').init();
  Alpine.store('tabs').init();
});

Alpine.start();