export default () => ({
  activeTab: 'dashboard',
  tabs: [
    { id: 'dashboard', name: 'Dashboard' },
    { id: 'pedidos', name: 'Pedidos' },
    { id: 'arquitetos', name: 'Arquitetos' },
    { id: 'experiencias', name: 'Experiências' },
    { id: 'campanhas', name: 'Campanhas Bônus' }
  ],
  dashboardCards: [
    { 
      id: 1, 
      title: 'Total Pedidos', 
      content: '156 pedidos este mês' 
    },
    { 
      id: 2, 
      title: 'Arquitetos Ativos', 
      content: '45 arquitetos' 
    },
    { 
      id: 3, 
      title: 'Experiências Realizadas', 
      content: '89 experiências' 
    }
  ],

  // Sample API calls for dashboard data
  /*
  async fetchDashboardData() {
    try {
      const response = await fetch('/api/dashboard/stats/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data')
      }

      const data = await response.json()
      this.dashboardCards = [
        { 
          id: 1, 
          title: 'Total Pedidos', 
          content: `${data.total_pedidos} pedidos este mês` 
        },
        { 
          id: 2, 
          title: 'Arquitetos Ativos', 
          content: `${data.arquitetos_ativos} arquitetos` 
        },
        { 
          id: 3, 
          title: 'Experiências Realizadas', 
          content: `${data.experiencias} experiências` 
        }
      ]
    } catch (error) {
      console.error('Dashboard data fetch error:', error)
    }
  }
  */
})