📦 Message Relay App with RabbitMQ + SendGrid

This app allows you to send messages (emails) reliably using:
- 🐇 RabbitMQ for job queuing
- 📬 SendGrid for sending real emails
- ⚙️ Express + Node.js backend

---

🚀 Features

- Message queuing using RabbitMQ
- Email dispatch using SendGrid
- Retry logic for failed jobs
- Environment-based configuration
- Postman-friendly API

---

🛠️ Installation & Setup

1. Clone the repo

```bash
git clone https://github.com/AahanRupal/Express_Relay_App.git
cd Express_Relay_App
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file

Copy the `.env.example` file and fill in your actual credentials:

```bash
cp .env.example .env
```

Edit `.env` and fill in values like `SENDGRID_API_KEY`, etc.

4. Start RabbitMQ (via Docker)

```bash
docker run -d --hostname rabbit --name rabbitmq \
  -p 5672:5672 -p 15672:15672 \
  rabbitmq:3-management
```

RabbitMQ Dashboard: [http://localhost:15672](http://localhost:15672)  
Login: `guest` / `guest`

---

5. Run the app

Start both services in separate terminals:

```bash
node relay-server/index.js
node worker/index.js
```

---

📫 API Endpoint

`POST /send-message`

**Body Example:**

```json
{
  "to": "someone@example.com",
  "type": "email",
  "subject": "Hello!",
  "text": "This is a message from my Node app"
}
```

---

📄 Environment Variables

See [`.env.example`](./.env.example) for required keys.

---

🧪 Testing

Use [Postman](https://www.postman.com) or `curl` to test:

```bash
curl -X POST http://localhost:3000/send-message \
  -H "Content-Type: application/json" \
  -d '{"to":"your@gmail.com","type":"email","subject":"Hey","text":"This works!"}'
```

---

📜 License

MIT
