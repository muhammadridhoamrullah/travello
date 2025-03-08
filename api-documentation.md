# Travel Booking API Documentation

## Base URL
```
https://api.yourdomain.com/v1
```

## Authentication
All API requests require JWT authentication:
```
Authorization: Bearer {token}
```

## Common Response Format
Success Response:
```json
{
  "status": "success",
  "data": {},
  "meta": {} // for pagination
}
```

Error Response:
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message",
    "details": {} // optional
  }
}
```

## API Endpoints

### 1. Authentication

#### Register
```http
POST /auth/register
```
Request:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string"
}
```
Response (201):
```json
{
  "status": "success",
  "data": {
    "user_id": "string",
    "name": "string",
    "email": "string",
    "token": "string"
  }
}
```

#### Login
```http
POST /auth/login
```
Request:
```json
{
  "email": "string",
  "password": "string"
}
```
Response (200):
```json
{
  "status": "success",
  "data": {
    "token": "string",
    "user": {
      "id": "string",
      "name": "string",
      "email": "string"
    }
  }
}
```

### 2. User Management

#### Get Profile
```http
GET /users/profile
```
Response (200):
```json
{
  "status": "success",
  "data": {
    "id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "preferences": {
      "language": "string",
      "currency": "string",
      "notifications": {
        "email": boolean,
        "sms": boolean,
        "push": boolean
      }
    },
    "stats": {
      "total_bookings": number,
      "completed_stays": number,
      "reviews_count": number
    }
  }
}
```

#### Update Profile
```http
PUT /users/profile
```
Request:
```json
{
  "name": "string",
  "phone": "string",
  "preferences": {
    "language": "string",
    "currency": "string",
    "notifications": {
      "email": boolean,
      "sms": boolean,
      "push": boolean
    }
  }
}
```

### 3. Destinations/Properties

#### List Destinations
```http
GET /destinations
```
Query Parameters:
- search: string (optional)
- category: string (hotel/attraction)
- price_min: number
- price_max: number
- rating: number
- location: string
- page: number (default: 1)
- limit: number (default: 10)

Response (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "location": {
        "address": "string",
        "city": "string",
        "country": "string",
        "coordinates": {
          "latitude": number,
          "longitude": number
        }
      },
      "price_range": {
        "min": number,
        "max": number
      },
      "rating": number,
      "thumbnail": "string",
      "available_rooms": number
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

#### Get Destination Detail
```http
GET /destinations/{id}
```
Response (200):
```json
{
  "status": "success",
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "category": "string",
    "location": {
      "address": "string",
      "city": "string",
      "country": "string",
      "coordinates": {
        "latitude": number,
        "longitude": number
      }
    },
    "rooms": [
      {
        "id": "string",
        "type": "string",
        "description": "string",
        "price": number,
        "capacity": {
          "adults": number,
          "children": number
        },
        "amenities": ["string"],
        "images": ["string"]
      }
    ],
    "reviews": [
      {
        "id": "string",
        "user": {
          "id": "string",
          "name": "string"
        },
        "rating": number,
        "comment": "string",
        "images": ["string"],
        "created_at": "string"
      }
    ],
    "nearby_attractions": [
      {
        "id": "string",
        "name": "string",
        "distance": number,
        "category": "string",
        "rating": number
      }
    ]
  }
}
```

### 4. Bookings

#### Create Booking
```http
POST /bookings
```
Request:
```json
{
  "destination_id": "string",
  "room_id": "string",
  "check_in": "YYYY-MM-DD",
  "check_out": "YYYY-MM-DD",
  "guests": {
    "adults": number,
    "children": number
  },
  "special_requests": "string"
}
```
Response (201):
```json
{
  "status": "success",
  "data": {
    "booking_id": "string",
    "status": "pending",
    "total_price": number,
    "booking_details": {
      "destination": {
        "id": "string",
        "name": "string"
      },
      "room": {
        "id": "string",
        "type": "string"
      },
      "check_in": "YYYY-MM-DD",
      "check_out": "YYYY-MM-DD",
      "guests": {
        "adults": number,
        "children": number
      }
    },
    "payment_url": "string"
  }
}
```

#### Get User Bookings
```http
GET /bookings
```
Query Parameters:
- status: string (pending/confirmed/completed/cancelled)
- page: number
- limit: number

Response (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": "string",
      "destination": {
        "id": "string",
        "name": "string",
        "image": "string"
      },
      "check_in": "YYYY-MM-DD",
      "check_out": "YYYY-MM-DD",
      "status": "string",
      "total_price": number,
      "created_at": "string"
    }
  ],
  "meta": {
    "total": number,
    "page": number,
    "limit": number
  }
}
```

### 5. Reviews

#### Create Review
```http
POST /destinations/{id}/reviews
```
Request:
```json
{
  "rating": number,
  "comment": "string",
  "images": ["base64 string"]
}
```
Response (201):
```json
{
  "status": "success",
  "data": {
    "id": "string",
    "rating": number,
    "comment": "string",
    "images": ["string"],
    "created_at": "string"
  }
}
```

### 6. Payments

#### Process Payment
```http
POST /bookings/{booking_id}/payment
```
Request:
```json
{
  "payment_method": "string",
  "card": {
    "number": "string",
    "exp_month": number,
    "exp_year": number,
    "cvc": "string"
  }
}
```
Response (200):
```json
{
  "status": "success",
  "data": {
    "payment_id": "string",
    "status": "success",
    "amount": number,
    "currency": "string",
    "created_at": "string"
  }
}
```

### 7. Wishlists

#### Add to Wishlist
```http
POST /wishlists
```
Request:
```json
{
  "destination_id": "string"
}
```

#### Get Wishlists
```http
GET /wishlists
```
Response (200):
```json
{
  "status": "success",
  "data": [
    {
      "id": "string",
      "destination": {
        "id": "string",
        "name": "string",
        "image": "string",
        "price_range": {
          "min": number,
          "max": number
        },
        "rating": number
      },
      "added_at": "string"
    }
  ]
}
```

## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 422: Validation Error
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting
- 100 requests per minute per IP
- Headers included in response:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1635739200
```

## Pagination
All list endpoints support pagination with:
- page: number (default: 1)
- limit: number (default: 10, max: 100)

## Versioning
API versioning is handled through the URL (e.g., /v1, /v2)

## Notes
1. All dates should be in YYYY-MM-DD format
2. All timestamps are in ISO 8601 format
3. Images should be uploaded as base64 strings
4. Prices are in IDR (Indonesian Rupiah)
5. Coordinates use the WGS84 format
