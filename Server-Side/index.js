require("dotenv").config();
let express = require("express");
let app = express();
let cors = require("cors");
let visitorRoutes = require("./Routes/Visitor");
let sequelize = require("./db/dbConfig");
// let {Admin} = require ('./model/Admin')
sequelize.sync({ alter: true });

// Increase the size limit for JSON and URL-encoded payloads
app.use(express.json({ limit: "10mb" })); // increase the limit to 10MB
app.use(express.urlencoded({ limit: "10mb", extended: true })); // for form data, increase the limit

app.use(cors());
app.use("/api/visitor", visitorRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
