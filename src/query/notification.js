const getUserNotificationQuery = `
query GetUserNotification($userId: String) {
  getUserNotification(userId: $userId) {
    id
    userId
    title
    content
    date
    isRead
  }
}
`;

const addNotificationMutation = `
mutation AddNotification($userId: String, $title: String, $content: String) {
  addNotification(userId: $userId, title: $title, content: $content) {
    id
    userId
    title
    content
    date
    isRead
  }
}
`;

const markReadMutation = `
mutation Mutation($notificationId: ID) {
  markRead(id: $notificationId) {
    id
    userId
    title
    content
    date
    isRead
  }
}
`;

const markReadAllMutation = `
mutation Mutation($userId: String) {
  markAllRead(userId: $userId) {
    id
    userId
    title
    content
    date
    isRead
  }
}
`;

module.exports = {
  getUserNotificationQuery,
  addNotificationMutation,
  markReadMutation,
  markReadAllMutation
};
