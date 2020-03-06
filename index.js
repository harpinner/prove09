const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.get('/', (req, res) => res.sendFile("index.html"));


let mailPrices = {};
mailPrices['stamped'] = {"1":0.55,"2":0.70,"3":0.85,"3.5":1,"4":1.6,"5":1.8,"6":2,"7":2.2,"8":2.4,"9":2.6,"10":2.8,"11":3,"12":3.2,"13":3.4};
mailPrices['metered'] = {"1":0.5,"2":0.65,"3":0.8,"3.5":0.95,"4":1.6,"5":1.8,"6":2,"7":2.2,"8":2.4,"9":2.6,"10":2.8,"11":3,"12":3.2,"13":3.4};
mailPrices['flats'] = {"1":1,"2":1.2,"3":1.4,"3.5":1.5,"4":1.6,"5":1.8,"6":2,"7":2.2,"8":2.4,"9":2.6,"10":2.8,"11":3,"12":3.2,"13":3.4};
mailPrices['retail'] = {"1":3.80,"2":3.80,"3":3.80,"3.5":3.80,"4":3.80,"5":4.60,"6":4.60,"7":4.60,"8":4.60,"9":5.30,"10":5.30,"11":5.30,"12":5.30,"13":5.90};


app.use(express.static('www'));
app.use(express.urlencoded({ extended: true }))
app.post('/calc',function (req,res) {
    var number = mailPrices[req.body.mailType][req.body.weight];
    var price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(number);
    //res.send(price);
    //console.log(price);
    res.render('result',{"price":price});
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`));