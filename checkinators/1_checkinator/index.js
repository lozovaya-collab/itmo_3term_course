const express = require("express");
const axios = require("axios");

const app = express();

app.get("/login", function(req, res) {
    res.send("anyalozovaya");
});
app.get("/id/:n", function({ params: { n } }, res) {

    axios.get(`https://nd.kodaktor.ru/users/${n}`)
        .then(result => {
            res.send(`${result.data.login}`);
        })
        .catch(error => {
            res.send(`${error.message}`);
        });

});

app.listen(3000);