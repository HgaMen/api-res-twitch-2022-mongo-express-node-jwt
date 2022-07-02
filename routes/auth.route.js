import { Router } from 'express';
import {
  infoUser,
  login,
  register,
  refreshToken,
  logout,
} from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import { validationResultExpress } from '../middlewares/validationResultExpress.js';
import { requiereToken } from '../middlewares/requiereToken.js';

const router = Router();

router.post(
  '/register',
  [
    body('email', 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Mínimo 6 carácteres').trim().isLength({ min: 6 }),
    body('password', 'Formato de password incorrecto').custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error('No coinciden las contraseñas');
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  '/login',
  [
    body('email', 'Formato de email incorrecto')
      .trim()
      .isEmail()
      .normalizeEmail(),
    body('password', 'Mínimo 6 carácteres').trim().isLength({ min: 6 }),
  ],
  validationResultExpress,
  login
);

router.get('/protected', requiereToken, infoUser);
router.get('/refresh', refreshToken);
router.get('/logout', logout);

export default router;
