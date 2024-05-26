const express = require("express");
const sql = require("mssql"); // Assuming you've installed mssql
const dbConfig = require("./dbConfig");
const controller = require("./controllers/usersController");
const bodyParser = require("body-parser"); 
const validateBook = require("./middlewares/validateBook");

const app = express();
const port = process.env.PORT || 3000; // Use environment variable or default port

const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware); // Mount the static middleware

app.get("/users/search", controller.searchUsers); // Search user
app.get("/users/with-books", controller.getUsersWithBooks);
app.post("/users", controller.createUser); // Create user
app.get("/users", controller.getAllUsers); // Get all users
app.get("/users/:id", controller.getUserById); // Get user by ID
app.put("/users/:id", controller.updateUser); // Update user
app.delete("/users/:id", controller.deleteUser); // Delete user


app.listen(port, async () => {
  try {
    // Connect to the database
    await sql.connect(dbConfig);
    console.log("Database connection established successfully"); 
  } catch (err) {
    console.error("Database connection error:", err);
    // Terminate the application with an error code (optional)
    process.exit(1); // Exit with code 1 indicating an error
  }

  console.log(`Server listening on port ${port}`);
});

// Close the connection pool on SIGINT signal
process.on("SIGINT", async () => {
  console.log("Server is gracefully shutting down");
  // Perform cleanup tasks (e.g., close database connections)
  await sql.close();
  console.log("Database connection closed");
  process.exit(0); // Exit with code 0 indicating successful shutdown
});
