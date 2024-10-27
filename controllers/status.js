const db = require('../config/db')

const getStatus = (req, res) => {
  db.query("SELECT * FROM status", (error, results) => {
    if (error) {
      console.log("Error selecting status");
      return res.status(500).json({
        statusCode: 500,
        message: "Error selecting status",
        error: "Internal Server Error",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Status fetched successfully",
      data: results,
    });
  });
};


const addStatus = (req, res) => {
  const { name } = req.body;
  db.query(
    "INSERT INTO status(name)\
        VALUES(?)",
    [name],
    (error, results) => {
      if (error) {
        console.log("Error adding customer");
        return res.status(500).json({
          statusCode: 500,
          message: "Error adding status",
          error: "Internal Server Error",
        });
      }

      res.status(201).json({
        statusCode: 201,
        message: "Status added successfully",
      });
    }
  );
};


const getStatusById = (req, res) => {
  const statusId = req.params.id;
  console.log(statusId);
  db.query(
    "SELECT * FROM status WHERE id = ?",
    [statusId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error fetching status",
          error: "Internal Server Error",
        });
      }

      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Status not found",
          error: "Not found",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Status fetched successfully",
        data: result[0],
      });
    }
  );
};


const deleteStatusById = (req, res) => {
  const statusId = req.params.id;
  db.query(
    "SELECT * FROM status WHERE id = ?",
    [statusId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Status not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "DELETE FROM status WHERE id = ?",
    [statusId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error deleting status",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Status deleted successfully",
      });
    }
  );
};


const updateStatusById = (req, res) => {
  const statusId = req.params.id;
  const { name } = req.body;

  db.query(
    "SELECT * FROM status WHERE id = ?",
    [statusId],
    (error, result) => {
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Status not found",
          error: "Not found",
        });
      }
    }
  );

  db.query(
    "UPDATE status SET name = ?\
        WHERE id =?",
    [name,statusId],
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error updating status",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Status updated successfully",
      });
    }
  );
};

module.exports = {
  getStatus,
  addStatus,
  getStatusById,
  deleteStatusById,
  updateStatusById
};