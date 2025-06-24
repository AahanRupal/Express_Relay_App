# 📦 Message Relay App with RabbitMQ, Prisma & SendGrid

This app allows you to send messages (emails) reliably using:

- 🐇 RabbitMQ for job queuing  
- 📬 SendGrid for sending real emails  
- 🧱 Prisma + PostgreSQL for logging failed jobs  
- ⚙️ Express + Node.js backend  

---

## 🚀 Features

- Message queuing using RabbitMQ  
- Email dispatch using SendGrid  
- Retry logic for failed jobs  
- **Persistent storage of failed jobs using Prisma + PostgreSQL**  
- Environment-based configuration  
- Postman-friendly API  

---

## 🛠️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/AahanRupal/Express_Relay_App.git
cd Express_Relay_App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```bash
cp .env.example .env
```

Edit `.env` and fill in values like `SENDGRID_API_KEY`, `DATABASE_URL`, etc.

### 3.5. (Optional) Set up Prisma + PostgreSQL

If you want to store failed jobs in a database:

1. Replace `DATABASE_URL` in `.env`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

2. Run the Prisma migration:
   ```bash
   npx prisma migrate dev --name init
   ```

3. (Optional) View data using Prisma Studio:
   ```bash
   npx prisma studio
   ```

---

### 4. Start RabbitMQ (via Docker)

```bash
docker run -d --hostname rabbit --name rabbitmq   -p 5672:5672 -p 15672:15672   rabbitmq:3-management
```

RabbitMQ Dashboard: [http://localhost:15672](http://localhost:15672)  
Login: `guest` / `guest`

---

### 5. Run the app

Start both services in separate terminals:

```bash
node relay-server/index.js
node worker/index.js
```

---

## 📫 API Endpoint

**`POST /send-message`**

### Body Example:

```json
{
  "to": "someone@example.com",
  "type": "email",
  "subject": "Hello!",
  "text": "This is a message from my Node app"
}
```

---

## 📄 Environment Variables

See `.env.example` for required variables:


## 🧪 Testing

Use Postman or `curl`:

```bash
curl -X POST http://localhost:3000/send-message   -H "Content-Type: application/json"   -d '{"to":"your@gmail.com","type":"email","subject":"Hey","text":"This works!"}'
```

---

🧱 Prisma Schema (for failed jobs)

```prisma
model FailedJob {
  id        Int      @id @default(autoincrement())
  to        String
  type      String
  subject   String
  text      String
  error     String
  createdAt DateTime @default(now())
}
```

---

## 📜 License

MIT
