// Example order data (replace with your actual database queries)
const orders = [
    { id: 1, item: 'Item 1', quantity: 2 },
    { id: 2, item: 'Item 2', quantity: 5 },
  ];
  
  // Controller to get all orders
  const getAllOrders = (req, res) => {
    res.json(orders);
  };
  
  // Controller to get a specific order by ID
  const getOrderById = (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  };
  
  // Controller to create a new order
  const createOrder = (req, res) => {
    const newOrder = {
      id: orders.length + 1,
      item: req.body.item,
      quantity: req.body.quantity,
    };
    orders.push(newOrder);
    res.status(201).json(newOrder);
  };
  
  // Controller to update an order
  const updateOrder = (req, res) => {
    const order = orders.find((o) => o.id === parseInt(req.params.id));
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.item = req.body.item || order.item;
    order.quantity = req.body.quantity || order.quantity;
    res.json(order);
  };
  
  // Controller to delete an order
  const deleteOrder = (req, res) => {
    const orderIndex = orders.findIndex((o) => o.id === parseInt(req.params.id));
    if (orderIndex === -1) {
      return res.status(404).json({ message: 'Order not found' });
    }
    orders.splice(orderIndex, 1);
    res.status(204).end();
  };
  
  module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
  };
  