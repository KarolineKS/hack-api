import { PrismaClient } from '@prisma/client'
import { Router } from 'express'
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router()

const companySchema = z.object({
  cnpj: z.string().length(18), // CNPJ must be exactly 14 characters
  name: z.string().max(100),
  email: z.string().email().max(100), // Validates that the email is in a correct format
  phone: z.string(),
  type: z.string().max(100),
  address: z.string().max(255).optional(), // Optional address field

  products: z.array(z.object({
    id: z.number().int(), // Assuming Product has an id
    // Add other Product fields if needed
  })).optional(), // Optional array of products
});

router.get("/", async (req, res) => {
  try {
    const companies = await prisma.company.findMany()
    res.status(200).json(companies)
  } catch (error) {
    res.status(500).json({erro: error})
  }
})

router.post("/", async (req, res) => {

  const valida = companySchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const company = await prisma.company.create({
      data: {
        cnpj: valida.data.cnpj, // Ensure these fields match your Prisma model
        name: valida.data.name, // Ensure these fields match your Prisma model
        email: valida.data.email,
        phone: valida.data.phone,
        type: valida.data.type,
        address: valida.data.address,
      }
    })
    res.status(201).json(company)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
    const company = await prisma.company.delete({
      where: { id: Number(id) }
    })
    res.status(200).json(company)
  } catch (error) {
    res.status(400).json({ erro: error })
  }
})

router.put("/:id", async (req, res) => {
  const { id } = req.params

  const valida = companySchema.safeParse(req.body)
  if (!valida.success) {
    res.status(400).json({ erro: valida.error })
    return
  }

  try {
    const company = await prisma.company.update({
      where: { id: Number(id) },
      data: {
        cnpj: valida.data.cnpj, // Ensure these fields match your Prisma model
        name: valida.data.name, // Ensure these fields match your Prisma model
        email: valida.data.email,
        phone: valida.data.phone,
        type: valida.data.type,
        address: valida.data.address,
      }
    })
    res.status(200).json(company)
  } catch (error) {
    res.status(400).json({ error })
  }
})

export default router
