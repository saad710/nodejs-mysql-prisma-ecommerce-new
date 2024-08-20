import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  const { product_name, url_slug, cat_id, description, price, stock_quantity, status } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        product_name,
        url_slug,
        cat_id,
        description,
        price,
        stock_quantity,
        status
      }
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get products with search and pagination
export const getProducts = async (req: Request, res: Response) => {
  try {
    // Extract query parameters
    const { name, categoryId, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
    
    // Ensure page and limit are numbers
    const pageNumber = parseInt(page as string, 10);
    const pageSize = parseInt(limit as string, 10);

    // Build the search query
    const whereClause: any = {};
    
    if (name) {
      whereClause.product_name = {
        contains: name as string,
        mode: 'insensitive', // Case-insensitive search
      };
    }
    
    if (categoryId) {
      whereClause.cat_id = parseInt(categoryId as string);
    }
    
    if (minPrice || maxPrice) {
      whereClause.price = {
        ...(minPrice ? { gte: parseFloat(minPrice as string) } : {}),
        ...(maxPrice ? { lte: parseFloat(maxPrice as string) } : {}),
      };
    }

    const sortOrder = sort === 'desc' ? 'desc' : 'asc';

    // Query products with pagination
    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy: {
        price: sortOrder,
      },
      skip: (pageNumber - 1) * pageSize, // Calculate the offset
      take: pageSize, // Number of records to return
    });

    // Get the total number of products for pagination metadata
    const totalProducts = await prisma.product.count({
      where: whereClause,
    });

    res.status(200).json({
      products,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total: totalProducts,
        totalPages: Math.ceil(totalProducts / pageSize),
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Product by ID
export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        variants: true  // Include product variants
      }
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { product_name, url_slug, cat_id, description, price, stock_quantity, status } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        product_name,
        url_slug,
        cat_id,
        description,
        price,
        stock_quantity,
        status
      }
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create Product Variant
export const createProductVariant = async (req: Request, res: Response) => {
  const { product_id, color, size, price, stock_quantity } = req.body;

  try {
    const variant = await prisma.productVariant.create({
      data: {
        product_id,
        color,
        size,
        price,
        stock_quantity
      }
    });

    res.status(201).json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update Product Variant
export const updateProductVariant = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { color, size, price, stock_quantity } = req.body;

  try {
    const variant = await prisma.productVariant.update({
      where: { id: Number(id) },
      data: {
        color,
        size,
        price,
        stock_quantity
      }
    });

    res.status(200).json(variant);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete Product Variant
export const deleteProductVariant = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.productVariant.delete({
      where: { id: Number(id) }
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
