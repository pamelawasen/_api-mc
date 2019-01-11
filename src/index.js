const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = process.env.PORT || 3000;;

app.use(bodyParser.json()); //aceita enviar requests para API em JSON
app.use(bodyParser.urlencoded({ extended : true })); //entende quando passo parametro via url


require('./app/routes/client')(app);
require('./app/routes/provider')(app);
require('./app/routes/product')(app);


app.listen(port, (err) => {
   err ? console.error(`Err ${err}`) : console.log(` Server listening on port ${port}`)
})

module.exports = app;
