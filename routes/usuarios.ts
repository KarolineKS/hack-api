import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const userSchema = z.object({
  id: z.number().int().optional(), // Optional for creating a new user (auto-incremented by Prisma)
  cpf: z.string().length(14),
  name: z.string().max(100), // Required string with a maximum length of 100 characters
  email: z.string().email().max(100), // Required string that must be a valid email format
  phone: z.string(),
  address: z.string().max(255), // Optional string with a maximum length of 255 characters

  orders: z.array(z.object({
    number: z.number().int(), // Assuming Order has a number field
    // Add other Order fields if needed
  })).optional(), // Optional array of orders
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({erro: error})
  }
})

router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.post("/", async (req, res) => {

  const valida = userSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const user = await prisma.user.create({
      data: {
        cpf: valida.data.cpf,
        name: valida.data.name,
        email: valida.data.email,
        phone: valida.data.phone,
        address: valida.data.address,
      }
    })
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = userSchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        cpf: valida.data.cpf,
        name: valida.data.name,
        email: valida.data.email,
        phone: valida.data.phone,
        address: valida.data.address,
      }
    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
