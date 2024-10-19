import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const productSchema = z.object({
  id: z.number().int().optional(), // Optional for when creating a new product
  image: z.string(), // Assuming the image is represented as a URL or a string
  name: z.string().max(100), // Required string with a maximum length of 100 characters
  description: z.string().max(255).optional(), // Optional string with a maximum length of 255 characters
  fullPrice: z.number().min(0), // Required non-negative number for full price
  discountedPrice: z.number().min(0), // Required non-negative number for discounted price
  companyId: z.number().int().nonnegative(), // Required non-negative integer for company reference
  stock: z.number().int().nonnegative(), // Required non-negative integer for stock
  category: z.string().max(100).optional(), // Optional string with a maximum length of 100 characters
  condition: z.string(), // Required string; you might want to define its structure later
  expiresIn: z.date().optional(), // Optional date indicating expiration
});

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = productSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const product = await prisma.product.create({
      data: {
        image: valida.data.image,
        name: valida.data.name,
        description: valida.data.description,
        fullPrice: valida.data.fullPrice,
        discountedPrice: valida.data.discountedPrice,
        companyId: valida.data.companyId,
        stock: valida.data.stock,
        category: valida.data.category,
        condition: valida.data.condition,
        expiresIn: valida.data.expiresIn
      }
    })
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const product = await prisma.product.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = productSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: valida.data
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
