import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const router = Router();

router.get('/search', async (req: Request, res: Response) => {
    const { name } = req.query;

    // Verifica se name é uma string
    if (typeof name !== 'string' || !name) {
        return res.status(400).json({ message: 'Nome é obrigatório.' });
    }

    try {
        const results = await prisma.product.findMany({
            where: {
                name: {
                    contains: name,
                },
            },
        });

        return res.json(results);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro ao buscar os dados.' });
    }
});

export default router; // Alterado para exportação padrão
