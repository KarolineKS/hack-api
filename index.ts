import express from 'express'
import routesMarcas from './routes/marcas'
import routesVinhos from './routes/vinhos'

const app = express()
const port = 3000

app.use(express.json())

app.use("/marcas", routesMarcas)
app.use("/vinhos", routesVinhos)

app.get('/', (req, res) => {
  res.send('API de Cadastro de Marcas e Vinhos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})