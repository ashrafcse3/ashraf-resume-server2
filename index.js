const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = 4000

//middlewares
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!')
})



const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.hfr0jqh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const projectsCollection = client.db("ashraf_resume").collection("projects");

        app.get('/projects', async (req, res) => {
            const query = {};

            const projects = await projectsCollection.find(query).toArray();

            res.send(projects);
        })

        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const project = await projectsCollection.findOne(query);

            res.send(project);
        })

    } finally {

    }
}

run().catch(error => console.error(error))


app.listen(port, () => {
    console.log(`ashraf resume app listening on port ${port}`)
})