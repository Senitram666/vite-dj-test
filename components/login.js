export default () => ({
  formData: {
    username: '',
    password: '',
    error: ''
  },

  handleSubmit() {
    if (!this.formData.username || !this.formData.password) {
      this.formData.error = 'Please fill in all fields'
      return
    }
    
    try {
      this.$store.auth.login(this.formData.username, this.formData.password)
    } catch (err) {
      this.formData.error = err.message || 'Login failed'
    }
  }
})