import UserRoutes from "./users.routes";
import ShopRoutes from "./shop.routes";

import app from "@app/app";

app.use(UserRoutes);
app.use(ShopRoutes);

export { app };
