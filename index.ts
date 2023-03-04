import express from "express";

import { AdminRoute, VendorRoute } from "./routes";

const app = express();

app.use("/admin", AdminRoute);
app.use("/vendor", VendorRoute);

app.listen(8000, () => {
  console.log("App is listening to the port 8000");
});
