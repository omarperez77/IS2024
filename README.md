# IS2024
Proyectos de ejemplo para seguimiento de la gestión de proyectos de software.

## Descripción de la API
La API que se está desarrollando tiene como propósito facilitar la gestión de empleados y departamentos en una empresa. Proporciona funcionalidades para realizar operaciones básicas de creación, lectura, actualización y eliminación (CRUD) tanto de empleados como de departamentos.

## Características de la API
Algunas de las características clave que ofrece la API son:
-Gestión de empleados: Permite agregar, ver, actualizar y eliminar información de empleados.
-Gestión de departamentos: Permite agregar, ver, actualizar y eliminar información de departamentos.
-Autenticación HWID: Implementación de un sistema de autenticación basado en Hardware ID para garantizar la seguridad y el acceso autorizado a la API.

## Funcionamiento de la API
La API funciona como un intermediario entre el cliente y la base de datos, permitiendo realizar operaciones CRUD sobre los recursos de empleados y departamentos. Utiliza los siguientes métodos HTTP para realizar las operaciones:
-GET: Se utiliza para recuperar información de empleados o departamentos existentes.
-POST: Se utiliza para crear nuevos registros de empleados o departamentos.
-PUT: Se utiliza para actualizar la información de empleados o departamentos existentes.
-DELETE: Se utiliza para eliminar registros de empleados o departamentos.

## Sistema de Autenticación HWID
Actualmente, se está trabajando en la implementación de un sistema de autenticación basado en Hardware ID (HWID). Este sistema se utilizará para autenticar y autorizar a los usuarios que acceden a la API. El HWID proporciona una capa adicional de seguridad al vincular la identidad del usuario con el hardware de su dispositivo, lo que dificulta la suplantación de identidad y fortalece la seguridad del sistema.
