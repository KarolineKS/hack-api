import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const orderSchema = z.object({
  number: z.number().int().optional(), // Optional for creating a new order
  productId: z.number().int(), // Reference to Product
  userId: z.number().int(), // Reference to User
  orderedAt: z.date(),
  delivered: z.boolean(),

  // Relationships are usually not validated directly in Zod,
  // but you can define their types if needed for further checks
  product: z.object({
    id: z.number().int(),
    // Add other product fields if needed for validation
  }).optional(), // Optional for when you're just creating the order

  user: z.object({
    cpf: z.string(),
    // Add other user fields if needed for validation
  }).optional(), // Optional for when you're just creating the order
});

router.get("/", async (req, res) => {
  try {
    const orders = await prisma.product.findMany()
    res.status(200).json(orders)
  } catch (error) {
    res.status(500).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = orderSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const order = await prisma.order.create({
      data: {
        productId: valida.data.productId, // Ensure these fields match your Prisma model
        userId: valida.data.userId,
        orderedAt: valida.data.orderedAt,
        delivered: valida.data.delivered,
      }
    })
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const order = await prisma.order.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = orderSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const order = await prisma.order.update({
      where: { id: Number(id) },
      data: {
        productId: valida.data.productId, // Ensure these fields match your Prisma model
        userId: valida.data.userId,
        orderedAt: valida.data.orderedAt,
        delivered: valida.data.delivered,
      }
    })
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
