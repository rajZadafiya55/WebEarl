import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productcontroller.js";
import { verifyToken } from "../utils/auth.js";
import { upload } from "../utils/comman.js";

const router = express.Router();

router.post("/", upload.single("photo"), addProduct);
router.get("/", getAllProducts);
router.route("/:id").get(getProductById);
router.route("/:id").delete(deleteProduct);
router.route("/:id").patch(editProduct);

export default router;
