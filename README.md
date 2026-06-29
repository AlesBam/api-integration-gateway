# API Integration Gateway

A robust Node.js backend service that connects to multiple external APIs, handles different authentication methods, and unifies their responses into a single, standardized JSON model. 

This project was built to demonstrate real-world backend engineering practices, focusing on reliability, observability, and defensive programming.

## Key Features

* **Unified JSON Model:** Transforms varying payloads from different external APIs into a consistent, predictable internal structure (always including a `source` field).
* **Resilience & Reliability:** Implements automated **retries** with exponential backoff and **timeouts** (via `axios-retry`) to handle flaky external services.
* **Rate Limiting:** Protects the internal endpoints from abuse using `express-rate-limit` (max 100 requests per 15 minutes per IP).
* **Structured Logging:** Replaces `console.log` with a professional `winston` setup. Logs are output as structured JSON to the console and saved to disk (`combined.log`, `error.log`). Rate limit breaches are logged as warnings.
* **Centralized Error Handling:** Catches all application errors and unhandled routes, preventing stack traces from leaking to the client and returning clean, consistent JSON error responses.
* **Multiple Authentication Types:** Demonstrates handling different API auth strategies:
  * Query Parameter API Keys (OpenWeatherMap)
  * HTTP Bearer Tokens (GitHub API)
  * No Authentication (JSONPlaceholder)
* **Environment Configuration:** Secure management of secrets and environment-specific variables using `dotenv` and a centralized config module.

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **HTTP Client:** Axios
* **Logging:** Winston
* **Utilities:** dotenv, express-rate-limit, axios-retry

## Project Structure

```text
src/
├── config/           # Environment variables and API base URLs
├── middleware/       # Express middlewares (Rate Limiting, Error Handling)
├── routes/           # API route definitions
├── services/         # Business logic and external API communication
├── utils/            # Utilities (Winston Logger configuration)
└── server.js         # Application entry point
```

## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd api-integration-gateway
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory and add your API keys:
   ```env
   PORT=3000
   OPENWEATHER_API_KEY=your_openweather_api_key
   GITHUB_TOKEN=your_github_personal_access_token
   ```

4. **Start the server**
   ```bash
   node src/server.js
   ```

## API Reference

All responses follow a unified format with a `source` identifier.

### 1. Get Weather
Fetches current weather for a specific city via OpenWeatherMap.
* **Endpoint:** `GET /api/weather/:city`
* **Example Response:**
  ```json
  {
    "source": "openweathermap",
    "city": "Prague",
    "country": "CZ",
    "temperature": 15.14,
    "feels_like": 13.86,
    "humidity": 44,
    "description": "clear sky"
  }
  ```

### 2. Get User Repositories
Fetches public repositories for a specific GitHub user.
* **Endpoint:** `GET /api/repos/:username`
* **Example Response:**
  ```json
  [
    {
      "source": "githubAPI",
      "id": 12345678,
      "name": "example-repo",
      "description": "This is an example repository",
      "url": "https://github.com/username/example-repo",
      "stars": 42
    }
  ]
  ```

### 3. Get Posts
Fetches mock blog posts via JSONPlaceholder.
* **Endpoint:** `GET /api/posts`
* **Example Response:**
  ```json
  [
    {
      "source": "jsonplaceholder",
      "id": 1,
      "title": "sunt aut facere",
      "body": "quia et suscipit..."
    }
  ]
  ```

## Error Responses

All errors are intercepted and returned in a standard format. Example of a 404 error:

```json
{
  "error": "City not found",
  "status": 404
}
```
