const Product = require('./product');
const Payment = require('./payment');

Product.hasMany(Payment);
Payment.belongsTo(Product);

module.exports = {
  Product,
  Payment,
};