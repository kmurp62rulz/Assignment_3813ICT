module.exports = function(db, app) {
  app.get("/list", function(req, res) {
    const product_collection = db.collection("users");
    product_collection.find().toArray((err, data) => {
      res.send(data);
    });
  });
};
