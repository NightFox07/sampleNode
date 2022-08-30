const app = require("./app");
const {PORT} = require("./config");

app.listen(PORT, ()=> {
    console.info(`app started at http://localhost:${PORT}...`);
})