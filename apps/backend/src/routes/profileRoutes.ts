import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { updateProfileController, uploadProfilePhotoController, deleteProfilePhotoController } from '../controllers/profileController';

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

// Atualiza dados do perfil
router.put('/profile', authenticateJWT, updateProfileController);
// Upload de foto de perfil
router.post('/profile/photo', authenticateJWT, upload.single('fotoPerfil'), uploadProfilePhotoController);
// Apaga foto de perfil
router.delete('/profile/photo', authenticateJWT, deleteProfilePhotoController);

export default router;
