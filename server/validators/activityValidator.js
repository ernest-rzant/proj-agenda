// 1 Importaremos la biblioteca de validación
import * as Yup from 'yup';

// 2 Crear el esquema de validación
const activitySchema = Yup.object().shape({
  fecha: Yup.date().required('Se requiere fecha de la actividad'),
});

// 3 Creamos el middleware de validacion
const getDate = (req) => {
  // Extraemos la info del formualrio
  const { fecha } = req.body;
  // Armar un objeto con los datos del proyecto
  return {
    fecha,
  };
};

export default { activitySchema, getDate };
