import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Actions Methods */
// Lista los proyectos
// GET /projects | GET /projects/index
const index = async (req, res) => {
  // 1 Pedirle a la base de datos
  // que me de todos lo proyectos que tiene
  // db.projects.find()
  try {
    log.info('Listando actividades ... ⌛');
    const projectsDocs = await ProjectModel.find().lean();
    log.info('Actividades listadas con exito ... 🎉');
    // res.json(projectsDocs);
    res.render('projects/allActivities', { projectsDocs });
  } catch (error) {
    log.error(`💥 Error al listar proyectos: ${error.message}`);
    res.status(500).json(error);
  }
};

const search = async (req, res) => {
  // 1 Pedirle a la base de datos
  // que me de todos lo proyectos que tiene
  // db.projects.find()
  const { validData } = req;

  try {
    log.info('Listando actividades ... ⌛');
    const activitiesDocs = await ProjectModel.find(validData).lean();
    // console.log(validData);
    log.info('Actividades listadas con exito ... 🎉');
    // res.json(projectsDocs);
    res.render('projects/activity', { activitiesDocs });
  } catch (error) {
    log.error(`💥 Error al listar proyectos: ${error.message}`);
    res.status(500).json(error);
  }
};

// Agrega ideas de proyectosar
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agregar proyectos
};
// Procesa el formulario que Agrega ideas de proyectos
// POST /projects/add
const addPost = async (req, res) => {
  // Desestructurando la informacion
  // del formulario o de un posible error
  const { errorData, validData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};
  // Verifico si hay error de validacion
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // Rescantado los datos del formulario
    project = errorData.value;
    // Usamos reduce para generar un objeto
    // de errores a partir de inner
    errorModel = errorData.inner.reduce((prev, curr) => {
      // Creamos una vaiabre temporal para evitar
      // el error "no-param-reassign" el cual me
      // exorta a evitar reasignar los valores de
      // los argumentos una funcion
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
    // La validacion fallo
    return res.render('projects/addProjectView', { project, errorModel });
  }
  log.info('Se retorna un objeto Proyecto valido');
  // Crear un documento con los datos provistos
  // por el formulario y guardar dicho documento
  // en projectModel
  const projectModel = new ProjectModel(validData);
  // Siempre que se ejecuta una operacion
  // que depende de un tercero, es una buena practica
  // envolver esa operacion en un bloque try
  try {
    log.info('Salvando el Proyecto...⌛');
    // Se salva el documento projecto
    project = await projectModel.save();
    log.info('🎉 Proyecto salvado con exito 🎉');
    // Redireccionando al recurso que lista los proyectos
    // GET /projects
    return res.redirect('/projects');
  } catch (error) {
    log.error(`Ha fallado el intento de salvar un proyecto:${error.message}`);
    return res.status(500).json({ error });
  }
};

// Exportando el controlador
export default {
  index,
  search,
  add,
  addPost,
};
