const movement = require("../models/Movements");

const getAll = async (req, res) => {
  try {
    const movements = await movement.findAll();
    if (movements === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
    res.send(movements);
  } catch (error) {
    throw new Error(error);
  }
};

const getForId = async (req, res) => {
  const id = req.params.id;
  const search = await movement.findByPk(id);
  if (search === null || search.length === 0) {
    return res.json({
      error: "Error en la busqueda de mov por ID",
    });
  }

  res.send(search);
};

const createMov = async (req, res) => {
  const { concept, amount, date, type } = req.body;
  if (!concept || !amount || !date || !type) {
    return res.status(400).json({
      error: "Todos lo campos deben estar completos",
    });
  }
  try {
    const newMovement = await movement.create({ concept, amount, date, type });
    if (newMovement === null || newMovement === 0) {
      throw "NO se pudo crear el movimiento";
    } else {
      res.json(newMovement);
    }
  } catch (error) {
    res.send(error);
  }
};
const deleteMov = async (req, res) => {
    try {
        movement.destroy({ where: { id: req.params.id } });
      res.json({msj:"Movimiento eliminado correctamente"})
    } catch (error) {
        res.json({error:`Hubo un error al intentar eliminar el gasto ${error}`})

        
    }
};
module.exports = {
  getAll,
  getForId,
  createMov,
  deleteMov
};
