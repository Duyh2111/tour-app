# 🌍 WanderLux — Tour & Travel Website (Supabase Edition)

Full-stack tour website. Backend uses **Supabase (PostgreSQL) + Prisma ORM**.  
Frontend is unchanged — React + Vite + Tailwind CSS.

---

## 🗂️ Project Structure

```
tour-app/
├── backend/              ← Express API + Prisma + Supabase
│   ├── prisma/
│   │   └── schema.prisma ← Database schema (User, Tour models)
│   ├── src/
│   │   ├── config/       ← db.js (Prisma), cloudinary.js, seed.js
│   │   ├── controllers/  ← authController.js, tourController.js
│   │   ├── middleware/   ← authMiddleware.js (JWT + role guard)
│   │   ├── routes/       ← authRoutes, tourRoutes, userRoutes
│   │   └── server.js
│   └── package.json
│
└── frontend/             ← React app (no changes needed)
    └── src/...
```

---

## ☁️ SERVICE SETUP (All Free)

### 1️⃣ Supabase — Free PostgreSQL Database

1. Go to **[supabase.com](https://supabase.com)** → Click **"Start your project"**
2. Sign up with GitHub (fastest)
3. Click **"New project"**
4. Fill in:
   - **Organization:** your org (create one if first time)
   - **Project name:** `tour-app`
   - **Database Password:** Create a strong password and **save it!**
   - **Region:** Choose closest to you (e.g., Southeast Asia → Singapore)
5. Click **"Create new project"** → Wait ~2 minutes for it to spin up

**Get your connection strings:**
1. In your project, go to **Settings** (gear icon, left sidebar)
2. Click **"Database"**
3. Scroll down to **"Connection string"**
4. You need **two** strings:

   **DATABASE_URL** (Pooler - for runtime):
   - Select tab **"Transaction"** under Connection Pooling
   - Copy the URI — it looks like:
     ```
     postgresql://postgres.abcdef:[YOUR-PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
     ```
   - Add `?pgbouncer=true` at the end

   **DIRECT_URL** (Direct - for migrations):
   - Select tab **"Session"** or scroll to "Direct connection"
   - Copy the URI — it looks like:
     ```
     postgresql://postgres.abcdef:[YOUR-PASSWORD]@db.abcdef.supabase.co:5432/postgres
     ```

> 💡 **Replace `[YOUR-PASSWORD]`** with the database password you saved in step 4.

---

### 2️⃣ Cloudinary — Free Image Storage

1. Go to **[cloudinary.com](https://cloudinary.com)** → **"Sign up for free"**
2. Complete registration (no credit card needed)
3. On your dashboard, find and copy:
   - **Cloud Name** (e.g., `dxyz12345`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "reveal" to see it)

---

## 🖥️ LOCAL DEVELOPMENT

### Step 1 — Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 2 — Configure environment

```bash
cd backend
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Supabase
DATABASE_URL="postgresql://postgres.XXXX:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.XXXX:[PASSWORD]@db.XXXX.supabase.co:5432/postgres"

# JWT
JWT_SECRET=some_long_random_string_here_make_it_complex

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CORS
FRONTEND_URL=http://localhost:5173
```

### Step 3 — Setup database & run backend

```bash
cd backend

# Push schema to Supabase (creates tables automatically)
npx prisma db push

# Seed with admin, sample user, and 6 tours
npm run seed

# Start development server
npm run dev
```

You should see:
```
✅ Supabase (PostgreSQL) connected
🚀 Server running on port 5000
```

### Step 4 — Run frontend

```bash
cd frontend
# .env already has: VITE_API_URL=http://localhost:5000/api
npm run dev
```

Visit: **http://localhost:5173**

**Test accounts:**
| Role  | Email              | Password     |
|-------|--------------------|--------------|
| Admin | admin@tourapp.com | Admin@123456 |
| User  | user@tourapp.com  | User@123456  |

---

## 🚀 PRODUCTION DEPLOYMENT

### Deploy Backend → Render (Free)

1. Push to **GitHub** (create a repo, push everything)
2. Go to **[render.com](https://render.com)** → **"New Web Service"**
3. Connect your GitHub repo
4. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install && npx prisma generate && npx prisma db push`
   - **Start Command:** `npm start`
   - **Plan:** Free
5. Add **Environment Variables:**
   ```
   NODE_ENV=production
   DATABASE_URL=<your Supabase pooler URL>
   DIRECT_URL=<your Supabase direct URL>
   JWT_SECRET=<your secret>
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=<your name>
   CLOUDINARY_API_KEY=<your key>
   CLOUDINARY_API_SECRET=<your secret>
   FRONTEND_URL=https://your-app.vercel.app
   ```
6. Click **"Create Web Service"**
7. API URL: `https://tour-app-api-xxxx.onrender.com`

**After first deploy, seed production database:**
```bash
cd backend
# Temporarily point to production DB in .env, then:
npm run seed
# Then restore local .env
```

OR set a `SEED_ON_START=true` env var in Render and handle it in server.js.

---

### Deploy Frontend → Vercel (Free)

1. Go to **[vercel.com](https://vercel.com)** → **"New Project"**
2. Import from GitHub → select frontend directory
3. Settings:
   - **Framework:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output:** `dist`
4. Environment variable:
   ```
   VITE_API_URL=https://tour-app-api-xxxx.onrender.com/api
   ```
5. Deploy → Your site: `https://wanderlux-xxx.vercel.app`

---

### Update CORS after deployment

In Render, update `FRONTEND_URL` to your Vercel URL:
```
FRONTEND_URL=https://wanderlux-xxx.vercel.app
```

Then trigger a redeploy on Render.

---

## 🔑 API Endpoints

| Method | Route | Access |
|--------|-------|--------|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Private |
| GET | `/api/tours` | Public |
| GET | `/api/tours/featured` | Public |
| GET | `/api/tours/:id` | Public |
| POST | `/api/tours` | Admin |
| PUT | `/api/tours/:id` | Admin |
| DELETE | `/api/tours/:id` | Admin |
| GET | `/api/users` | Admin |
| DELETE | `/api/users/:id` | Admin |
| GET | `/api/health` | Public |

---

## 🛠️ Useful Commands

```bash
# View & edit database visually (local)
cd backend && npx prisma studio

# Reset database and re-seed
cd backend && npx prisma db push --force-reset && npm run seed

# Check Supabase DB from your project
# Supabase Dashboard → Table Editor → See all tables
```

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |
| Backend | Node.js + Express 4 |
| ORM | Prisma 5 |
| Database | PostgreSQL via Supabase (free) |
| Auth | JWT + Bcrypt |
| Images | Cloudinary (free) |
| Deployment (FE) | Vercel (free) |
| Deployment (BE) | Render (free) |
