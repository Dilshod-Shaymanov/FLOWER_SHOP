const db = require('../config/db');

const getCustomers = (req, res)=>{
    db.query("SELECT * FROM customers", (error, results)=>{
        if(error){
            console.log("Error selecting customers");
            return res.status(500).json({
                statusCode: 500,
                message: "Error selecting customers",
                error:"Internal Server Error"
            })
        }

        res.json({
            statusCode: 200,
            message: "Customers fetched successfully",
            data: results
        })
    })
}

const addCustomer = (req, res) => {
    const { first_name, last_name, phone, email, address } = req.body;
    db.query(
        "INSERT INTO customers(first_name, last_name, phone, email, address)\
        VALUES(?, ?, ?, ?, ?)",
        [first_name, last_name, phone, email, address],
        (error, results) => {
            if(error) {
                console.log("Error adding customer");
                return res.status(500).json({
                    statusCode: 500,
                    message: "Error adding customer",
                    error:"Internal Server Error"
                })
            }

            res.status(201).json({
                statusCode: 201,
                message: "Customer added successfully",
            })
        }
    )
}

const getCustomerById = (req, res) => {
    const customerId = req.params.id
    console.log(customerId);
    db.query(
        "SELECT * FROM customers WHERE id = ?", [customerId],
        (error, result) => {
            if(error) {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Error fetching customer",
                    error:"Internal Server Error"
                })
            }

            if(result.length == 0){
                return res.status(404).json({
                    statusCode: 404,
                    message: "Customer not found",
                    error:"Not found"
                })
            }

            res.status(200).json({
                statusCode: 200,
                message: "Customer fetched successfully",
                data: result[0]
            })
        }
    )
}

const deleteCustomerById = (req, res) =>{
    const customerId = req.params.id
    db.query(
        "SELECT * FROM customers WHERE id = ?",[customerId],
        (error, result) => {
            if(result.length == 0) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Customer not found",
                    error:"Not found"
                })
            }
        }
    )

    db.query(
        "DELETE FROM customers WHERE id = ?",[customerId],
        (error, result) => {
            if(error) {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Error deleting customer",
                    error:"Internal Server Error"
                })
            }

            res.status(200).json({
                statusCode: 200,
                message: "Customer deleted successfully",
            })
        }
    )
}

const updateCustomerById = (req, res) => {
    const customerId = req.params.id;
    const { first_name, last_name, phone, email, address } = req.body;

    db.query(
      "SELECT * FROM customers WHERE id = ?",
      [customerId],
      (error, result) => {
        if (result.length == 0) {
          return res.status(404).json({
            statusCode: 404,
            message: "Customer not found",
            error: "Not found",
          });
        }
      }
    );

    db.query(
        "UPDATE customers SET first_name = ?, last_name = ?, phone = ?, email = ?, address = ?\
        WHERE id =?",
        [first_name, last_name, phone, email, address, customerId],
        (error, result) => {
            if(error) {
                return res.status(500).json({
                    statusCode: 500,
                    message: "Error updating customer",
                    error:"Internal Server Error"
                })
            }

            res.status(200).json({
                statusCode: 200,
                message: "Customer updated successfully",
            })
        }
    )
}

const getCustomerByBuyTime = (req, res)=>{
    const {start_time, end_time, flower} = req.body
    console.log(start_time, end_time, flower);
    db.query(
        `SELECT DISTINCT c.first_name, c.last_name FROM customers c\
        LEFT JOIN orders o ON c.id = o.customer_id\
        Left JOIN order_details od ON o.id = od.order_id\
        LEFT JOIN flowers f ON od.flower_id = f.id\
        WHERE o.order_date BETWEEN '${start_time}' AND '${end_time}' AND f.name like "%${flower}%"`,
        (error, result)=>{
            if(error){
                console.log("Error selecting customers by buy time");
                return res.status(500).json({
                    statusCode: 500,
                    message: "Error selecting customers by buy time",
                    error:"Internal Server Error"
                })
            }
            console.log(result);
            res.status(200).json({
                statusCode: 200,
                message: "Customers fetched successfully by buy time",
                data: result
            })
        }
    )
}

//Task 2

const findCustomerByData = (req, res)=>{
    const { first_name, last_name, phone, email } = req.body;
    let where = ""
    if(first_name){
        where += ` first_name LIKE '%${first_name}%'`
    }
    if(last_name){
        if(where){
            where += ` AND last_name LIKE '%${last_name}%'`
        }else{
            where += `last_name LIKE '%${last_name}%'`
        }
    }
    if(phone){
        if(where){
            where += `AND phone LIKE '%${phone}%'`
        } else{
            where += `phone LIKE '%${phone}%'`
        }
    }
    if(email){
        if(where){
            where += `AND email LIKE '%${email}%'`
        } else{
            where += `email LIKE '%${email}%'`
        }
    }

    if(where){
        console.log(where);
        db.query(
            `SELECT * FROM customers WHERE ${where}`,
            (error, result)=>{
                if(error){
                    // console.log(result);
                    console.log("Error selecting customers by data");
                    return res.status(500).json({
                        statusCode: 500,
                        message: "Error selecting customers by data",
                        error:"Internal Server Error"
                    })
                }
                res.status(200).json({
                    statusCode: 200,
                    message: "Customers fetched successfully by data",
                    data: result[0]
                })
            }
        )
    }else{
        res.status(400).json({
            statusCode: 400,
            error:"Bad Request",
            message: "Ubu narsa yoz xch bo'masa"
        })
    }
}

module.exports = {
    getCustomers,
    addCustomer,
    getCustomerById,
    deleteCustomerById,
    updateCustomerById,
    getCustomerByBuyTime,
    findCustomerByData
}