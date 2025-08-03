import express from 'express';
import cors from 'cors';
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
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
const PORT = process.env.PORT || 3000;

app.use(express.json());

setupSwagger(app);

app.get('/', (req, res) => {
  res.send('BoraFIT backend rodando!');
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/diets', dietRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/friend-invite', friendInviteRoutes);
app.use('/api/monthly-reset', monthlyResetRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
