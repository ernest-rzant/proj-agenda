// Usando el patron Factory para la creacion
// de un middleware de validacion
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // 1 Costruir un objeto a validar
    const dataObject = getObject(req);
    // 2 Se realiza el proceso de validacion
    try {
      // 2.1 Se valida el objeto con el shape
      // validate acepta 2 argumentos
      // arg1: objeto a validr
      // arg2: opciones de validacion
      const validData = await shape.validate(dataObject, {
        abortEarly: false,
      });
      // Incrustar el objeto valido en la peticion
      req.validData = validData;
    } catch (error) {
      // Crear un obeto que reporta el error
      req.errorData = error;
    }
    // 3 Continuamos la cadena de middlewares
    return next();
  };

// Exportando Factory de validacion
export default Validator;
