import log from '../config/winston';
// Importando el modelo Project
import ProjectModel from '../models/ProjectModel';

/* Actions Methods */
// Lista el itinerario
// GET /projects | GET /projects/index
const index = (req, res) => {
  res.send('Listando proyectos 🚧');
  // TODO: Agregar codigo de listado de itinerario
};
// Agrega actividades
// GET /projects/add
const add = (req, res) => {
  res.render('projects/addProjectView', {});
  // TODO: Agregar codigo para agregar itinerario
};

// Procesa el formulario que Agrega actividades al itinerario
// POST /projects/add
const addPost = async (req, res) => {
  const { errorData } = req;
  // Crear view models para este actio method
  let project = {};
  let errorModel = {};
  if (errorData) {
    log.error('💥 Se retorna objeto de error de validacion 💥');
    // Rescantado el objeto validado
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
    // return res.status(200).json(errorData);
  } else {
    log.info('Se retorna un objeto actividad valida');
    // Desestructurando la informacion
    // del formulario del objeto valido
    const { validData } = req;
    // Crear un documento con los datos provistos
    // por el formulario y guardar dicho documento
    // en projectModel
    const projectModel = new ProjectModel(validData);
    // Siempre que se ejecuta una operacion
    // que depende de un tercero, es una buena practica
    // envolver esa operacion en un bloque try
    try {
      // Se salva el documento projecto
      log.info('Se salva objeto actividad');
      project = await projectModel.save();
    } catch (error) {
      log.error(
        `Ha fallado el intento de salvar una actividad:${error.message}`
      );
      return res.status(500).json({ error });
    }
  }
  // Respondemos con los viewModels generados
  // res.render('projects/addProjectView', { project, errorModel });
  // Sanity check TODO:Provisional
  return res.status(200).json({ project, errorModel });
};

// Exportando el controlador
export default {
  index,
  add,
  addPost,
};
