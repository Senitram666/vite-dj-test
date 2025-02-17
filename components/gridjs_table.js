import { Grid } from "gridjs";
import { ptBR } from "gridjs/l10n";
import { h } from "gridjs";
import { PluginPosition } from "gridjs";
import { useConfig } from "gridjs";
import { RowSelection } from "gridjs/plugins/selection";
import { TABLE_CONFIGS } from './table-configs';
// import "gridjs/dist/theme/mermaid.css";


export default (endpoint, container) => ({
  grid: null,
  container: container,
  endpoint: endpoint,
  config: TABLE_CONFIGS[endpoint],
  title: '',
  search: '',
  show_datePicker: false,
  startDate: '',
  endDate: '',
  selectedRows: [],
  get displayText_datePicker() {
    const formatDate = (date) => new Date(`${date}T12:00:00Z`).toLocaleDateString('pt-BR');
    if (this.startDate && this.endDate) {
      return `${formatDate(this.startDate)} ⇀ ${formatDate(this.endDate)}`;
    }
    else if (this.startDate) {
      return `${formatDate(this.startDate)} ⇀`;
      }
    else if (this.endDate) {
      return `⇀ ${formatDate(this.endDate)}`;
    }  
    return '';
  },
  clear_datePicker() {
    this.startDate = '';
    this.endDate = '';
    this.show_datePicker = false;
    this.searchServer();
  },
  baseUrl: 'http://localhost:8000/api',
  // TableTitlePlugin() {
  //   const config = useConfig();
  //   return h('h1', {
  //     class: 'order-1 text-base font-semibold py-2 text-neutral-70 grow'
  //   }, config.title);
  // },
  // NewButtonPlugin() {
  //   return h('button', {
  //     class: 'order-6 text-base text-white !bg-primary rounded w-11 add-item-btn',
  //     'data-alpine-click': '$data.updateServerUrl("Cancelado")'
  //     // onClick: () => this.updateServerUrl('Cancelado') 
  //   }, '');
  // },
  updateServerUrl(status) {
    const currentUrl = `${this.baseUrl}/${this.endpoint}/`;
    const newUrl = currentUrl.includes('?')
      ? `${currentUrl}&status=${status}`
      : `${currentUrl}?status=${status}`;

    this.grid.updateConfig({
      server: {
        ...this.grid.config.server,
        url: newUrl
      }
    }).forceRender();
  },
  searchServer() {
    let newUrl = `${this.baseUrl}/${this.endpoint}/`;

    if (this.search) {
      newUrl = newUrl + `?search=${this.search}`;
    }
    if (this.startDate) {
      newUrl = newUrl.includes('?')
      ? `${newUrl}&data_inicio=${this.startDate}`
      : `${newUrl}?data_inicio=${this.startDate}`;
    }
    if (this.endDate) {
      newUrl = newUrl.includes('?')
      ? `${newUrl}&data_fim=${this.endDate}`
      : `${newUrl}?data_fim=${this.endDate}`;
    }

    this.grid.updateConfig({
      server: {
        ...this.grid.config.server,
        url: newUrl
      }
    }).forceRender();
  },
  // ExportButtonPlugin() {
  //   return h('button', {
  //     class: 'order-5 text-base !border !border-gray-300 text-primary !bg-white rounded w-11 export-item-btn',
  //     'x-on:click': "alert('Hello World!')"
  //   }, '');
  // },
  init() {
    if (!this.config) {
      console.error(`No configuration found for endpoint: ${this.endpoint}`);
      return;
    }
    this.title = this.config.verboseName;

    // const baseUrl = this.baseUrl;
    this.grid = new Grid({
      server: {
        url: `${this.baseUrl}/${this.endpoint}/`,
        then: data => data.results.map(this.config.serverConfig.dataMapping),
        total: data => data.count
      },
      title: this.config.verboseName,
      columns: this.config.columns,
      pagination: {
        server: {
          url: (prev, page) => {
            return prev.includes('?')
              ? `${prev}&page=${page + 1}`
              : `${prev}?page=${page + 1}`;
          }
        }
      },
      // search: {
      //   server: {
      //     url: (prev, keyword) => {
      //       return prev.includes('?')
      //         ? `${prev}&search=${keyword}`
      //         : `${prev}?search=${keyword}`;
      //     }
      //   }
      // },
      sort: {
        multiColumn: false,
        server: {
          url: (prev, columns) => {
            if (!columns.length) return prev;

            const col = columns[0];
            const dir = col.direction === 1 ? '' : '-';
            let colName = this.config.serverConfig.sortColumns[col.index];

            return prev.includes('?')
              ? `${prev}&ordering=${dir}${colName}`
              : `${prev}?ordering=${dir}${colName}`;
          }
        }
      },
      className: {
        container: 'p-0',
        //     table : 'w-full table-auto',
        tr: 'odd:bg-neutral-10 even:bg-white',
        td: 'text-center text-neutral-60 p-2 bg-transparent border-0',
        th: '!bg-white py-2 font-medium text-sm text-neutral-70 !border-0 text-center',
        header: 'flex gap-2 m-0 py-2 px-4',
        footer: 'border-0 border-t',
        //     thead : 'teste',
        //     tbody : 'teste',
        search: 'order-2',
        //     sort : 'teste',
        //     pagination : 'teste',
        // paginationSummary : '!float-right',
        //     paginationButton : 'teste',
        //     paginationButtonNext : 'teste',
        //     paginationButtonCurrent : 'teste',
        //     paginationButtonPrev : 'teste',
        //     loading : 'teste',
        //     notfound : 'teste',
        //     error: 'teste',
      },

      // plugins: [
      //   {
      //     id: 'title',
      //     component: this.TableTitlePlugin,
      //     position: PluginPosition.Header,
      //     order: 1
      //   },
      //   {
      //     id: 'add',
      //     component: this.NewButtonPlugin,
      //     position: PluginPosition.Header,
      //     order: 6
      //   },
      //   {
      //     id: 'export',
      //     component: this.ExportButtonPlugin,
      //     position: PluginPosition.Header,
      //     order: 5
      //   }
      // ],
      language: {
        ...ptBR,
        search: {
          ...ptBR.search,
          placeholder: 'Buscar'
        },
        pagination: {
          ...ptBR.pagination,
          previous: '<',
          next: '>'
        }
      }
    });


    console.log(this.config);
    console.log(this.grid);
    this.grid.render(container);
    this.grid.on('ready', () => {
      console.log('TEESTE');
      // find the plugin with the give plugin ID
      // const checkboxPlugin = grid.config.plugin.get('selectRow');
      // read the selected rows from the plugin's store
      // console.log('selected rows:', checkboxPlugin.props.store.state);

    })
  },

})