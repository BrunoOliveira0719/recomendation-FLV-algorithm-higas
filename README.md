# Smart Hortifruti

SaaS para supermercados que combina uma API NestJS com PostgreSQL e um serviço Python/FastAPI de Machine Learning para prever demanda de hortifruti, risco de ruptura, risco de perda e sugestão de compra para os próximos 7 dias.

## Estrutura

- `src/`: backend NestJS em Clean Architecture simplificada, com módulos de Produtos, Estoque, Compras, Vendas, Perdas, Promoções, Relatórios, IA e Dashboard.
- `ai/`: serviço FastAPI com Pandas e Scikit-Learn para treino e inferência.
- `docker-compose.yml`: PostgreSQL, API NestJS e serviço de IA.

## Execução

```bash
cp .env.example .env
docker compose up --build
```

- API NestJS: <http://localhost:3000>
- Swagger: <http://localhost:3000/docs>
- IA FastAPI: <http://localhost:8000/docs>

## Dados de teste

Enquanto não houver dados reais, o backend cria produtos iniciais no seed e o serviço de IA gera automaticamente uma série sintética de aproximadamente 1 ano quando o histórico enviado estiver vazio.
