import { Request, Response } from 'express';
import prisma from '../prismaClient';

// Create a new role
export const createRole = async (req: Request, res: Response) => {
  try {
    const { role_name } = req.body;

    const newRole = await prisma.userRoles.create({
      data: {
        role_name,
      },
    });

    res.status(201).json(newRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create role' });
  }
};

// Get all roles
export const getRoles = async (req: Request, res: Response) => {
  try {
    const roles = await prisma.userRoles.findMany();

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

// Get a single role by ID
export const getRoleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const role = await prisma.userRoles.findUnique({
      where: { id: parseInt(id) },
    });

    if (!role) {
      return res.status(404).json({ error: 'Role not found' });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch role' });
  }
};

// Update a role
export const updateRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { role_name } = req.body;

    const updatedRole = await prisma.userRoles.update({
      where: { id: parseInt(id) },
      data: {
        role_name,
      },
    });

    res.status(200).json(updatedRole);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

// Delete a role
export const deleteRole = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.userRoles.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
