const express = require('express');
const app = express();

app.use(express.static('dist'));
app.listen(9121, function(){
    console.log('listening port 9121');
});
