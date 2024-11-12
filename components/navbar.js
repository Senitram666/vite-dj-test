export default () => ({
  notifications: [
    {
      id: 1,
      message: 'Novo pedido recebido',
      time: '5 min ago'
    },
    {
      id: 2,
      message: 'Arquiteto João atualizou seu perfil',
      time: '1 hour ago'
    },
    {
      id: 3,
      message: 'Nova campanha disponível',
      time: '2 hours ago'
    }
  ],

  // Sample API call for notifications
  /*
  async fetchNotifications() {
    try {
      const response = await fetch('/api/notifications/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch notifications')
      }

      const data = await response.json()
      this.notifications = data.notifications.map(notification => ({
        id: notification.id,
        message: notification.message,
        time: new Date(notification.created_at).toRelative() // You'll need a date formatting library
      }))
    } catch (error) {
      console.error('Notifications fetch error:', error)
    }
  },

  async markAsRead(notificationId) {
    try {
      const response = await fetch(`/api/notifications/${notificationId}/read/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to mark notification as read')
      }
    } catch (error) {
      console.error('Mark as read error:', error)
    }
  }
  */

  logout() {
    this.$store.auth.logout()
  }
})