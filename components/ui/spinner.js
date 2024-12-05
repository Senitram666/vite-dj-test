export default () => ({
  size: 'md',
  init() {
    // Size classes for the spinner
    this.sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6'
    };
  }
});