export default (data) => ({
    show: false,
    startDate: '',
    endDate: '',
    get displayText() {
        const formatDate = (date) => new Date(date).toLocaleDateString('pt-BR');
        if (this.startDate && this.endDate) {
            return `${formatDate(this.startDate)} ⇀ ${formatDate(this.endDate)}`;
        }
        return '';
    },
    clear() {
        this.startDate = '';
        this.endDate = '';
        this.show = false;
    },
    apply() {
        if (this.startDate && this.endDate) {
            this.show = false;
        }
    },
})