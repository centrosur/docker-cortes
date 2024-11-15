    CREATE TABLE users (

        -- REQUERIDOS
        id SERIAL PRIMARY KEY,
        user_id VARCHAR ( 255 ) NOT NULL,
        sociedad INT NOT NULL,
        created TIMESTAMP NOT NULL,
        updated TIMESTAMP NOT NULL,

        -- OPCIONAL
        name VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) NOT NULL,
        phone VARCHAR ( 20 ) NOT NULL,
        docid VARCHAR ( 13 ) NOT NULL,
        rol VARCHAR ( 10 ) NOT NULL
        
    );

    CREATE TABLE accounts (

        -- REQUERIDOS
        id VARCHAR ( 255 ) PRIMARY KEY,
        username VARCHAR ( 50 ) NOT NULL,
        password VARCHAR ( 255 ) NOT NULL,
        login_on TIMESTAMP,
        token INT NOT NULL,
        enable INT NOT NULL,
        expired TIMESTAMP NOT NULL,
        sociedad INT NOT NULL,
        created TIMESTAMP NOT NULL,
        updated TIMESTAMP NOT NULL

    );

    CREATE TABLE parame (

        -- REQUERIDOS
        id SERIAL PRIMARY KEY,
        sociedad INT NOT NULL,
        created TIMESTAMP NOT NULL,
        updated TIMESTAMP NOT NULL,

        name VARCHAR ( 50 ) NOT NULL,
        descrip VARCHAR ( 300 ) NOT NULL,
        cifrado INT NOT NULL,
        value TEXT NOT NULL
    );