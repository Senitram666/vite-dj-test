import { animate } from 'motion';

export default {
  state: {
    mobileShowTabs: false,
    activeTab: 'dashboard',
    activeTabName: 'Dashboard',
    tabs: [
      { id: 'dashboard', name: 'Dashboard', icon: 'dashboard_icon' },
      { id: 'pedidos', name: 'Pedidos', icon: 'pedidos_icon' },
      { id: 'arquitetos', name: 'Arquitetos', icon: 'arquitetos_icon' },
      { id: 'experiencias', name: 'Experiências', icon: 'experiencias_icon' },
      { id: 'campanhas', name: 'Campanhas Bônus', icon: 'campanhas_icon' }
    ],
  },

  init() {
    const initialTab = this.state.tabs.find(tab => tab.id === this.state.activeTab);
    if (initialTab) {
      this.state.activeTabName = initialTab.name;
    }
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