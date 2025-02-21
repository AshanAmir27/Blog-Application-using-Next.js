const sequelize = require("./db");
const User = require("../models/User");

(async () => {
  try {
    await sequelize.sync({ alter: true }); // ✅ Creates or updates tables
    console.log("✅ Database & tables created!");
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
})();
