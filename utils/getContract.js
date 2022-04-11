const fetch = require('node-fetch');
require('dotenv').config();

async function getContractById(contractId) {
    const body = {
        "Query": {
            "CaseDefinitionNo":1,
            "Conditions":[
                {
                    "Condition": contractId,
                    "FieldNoOrName": "No_Contrat_CSS"
                }
            ]
        }
    };
    var options = {
        method: 'post',
        headers: {
            'Authorization': 'Basic ' + Buffer.from(`${process.env.USER}:${process.env.PASSWORD}`, 'binary').toString('base64'),
            'Content-Type': 'application/json',
            'TenantName': 'CFR-BIS'
        },
        body: JSON.stringify(body)
    }
    try {
      const response = await fetch(process.env.URL_BDD, options);

      console.log('Status Code: ', response.status);

      const data = await response.json();

      const contracts = data.QueryResult.ResultRows.map( contrat => contrat.IndexValues );
      const fields = data.QueryResult.Columns.map( column => column.Caption );

      return contracts.map( c => Object.assign(...fields.map((f, i) => ({ [f]: c[i] }))) );
      
    } catch (err) {
      console.log(err.message);
    }
};

module.exports = getContractById;