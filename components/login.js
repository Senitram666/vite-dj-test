export default () => ({
  isRegistering: false,
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
    if (this.isRegistering) {
      if (!this.formData.username || !this.formData.password || !this.formData.confirmPassword || 
          !this.formData.firstName || !this.formData.lastName) {
        this.formData.error = 'Por favor, preencha todos os campos'
        return
      }

      if (this.formData.password !== this.formData.confirmPassword) {
        this.formData.error = 'As senhas não coincidem'
        return
      }

      // Sample Django backend registration request
      /*
      try {
        const response = await fetch('/api/auth/register/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.formData.username,
            password: this.formData.password,
            first_name: this.formData.firstName,
            last_name: this.formData.lastName
          }),
          credentials: 'include',
        })

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Registration failed')
        }

        const data = await response.json()
        this.$store.auth.login(this.formData.username, this.formData.password)
      } catch (err) {
        this.formData.error = err.message || 'Registration failed'
      }
      */

      // Demo version without backend
      try {
        this.$store.auth.login(this.formData.username, this.formData.password)
      } catch (err) {
        this.formData.error = err.message || 'Registro falhou'
      }
    } else {
      if (!this.formData.username || !this.formData.password) {
        this.formData.error = 'Por favor, preencha todos os campos'
        return
      }
      
      try {
        this.$store.auth.login(this.formData.username, this.formData.password)
      } catch (err) {
        this.formData.error = err.message || 'Login falhou'
      }
    }
  }
})