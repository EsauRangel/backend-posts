# Examen programador React

## Nodejs Backend
Se necesita desarrollar una aplicación en React que posea un conjunto reducido de
características propias de un Blog de Internet.

## Instalacion 
Clonar el repositorio 
git clone git@github.com:EsauRangel/backend-posts.git
Ejecutar npm install dentro del repositorio
[NPM](http://https://docs.npmjs.com/ "NPM")
### Alta de entradas
POST /api/v1/posts

CREATE PROCEDURE GuardarUsuario
    @title NVARCHAR(50),
    @author NVARCHAR(50),
    @content NVARCHAR(150),
    @createdAt DATETIME,
    @NuevoId INT OUTPUT  
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Post (title, author, content, createdAt)
    VALUES (@title, @author, @content, @createdAt);

    SET @NuevoId = SCOPE_IDENTITY();

    SELECT * FROM Post WHERE Id = @NuevoId;
END;
 
####  Mostrar un listado de entradas
GET /api/v1/posts
CREATE PROCEDURE GetAllPosts
AS
BEGIN
    SELECT *
    FROM Post;
END;
/api/v1/posts?q=""
#### Búsquedas
CREATE PROCEDURE BuscarPosts
    @q NVARCHAR(100)
AS
BEGIN
    SELECT *
    FROM Post
    WHERE author LIKE '%' + @q + '%'
       OR title LIKE '%' + @q + '%'
       OR content LIKE '%' + @q + '%';

#### Mostrar detalle de una entrada.
Al seleccionar una entrada del listado, deberá mostrarse el contenido de la
entrada. Es decir, deberá ser visible todo el texto del contenido.
#### Obtención de recursos
La obtención de los datos se hará por medio de un servicio REST que la
aplicación web debe consumir. Este proporcionará los métodos necesarios para
consultar y guardar las entradas del sitio a través de internet en un servidor.
