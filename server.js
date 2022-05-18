const app = require("./src/app");
const PORT = 8080;

app.listen(process.env.PORT || 8080, () => {
    console.log("Server running on port", PORT)
}) 