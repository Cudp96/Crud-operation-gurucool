import Product from "../modules/product.model.js";
import { errorHandler } from "../utils/error.js";

export const newProducts = async (req, res, next) => {
  const { title, description, regularPrice, image, discountedPrice, userId } =
    req.body;

  if (
    title === "" &&
    description === "" &&
    regularPrice === "" &&
    image === ""
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  const newProduct = new Product({
    title,
    description,
    regularPrice,
    image,
    discountedPrice,
    userId,
  });

  try {
    await newProduct.save();
    const { ...rest } = newProduct._doc;
    res.status(201).json({
      message: "Product added successfully",
      rest,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const id = req.params.id;
  const { title, description, regularPrice, image, discountedPrice, userId } =
    req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        title,
        description,
        regularPrice,
        image,
        discountedPrice,
        userId,
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      product: product, // you can omit this line, I included it for clarity
    });
  } catch (error) {
    next(errorHandler(400, "Product update failed"));
    res.status(500).json({
      message: "An error occurred while updating the product",
    });
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
    res.status(500).json({
      message: "An error occurred while fetching products",
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      deletedProduct: product,
    });
  } catch (error) {
    next(errorHandler(404, "Product deletion failed"));
    res.status(500).json({
      message: "An error occurred while deleting the product",
    });
  }
};
