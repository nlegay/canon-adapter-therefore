const fetch = require("node-fetch");
const logger = require("./logger");
require("dotenv").config();

async function sendRequest(name) {
  logger.info("getCustomersByName - sendRequest - name: " + name);
  const body = {
    Query: {
      CaseDefinitionNo: 1,
      Conditions: [
        {
          Condition: `${name}`,
          FieldNoOrName: "Raison_Sociale",
        },
      ],
      SelectedFieldsNoOrNames: ["Raison_Sociale"],
    },
  };

  var options = {
    method: "post",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.WS_USER}:${process.env.WS_PASSWORD}`
        ).toString("base64"),
      "Content-Type": "application/json",
      TenantName: "CFR-BIS",
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(process.env.URL_BDD, options);
    logger.info("getCustomersByName - Status Code: " + response.status);

    const resp = await response.json();
    const customers = resp.QueryResult?.ResultRows?.map(
      (contrat) => contrat.IndexValues[0]
    );

    // remove duplicate entry
    return { raisonSociale: [...new Set(customers)] };
  } catch (err) {
    logger.error(err.message);
  }
}

async function getCustomersByName(name) {
  const customerUnique = await sendRequest(`${name}`);
  logger.info(
    "getCustomersByName - customerUnique: " + JSON.stringify(customerUnique)
  );

  if (customerUnique?.raisonSociale?.length > 0) {
    return customerUnique;
  } else {
    return await sendRequest(`*${name}*`);
  }
}

module.exports = getCustomersByName;
