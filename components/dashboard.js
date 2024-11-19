import { animate, spring } from 'motion'
import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip
} from 'chart.js'

Chart.register(
  Colors,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

export default () => ({
  mobileShowTabs: false,
  activeTab: 'dashboard',
  activeTabName: 'Dashboard',
  previousTab: null,
  tabs: [
    { id: 'dashboard', name: 'Dashboard', icon: '<svg height="1em" width="1em" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.08333 3.16667V0.833333C6.08333 0.668056 6.13933 0.529611 6.25133 0.418C6.36333 0.306389 6.50178 0.250389 6.66667 0.25H10.1667C10.3319 0.25 10.4706 0.306 10.5826 0.418C10.6946 0.53 10.7504 0.668444 10.75 0.833333V3.16667C10.75 3.33194 10.694 3.47058 10.582 3.58258C10.47 3.69458 10.3316 3.75039 10.1667 3.75H6.66667C6.50139 3.75 6.36294 3.694 6.25133 3.582C6.13972 3.47 6.08372 3.33156 6.08333 3.16667ZM0.25 5.5V0.833333C0.25 0.668056 0.306 0.529611 0.418 0.418C0.53 0.306389 0.668444 0.250389 0.833333 0.25H4.33333C4.49861 0.25 4.63725 0.306 4.74925 0.418C4.86125 0.53 4.91706 0.668444 4.91667 0.833333V5.5C4.91667 5.66528 4.86067 5.80392 4.74867 5.91592C4.63667 6.02792 4.49822 6.08372 4.33333 6.08333H0.833333C0.668056 6.08333 0.529611 6.02733 0.418 5.91533C0.306389 5.80333 0.250389 5.66489 0.25 5.5ZM6.08333 10.1667V5.5C6.08333 5.33472 6.13933 5.19628 6.25133 5.08467C6.36333 4.97306 6.50178 4.91706 6.66667 4.91667H10.1667C10.3319 4.91667 10.4706 4.97267 10.5826 5.08467C10.6946 5.19667 10.7504 5.33511 10.75 5.5V10.1667C10.75 10.3319 10.694 10.4706 10.582 10.5826C10.47 10.6946 10.3316 10.7504 10.1667 10.75H6.66667C6.50139 10.75 6.36294 10.694 6.25133 10.582C6.13972 10.47 6.08372 10.3316 6.08333 10.1667ZM0.25 10.1667V7.83333C0.25 7.66806 0.306 7.52961 0.418 7.418C0.53 7.30639 0.668444 7.25039 0.833333 7.25H4.33333C4.49861 7.25 4.63725 7.306 4.74925 7.418C4.86125 7.53 4.91706 7.66844 4.91667 7.83333V10.1667C4.91667 10.3319 4.86067 10.4706 4.74867 10.5826C4.63667 10.6946 4.49822 10.7504 4.33333 10.75H0.833333C0.668056 10.75 0.529611 10.694 0.418 10.582C0.306389 10.47 0.250389 10.3316 0.25 10.1667ZM1.41667 4.91667H3.75V1.41667H1.41667V4.91667ZM7.25 9.58333H9.58333V6.08333H7.25V9.58333ZM7.25 2.58333H9.58333V1.41667H7.25V2.58333ZM1.41667 9.58333H3.75V8.41667H1.41667V9.58333Z" fill="currentColor"/></svg>' },
    { id: 'pedidos', name: 'Pedidos', icon: '<svg height="1em" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.2375 9.5833L0.166664 7.51247L0.983331 6.6958L2.22291 7.93538L4.70208 5.45622L5.51875 6.28747L2.2375 9.5833ZM2.2375 4.91663L0.166664 2.8458L0.983331 2.02913L2.22291 3.26872L4.70208 0.789551L5.51875 1.6208L2.2375 4.91663ZM6.58333 8.41663V7.24997H11.8333V8.41663H6.58333ZM6.58333 3.74997V2.5833H11.8333V3.74997H6.58333Z" fill="currentColor"/></svg>' },
    { id: 'arquitetos', name: 'Arquitetos', icon: '<svg height="1em" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.44792 3.23342L5.08125 1.11883C5.19792 0.963279 5.33656 0.84914 5.49717 0.776418C5.65778 0.703696 5.82539 0.66714 6 0.666751C6.17461 0.666362 6.34242 0.702918 6.50342 0.776418C6.66442 0.849918 6.80286 0.964057 6.91875 1.11883L8.55208 3.23342L11.0312 4.06467C11.284 4.14245 11.4833 4.28595 11.6292 4.49517C11.775 4.70439 11.8479 4.9352 11.8479 5.18758C11.8479 5.30425 11.8308 5.42092 11.7966 5.53758C11.7624 5.65425 11.7066 5.76606 11.6292 5.873L10.025 8.148L10.0833 10.5397C10.0931 10.8799 9.98125 11.1668 9.74792 11.4001C9.51458 11.6334 9.24236 11.7501 8.93125 11.7501C8.91181 11.7501 8.80486 11.7355 8.61042 11.7063L6 10.9772L3.38958 11.7063C3.34097 11.7258 3.2875 11.738 3.22917 11.7431C3.17083 11.7481 3.11736 11.7505 3.06875 11.7501C2.75764 11.7501 2.48542 11.6334 2.25208 11.4001C2.01875 11.1668 1.90694 10.8799 1.91667 10.5397L1.975 8.13342L0.385417 5.873C0.307639 5.76606 0.251639 5.65425 0.217417 5.53758C0.183195 5.42092 0.166278 5.30425 0.166667 5.18758C0.166667 4.94453 0.23725 4.71858 0.378417 4.50975C0.519583 4.30092 0.716361 4.15256 0.96875 4.06467L3.44792 3.23342ZM4.1625 4.23967L1.33333 5.173L3.14167 7.78342L3.08333 10.5688L6 9.76675L8.91667 10.5834L8.85833 7.78342L10.6667 5.20217L7.8375 4.23967L6 1.83342L4.1625 4.23967Z" fill="currentColor"/></svg>' },
    { id: 'experiencias', name: 'Experiências', icon: '<svg height="1em" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.9375 13.3332C1.5 13.3332 1.12336 13.1849 0.807586 12.8881C0.491808 12.5914 0.333725 12.2245 0.333336 11.7874V3.64989C0.333336 3.28044 0.447669 2.94989 0.676336 2.65822C0.905002 2.36655 1.20386 2.18183 1.57292 2.10405L7.33334 0.966553V10.2999L1.80625 11.4082C1.71875 11.4277 1.64584 11.4739 1.5875 11.5471C1.52917 11.6202 1.5 11.7003 1.5 11.7874C1.5 11.8943 1.54375 11.9844 1.63125 12.0575C1.71875 12.1306 1.82084 12.1669 1.9375 12.1666H8.5V2.83322H9.66667V13.3332H1.9375ZM3.25 9.9353L6.16667 9.36655V2.39572L3.25 2.96447V9.9353ZM2.08334 10.1686V3.1978L1.86459 3.24155C1.75764 3.261 1.67014 3.30728 1.60209 3.38039C1.53403 3.4535 1.5 3.54333 1.5 3.64989V10.3145C1.54861 10.295 1.59975 10.2781 1.65342 10.2637C1.70709 10.2493 1.75803 10.2371 1.80625 10.227L2.08334 10.1686Z" fill="currentColor"/></svg>' },
    { id: 'campanhas', name: 'Campanhas Bônus', icon: '<svg height="1em" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.5 6.08325V4.91659H11.8333V6.08325H9.5ZM10.2 10.1666L8.33334 8.76659L9.03334 7.83325L10.9 9.23325L10.2 10.1666ZM9.03334 3.16659L8.33334 2.23325L10.2 0.833252L10.9 1.76659L9.03334 3.16659ZM1.91667 9.58325V7.24992H1.33334C1.01251 7.24992 0.73795 7.13578 0.509672 6.9075C0.281394 6.67922 0.167061 6.40447 0.166672 6.08325V4.91659C0.166672 4.59575 0.281005 4.3212 0.509672 4.09292C0.738338 3.86464 1.01289 3.75031 1.33334 3.74992H3.66667L6.58334 1.99992V8.99992L3.66667 7.24992H3.08334V9.58325H1.91667ZM5.41667 6.92909V4.07075L3.9875 4.91659H1.33334V6.08325H3.9875L5.41667 6.92909ZM7.16667 7.45409V3.54575C7.42917 3.77909 7.64073 4.06356 7.80134 4.39917C7.96195 4.73478 8.04206 5.1017 8.04167 5.49992C8.04128 5.89814 7.96098 6.26525 7.80075 6.60125C7.64053 6.93725 7.42917 7.22153 7.16667 7.45409Z" fill="currentColor"/></svg>' }
  ],
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
      subtitle: 'Pontos desta loja' , 
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
    this.$watch('activeTab', (value, oldValue) => {
      this.previousTab = oldValue
      this.animateTabTransition()
      const item = this.tabs.find(element => element.id === value);
      this.activeTabName = item ? item.name : null;
    })
  },

  async draw_bargraph(canvas_id, data, labels) {
    console.log(canvas_id);
    console.log(data);
    new Chart(
      document.getElementById(canvas_id),
      {
        type: 'bar',
        options: {
          // animation: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              enabled: true
            }
          }
        },
        data: {
          labels: labels,
          datasets: [
            {
              label: false,
              data: data,
              backgroundColor: 'rgba(216, 220, 225, 1)',
              hoverBackgroundColor: 'rgba(0, 160, 230, 1)',
              borderSkipped:'start',
              borderRadius: 2,
            }
          ]
        }
      }
    );
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