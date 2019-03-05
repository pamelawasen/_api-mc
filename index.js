const express = require("express");
const bodyParser = require("body-parser");

const cors = require('cors')


const app = express();
const port = process.env.PORT || 3000;;

app.use(bodyParser.json()); //aceita enviar requests para API em JSON
app.use(bodyParser.urlencoded({ extended : true })); //entende quando passo parametro via url
app.use(cors())


require('./src/app/routes/client')(app);
require('./src/app/routes/provider')(app);
require('./src/app/routes/product')(app);
require('./src/app/routes/admin')(app);
require('./src/app/routes/login')(app);
require('./src/app/routes/schedule')(app);
require('./src/app/routes/priceList')(app);
require('./src/app/routes/budget')(app);
require('./src/app/routes/paymentForm')(app);
require('./src/app/routes/order')(app);


app.listen(port, (err) => {
   err ? console.error(`Err ${err}`) : console.log(`Server listening on port ${port}`)
})

module.exports = app;
