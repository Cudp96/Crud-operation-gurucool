import express from "express";
import {
    deleteProduct,
  getAllProducts,
  newProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/newproduct", newProducts);
router.put("/updateproduct/:id", updateProduct);
router.get("/getallproducts", getAllProducts);
router.delete("/deleteproduct/:id", deleteProduct);

export default router;
