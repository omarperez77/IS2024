// Función para cargar la lista de departamentos
const cargarDepartamentos = async () => {
  try {
    const response = await fetch('http://localhost:8085/api/departments');
    const departamentos = await response.json();
    
    // Obtener el elemento select del formulario de empleado
    const selectDepartamento = document.getElementById('departamento');

    // Limpiar opciones previas (por si acaso)
    selectDepartamento.innerHTML = '';

    // Iterar sobre los departamentos y agregarlos como opciones en el select
    departamentos.forEach((departamento) => {
      const option = document.createElement('option');
      option.value = departamento.id_departamento;
      option.textContent = departamento.nombre;
      selectDepartamento.appendChild(option);
    });
  } catch (error) {
    console.error('Error al cargar departamentos:', error);
  }
};

// Llamar a la función para cargar los departamentos al cargar la página
cargarDepartamentos();

// Función para cargar la lista de empleados
const loadEmployees = async () => {
  try {
    const response = await fetch('http://localhost:8085/api/employees');
    const employees = await response.json();
    employeesList.innerHTML = '';
    // Recorrer cada empleado
    for (const employee of employees) {
      // Hacer una solicitud para obtener el nombre del departamento
      const departmentResponse = await fetch(`http://localhost:8085/api/departments/${employee.id_departamento}`);
      const department = await departmentResponse.json();
      // Crear un elemento para mostrar la información del empleado
      const employeeItem = document.createElement('div');
      employeeItem.classList.add('employee-item');
      employeeItem.innerHTML = `
        <p>ID Empleado: ${employee.id_empleado}</p>
        <p>Departamento: ${department.nombre}</p>
        <p>Nombre: ${employee.nombre}</p>
        <p>Sueldo: ${employee.sueldo}</p>
        <button onclick="deleteEmployee(${employee.id_empleado})">Eliminar</button>
        <button onclick="updateEmployeeForm(${employee.id_empleado}, '${employee.nombre}', '${employee.id_departamento}', ${employee.sueldo})">Modificar</button>
      `;
      employeesList.appendChild(employeeItem);
    }
  } catch (error) {
    console.error('Error al cargar empleados:', error);
  }
};

// Función para enviar el formulario y crear un nuevo empleado
employeeForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  //const id_empleado = document.getElementById('id_empleado').value;
  const id_departamento = document.getElementById('departamento').value;
  const nombre = document.getElementById('nombre').value;
  const sueldo = document.getElementById('sueldo').value;
  try {
    await fetch('http://localhost:8085/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_departamento, nombre, sueldo })
    });
    employeeForm.reset();
    loadEmployees();
  } catch (error) {
    console.error('Error al crear empleado:', error);
  }
});


// Función para abrir el formulario de actualización de empleado
function updateEmployeeForm(id_empleado, nombre, id_departamento, sueldo) {
  // Crear el formulario
  const form = document.createElement('form');

  // Agregar campos al formulario
  const nombreInput = document.createElement('input');
  nombreInput.setAttribute('type', 'text');
  nombreInput.setAttribute('placeholder', 'Nuevo nombre');
  nombreInput.setAttribute('value', nombre);
  form.appendChild(nombreInput);

  const departamentoInput = document.createElement('input');
  departamentoInput.setAttribute('type', 'number');
  departamentoInput.setAttribute('placeholder', 'Nuevo departamento');
  departamentoInput.setAttribute('value', id_departamento);
  form.appendChild(departamentoInput);

  const sueldoInput = document.createElement('input');
  sueldoInput.setAttribute('type', 'number');
  sueldoInput.setAttribute('placeholder', 'Nuevo sueldo');
  sueldoInput.setAttribute('value', sueldo);
  form.appendChild(sueldoInput);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Actualizar';
  form.appendChild(submitButton);

  // Agregar evento de envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const updatedNombre = nombreInput.value;
    const updatedDepartamento = departamentoInput.value;
    const updatedSueldo = sueldoInput.value;

    try {
      await updateEmployee(id_empleado, updatedDepartamento, updatedNombre, updatedSueldo);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  });

  // Limpiar el div y agregar el formulario
  employeesList.innerHTML = '';
  employeesList.appendChild(form);
}

// Función para actualizar los datos de un empleado
const updateEmployee = async (id_empleado, id_departamento, nombre, sueldo) => {
  try {
    await fetch(`http://localhost:8085/api/employees/${id_empleado}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id_departamento, nombre, sueldo })
    });
    loadEmployees(); // Recargar la lista de empleados después de la actualización
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
  }
};

// Función para eliminar un empleado
const deleteEmployee = async (id_empleado) => {
  try {
    await fetch(`http://localhost:8085/api/employees/${id_empleado}`, {
      method: 'DELETE'
    });
    loadEmployees();
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
  }
};

// Cargar la lista de empleados al cargar la página
 window.onload = loadEmployees;

// ----------------------------------------------------------------
// Departments 

 // Función para cargar la lista de departamentos
 const loadDepartments = async () => {
  try {
    const response = await fetch('http://localhost:8085/api/departments');
    const departments = await response.json();
    departmentsList.innerHTML = '';
    departments.forEach(department => {
      const departmentItem = document.createElement('div');
      departmentItem.classList.add('department-item');
      departmentItem.innerHTML = `
        <p>ID Departamento: ${department.id_departamento}</p>
        <p>Nombre: ${department.nombre}</p>
        <button onclick="deleteDepartment(${department.id_departamento})">Eliminar</button>
        <button onclick="updateDepartmentForm(${department.id_departamento}, '${department.nombre}')">Modificar</button>
      `;
      departmentsList.appendChild(departmentItem);
    });
  } catch (error) {
    console.error('Error al cargar empleados:', error);
  }
};

// Función para enviar el formulario y crear un nuevo departamento 

departmentForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const nombre = document.getElementById('name-department').value;
  try {
    const response = await fetch('http://localhost:8085/api/departments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre })
    });
    if (response.ok) {
      departmentForm.reset();
      loadDepartments();
    } else {
      // Si la solicitud no fue exitosa, lanzar un error
      throw new Error('Error al crear departamento');
    }
    
  } catch (error) {
    console.error('Error al crear departamento:', error);
  }
});

// Función para abrir el formulario de actualización de departamento
function updateDepartmentForm(id_departamento, nombre) {
  // Crear el formulario
  const form = document.createElement('form');

  // Agregar campos al formulario
  
  const departamentoInput = document.createElement('input');
  departamentoInput.setAttribute('type', 'text');
  departamentoInput.setAttribute('placeholder', 'Nuevo departamento');
  departamentoInput.setAttribute('value', nombre);
  form.appendChild(departamentoInput);

  const submitButton = document.createElement('button');
  submitButton.setAttribute('type', 'submit');
  submitButton.textContent = 'Actualizar';
  form.appendChild(submitButton);

  // Agregar evento de envío del formulario
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const updatedDepartamento = departamentoInput.value;

    try {
      await updateDepartment(id_empleado, updatedDepartamento);
    } catch (error) {
      console.error('Error al actualizar departamento:', error);
    }
  });

  // Limpiar el div y agregar el formulario
  departmentsList.innerHTML = '';
  departmentsList.appendChild(form);
}

// Función para actualizar los datos de un departamento
const updateDepartment = async ( id_departamento, nombre) => {
  try {
    await fetch(`http://localhost:8085/api/departments/${id_departamento}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre })
    });
    loadDepartments(); // Recargar la lista de departamentos después de la actualización
  } catch (error) {
    console.error('Error al actualizar departamento:', error);
  }
};

// Función para eliminar un empleado
const deleteDepartment = async (id_departamento) => {
  try {
    await fetch(`http://localhost:8085/api/departments/${id_departamento}`, {
      method: 'DELETE'
    });
    loadDepartments();
  } catch (error) {
    console.error('Error al eliminar departamento:', error);
  }
};

//  window.onload = loadDepartments;
