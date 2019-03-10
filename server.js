const express = require('express');
const app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
//app.use(express.urlencoded());

app.set("views", "views");
app.set("view engine", "ejs");

const port = process.env.PORT || 5000;
//If you don't do this then you can run into an error at heroku

app.use(express.static("public"));

app.post("/calculate", handleCalculate);

app.listen(port, function(){
  console.log(`The server is listening on: ${port}`);
});

function calculatePrice(packageWeight, packageType){
  let totalCost = 0.00;
  let pweight = Math.round(packageWeight);
  if (packageType == "stamped") {
    let cost = 0.55;
    totalCost = 1 * (((pweight - 1) * 0.15) + cost);
    console.log("stamped cost is: " + totalCost);
  } else if (packageType == "metered") {
    let cost = 0.50;
    totalCost = 1 * (((pweight - 1) * 0.15) + cost);
    console.log("metered cost is: " + totalCost);
  } else if (packageType == "flat") {
    let cost = 1.00;
    totalCost = 1 * (((pweight - 1) * 0.15) + cost);
    console.log("Flat cost is: " + totalCost);
  } else if (packageType == "package") {
      if(pweight <= 4){
        totalCost = 3.66;
      } else if (pweight > 4 && pweight <= 8) {
        totalCost = 4.39;
      } else if (pweight > 8 && pweight <= 12) {
        totalCost = 5.19;
      } else {
        totalCost = 5.71;
      }
      console.log("package cost is: " + totalCost);
  }
  var fixedTotalCost = totalCost.toFixed(2);
  return fixedTotalCost;

}

function handleCalculate(req, res) {
  console.log("calculating");
  const weight = req.body.weight;
  console.log("Mail weight is: " + weight);
  const type = req.body.type
  console.log("Package type is: " + type);
  const price = calculatePrice(weight, type);
  const params = {weight: weight, type: type, price: price };
  res.render("finalPrice", params);
}
