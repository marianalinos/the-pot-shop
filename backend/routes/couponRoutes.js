import express from 'express';
import * as couponController from '../controllers/couponController.js';

const router = express.Router();

router.get('/', couponController.getCoupons);
router.get('/:id', couponController.getCoupon);
router.post('/', couponController.createCoupon);
router.put('/:id', couponController.updateCoupon);
router.delete('/:id', couponController.deleteCoupon);
router.post('/validate', couponController.validateCoupon);

export default router;