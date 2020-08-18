const express = require("express");
const mongoose = require ("mongoose");
const app = express();
const tinyURl = require("./models/tinyURL");

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(
    "mongodb+srv://chan:chan1234@cluster0-uqtcp.mongodb.net/URL-shortner?retryWrites=true&w=majority",{
        useNewUrlParser: true, useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connection Established..!");
  })
  .catch(() => {
    console.log("Connection Not Established..!");
  });


app.get('/', async (req, res) => {
    const tinyURls= await tinyURl.find()
    res.render('index', { tinyURls: tinyURls });
});

app.post('/tinyURl', async (req, res) => {
    await tinyURl.create({ fullURL: req.body.fullURL })


    res.redirect('/');
})

app.get('/:shorturl', async (req, res) => {
    const tinyURli= await tinyURl.findOne({shortURL: req.params.shorturl})
    
    if(tinyURli == null) return res.sendStatus(404);

    tinyURli.clicks++
    tinyURli.save();
    res.redirect(tinyURli.fullURL);
});


app.listen(process.env.PORT || 3000);