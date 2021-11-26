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
    });//pega as informações

    app.post('/registro', async function (request, response) {
        if (!request.body.nome || !request.body.email || !request.body.senha) {
            response.json({ error: "dados incompletos." });
            return;
        }//retorna as informações
        try {
            const responseData = await db.run(
                "INSERT INTO usuarios(nome, email, senha, funcao,batalhao,tipo) VALUES(:nome,  :email, :senha,  :funcao,:batalhao,:tipo)",
                {
                    ":nome": request.body.nome,
                    ":email": request.body.email,
                    ":senha": request.body.senha,
                    //                  ":nivel_usuario": request.body.nivel_usuario,
                    //                    ":numeroXP": request.body.numeroXP,
                    ":funcao": request.body.funcao,
                    ":batalhao": request.body.batalhao,
                    ":tipo": request.body.tipo,
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    // app.get('/praias', async function (request, response) {
    //     const responseData = await db.all("SELECT * FROM praias");
    //     response.json(responseData);
    // });//pega as informações

    app.post('/praias', async function (request, response) {
        if (!request.body.nome || !request.body.observacoes) {
            response.json({ error: "dados incompletos." });
            return;
        }//retorna as informações

        try {
            const responseData = await db.run(
                "INSERT INTO praias(nome, observacoes) VALUES(:nome,  :observacoes)",
                {
                    ":nome": request.body.nome,
                    ":observacoes": request.body.observacoes,
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.get('/balneabilidade', async function (request, response) {
        const responseData = await db.all("SELECT * FROM balneabilidade");
        response.json(responseData);
    });//pega as informações

    app.post('/balneabilidade', async function (request, response) {
        if (!request.body.dataAnalise || !request.body.horaAnalise || !request.body.analise || !request.body.observacoes || !request.body.id_praia) {
            response.json({ error: "dados incompletos." });
            return;
        }//retorna as informações

        try {
            const responseData = await db.run(
                "INSERT INTO balneabilidade(dataAnalise, horaAnalise, analise, observacoes, fk_id_praia) VALUES(:dataAnalise,  :horaAnalise, :analise, :observacoes, :id_praia)",
                {
                    ":dataAnalise": request.body.dataAnalise,
                    ":horaAnalise": request.body.horaAnalise,
                    ":analise": request.body.analise,
                    ":observacoes": request.body.observacoes,
                    ":id_praia": request.body.id_praia,
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.get('/boletim', async function (request, response) {
        const responseData = await db.all("SELECT * FROM boletim_informativo");
        response.json(responseData);
    });//pega as informações

    app.post('/boletim', async function (request, response) {
        if (!request.body.dataEnvio || !request.body.horaEnvio || !request.body.boletimInformativo || !request.body.id_usuario || !request.body.id_praia) {
            response.json({ error: "dados incompletos." });
            return;
        }//retorna as informações

        try {
            const responseData = await db.run(
                "INSERT INTO boletim_informativo(dataEnvio, horaEnvio, boletimInformativo, fk_id_usuario, fk_id_praia) VALUES(:dataEnvio,  :horaEnvio, :boletimInformativo, :id_usuario, :id_praia)",
                {
                    ":dataEnvio": request.body.dataEnvio,
                    ":horaEnvio": request.body.horaEnvio,
                    ":boletimInformativo": request.body.boletimInformativo,
                    ":id_usuario": request.body.id_usuario,
                    ":id_praia": request.body.id_praia,
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        }
    });

    app.get('/advertencia', async function (request, response) {
        const responseData = await db.all("SELECT * FROM advertencia");
        response.json(responseData);
    });//pega as informações

    app.post('/advertencia', async function (request, response) {
        if (!request.body.advertencia) {
            response.json({ error: "dados incompletos." });
            return;
        }//retorna as informações

        try {
            const responseData = await db.run(
                "INSERT INTO advertencia(advertencia) VALUES(:advertencia)",
                {
                    ":advertencia": request.body.advertencia,
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

    app.post('/login',
        async function (request, response) {
            const responseData = await db.all("SELECT tipo FROM usuarios WHERE email=:email AND senha=:senha", {
                ":email": request.body.email,
                ":senha": request.body.senha,
            })

            if (responseData == undefined) {
                response.status(404); // Not Found
                response.json({ error: "Senha ou email incorreto" });
                return
            }

            response.json(responseData)
            return
        }
    )
    app.get('/praias/:id', async function (request, response) {
        const responseData = await db.all("SELECT * FROM praias WHERE id=?", request.params.id);

        if (responseData == undefined) {
            response.json({ error: "Praia não encontrada." });
        } else {
            response.json(responseData);
        }
    });

    app.listen(8081, () => console.log("running..."));
}

init();
