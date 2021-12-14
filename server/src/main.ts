import { init as initDatabase } from "./database";
import express from "express";
import session from "express-session"
import bodyParser from "body-parser";
import e from "express";

const app = express();

app.use(session({
    secret: "ljafhasgyorwashgoç8eapwotiyu8e8airyuehiahldjlhdp",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    }
}))

app.use(function (request, response, next) {
    response.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
    response.header('Access-Control-Allow-Credentials', 'true');
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

    app.post('/registro', async function (request, response) {
        if (!request.body.nome || !request.body.email || !request.body.senha) {
            response.json({ error: "dados incompletos.", detail: e });
            console.log(e)
            return;
        }
        try {
            const responseData = await db.run(
                "INSERT INTO usuarios(nome, email, senha, funcao,batalhao) VALUES(:nome,  :email, :senha,  :funcao,:batalhao)",
                {
                    ":nome": request.body.nome,
                    ":email": request.body.email,
                    ":senha": request.body.senha,
                    ":funcao": request.body.funcao,
                    ":batalhao": request.body.batalhao
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
            console.log(e)
        }
    });

    app.post('/praias', async function (request, response) {
        if (!request.body.nome || !request.body.observacoes) {
            response.json({ error: "dados incompletos.", detail: e });
            console.log(e)
            return;
        }

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
            console.log(e)
        }
    });

    app.get('/balneabilidade', async function (request, response) {
        const responseData = await db.all("SELECT * FROM balneabilidade");
        response.json(responseData);
    });

    app.post('/balneabilidade', async function (request, response) {
        if (!request.body.dataAnalise || !request.body.horaAnalise || !request.body.analise || !request.body.observacoes || !request.body.id_praia) {
            response.json({ error: "dados incompletos.", detail:e });
            console.log(e)
            return;
        }
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
            console.log(e)
        }
    });

    app.get('/boletim', async function (request, response) {
        const responseData = await db.all("SELECT * FROM boletim_informativo");
        response.json(responseData);
    });

    app.post('/boletim', async function (request, response) {
        if (!request.body.dataEnvio || !request.body.horaEnvio || !request.body.boletimInformativo || !request.body.id_usuario || !request.body.id_praia) {
            response.json({ error: "dados incompletos.", detail:e });
            console.log(e)
            return;
        }

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
            console.log(e)
        }
    });

    app.get('/advertencia', async function (request, response) {
        const responseData = await db.all("SELECT * FROM advertencia");
        response.json(responseData);
    });

    app.post('/advertencia', async function (request, response) {
        if (!request.body.advertencia) {
            response.json({ error: "dados incompletos.", detail: e });
            console.log(e)
            return;
        }

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
            console.log(e)
        }
    });

    app.get('/recebe', async function (request, response) {
        const responseData = await db.all("SELECT * FROM recebe");
        response.json(responseData);
    });

    app.post('/recebe', async function (request, response) {
        if (!request.body.fk_id_advertencia) {
            response.json({ error: "dados incompletos.", detail:e });
            console.log(e)
            return;
        }

        try {
            const responseData = await db.run(
                "INSERT INTO recebe(fk_id_advertencia, fk_id_usuario) VALUES(:fk_id_advertencia, :fk_id_usuario)",
                {
                    ":fk_id_advertencia": request.body.fk_id_advertencia,
                    ":fk_id_usuario": request.body.fk_id_usuario
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
        console.log(e)
        }
    });

    app.post('/login',
        async function (request, response) {
            const responseData = await db.all("SELECT tipo, id_usuario FROM usuarios WHERE email=:email AND senha=:senha", {
                ":email": request.body.email,
                ":senha": request.body.senha,
            })

            if (responseData == undefined) {
                response.status(404); 
                response.json({ error: "Senha ou email incorreto", detail: e });
                console.log(e)
                return
            }


            console.log(responseData[0].id_usuario);
            
            (<any>request.session).usuario = responseData[0].id_usuario

            response.json(responseData)
            return
        }
    )

    app.get("/ex", (req, res) => {
        res.json(req.session)
    })

    app.get('/praias/:id', async function (request, response) {
        const responseData = await db.all("SELECT * FROM praias WHERE id=?", request.params.id);

        if (responseData == undefined) {
            response.json({ error: "Praia não encontrada.",detail:e });
            console.log(e)
        } else {
            response.json(responseData);
        }
    });
    app.post('/mudatipo', async function (request, response) {
        if (!request.body.tipo || !request.body.id_usuario) {
            response.json({ error: "dados incompletos.", detail:e });
            console.log(e)
            return;
        }
        try {
            const responseData = await db.run(
                "UPDATE usuarios SET tipo = :tipo WHERE id_usuario = :id_usuario",
                {
                    ":tipo": request.body.tipo,
                    ":id_usuario": request.body.id_usuario,
                }
            );
            response.json(responseData);
        } catch (e) {
            response.json({ error: "database error", detail: e });
            console.log(e)
        }
    });
    app.post('/verpraia', async function (request, response) {
        if (!request.body.idPraia) {
            response.json({ error: "Praia não encontrada", detail: e });
            console.log(e)
            return;
        }
        try {
            const responseData = await db.all(
                `SELECT 
                    praias.nome, praias.observacoes, praias.id_praia
                FROM 
                    praias WHERE 
                    id_praia = :idPraia `,
                {
                    ":idPraia": request.body.idPraia,
                }
            );
            response.json(responseData);
        } catch (e) {
            console.log(e)
            response.json({ error: "database error", detail: e });
        }
    });
    app.post('/verboletim', async function (request, response) {
        if (!request.body.idPraia) {
            response.json({ error: "Praia não encontrada", detail: e });
            console.log(e);
            return;
        }
        try {
            const responseData = await db.all(
                `SELECT 
                    boletim_informativo.id_boletim,
                    boletim_informativo.dataEnvio,
                    boletim_informativo.horaEnvio,
                    boletim_informativo.boletiminformativo 
                FROM 
                praias join boletim_informativo ON (boletim_informativo.fk_id_praia = praias.id_praia)
                WHERE 
                    id_praia = :idPraia order by id_boletim desc limit 1 `,
                {
                    ":idPraia": request.body.idPraia,
                }
            );
            response.json(responseData);
        } catch (e) {
            console.log(e)
            response.json({ error: "database error", detail: e });
        }
    });
    app.post('/verbalneabilidade', async function (request, response) {
        if (!request.body.idPraia) {
            response.json({ error: "Praia não encontrada", detail: e });
            console.log(e);
            return;
        }
        try {
            const responseData = await db.all(
                `SELECT 
                    balneabilidade.id_balneabilidade, 
                    balneabilidade.dataAnalise, 
                    balneabilidade.horaAnalise, 
                    balneabilidade.analise, 
                    balneabilidade.observacoes  
                FROM 
                   praias join balneabilidade ON (balneabilidade.fk_id_praia = praias.id_praia)
                           WHERE 
                    id_praia = :idPraia order by id_balneabilidade desc limit 1`,
                {
                    ":idPraia": request.body.idPraia,
                }
            );
            response.json(responseData);
        } catch (e) {
            console.log(e)
            response.json({ error: "database error", detail: e });
        }
    });
    app.all('/idpraia', async function (request, response) {
        const responseData = await db.all("SELECT nome, id_praia FROM praias WHERE id_praia>0 order by id_praia");
        if (responseData == undefined) {
            console.log(e)
            response.json({ error: "database error", detail: e });
        } else {
            response.json(responseData);
        }
    });
    app.all('/idusuario', async function (request, response) {
        const responseData = await db.all("SELECT nome, id_usuario FROM usuarios WHERE id_usuario>0 order by id_usuario");
        if (responseData == undefined) {
            console.log(e)
            response.json({ error: "database error", detail: e });
            console.log(e)
        } else {
            response.json(responseData);
        }
    });
    

    app.all('/idadvertencia', async function (request, response) {
        const responseData = await db.all("SELECT advertencia, id_advertencia FROM advertencia WHERE id_advertencia>0 order by id_advertencia");
        if (responseData == undefined) {
            console.log(e)
            response.json({ error: "database error", detail: e });
            console.log(e)
        } else {
            response.json(responseData);
        }
    });
    app.post('/temacesso', async function (request, response) {
        if (!request.body.fk_id_praia || !request.body.fk_id_usuario) {
            response.json({ error: "Praia não encontrada", detail: e });
            console.log(e)
            return;
        }
        try {
            const responseData = await db.run(
                `insert into 
                    temAcesso(fk_id_usuario, fk_id_praia, favorita)
                values
                   (:fk_id_usuario, :fk_id_praia, true);
                           `,
                {
                    ":fk_id_praia": request.body.fk_id_praia,
                    ":fk_id_usuario": request.body.fk_id_usuario,
                }
            );
            response.json(responseData);
        } catch (e) {
            console.log(e)
            response.json({ error: "database error", detail: e });
        }
    });        
    app.listen(8081, () => console.log("running..."));
}


init();
