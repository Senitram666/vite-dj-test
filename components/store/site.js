export default {
  state: {
    currentSite: null, 
    availableSites: ['lojista', 'arquiteto', 'admin'],
  },

  init() {
    // Initialize site based on user role from auth store
    const auth = window.Alpine.store('auth');
    if (auth.user?.role) {
      this.setSiteFromRole(auth.user.role);
    }
  },

  setSiteFromRole(role) {
    switch (role.toLowerCase()) {
      case 'lojista':
        this.state.currentSite = 'lojista';
        break;
      case 'arquiteto':
        this.state.currentSite = 'arquiteto';
        break;
      case 'admin':
        const urlParams = new URLSearchParams(window.location.search);
        const siteParam = urlParams.get('site');
        this.state.currentSite = siteParam || 'lojista';
        break;
      default:
        // Handle undefined or unknown roles
        this.state.currentSite = null;
        break;
    }
  },

  switchSite(site) {
    if (this.state.availableSites.includes(site)) {
      this.state.currentSite = site;
      // Trigger a re-render of the tabs
      window.Alpine.store('tabs').initializeTabs();

      const url = new URL(window.location.href);
      url.searchParams.set('site', site);
      window.history.replaceState({}, '', url.toString());
      window.location.reload();
    }
  },

  validateSiteAccess(role) {
    if (role.toLowerCase() === 'admin') return true;
    
    const currentSite = this.state.currentSite;
    const userRole = role.toLowerCase();
    
    return currentSite === userRole;
  }
};