import mongoose from 'mongoose';

try {
  mongoose.connect(process.env.URI_MONGO);
  console.log('Connect DB ok 👏');
} catch (error) {
  console.log('Error de conexión a mongodb: ' + error);
}
