# Security Policy (ISO 27001 Alignment)

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v2.0.x  | :white_check_mark: |
| v1.0.x  | :x:                |

## Reporting a Vulnerability
Dado que este proyecto es una aplicación estática Single Page (SPA) que no maneja datos de usuarios o backend conectado, las vulnerabilidades suelen estar limitadas a dependencias de NPM (XSS).
Por favor, si detecta algún fallo de seguridad, envíe un correo a [security@example.com](mailto:security@example.com).

## Enterprise Security Features
- **Client-Side Execution**: Ningún dato matemático se envía a la nube; todo el cálculo matricial se procesa localmente en el navegador del usuario.
- **Dependency Scanning**: Auditorías regulares de dependencias de React/Vite para evitar inyecciones.
- **Legacy VBA Integrity**: Los archivos Excel originales mantienen sus macros firmadas y protegidas contra ejecución maliciosa automatizada.
