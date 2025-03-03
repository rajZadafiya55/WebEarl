import { isValidObjectId } from "mongoose";
import { Product } from "../modals/productModel.js";

const addProduct = async (req, res) => {
  try {
    const { pcode, pname, amount, description, photo } = req.body;

    if (
      [pcode, pname, amount, description, photo].some(
        (feild) => feild?.trim() == ""
      )
    ) {
      res.status(400).json({ message: "All Filed is required.!" });
    }

    const result = await Product.create({
      pcode,
      pname,
      amount,
      description,
      photo,
    });

    if (!result) {
      res.status(400).json({ message: "someting went wrong" });
    }

    return res.status(200).json({
      data: result,
      issuccess: true,
      message: "product create successfully.!",
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await Product.find({});

    if (!result) {
      res.status(400).json({ message: "someting went wrong" });
    }
    return res.status(200).json({
      data: result,
      issuccess: true,
      message: "products fetch successfully.!",
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const result = await Product.findById({ _id: id });

    if (!result) {
      res.status(400).json({ message: "someting went wrong" });
    }

    return res.status(200).json({
      data: result,
      issuccess: true,
      message: "product get successfully.!",
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const result = await Product.findByIdAndDelete({ _id: id });

    if (!result) {
      res.status(400).json({ message: "someting went wrong" });
    }

    return res
      .status(200)
      .json({ issuccess: true, message: "product delete successfully.!" });
  } catch (error) {
    res.json({ error: error });
  }
};

const editProduct = async (req, res) => {
  try {
    const { pcode, pname, amount, description, photo } = req.body;
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({ message: "Invalid Id" });
    }

    const result = await Product.findByIdAndUpdate(
      { _id: id },
      { $set: { pcode, pname, amount, description, photo } },
      {
        new: true,
      }
    );

    if (!result) {
      res.status(400).json({ message: "someting went wrong" });
    }

    return res.status(200).json({
      data: result,
      issuccess: true,
      message: "product update successfully.!",
    });
  } catch (error) {
    res.json({ error: error });
  }
};

export {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  editProduct,
};
