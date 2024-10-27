const db = require("../config/db");

const getFlowers = (req, res) => {
  db.query("SELECT * FROM flowers", (error, results) => {
    if (error) {
      console.log("Error selecting flowers");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json(results);
  });
};

const addFlower = (req, res) => {
  const { name, color, price, flower_type, photo, import_from } = req.body;
  db.query(
    "INSERT INTO flowers (name,color,price,flower_type,photo,import_from)\
    VAlUES (?, ?, ?, ?, ?, ?)",
    [name, color, price, flower_type, photo, import_from],
    (error, results) => {
      if (error) {
        console.log("Error adding new flower", error);
        return res.status(500).json({
          message: "Error adding new flower",
          error: "Internal Server Error",
        });
      }

      console.log("Successfully added new flower");
      res.status(201).json({
        message: "New flower added",
        flowerId: results.insertId,
      });
    }
  );
};

const getFlowerById = (req, res) => {
  const flowerId = req.params.id;
  // console.log(flowerId);
  db.query(
    "SELECT * FROM flowers WHERE id = ?",
    [flowerId],
    (error, results) => {
      if (error) {
        console.log("Error selecting flower By ID");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length == 0) {
        return res.status(404).json({ message: "Flower not found" });
      }
      res.json(results[0]);
    }
  );
};

const deleteFlowerById = (req, res) => {
  const flowerId = req.params.id;
  db.query("DELETE FROM flowers WHERE id = ?", [flowerId], (error, results) => {
    if (error) {
      console.log("Error deleting flower By ID");
      return res.status(500).json({ error: "Internal Server Error" });
    }

    res.json({ message: "Flower deleted successfully" });
  });
};

const updateFlowerById = (req, res) => {
  const flowerId = req.params.id;

  db.query(
    "SELECT * FROM flowers WHERE id = ?",
    [flowerId],
    (error, results) => {
      if (results.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Flower not found",
          error: "Not Found",
        });
      }
    }
  );

  const { name, color, price, flower_type, photo, import_from } = req.body;
  db.query(
    "UPDATE flowers SET name = ?, color = ?, price = ?, flower_type = ?, photo = ?, import_from = ?\
        WHERE id = ?",
    [name, color, price, flower_type, photo, import_from, flowerId],
    (error, result) => {
      if (error) {
        console.log("Error executing query: ", error);
        res.status(400).send({
          statusCode: 400,
          message: "Invalid request parameters",
          error: "Error updating user",
        });
        return;
      }
      res.status(200).send({
        statusCode: 200,
        message: "Flower updated successfully",
      });
    }
  );
};

const findFlowerByName = (req, res) => {
  const flowerName = req.params.name;
  db.query(
    "SELECT * FROM flowers WHERE name = ?",
    [flowerName],
    (error, result) => {
      if (error) {
        return res.status(404).json({
          statusCode: 404,
          message: "Flower not found",
          error: "Not found",
        });
      }

      res.status(200).send({
        statusCode: 200,
        message: "Flower fetched successfully",
        data: result[0],
      });
    }
  );
};

const findFlowerByNameBody = (req, res) => {
  const { name } = req.body;
  db.query("SELECT * FROM flowers WHERE name =?", [name], (error, result) => {
    if (error) {
      return res.status(404).json({
        statusCode: 404,
        message: "Flower not found",
        error: "Not found",
      });
    }
    res.status(200).send({
      statusCode: 200,
      message: "Flower fetched successfully",
      data: result[0],
    });
  });
};

const findFlowerByNameQuery = (req, res) => {
  const { name } = req.query;
  // console.log(name);
  db.query("SELECT * FROM flowers WHERE name=?", [name], (error, result) => {
    if (error) {
      return res.status(404).json({
        statusCode: 404,
        message: "Flower not found",
        error: "Not found",
      });
    }

    res.status(200).json({
      statusCode: 200,
      message: "Flower fetched successfully",
      data: result[0],
    });
  });
};

const findFlowerByData = (req, res) => {
  const { name, color, start_price, finish_price } = req.body;
  let where = "";
  if (name) {
    where += ` name like '%${name}%'`;
  }

  if (color) {
    if (where) {
      where += `and color like'${color}'`;
    } else {
      where += ` color like '${color}'`;
    }
  }

  if (start_price && finish_price) {
    if (where) {
      where += `and price between ${start_price} and ${finish_price}`;
    } else {
      where += ` price between ${start_price} and ${finish_price}`;
    }
  } else {
    if (where) {
      where += `and price = ${start_price}`;
    } else {
      where += ` price = ${start_price}`;
    }
  }

  if (where) {
    // console.log(where);
    db.query(`SELECT * FROM flowers where ${where}`, (error, result) => {
      // console.log(22);
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          error: "Error fetching flower",
        });
      }
      // console.log(33);
      if (result.length == 0) {
        return res.status(404).json({
          statusCode: 404,
          message: "Flower not found",
          error: "Not found",
        });
      }
      res.status(200).json({
        statusCode: 200,
        message: "Flowers fetched successfully",
        data: result,
      });
    });
  } else {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid request parameters",
      error: "No search parameters provided",
    });
  }
};

//Task 1
const findFlowerByCustomer = (req, res) => {
  const { first_name, last_name, first_date, last_date } = req.body;
  db.query(
    `SELECT DISTINCT f.name FROM flowers f\
      LEFT JOIN order_details od ON f.id = od.flower_id\
      LEFT JOIN orders o ON od.order_id = o.id\
      LEFT JOIN customers c ON o.customer_id = c.id\
      WHERE c.first_name = "${first_name}" and c.last_name = "${last_name}"\ 
      and o.order_date BETWEEN '${first_date}' AND '${last_date}'`,
    (error, result) => {
      if (error) {
        return res.status(500).json({
          statusCode: 500,
          message: "Error fetching flowers",
          error: "Internal Server Error",
        });
      }

      res.status(200).json({
        statusCode: 200,
        message: "Flowers fetched successfully",
        data: result,
      });
    }
  );
};

module.exports = {
  getFlowers,
  addFlower,
  getFlowerById,
  deleteFlowerById,
  updateFlowerById,
  findFlowerByName,
  findFlowerByNameBody,
  findFlowerByNameQuery,
  findFlowerByData,
  findFlowerByCustomer,
};
