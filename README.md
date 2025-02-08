# Telegram Broadcast Bot

This project is a Telegram bot-based broadcasting system built using Node.js, Express, Telegraf, Redis and Bull. It allows you to send messages to a large number of users with optional attachments such as images and inline buttons. The system supports scheduling broadcasts, sending reports to a Telegram chat or webhook, and managing broadcast queues using Redis and Bull.

## Features

- **Broadcast Messages**: Send messages to a list of users from database or a custom test list.
- **Scheduling**: Schedule broadcasts to be sent at a specific time.
- **Inline Buttons**: Attach inline buttons to your messages.
- **Reports**: Receive real-time reports on the progress of your broadcasts via Telegram chat or webhook.
- **Queue Management**: Manage broadcast tasks using Redis and Bull, allowing for reliable and scalable message sending.
- **Error Handling**: Tracks and reports errors during the broadcasting process.
- **Cancellation**: Cancel broadcasts that are scheduled or currently running.

## Prerequisites

- **Node.js** (v12.x or later)
- **Redis** (for managing queues)
- **Telegraf** (for Telegram bot API)
- **Axios** (for making HTTP requests)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/audilove/broadcast-bot-api.git
    cd broadcast-bot-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure environment**:

    Create a `config.json` file in the root directory of the project with the following structure:

    ```json
    {
      "BOT_TOKEN": "your_telegram_bot_token",
      "API_KEY": "your_api_key", // You custom API key from request
      "API_URL": "your_api_url", // Your API url from request
      "PORT": 3100
    }
    ```

4. **Run the server**:

    ```bash
    node index.js
    ```

    The server will start on the specified port.

## API Endpoints

### 1. Start Broadcast

**Endpoint**: `/start-broadcast`

**Method**: `POST`

**Headers**:
- `Content-Type: application/json`
- `x-api-key: your_api_key`

**Description**:
Starts a new broadcast task. You can optionally schedule the broadcast and attach inline buttons.

**Request Body**:

```json
{
  "messageText": "Your message here",
  "imageUrl": "https://your-image-url.com/image.png",
  "buttons": [
    {"text": "Button1", "url": "https://link1.com"}
  ],
  "reportChatId": "123456789",
  "webhookUrl": "https://your-webhook-url.com/report",
  "reportIntervalMinutes": 1,
  "scheduledTime": "20.08.2024 16:00",
  "delay": 1, // Delay in seconds between sending 30 users
  "testUsers": [
    {"userId": "123456789"},
    {"userId": "987654321"}
  ]
}
```

**Parameters**:

- `messageText` (required): The text message to be broadcasted.
- `imageUrl` (optional): URL of the image to attach.
- `buttons` (optional): Array of inline buttons.
- `reportChatId` (optional): Telegram chat ID where progress reports will be sent.
- `webhookUrl` (optional): URL for sending progress reports via webhook.
- `reportIntervalMinutes` (optional): Interval for reporting progress in minutes. Defaults to 1 minute.
- `scheduledTime` (optional): Schedule the broadcast at a specific time (in `DD.MM.YYYY HH:mm` format).
- `delay` (optional): Delay in seconds between sending 30 users. Defaults to 1 second.
- `testUsers` (optional): Array of test users (useful for testing without querying the database).

**Response**:

- **Success**:
  
  ```json
  {
    "message": "Рассылка добавлена в очередь.",
    "jobId": "1",
    "scheduledTime": "Сразу"
  }
  ```

- **Error**:
  
  ```json
  {
    "error": "Description of the error"
  }
  ```

### 2. Cancel Broadcast

**Endpoint**: `/cancel-broadcast`

**Method**: `POST`

**Headers**:
- `Content-Type: application/json`
- `x-api-key: your_api_key`

**Description**:
Cancels a broadcast task that is scheduled or currently running.

**Request Body**:

```json
{
  "jobId": "1"
}
```

**Parameters**:

- `jobId` (required): The ID of the broadcast task to be canceled. Use `all` to cancel all tasks.

**Response**:

- **Success**:
  
  ```json
  {
    "message": "Рассылка 1 отменена."
  }
  ```

- **Error**:
  
  ```json
  {
    "error": "Description of the error"
  }
  ```

## Usage Example

To start a broadcast immediately with text and an inline button, use the following `curl` command:

```bash
curl -X POST http://localhost:3100/start-broadcast \
-H "Content-Type: application/json" \
-H "x-api-key: your_default_api_key" \
-d '{
  "messageText": "Hello, world!",
  "buttons": [
    {"text": "Visit Website", "url": "https://example.com"}
  ]
}'
```

To cancel a broadcast:

```bash
curl -X POST http://localhost:3100/cancel-broadcast \
-H "Content-Type: application/json" \
-H "x-api-key: your_default_api_key" \
-d '{
  "jobId": "1"
}'
```

## Error Handling

The API will return standard HTTP error codes:

- **400**: Bad Request – Missing required parameters or invalid data.
- **403**: Forbidden – Invalid API key.
- **500**: Internal Server Error – Server-side error during the process.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to reach out to the repository owner.