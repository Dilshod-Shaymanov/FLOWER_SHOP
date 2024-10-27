const db = require("../config/db");


const getOrder_details = (req, res) => {
  db.query("SELECT * FROM order_details", (error, results) => {
    if (error) {
      console.log("Error selecting order_details");
      return res.status(500).json({
        statusCode: 500,
        message: "Error selecting order_details",
        error: "Internal Server Error",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Order_details fetched successfully",
      data: results,
    });
  });
};


const addOrder_details = (req, res) => {
  const { order_id, flower_id, quantity } = req.body;
  db.query(
    "INSERT INTO order_details(order_id, flower_id, quantity)\
        VALUES(?, ?, ?)",
    [order_id, flower_id, quantity],
    (error, results) => {
      if (error) {
        console.log("Error adding order_details");
        return res.status(500).json({
          statusCode: 500,
          message: "Error adding order_details",
          error: "Internal Server Error",
        });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Order_details added successfully",
      });
    }
  );
};


const getOrder_detailsById = (req, res) => {
  const order_detailsId = req.params.id;
  db.query(
    "SELECT * FROM order_details WHERE id = ?",
    [order_detailsId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error fetching order_details",
          error: "Internal Server Error",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order_details not found",
          error: "Not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order_details fetched successfully",
        data: result[0],
      });
    }
  );
};


const deleteOrder_detailsById = (req, res) => {
  const order_detailsId = req.params.id;
  db.query(
    "SELECT * FROM order_details WHERE id = ?",
    [order_detailsId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order_details not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "DELETE FROM order_details WHERE id = ?",
    [order_detailsId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error deleting order_details",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order_details deleted successfully",
      });
    }
  );
};


const updateOrder_detailsById = (req, res) => {
  const order_detailsId = req.params.id;
  const { order_id, flower_id, quantity } = req.body;

  db.query(
    "SELECT * FROM order_details WHERE id = ?",
    [order_detailsId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Order_details not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "UPDATE order_details SET order_id = ?, flower_id = ?, quantity = ?\
        WHERE id =?",
    [order_id, flower_id, quantity, order_detailsId],
    (error, result) => {
      if (error) {
        console.log(result);
        console.log(error);
        return res.status(500).json({
          statusCode: 500,
          message: "Error updating order_details",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Order_details updated successfully",
      });
    }
  );
};

const addDeatils = (req, res)=> {
  const { order_id, flower_id, quantity } = req.body;
  db.query(
    "SELECT id, price FROM flowers WHERE id=?",
    [flower_id],
    (error, flower_results) => {
      if (error) {
        console.log("Error selecting flower by ID:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      if (flower_results.length == 0) {
        return res.status(404).json({ message: "Flower not found" });
      } else {
        db.query(
          "INSERT INTO order_details (order_id, flower_id, quantity ) VALUES (?, ?, ?)",
          [order_id, flower_id, quantity],
          (error, orders_details_results) => {
            if (error) {
              console.log("Error adding new order details:", error);
              return res.status(500).json({
                message: "Error adding new order details",
                error: "Internal Server Error",
              });
            }
            let total_price = 0;
            db.query(
              "SELECT total_price FROM orders WHERE id=?",
              [order_id],
              (error, orders_results) => {
                if (error) {
                  console.log("Error selecting order by ID:", error);
                  return res
                    .status(500)
                    .json({ error: "Internal Server Error" });
                }
                if (orders_results.length == 0) {
                  return res.status(404).json({ message: "Order not found" });
                }
                total_price += Number(orders_results[0].total_price);
                total_price += Number(flower_results[0].price) * quantity;

                db.query(
                  "UPDATE orders set total_price=? where id=?",
                  [total_price, order_id],
                  (error) => {
                    if (error) {
                      console.log("Error adding new order details:", error);
                      return res.status(500).json({
                        message: "Error adding new order details",
                        error: "Internal Server Error",
                      });
                    }
                    res.status(201).json({
                      message: "New order details added and order updated",
                      orderID: orders_details_results.insertId,
                    });
                  }
                );
              }
            );
          }
        );
      }
    }
  );
}

module.exports = {
    getOrder_details,
    addOrder_details,
    getOrder_detailsById,
    deleteOrder_detailsById,
    updateOrder_detailsById,
    addDeatils,
}