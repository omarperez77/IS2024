import { Router } from "express";
import { employeesController } from "../controllers/employeesController.js";
import { departmentsController } from "../controllers/departmentsController.js";

const router = new Router();


router.get('/employees/', employeesController.getAll);
router.get('/employees/:id', employeesController.getEmployeeById);
router.post('/employees/', employeesController.createEmployee);
router.put('/employees/:id', employeesController.updateEmployee);
router.delete('/employees/:id', employeesController.deleteEmployee);
router.get('/employees/departments/:id', employeesController.getDepartmentByIdEmployee);

router.get('/departments/', departmentsController.getAll);
router.get('/departments/:id', departmentsController.getDepartmentById);
router.post('/departments/', departmentsController.createDepartment);
router.put('/departments/:id', departmentsController.updateDepartment);
router.delete('/departments/:id', departmentsController.deleteDepartment);
router.get('/departments/employees/:id', departmentsController.getEmployeesByIdDepartment);

export default router;

