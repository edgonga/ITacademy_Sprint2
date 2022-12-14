-- Active: 1653553317200@@127.0.0.1@3306@tienda
--Llista el nom de tots els productes que hi ha en la taula producto.

SELECT nombre FROM producto;

--Llista els noms i els preus de tots els productes de la taula producto.

SELECT nombre, precio FROM producto;

--Llista totes les columnes de la taula producto.

SELECT * FROM producto;

--Llista el nom dels productes, el preu en euros i el preu en dòlars estatunidencs (USD).

SELECT nombre, precio, precio * 1.03 AS USD FROM producto;

--Llista el nom dels productes, el preu en euros i el preu en dòlars estatunidencs (USD). Utilitza els següents àlies per a les columnes: nom de producto, euros, dòlars.

SELECT nombre AS "nom de producto", precio AS euros, precio * 1.03 AS dolars FROM producto;

--Llista els noms i els preus de tots els productes de la taula producto, convertint els noms a majúscula.

SELECT UPPER(nombre) AS nombre, precio FROM producto;

--Llista els noms i els preus de tots els productes de la taula producto, convertint els noms a minúscula.

SELECT LOWER(nombre) AS nombre, precio FROM producto;

--Llista el nom de tots els fabricants en una columna, i en una altra columna obtingui en majúscules els dos primers caràcters del nom del fabricant.

SELECT nombre, UPPER(LEFT(nombre, 2)) AS Initials FROM fabricante;

--Llista els noms i els preus de tots els productes de la taula producto, arrodonint el valor del preu.

SELECT nombre, ROUND(precio) AS "Rounded Price" FROM producto;

--Llista els noms i els preus de tots els productes de la taula producto, truncant el valor del preu per a mostrar-lo sense cap xifra decimal.

SELECT nombre, TRUNCATE(precio, 0) AS "Truncated Price" FROM producto;

--Llista el codi dels fabricants que tenen productes en la taula producto.

SELECT F.codigo, F.nombre FROM fabricante F INNER JOIN producto P ON F.codigo = P.codigo_fabricante;

--Llista el codi dels fabricants que tenen productes en la taula producto, eliminant els codis que apareixen repetits.

SELECT DISTINCT F.codigo, F.nombre FROM fabricante F INNER JOIN producto P ON F.codigo = P.codigo_fabricante;

--Llista els noms dels fabricants ordenats de manera ascendent.

SELECT nombre FROM fabricante ORDER BY nombre ASC;

--Llista els noms dels fabricants ordenats de manera descendent.

SELECT nombre FROM fabricante ORDER BY nombre DESC;

--Llista els noms dels productes ordenats, en primer lloc, pel nom de manera ascendent i, en segon lloc, pel preu de manera descendent.

SELECT nombre FROM producto ORDER BY nombre ASC, precio DESC;

--Retorna una llista amb les 5 primeres files de la taula fabricante.

SELECT * FROM fabricante LIMIT 5;

--Retorna una llista amb 2 files a partir de la quarta fila de la taula fabricante. La quarta fila també s'ha d'incloure en la resposta.

SELECT * FROM fabricante LIMIT 3,2;

--Llista el nom i el preu del producte més barat. (Utilitza solament les clàusules ORDER BY i LIMIT). NOTA: Aquí no podria usar MIN(preu), necessitaria GROUP BY.

SELECT nombre, precio FROM producto ORDER BY precio DESC LIMIT 1;

--Llista el nom i el preu del producte més car. (Utilitza solament les clàusules ORDER BY i LIMIT). NOTA: Aquí no podria usar MAX(preu), necessitaria GROUP BY.

SELECT nombre, precio FROM producto ORDER BY precio ASC LIMIT 1;

--Llista el nom de tots els productes del fabricant el codi de fabricant del qual és igual a 2.

SELECT * FROM producto WHERE codigo_fabricante = 2;

--Retorna una llista amb el nom del producte, preu i nom de fabricant de tots els productes de la base de dades.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo;

--Retorna una llista amb el nom del producte, preu i nom de fabricant de tots els productes de la base de dades. Ordena el resultat pel nom del fabricant, per ordre alfabètic.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo ORDER BY Nombre_fabricante ASC;

--Retorna una llista amb el codi del producte, nom del producte, codi del fabricador i nom del fabricador, de tots els productes de la base de dades.

SELECT P.nombre as Nombre_producto, P.codigo as Codigo_producto, F.nombre as Nombre_fabricante, F.codigo as Codigo_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo;

--Retorna el nom del producte, el seu preu i el nom del seu fabricant, del producte més barat.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo ORDER BY P.precio ASC LIMIT 1;

--Retorna el nom del producte, el seu preu i el nom del seu fabricant, del producte més car.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo ORDER BY P.precio DESC LIMIT 1;

--Retorna una llista de tots els productes del fabricant Lenovo.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Lenovo';

--Retorna una llista de tots els productes del fabricant Crucial que tinguin un preu major que 200 €.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Crucial' AND P.precio > 200;

--Retorna un llistat amb tots els productes dels fabricants Asus, Hewlett-Packard y Seagate. Sense utilitzar l'operador IN.

SELECT P.nombre as Nombre_producto, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Asus' OR F.nombre = 'Hewlett-Packard' OR F.nombre = 'Seagate';

--Retorna un llistat amb tots els productes dels fabricants Asus, Hewlett-Packard y Seagate. Fent servir l'operador IN.;

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre IN ('Asus', 'Hewlett-Packard', 'Seagate');

--Retorna un llistat amb el nom i el preu de tots els productes dels fabricants el nom dels quals acabi per la vocal e.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre LIKE '%e';

--Retorna un llistat amb el nom i el preu de tots els productes el nom de fabricant dels quals contingui el caràcter w en el seu nom.

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE F.nombre LIKE '%w%';

--Retorna un llistat amb el nom de producte, preu i nom de fabricant, de tots els productes que tinguin un preu major o igual a 180 €. Ordena el resultat, en primer lloc, pel preu (en ordre descendent) i, en segon lloc, pel nom (en ordre ascendent).

SELECT P.nombre as Nombre_producto, P.precio, F.nombre as Nombre_fabricante FROM producto P INNER JOIN fabricante F ON P.codigo_fabricante = F.codigo WHERE P.precio >= 180 ORDER BY P.precio DESC, P.nombre ASC;

--Retorna un llistat amb el codi i el nom de fabricant, solament d'aquells fabricants que tenen productes associats en la base de dades.

SELECT F.nombre as Nombre_fabricante, F.codigo as Codigo_fabricante FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo;

--Retorna un llistat de tots els fabricants que existeixen en la base de dades, juntament amb els productes que té cadascun d'ells. El llistat haurà de mostrar també aquells fabricants que no tenen productes associats.
;
SELECT F.nombre as Nombre_fabricante, P.nombre FROM fabricante F CROSS JOIN producto P ON P.codigo_fabricante = F.codigo;

--Retorna un llistat on només apareguin aquells fabricants que no tenen cap producte associat.
SELECT F.nombre as Nombre_fabricante, P.nombre FROM fabricante F CROSS JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.codigo IS NULL;

--Retorna tots els productes del fabricador Lenovo. (Sense utilitzar INNER JOIN).

SELECT F.nombre as Nombre_fabricante, P.nombre as Nombre_producto FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Lenovo';

--Retorna totes les dades dels productes que tenen el mateix preu que el producte més car del fabricant Lenovo. (Sense usar INNER JOIN).

SELECT * FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE P.precio = (SELECT MAX(P.precio) FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Lenovo');


--Llista el nom del producte més car del fabricant Lenovo.

SELECT P.nombre as Nombre_producto FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Lenovo' ORDER BY P.precio DESC LIMIT 1;

--Llista el nom del producte més barat del fabricant Hewlett-Packard.

SELECT P.nombre as Nombre_producto FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Hewlett-Packard' ORDER BY P.precio ASC LIMIT 1;

--Retorna tots els productes de la base de dades que tenen un preu major o igual al producte més car del fabricant Lenovo.

SELECT * FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE P.precio >= (SELECT MAX(P.precio) FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE F.nombre = 'Lenovo');


--Llesta tots els productes del fabricant Asus que tenen un preu superior al preu mitjà de tots els seus productes.

SELECT * FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo WHERE P.precio >= (SELECT AVG(P.precio) FROM fabricante F LEFT JOIN producto P ON P.codigo_fabricante = F.codigo) AND F.nombre = 'Asus';


USE `universidad`;
--Retorna un llistat amb el primer cognom, segon cognom i el nom de tots els/les alumnes. El llistat haurà d'estar ordenat alfabèticament de menor a major pel primer cognom, segon cognom i nom.

SELECT nombre, apellido1, apellido2 FROM persona WHERE tipo = 'alumno' ORDER BY apellido1 ASC, apellido2 ASC, nombre ASC;

--Esbrina el nom i els dos cognoms dels alumnes que no han donat d'alta el seu número de telèfon en la base de dades.;

SELECT nombre, apellido1, apellido2 FROM persona WHERE telefono IS NULL AND tipo = 'alumno';

--Retorna el llistat dels alumnes que van néixer en 1999.

SELECT nombre, apellido1, apellido2, fecha_nacimiento FROM persona WHERE YEAR(fecha_nacimiento) = 1999 AND tipo = 'alumno';

--Retorna el llistat de professors/es que no han donat d'alta el seu número de telèfon en la base de dades i a més el seu NIF acaba en K.

SELECT nombre, apellido1, apellido2, nif, telefono FROM persona WHERE telefono IS NULL AND nif like '%K';

--Retorna el llistat de les assignatures que s'imparteixen en el primer quadrimestre, en el tercer curs del grau que té l'identificador 7.

SELECT * FROM asignatura WHERE cuatrimestre = 1 AND curso = 3 AND id_grado = 7;

--Retorna un llistat dels professors/es juntament amb el nom del departament al qual estan vinculats. 
--El llistat ha de retornar quatre columnes, primer cognom, segon cognom, nom i nom del departament. 
--El resultat estarà ordenat alfabèticament de menor a major pels cognoms i el nom.



SELECT Pe.apellido1, Pe.apellido2, Pe.nombre, D.nombre FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN departamento D ON Pr.id_departamento = D.id;

--Retorna un llistat amb el nom de les assignatures, any d'inici i any de fi del curs escolar de l'alumne/a amb NIF 26902806M.

SELECT P.id, A.nombre, C.anyo_inicio, C.anyo_fin FROM persona P INNER JOIN alumno_se_matricula_asignatura M ON P.id = M.id_alumno INNER JOIN curso_escolar C ON M.id_curso_escolar = C.id INNER JOIN asignatura A ON M.id_asignatura = A.id WHERE P.nif = '26902806M';

--Retorna un llistat amb el nom de tots els departaments que tenen professors/es que imparteixen alguna assignatura en el Grau en Enginyeria Informàtica (Pla 2015).

SELECT A.nombre, D.nombre, G.nombre, Pr.id_profesor FROM departamento D INNER JOIN profesor Pr ON D.id = Pr.id_departamento INNER JOIN asignatura A ON Pr.id_profesor = A.id_profesor INNER JOIN grado G ON A.id_grado = G.id WHERE G.id = 4;

--Retorna un llistat amb tots els alumnes que s'han matriculat en alguna assignatura durant el curs escolar 2018/2019.

SELECT distinct Pe.id, Pe.nombre, Pe.apellido1, Pe.apellido2 FROM persona Pe INNER JOIN alumno_se_matricula_asignatura M ON Pe.id = M.id_alumno INNER JOIN curso_escolar C ON M.id_curso_escolar = C.id WHERE C.id = 5;

--------------------------------------------------------

/*Retorna un llistat amb els noms de tots els professors/es i els departaments que tenen vinculats.
 El llistat també ha de mostrar aquells professors/es que no tenen cap departament associat. 
 El llistat ha de retornar quatre columnes, nom del departament, primer cognom, segon cognom i nom del professor/a. 
 El resultat estarà ordenat alfabèticament de menor a major pel nom del departament, cognoms i el nom.*/

SELECT D.nombre as Departamento, Pe.apellido1, Pe.apellido2,  Pe.nombre FROM persona Pe LEFT JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN departamento D ON Pr.id_departamento = D.id ORDER BY Departamento, Pe.apellido1, Pe.apellido2, Pe.nombre;

--Retorna un llistat amb els professors/es que no estan associats a un departament.

SELECT D.nombre as Departamento, Pe.apellido1, Pe.apellido2, Pe.nombre FROM persona Pe LEFT JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN departamento D ON Pr.id_departamento = D.id WHERE D.nombre IS NULL;

--Retorna un llistat amb els departaments que no tenen professors/es associats.

SELECT D.nombre as Departamento, Pe.apellido1, Pe.apellido2, Pe.nombre FROM persona Pe LEFT JOIN profesor Pr ON Pe.id = Pr.id_profesor RIGHT JOIN departamento D ON Pr.id_departamento = D.id WHERE Pe.nombre IS NULL;

--Retorna un llistat amb els professors/es que no imparteixen cap assignatura.

SELECT Pe.apellido1, Pe.apellido2, Pe.nombre, A.nombre AS Asignatura FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN asignatura A ON Pr.id_profesor = A.id_profesor WHERE A.nombre IS NULL;

--Retorna un llistat amb les assignatures que no tenen un professor/a assignat.

SELECT Pe.apellido1, Pe.apellido2, Pe.nombre, A.nombre AS Asignatura FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor RIGHT JOIN asignatura A ON Pr.id_profesor = A.id_profesor WHERE Pe.apellido1 IS NULL;

--Retorna un llistat amb tots els departaments que no han impartit assignatures en cap curs escolar.

SELECT D.nombre, A.nombre, C.* FROM departamento D LEFT JOIN profesor Pr ON D.id = Pr.id_departamento LEFT JOIN asignatura A ON Pr.id_profesor = A.id_profesor LEFT JOIN alumno_se_matricula_asignatura M ON A.id = M.id_asignatura LEFT JOIN curso_escolar C ON M.id_curso_escolar = C.id WHERE A.nombre IS NULL;


-------------------------------------------------

--Retorna el nombre total d'alumnes que hi ha.

SELECT DISTINCT COUNT(*) FROM persona WHERE tipo = 'alumno';

--Calcula quants alumnes van néixer en 1999.

SELECT DISTINCT COUNT(*) FROM persona WHERE YEAR(fecha_nacimiento) = 1999 and tipo = 'alumno';

--Calcula quants professors/es hi ha en cada departament. 
--El resultat només ha de mostrar dues columnes, una amb el nom del departament i una altra amb el nombre de professors/es que hi ha en aquest departament. 
--El resultat només ha d'incloure els departaments que tenen professors/es associats i haurà d'estar ordenat de major a menor pel nombre de professors/es.

SELECT D.nombre as DEPARTAMENTO, count(*) AS Numero_profesores FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN departamento D ON Pr.id_departamento = D.id GROUP BY D.nombre ORDER BY Numero_Profesores DESC;

--Retorna un llistat amb tots els departaments i el nombre de professors/es que hi ha en cadascun d'ells. 
--Tingui en compte que poden existir departaments que no tenen professors/es associats. Aquests departaments també han d'aparèixer en el llistat.

SELECT D.nombre as DEPARTAMENTO, count(Pe.nombre) AS Numero_profesores FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor RIGHT JOIN departamento D ON Pr.id_departamento = D.id GROUP BY D.nombre ORDER BY Numero_Profesores DESC;

--Retorna un llistat amb el nom de tots els graus existents en la base de dades i el nombre d'assignatures que té cadascun. 
--Tingues en compte que poden existir graus que no tenen assignatures associades. Aquests graus també han d'aparèixer en el llistat. 
--El resultat haurà d'estar ordenat de major a menor pel nombre d'assignatures.

SELECT G.nombre, COUNT(A.nombre) AS Numero_Asignaturas FROM grado G LEFT JOIN asignatura A ON G.id = A.id_grado GROUP BY G.nombre ORDER BY Numero_Asignaturas DESC;

--Retorna un llistat amb el nom de tots els graus existents en la base de dades i el nombre d'assignatures que té cadascun, 
--dels graus que tinguin més de 40 assignatures associades.

SELECT G.nombre, COUNT(A.nombre) AS Numero_Asignaturas FROM grado G LEFT JOIN asignatura A ON G.id = A.id_grado GROUP BY G.nombre HAVING Numero_Asignaturas > 40 ORDER BY Numero_Asignaturas DESC;

--Retorna un llistat que mostri el nom dels graus i la suma del nombre total de crèdits que hi ha per a cada tipus d'assignatura. 
--El resultat ha de tenir tres columnes: nom del grau, tipus d'assignatura i la suma dels crèdits de totes les assignatures que hi ha d'aquest tipus.

SELECT G.nombre, A.tipo, SUM(A.creditos) AS Total_Creditos FROM grado G INNER JOIN asignatura A ON G.id = A.id_grado GROUP BY G.nombre, A.tipo;


--Retorna un llistat que mostri quants alumnes s'han matriculat d'alguna assignatura en cadascun dels cursos escolars. 
--El resultat haurà de mostrar dues columnes, una columna amb l'any d'inici del curs escolar i una altra amb el nombre d'alumnes matriculats.

SELECT C.anyo_inicio, COUNT(*) AS Numero_matriculas FROM alumno_se_matricula_asignatura M INNER JOIN curso_escolar C ON M.id_curso_escolar = C.id GROUP BY C.anyo_inicio;

--Retorna un llistat amb el nombre d'assignatures que imparteix cada professor/a. 
--El llistat ha de tenir en compte aquells professors/es que no imparteixen cap assignatura. 
--El resultat mostrarà cinc columnes: id, nom, primer cognom, segon cognom i nombre d'assignatures. El resultat estarà ordenat de major a menor pel nombre d'assignatures.

SELECT Pe.id, Pe.nombre, Pe.apellido1, Pe.apellido2, COUNT(A.nombre) AS Asignaturas_Impartidas FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor LEFT JOIN asignatura A ON Pr.id_profesor = A.id_profesor GROUP BY Pe.id, Pe.nombre, Pe.apellido1, Pe.apellido2 ORDER BY Asignaturas_Impartidas DESC;

--Retorna totes les dades de l'alumne/a més jove.

SELECT * FROM persona Pe ORDER BY fecha_nacimiento DESC LIMIT 1;

--Retorna un llistat amb els professors/es que tenen un departament associat i que no imparteixen cap assignatura.

SELECT Pe.id, Pe.nombre FROM persona Pe INNER JOIN profesor Pr ON Pe.id = Pr.id_profesor INNER JOIN departamento D ON Pr.id_departamento = D.id LEFT JOIN asignatura A ON Pr.id_profesor = A.id_profesor WHERE A.id_profesor IS NULL
