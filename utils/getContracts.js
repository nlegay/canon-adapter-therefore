const fetch = require("node-fetch");
const logger = require("./logger");
require("dotenv").config();

exports.getContractsById = async (contractId) => {
  const body = {
    Query: {
      CaseDefinitionNo: 1,
      Conditions: [
        {
          Condition: contractId,
          FieldNoOrName: "No_Contrat_CSS",
        },
      ],
    },
  };
  return await getContracts(body);
};

exports.getContractsByProductAndCustomer = async (product, customer) => {
  const body = {
    Query: {
      CaseDefinitionNo: 1,
      Conditions: [
        {
          Condition: `${product}`,
          FieldNoOrName: "Solution",
        },
        {
          Condition: `${customer}`,
          FieldNoOrName: "Raison_Sociale",
        },
      ],
    },
  };

  const contractWithCustomerUnique = await getContracts(body);
  if (contractWithCustomerUnique.contracts.length > 0) {
    logger.info(
      "getContractsByProductAndCustomer - Find unique customer: " +
        contractWithCustomerUnique.contracts[0]["Raison Sociale"]
    );
    return contractWithCustomerUnique;
  } else {
    body.Query.Conditions[1].Condition = `*${customer}*`;
    console.log(JSON.stringify(body));
    return await getContracts(body);
  }
};

exports.getContractsByCustomer = async (customer) => {
  const body = {
    Query: {
      CaseDefinitionNo: 1,
      Conditions: [
        {
          Condition: `${customer}`,
          FieldNoOrName: "Raison_Sociale",
        },
      ],
    },
  };

  const contractWithCustomerUnique = await getContracts(body);
  if (contractWithCustomerUnique.contracts.length > 0) {
    logger.info(
      "getContractsByCustomer - Find unique customer: " +
        contractWithCustomerUnique.contracts[0]["Raison Sociale"]
    );
    return contractWithCustomerUnique;
  } else {
    body.Query.Conditions[0].Condition = `*${customer}*`;
    return await getContracts(body);
  }
};

async function getContracts(body) {
  var options = {
    method: "post",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.WS_USER}:${process.env.WS_PASSWORD}`,
          "binary"
        ).toString("base64"),
      "Content-Type": "application/json",
      TenantName: "CFR-BIS",
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(process.env.URL_BDD, options);
    logger.info("Status Code: " + response.status);

    const data = await response.json();

    const contracts = data.QueryResult.ResultRows.map(
      (contrat) => contrat.IndexValues
    );
    const fields = data.QueryResult.Columns.map((column) => column.Caption);

    return {
      contracts: contracts.map((c) =>
        Object.assign(...fields.map((f, i) => ({ [f]: c[i] })))
      ),
    };
  } catch (err) {
    logger.error(err.message);
  }
}
