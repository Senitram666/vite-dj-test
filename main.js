import './styles/base.css';
import Alpine from 'alpinejs';
import auth from './components/store/auth.js';
import site from './components/store/site.js';
import login from './components/login.js';
import navbar from './components/navbar.js';
import dashboard from './components/dashboard.js';
import dynamicTable from './components/dynamic_table.js';
import dateRangePicker from './components/date_range_picker.js';
import tabs from './components/store/tabs.js';
import charts from './components/charts.js';
import icons from './components/icons.js';
import spinner from './components/ui/spinner.js';

window.Alpine = Alpine;

// Register Alpine.js stores
Alpine.store('auth', auth);
Alpine.store('site', site);
Alpine.store('tabs', tabs);

// Register Alpine.js components
Alpine.data('loginForm', login);
Alpine.data('navbar', navbar);
Alpine.data('dashboard', dashboard);
Alpine.data('dynamicTable', dynamicTable);
Alpine.data('dateRangePicker', dateRangePicker);
Alpine.data('charts', charts);
Alpine.data('spinner', spinner);

Alpine.plugin(icons);

// Initialize stores
document.addEventListener('alpine:init', () => {
  Alpine.store('auth').init();
  Alpine.store('site').init();
  Alpine.store('tabs').init();
});

Alpine.start();