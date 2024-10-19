import express from 'express'
import routesProdutos from './routes/produtos'
import routesEmpresas from './routes/empresas'
import routesPedidos from './routes/pedidos'
import routesUsuarios from './routes/usuarios'

const app = express()
const port = 3001

app.use(express.json())

app.use("/produtos", routesProdutos)
app.use("/empresas", routesEmpresas)
app.use("/pedidos", routesPedidos)
app.use("/usuarios", routesUsuarios)

app.get('/', (req, res) => {
  res.send('API Ultima Chance')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})