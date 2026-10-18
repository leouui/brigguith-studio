# Fuentes (licenciadas — no incluidas en el repo)

Coloca aquí los archivos en formato **.woff2** con estos nombres exactos:

| Archivo | Uso |
|---|---|
| horizon.woff2 | Títulos, navegación y botones |
| avenir-next-arabic-regular.woff2 | Párrafos (400) |
| avenir-next-arabic-medium.woff2 | Énfasis (500) |
| avenir-next-arabic-demibold.woff2 | Subtítulos (600) |
| avenir-next-arabic-bold.woff2 | Negritas (700) |

Convertir OTF/TTF a WOFF2:  `pip install fonttools brotli` y luego
`fonttools ttLib.woff2 compress archivo.otf`

Mientras no existan, el sitio usa fuentes del sistema como respaldo.
