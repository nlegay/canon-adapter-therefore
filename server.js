const express = require("express");
const app = express();
require('dotenv').config();

const getContractById = require('./utils/getContract');
//const port = require('./env').config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/contract', async (req, res) => {
    console.log(`Num Contrat: ${req.query.contractId}`);
    if ( req.query.contractId ) {
        const json = await getContractById(req.query.contractId);
        res.status(200).json(json);
    } else {
        res.sendStatus(404);
    }
});

app.listen(process.env.PORT, () => {
  console.log('Server started at http://localhost:' + process.env.PORT);
})