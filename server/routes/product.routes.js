import express from "express";
import productCtrl from "../controllers/product.controller.js";
const router = express.Router();

// Routes for searching products

router.get("/api/products", (req, res, next) => {
  if (req.query.name) {
    // If a name query parameter is provided, perform the keyword search
    return productCtrl.productsByKeyword(req, res, next);
  } else {
    // If no name query parameter is provided
    return productCtrl.list(req, res, next); // get all products
  }
});

// create new product

router.route("/api/products").post(productCtrl.create);

// Products by ID calls

router
  .route("/api/products/:id")
  .get(productCtrl.read)
  .put(productCtrl.update)
  .delete(productCtrl.remove);

router.param("id", productCtrl.productByID);

// Remove all products

router.route("/api/products").delete(productCtrl.removeAll);

export default router;