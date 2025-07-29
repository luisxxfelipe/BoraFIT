import express from 'express';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import workoutRoutes from './routes/workoutRoutes';
import dietRoutes from './routes/dietRoutes';
import rankingRoutes from './routes/rankingRoutes';
import friendRoutes from './routes/friendRoutes';
import friendInviteRoutes from './routes/friendInviteRoutes';
import monthlyResetRoutes from './routes/monthlyResetRoutes';
import { setupSwagger } from './swagger';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para JSON
app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

// Rota de teste
app.get('/', (req, res) => {
  res.send('BoraFIT backend rodando!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/friends', friendRoutes);

app.use('/api/friends', friendInviteRoutes);

app.use('/api/utils', monthlyResetRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
