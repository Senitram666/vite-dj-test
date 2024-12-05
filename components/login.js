export default () => ({
  isRegistering: false,
  isLoading: false,
  formData: {
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    error: ''
  },

  toggleForm() {
    this.isRegistering = !this.isRegistering
    this.formData = {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      error: ''
    }
  },

  async handleSubmit() {
    this.isLoading = true;
    this.formData.error = '';

    try {
      if (this.isRegistering) {
        if (!this.formData.username || !this.formData.password || !this.formData.confirmPassword || 
            !this.formData.firstName || !this.formData.lastName) {
          throw new Error('Por favor, preencha todos os campos');
        }

        if (this.formData.password !== this.formData.confirmPassword) {
          throw new Error('As senhas não coincidem');
        }

        // Demo version without backend
        await this.$store.auth.login(this.formData.username, this.formData.password);
      } else {
        if (!this.formData.username || !this.formData.password) {
          throw new Error('Por favor, preencha todos os campos');
        }
        
        await this.$store.auth.login(this.formData.username, this.formData.password);
      }
    } catch (err) {
      this.formData.error = err.message || (this.isRegistering ? 'Registro falhou' : 'Login falhou');
    } finally {
      this.isLoading = false;
    }
  }
});