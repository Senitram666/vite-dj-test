import { animate, spring } from 'motion'

export default () => ({
  activeTab: 'dashboard',
  previousTab: null,
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

  init() {
    this.$watch('activeTab', (value, oldValue) => {
      this.previousTab = oldValue
      this.animateTabTransition()
    })
  },

  async animateTabTransition() {
    const oldContent = document.querySelector(`[data-tab="${this.previousTab}"]`)
    const newContent = document.querySelector(`[data-tab="${this.activeTab}"]`)
    
    if (oldContent && newContent) {
      // Slide out old content
      await animate(oldContent, 
        { 
          opacity: [1, 0],
          x: [0, -20]
        }, 
        { duration: 0.2 }
      )
      oldContent.style.display = 'none'

      // Prepare new content
      newContent.style.display = 'grid'
      newContent.style.opacity = '0'
      newContent.style.transform = 'translateX(20px)'

      // Slide in new content
      await animate(newContent,
        { 
          opacity: [0, 1],
          x: [20, 0]
        },
        { 
          duration: 0.3,
          easing: spring({ stiffness: 100, damping: 15 })
        }
      )
    }
  }
})