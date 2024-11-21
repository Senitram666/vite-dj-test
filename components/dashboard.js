import { animate, spring } from 'motion';

export default () => ({
  previousTab: null,
  activeTab: 'dashboard',
  dashboardCards: [
    { 
      id: 1, 
      title: 'Pontuação Semanal',
      type: 'bargraph', 
      data: [77, 98, 65, 56, 39, 89, 78],
      labels: ['Seg 09/10', 'Ter 10/10', 'Qua 11/10', 'Qui 12/10', 'Sex 13/10', 'Sab 14/10', 'Dom 15/10'],
    },
    { 
      id: 2, 
      title: 'Pontuação Mensal',
      type: 'bargraph', 
      data: [77, 98, 65, 56, 39, 89, 78, 70, 62, 34],
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
    },
    { 
      id: 3, 
      title: 'Pontuação Anual',
      type: 'number', 
      value: 2400,
      subtitle: 'Pontos desta loja',
      inicio: '01-01-24',
      fim: '31-12-24'
    },
    {
      id: 4,
      title: 'Ranking Geral Arquitetos',
      type: 'table',
      big: true,
      items: [
        {
          position: 1,
          img: "<img src='https://i.pravatar.cc/40?u=ghsdgh' alt=''>",
          name: "Leandro Leal",
          points: 4555
        },
        {
          position: 2,
          img: "<img src='https://i.pravatar.cc/40?u=ghghfhn' alt=''>",
          name: "Leandro Leal",
          points: 300
        },
        {
          position: 3,
          img: "<img src='https://i.pravatar.cc/40?u=asccvcbn' alt=''>",
          name: "Leandro Leal",
          points: 200
        },
        {
          position: 4,
          img: "<img src='https://i.pravatar.cc/40?u=etrser' alt=''>",
          name: "Leandro Leal",
          points: 150
        },
        {
          position: 5,
          img: "<img src='https://i.pravatar.cc/40?u=ereffgsdd' alt=''>",
          name: "Leandro Leal",
          points: 100
        }
      ],
      headerLink: "Lista Completa"
    }
  ],

  init() {
    this.$watch('$store.tabs.state.activeTab', (value, oldValue) => {
      this.previousTab = oldValue;
      this.$nextTick(() => {
        this.animateTabTransition();
      });
    });

    this.$watch('activeTab', (value) => {
      this.$store.tabs.setActiveTab(value);
    });
  },

  async animateTabTransition() {
    const oldContent = document.querySelector(`[data-tab="${this.previousTab}"]`);
    const newContent = document.querySelector(`[data-tab="${this.activeTab}"]`);
    
    if (!oldContent || !newContent) return;

    // Hide all tab contents first
    document.querySelectorAll('[data-tab]').forEach(el => {
      if (el !== oldContent && el !== newContent) {
        el.style.display = 'none';
      }
    });

    // Animate out old content
    if (oldContent) {
      await animate(
        oldContent,
        { opacity: [1, 0], x: [0, -20] },
        { duration: 0.2 }
      ).finished;
      oldContent.style.display = 'none';
    }

    // Prepare and animate in new content
    newContent.style.display = 'grid';
    newContent.style.opacity = '0';
    newContent.style.transform = 'translateX(20px)';

    await animate(
      newContent,
      { opacity: [0, 1], x: [20, 0] },
      { duration: 0.3, easing: spring({ stiffness: 100, damping: 15 }) }
    ).finished;
  }
});