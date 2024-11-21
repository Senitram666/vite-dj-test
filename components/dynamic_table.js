export default (data) => ({
  rows: data,
  table_title: 'titulo',
  headers: [],
  search: "",
  filteredRows: [],
  init() {
    // Extract headers from keys of the first row
    this.headers = Object.keys(this.rows[0]);
    this.filteredRows = this.rows;
  },
  filterRows() {
    // Basic search filter
    this.filteredRows = this.rows.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(this.search.toLowerCase())
      )
    );
  },
})