import { Database } from 'sqlite3';
 
import { open } from 'sqlite';
 
export async function init() {
       const db = await open({
        filename: './database.db',
        driver: Database,
    });
 
   
    await db.exec(`
        CREATE TABLE IF NOT EXISTS USUARIOS (
            id_usuario integer PRIMARY KEY autoincrement,
            nome varchar(45),
            email varchar(100),
            senha varchar(45),
            nivelUsuario integer,
            numeroXP integer,
            funcao varchar(45),
            batalhao varchar(45),
            tipo integer default 3
        );
         
        CREATE TABLE IF NOT EXISTS ADVERTENCIA(
            id_advertencia integer PRIMARY KEY autoincrement,
            advertencia varchar(100)
        );
          
        CREATE TABLE IF NOT EXISTS PRAIAS (
            id_praia integer PRIMARY KEY autoincrement,
            nome varchar(45),
            observacoes varchar(200)
        );

        CREATE TABLE IF NOT EXISTS BOLETIM_INFORMATIVO (
            id_boletim integer PRIMARY KEY autoincrement,
            dataEnvio date,
            horaEnvio time,
            boletimInformativo varchar(100),
            fk_id_usuario integer,
            fk_id_praia integer,
            FOREIGN KEY (fk_id_usuario) REFERENCES USUARIOS (id_usuario) ON DELETE CASCADE,
            FOREIGN KEY (fk_id_praia) REFERENCES PRAIAS (id_praia) ON DELETE CASCADE
        );
         
        CREATE TABLE IF NOT EXISTS BALNEABILIDADE(
            id_balneabilidade integer PRIMARY KEY autoincrement,
            dataAnalise date,
            horaAnalise time,
            analise varchar(200),
            observacoes varchar(200),
            fk_id_praia integer,
            FOREIGN KEY (fk_id_praia) REFERENCES PRAIAS (id_praia) ON DELETE CASCADE
        );
         
        CREATE TABLE IF NOT EXISTS FazProjetos(
            fk_id_usuario integer,
            fk_id_praia integer,
            FOREIGN KEY (fk_id_usuario) REFERENCES ONGs (id_usuario) ON DELETE SET NULL,
            FOREIGN KEY (fk_id_praia) REFERENCES PRAIAS (id_praia) ON DELETE SET NULL
        );
         
        CREATE TABLE IF NOT EXISTS TemAcesso (
            fk_id_usuario integer,
            fk_id_praia integer,
            favorita boolean default false,
            FOREIGN KEY (fk_id_usuario) REFERENCES USUARIOS (id_usuario) ON DELETE SET NULL,
            FOREIGN KEY (fk_id_praia) REFERENCES PRAIAS (id_praia) ON DELETE SET NULL
        );
         
        CREATE TABLE IF NOT EXISTS Recebe(
            fk_id_usuario integer,
            fk_id_advertencia integer,
            FOREIGN KEY (fk_id_usuario) REFERENCES USUARIOS (id_usuario) ON DELETE SET NULL,
            FOREIGN KEY (fk_id_advertencia) REFERENCES ADVERTENCIA (id_advertencia) ON DELETE SET NULL
        );   
        PRAGMA foreign_keys = ON;
                `
    );
    return db;
}
