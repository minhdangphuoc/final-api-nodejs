const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const Product = require('../models/product');
const Payment = require('../models/payment');

router.get('/products', async (req, res) => {
try {
    const products = await Product.findAll({
        where: req.query,
    });
    res.json(products);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.post('/products', async (req, res) => {
try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

router.put('/products/:id', async (req, res) => {
const productId = req.params.id;
try {
    const [updatedRows] = await Product.update(req.body, {
    where: { id: productId },
    });
    if (updatedRows > 0) {
    res.json({ message: 'Product updated successfully' });
    } else {
    res.status(404).json({ error: 'Product not found' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
});

// GET payments with associated product information
router.get('/payments', async (req, res) => {
    try {
      const payments = await Payment.findAll({
        where: req.query,
      });
      res.json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // POST a new payment
  router.post('/payments', async (req, res) => {
    try {
      const newPayment = await Payment.create(req.body);
      res.status(201).json(newPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // PUT (update) payment information
  router.put('/payments/:id', async (req, res) => {
    const paymentId = req.params.id;
    try {
      const [updatedRows] = await Payment.update(req.body, {
        where: { id: paymentId },
      });
      if (updatedRows > 0) {
        res.json({ message: 'Payment updated successfully' });
      } else {
        res.status(404).json({ error: 'Payment not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;