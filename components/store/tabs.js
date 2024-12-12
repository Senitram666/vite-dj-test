import { animate } from 'motion';

const ROLE_TABS = {
  lojista: [
    { id: 'dashboard', name: 'Dashboard', icon: 'dashboard_icon' },
    { id: 'pedidos', name: 'Pedidos', icon: 'pedidos_icon' },
    { id: 'arquitetos', name: 'Arquitetos', icon: 'arquitetos_icon' },
    { id: 'experiencias', name: 'Experiências', icon: 'experiencias_icon' },
    { id: 'campanhas', name: 'Campanhas Bônus', icon: 'campanhas_icon' }
  ],
  arquiteto: [
    { id: 'dashboard_arq', name: 'Dashboard Arquiteto', icon: 'dashboard_icon' },
    { id: 'projetos', name: 'Meus Projetos', icon: 'projetos_icon' },
    { id: 'pontos', name: 'Meus Pontos', icon: 'pontos_icon' },
    { id: 'experiencias', name: 'Experiências', icon: 'experiencias_icon' },
    { id: 'campanhas', name: 'Campanhas', icon: 'campanhas_icon' }
  ],
  admin: [
    { id: 'dashboard_adm', name: 'Dashboard Admin', icon: 'dashboard_icon' },
    { id: 'users', name: 'Usuários', icon: 'users_icon' },
    { id: 'lojas', name: 'Lojas', icon: 'store_icon' },
    { id: 'relatorios', name: 'Relatórios', icon: 'reports_icon' },
    { id: 'configuracoes', name: 'Configurações', icon: 'settings_icon' }
  ]
};

export default {
  state: {
    mobileShowTabs: false,
    activeTab: 'dashboard',
    activeTabName: 'Dashboard',
    tabs: []
  },

  init() {
    this.initializeTabs();
  },

  initializeTabs() {
    const site = window.Alpine.store('site').state.currentSite;
    // const auth = window.Alpine.store('auth');
    // const role = auth.user?.role?.toLowerCase();

    // Set tabs based on current site or admin role
    // if (role === 'admin') {
    //   // this.state.tabs = ROLE_TABS.admin;
    //   this.state.tabs = ROLE_TABS[site];
    // } else if (site) {
    //   this.state.tabs = ROLE_TABS[site];
    // }

    if (site) {
      this.state.tabs = ROLE_TABS[site];
      this.setActiveTab(this.state.tabs[1].id);
    }// FIXME set back to tabs[0] after finalizing testing
    

    // Update active tab name
    // const initialTab = this.state.tabs.find(tab => tab.id === this.state.activeTab);
    // if (initialTab) {
    //   this.state.activeTabName = initialTab.name;
    // }
  },

  setActiveTab(tabId) {
    this.state.mobileShowTabs = false;
    const tab = this.state.tabs.find(tab => tab.id === tabId);
    if (tab) {
      this.state.activeTab = tabId;
      this.state.activeTabName = tab.name;
    }
  },

  async toggleMobileMenu(value, el) {
    if (!el) return;
    
    if (value) {
      el.style.transform = 'translateY(100%)';
      await animate(el, { y: ['100%', '0%'] }, { duration: 0.5 });
    } else {
      await animate(el, { y: ['0%', '100%'] }, { duration: 0.55 });
    }
  }
};