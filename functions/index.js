const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');
const functions = require('firebase-functions');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const app = express();

// Configurar CORS para permitir orígenes específicos
const allowedOrigins = [];	
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Verificar si las variables de entorno están cargadas
console.log("FIREBASE_API_KEY:", process.env.FB_API_KEY);

app.use('/', contactRoutes);

// ❌ Eliminamos `app.listen(PORT, ...)`
// ✅ Firebase maneja automáticamente el servidor
exports.api = functions.https.onRequest(app);
