const movement = require("../models/Movements");

const getAll = async (req, res) => {

console.log(req.query.listFor);
if(req.query.listFor!=="todos"){
  try {
    const movements = await movement.findAll({where:{type:req.query.listFor}});
    console.log(movements);
    res.json(movements)
    /* if (movements === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
    res.json(movements); */
  } catch (error) {
    throw new Error(error);
  }

}else{
  try {
    const movements = await movement.findAll();
    console.log(movements);
    res.json(movements)
    /* if (movements === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
    res.json(movements); */
  } catch (error) {
    throw new Error(error);
  }
}
};
const getBalance = async (req, res) => {
  try {
    const balance = await movement.sum("amount");
    console.log(balance);
    if (balance === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
    res.json(balance);
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
  console.log(req.body);
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
  console.log(req);
  try {
    movement.destroy({ where: { id: req.params.id } });
    res.json({ msj: "Movimiento eliminado correctamente" });
  } catch (error) {
    res.json({ error: `Hubo un error al intentar eliminar el gasto ${error}` });
  }
};

const editMov = async (req, res) => {

  const idToEdith = req.params.id;
  try {
    await movement.update(
      {
        ...req.body,
      },
      {
        where: {
          id: idToEdith,
        },
      }
    );

    const result = await movement.findByPk(idToEdith);

    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  getAll,
  getForId,
  createMov,
  deleteMov,
  editMov,
  getBalance
};
