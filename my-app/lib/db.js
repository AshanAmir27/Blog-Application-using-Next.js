const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog", "Ashan", "256twutwufai", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL database successfully!");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
}

// Test connection
testConnection();

module.exports = sequelize; // ✅ Export Sequelize instance
