var baseUrl = 'http://192.168.1.102:80';

export default {
  users: {
    getUserRoles: `${baseUrl}/consultorio/users/getUserRoles.php`,
    checkUserCredentials: `${baseUrl}/consultorio/users/checkUserCredentials.php`
  },
  pacientes: {
    create: `${baseUrl}/consultorio/pacientes/create.php`,
    delete: `${baseUrl}/consultorio/pacientes/delete.php`,
    getAll: `${baseUrl}/consultorio/pacientes/getAll.php`,
    getById: `${baseUrl}/consultorio/pacientes/getById.php`,
    update: `${baseUrl}/consultorio/pacientes/update.php`
  },
  questionarios: {
    create: `${baseUrl}/consultorio/questionarios/create.php`,
    delete: `${baseUrl}/consultorio/questionarios/delete.php`,
    getAll: `${baseUrl}/consultorio/questionarios/getAll.php`,
    getById: `${baseUrl}/consultorio/questionarios/getById.php`,
    update: `${baseUrl}/consultorio/questionarios/update.php`
  },
  
}