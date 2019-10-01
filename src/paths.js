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
    getPerguntas: `${baseUrl}/consultorio/questionarios/getPerguntas.php`,
    getResposta: `${baseUrl}/consultorio/questionarios/getResposta.php`,
    editResposta: `${baseUrl}/consultorio/questionarios/editResposta.php`,
    update: `${baseUrl}/consultorio/questionarios/update.php`
  },
  consultas: {
    create: `${baseUrl}/consultorio/consultas/create.php`,
    getAll: `${baseUrl}/consultorio/consultas/getAll.php`,
    delete: `${baseUrl}/consultorio/consultas/delete.php`,
    update: `${baseUrl}/consultorio/consultas/update.php`
  },
  usuarios: {
    create: `${baseUrl}/consultorio/users/create.php`,
    getAll: `${baseUrl}/consultorio/users/getAll.php`,
  }
}