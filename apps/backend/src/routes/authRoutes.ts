import { Router } from 'express';
import { loginController } from '../controllers/loginController';
import { registerController } from '../controllers/registerController';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = Router();
const uploadDir = path.resolve(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage });

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', loginController);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Cadastro de novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               altura:
 *                 type: number
 *               peso:
 *                 type: number
 *               objetivo:
 *                 type: string
 *               diasSemana:
 *                 type: number
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário cadastrado
 *       400:
 *         description: Email já cadastrado
 *       500:
 *         description: Erro interno
 */
router.post('/register', upload.single('fotoPerfil'), registerController);

export default router;
