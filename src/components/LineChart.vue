<template>
  <div>
    <canvas ref="chartRef"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import { color } from 'chart.js/helpers'; // We only need color now

Chart.register(...registerables);

// Define months manually
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Custom function to seed Math.random
function seedRandom(seed) {
  var x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Function to generate seeded random numbers
function generateSeededRandomNumbers(seed, count, min, max) {
  const seededRandom = () => seedRandom(seed++);
  return Array.from({ length: count }, () => Math.floor(seededRandom() * (max - min + 1)) + min);
}

// Custom function to adjust color transparency
function transparentize(color, opacity) {
  if (color.startsWith('rgba')) {
    const rgba = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/);
    if (rgba) {
      return `rgba(${rgba[1]}, ${rgba[2]}, ${rgba[3]}, ${opacity})`;
    }
  }
  const rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (rgb) {
    return `rgba(${rgb[1]}, ${rgb[2]}, ${rgb[3]}, ${opacity})`;
  }
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default {
  name: 'LineChart',
  data() {
    return {
      chartInstance: null
    };
  },
  mounted() {
    this.createChart();
  },
  beforeDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  },
  methods: {
    getLineColor(ctx) {
      return ctx.datasetIndex === 0 ? 'rgba(0, 123, 255, 1)' : 'rgba(255, 193, 7, 1)';
    },
    alternatePointStyles(ctx) {
      const index = ctx.dataIndex;
      return index % 2 === 0 ? 'circle' : 'rect';
    },
    makeHalfAsOpaque(ctx) {
      const colorValue = this.getLineColor(ctx);
      return transparentize(colorValue, 0.5); // Adjusting opacity to half
    },
    adjustRadiusBasedOnData(ctx) {
      const v = ctx.parsed.y;
      return v < 10 ? 5
        : v < 25 ? 7
        : v < 50 ? 9
        : v < 75 ? 11
        : 15;
    },
    createChart() {
      const ctx = this.$refs.chartRef.getContext('2d');

      // Using a seed for reproducibility
      const seed = 110; // You can change this seed value as needed
      const newIntakesData = generateSeededRandomNumbers(seed, 12, 0, 95);
      const resignationsData = generateSeededRandomNumbers(seed + 100, 12, 0, 90); // Different seed for different pattern

      const data = {
        labels: months.slice(0, 12), // Using first 7 months for the chart
        datasets: [
          {
            label: 'New Intakes',
            data: newIntakesData,
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            tension: 0.4,
            fill: false,
            pointBackgroundColor: this.getLineColor,
            pointHoverBackgroundColor: this.makeHalfAsOpaque,
            pointRadius: this.adjustRadiusBasedOnData,
            pointStyle: this.alternatePointStyles,
            pointHoverRadius: 15,
          },
          {
            label: 'Resignations',
            data: resignationsData,
            borderColor: 'rgba(255, 193, 7, 1)',
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            tension: 0.4,
            fill: false,
            pointBackgroundColor: this.getLineColor,
            pointHoverBackgroundColor: this.makeHalfAsOpaque,
            pointRadius: this.adjustRadiusBasedOnData,
            pointStyle: this.alternatePointStyles,
            pointHoverRadius: 15,
          }
        ]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += context.parsed.y;
                  }
                  return label;
                }
              }
            },
            annotation: {
              annotations: {
                box1: {
                  type: 'box',
                  xMin: 'Mar',
                  xMax: 'Apr',
                  yMin: 0,
                  yMax: 100,
                  backgroundColor: 'rgba(0, 123, 255, 0.1)',
                  borderColor: 'rgba(0, 123, 255, 0.2)',
                  borderWidth: 1,
                  label: {
                    content: '15 Aug 2022\n2 Employees',
                    display: true,
                    position: 'center',
                    color: 'black',
                    font: {
                      size: 12
                    }
                  }
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100
            }
          }
        }
      };

      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(ctx, config);
    }
  }
};
</script>

<style scoped>
/* Add any component-specific styles here */
</style>