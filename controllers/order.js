const db = require("../config/db");

const getOrders = (req, res) => {
  db.query("SELECT * FROM orders", (error, results) => {
    if (error) {
      console.log("Error selecting orders");
      return res.status(500).json({
        statusCode: 500,
        message: "Error selecting orders",
        error: "Internal Server Error",
      });
    }
    console.log(results)

    res.status(200).json({
      statusCode: 200,
      message: "Orders fetched successfully",
      data: results,
    });
  });
};


const addOrder = (req, res) => {
  const { customer_id, total_price, order_date, status_id } = req.body;
  db.query(
    "INSERT INTO orders(customer_id, total_price, order_date, status_id)\
        VALUES(?, ?, ?, ?)",
    [customer_id, total_price, order_date, status_id],
    (error, results) => {
      if (error) {
        console.log("Error adding order");
        return res.status(500).json({
          statusCode: 500,
          message: "Error adding order",
          error: "Internal Server Error",
        });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Order added successfully",
      });
    }
  );
};


const getOrdersById = (req, res) => {
  const orderId = req.params.id;
  db.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error fetching order",
          error: "Internal Server Error",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
          error: "Not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order fetched successfully",
        data: result[0],
      });
    }
  );
};


const deleteOrderById = (req, res) => {
  const orderId = req.params.id;
  db.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "DELETE FROM orders WHERE id = ?",
    [orderId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error deleting order",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order deleted successfully",
      });
    }
  );
};


const updateOrderById = (req, res) => {
  const orderId = req.params.id;
  const { customer_id, total_price, order_date, status_id } = req.body;


  db.query(
    "SELECT * FROM orders WHERE id = ?",
    [orderId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "UPDATE orders SET customer_id=?, total_price=?, order_date=?, status_id=?\
        WHERE id =?",
    [customer_id, total_price, order_date, status_id, orderId],
    (error, result) => {
        console.log(error);
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error updating order",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order updated successfully",
      });
    }
  );
};


module.exports = {
    getOrders,
    addOrder,
    getOrdersById,
    deleteOrderById,
    updateOrderById,
}