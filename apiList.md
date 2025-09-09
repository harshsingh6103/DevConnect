# DevConnect API Documentation

## Authentication Routes
### POST /auth/signup
- Status: 201 Created
- Request Body: { username, email, password }
- Response: { token, userId }

### POST /auth/login
- Status: 200 OK
- Request Body: { email, password }
- Response: { token, userId }

### POST /auth/logout
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { message: "Logged out successfully" }

## Profile Routes
### GET /profile/view
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { profile data }

### PATCH /profile/edit
- Status: 200 OK
- Headers: Authorization Bearer Token
- Request Body: { name, bio, skills, location }
- Response: { updated profile }

### PATCH /profile/password
- Status: 200 OK
- Headers: Authorization Bearer Token
- Request Body: { currentPassword, newPassword }
- Response: { message: "Password updated" }

## Connection Request Routes
### POST /request/send/interested/:userId
- Status: 201 Created
- Headers: Authorization Bearer Token
- Response: { requestId, status }

### POST /request/send/ignore/:userId
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { message: "User ignored" }

### POST /request/review/accepted/:requestId
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { connection details }

### POST /request/review/rejected/:requestId
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { message: "Request rejected" }

## User Routes
### GET /connections
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { connections: [] }

### GET /requests/received
- Status: 200 OK
- Headers: Authorization Bearer Token
- Response: { requests: [] }

### GET /feed
- Status: 200 OK
- Headers: Authorization Bearer Token
- Query Params: page, limit
- Response: { posts: [], hasMore }

