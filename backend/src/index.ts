const express = require("express");
const app = express(); // Энэ нь Express апп үүсгэж, серверийн зам болон middleware-уудыг тохируулахад ашиглана.

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000/");
});
