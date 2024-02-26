const sql = require('mssql');
const config = {
    user: 'sa',
    password: '12345678',
    server: 'localhost',
    database: 'test',
    options: {
        trustServerCertificate: true // Establecer en true si estás usando un certificado autofirmado
    }
};
const show = async (req, res = express.request) => {
    try {
        await sql.connect(config);
        const { q } = req.query;

        if (q) {
            const request = new sql.Request();
            request.input('q', sql.NVarChar(100), q);
            const { recordsets } = await request.execute('BuscarPosts');

            return res.status(200).json({
                ok: true,
                posts: recordsets
            })
        } else {
            const { recordsets } = await sql.query`EXEC GetAllPosts`;
            return res.status(200).json({
                ok: true,
                posts: recordsets
            })
        }



    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}

function obtenerFechaActualSQL() {
    const fechaHoraActual = new Date();

    // Formatear la fecha y hora según el formato deseado
    const año = fechaHoraActual.getFullYear();
    const mes = (fechaHoraActual.getMonth() + 1).toString().padStart(2, '0'); // El mes es base 0, sumamos 1
    const dia = fechaHoraActual.getDate().toString().padStart(2, '0');
    const hora = fechaHoraActual.getHours().toString().padStart(2, '0');
    const minutos = fechaHoraActual.getMinutes().toString().padStart(2, '0');
    const segundos = fechaHoraActual.getSeconds().toString().padStart(2, '0');
    const milisegundos = fechaHoraActual.getMilliseconds().toString().padStart(3, '0');

    // Construir la cadena de fecha y hora en el formato deseado
    const cadenaFechaHora = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}.${milisegundos}`;
    return cadenaFechaHora
}

const store = async (req, res = express.request) => {
    try {
        const { title, author, content } = req.body
        await sql.connect(config);
        const request = new sql.Request();
        await request.input('title', sql.NVarChar(50), title);
        await request.input('author', sql.NVarChar(50), author);
        await request.input('content', sql.NVarChar(150), content);
        request.output('NuevoId', sql.Int);
        await request.input('createdAt', sql.DATETIME, new Date());
        const result = await request.execute('GuardarUsuario');


        const nuevoRegistro = result.recordset[0];
        console.log('Nuevo registro:', nuevoRegistro);
        return res.status(201).json({
            ok: true,
            post: nuevoRegistro
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: error
        })
    }
}


module.exports = { show, store }
// CREATE PROCEDURE GuardarUsuario
//     @title NVARCHAR(50),
//     @author NVARCHAR(50),
//     @content NVARCHAR(150),
//     @createdAt DATETIME,
//     @NuevoId INT OUTPUT  
// AS
// BEGIN
//     SET NOCOUNT ON;

//     INSERT INTO Post (title, author, content, createdAt)
//     VALUES (@title, @author, @content, @createdAt);

//     SET @NuevoId = SCOPE_IDENTITY();

//     SELECT * FROM Post WHERE Id = @NuevoId;
// END;



// CREATE PROCEDURE BuscarPosts
//     @q NVARCHAR(100)
// AS
// BEGIN
//     SELECT *
//     FROM Post
//     WHERE author LIKE '%' + @q + '%'
//        OR title LIKE '%' + @q + '%'
//        OR content LIKE '%' + @q + '%';
// END;

// CREATE PROCEDURE GetAllPosts
// AS
// BEGIN
//     SELECT *
//     FROM Post;
// END;