import {
  Chart,
  Colors,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
  Tooltip
} from 'chart.js';

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
  init() {
    this.initializeCharts();
  },

  draw_bargraph(canvasId, data, labels) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    new Chart(canvas, {
      type: 'bar',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              display: true
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      },
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: 'rgba(216, 220, 225, 1)',
          hoverBackgroundColor: 'rgba(0, 160, 230, 1)',
          borderSkipped: 'start',
          borderRadius: 2,
          // barThickness: 8,
          // maxBarThickness: 8
        }]
      }
    });
  },

  initializeCharts() {
    const charts = document.querySelectorAll('[data-chart]');
    charts.forEach(canvas => {
      if (!canvas) return;

      const data = JSON.parse(canvas.dataset.values || '[]');
      const labels = JSON.parse(canvas.dataset.labels || '[]');

      new Chart(canvas, {
        type: 'bar',
        options: {
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
          datasets: [{
            label: false,
            data: data,
            backgroundColor: 'rgba(216, 220, 225, 1)',
            hoverBackgroundColor: 'rgba(0, 160, 230, 1)',
            borderSkipped: 'start',
            borderRadius: 2,
          }]
        }
      });
    });
  }
});