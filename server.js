const express = require("express");
const app = express();
const logger = require("./utils/logger");
require("dotenv").config();

const getContracts = require("./utils/getContracts");
const getCustomersByName = require("./utils/getCustomers");
//const port = require('./env').config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(async (req, res, next) => {
  if (req.header("x-api-key") === process.env.API_KEY) {
    next();
  } else {
    return res.sendStatus(401);
  }
});

// /contracts/{contractId}
app.get("/contracts/:contractId", async (req, res) => {
  logger.info(`contractId: ${req.params.contractId}`);
  if (req.params.contractId) {
    const json = await getContracts.getContractsById(req.params.contractId);
    res.status(200).json(json);
  } else {
    res.sendStatus(404);
  }
});

//    /contracts?product=<product>&customer=<customer>
// OR /contracts?customer=<customer>
app.get("/contracts", async (req, res) => {
  logger.info(`product name: ${req.query.product}`);
  logger.info(`customer name: ${req.query.customer}`);
  if (req.query.product && req.query.customer) {
    const json = await getContracts.getContractsByProductAndCustomer(
      req.query.product,
      req.query.customer
    );
    res.status(200).json(json);
  } else if (req.query.customer) {
    const json = await getContracts.getContractsByCustomer(req.query.customer);
    res.status(200).json(json);
  } else {
    res.sendStatus(404);
  }
});

// /customers?name=cabinet
app.get("/customers", async (req, res) => {
  logger.info(`customer name: ${req.query.name}`);
  if (req.query.name) {
    const json = await getCustomersByName(req.query.name);
    res.status(200).json(json);
  } else {
    res.sendStatus(404);
  }
});

app.listen(process.env.PORT, () => {
  logger.info("Server started at http://localhost:" + process.env.PORT);
});
