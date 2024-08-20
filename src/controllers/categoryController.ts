import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { category_name, url_slug, parent_cat_id, status } = req.body;

    const newCategory = await prisma.category.create({
      data: {
        category_name,
        url_slug,
        parent_cat_id: parent_cat_id || null,
        status,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Get all categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        // Optionally include related models if needed
        // For example, to include sub-categories
        // subCategories: true,
      },
    });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Get a single category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
};

// Update a category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category_name, url_slug, parent_cat_id, status } = req.body;

    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        category_name,
        url_slug,
        parent_cat_id: parent_cat_id || null,
        status,
      },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete a category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
