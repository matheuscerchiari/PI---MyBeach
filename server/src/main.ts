import { init as initDatabase } from "./database";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

async function init() {
    const db = await initDatabase();

    app.get('/pessoa', async function (request, response) {
        const responseData = await db.all("SELECT * FROM pessoa");
        response.json(responseData);
    });

    app.post('/pessoa', async function (request, response) {
        if (!request.body.nome || !request.body.sobrenome || !request.body.apelido) {
            response.json({ error: "dados incompletos." });
            return;
        }

        try {
            const responseData = await db.run(
                "INSERT INTO pessoa(nome, sobrenome, apelido) VALUES(:nome, :sobrenome, :apelido)",
                {
                    ":nome": request.body.nome,
                    ":sobrenome": request.body.sobrenome,
                    ":apelido": request.body.apelido
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.get('/pessoa/:id', async function (request, response) {
        const responseData = await db.get("SELECT * FROM pessoa WHERE id=? LIMIT 1", request.params.id);

        if (responseData == undefined) {
            response.json({ error: "Pessoa não encontrada." });
        } else {
            response.json(responseData);
        }
    });

    app.put('/pessoa/:id', async function (request, response) {
        if (!request.body.nome || !request.body.sobrenome || !request.body.apelido) {
            response.json({ error: "dados incompletos." });
            return;
        }

        try {
            const responseData = await db.run(
                "UPDATE pessoa SET nome=:nome, sobrenome=:sobrenome, apelido=:apelido WHERE id=:id",
                {
                    ":id": request.params.id,
                    ":nome": request.body.nome,
                    ":sobrenome": request.body.sobrenome,
                    ":apelido": request.body.apelido
                }
            );

            if (responseData == undefined) {
                response.json({ error: "Pessoa não encontrada." });
            } else {
                response.json(responseData);
            }
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.delete('/pessoa/:id', async function (request, response) {
        const responseData = await db.run("DELETE FROM pessoa WHERE id=?", request.params.id);
        if (responseData.changes == 0) {
            response.json({ error: "Pessoa não encontrada." });
        } else {
            response.json(responseData);
        }
    });

    app.listen(8081, () => console.log("running..."));
}

init();
