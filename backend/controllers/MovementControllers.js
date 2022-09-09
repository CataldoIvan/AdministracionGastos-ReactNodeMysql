const movement = require("../models/Movements");
const { Op } = require("sequelize");
let movements = null;
const getAll = async (req, res) => {
  //console.log(JSON.parse(req.query.listFor)?.name || "no hay");
  let filterValue = req.query.listFor ? JSON.parse(req.query.listFor) : "all";
  const getAllMovForUser = async () => {
    console.log("************************");
    console.log(req.query.userEmail);
    return movement.findAll({
      where: {
        userEmail: req.query.userEmail,
      },
    });
  };
  console.log(filterValue);
  try {
    switch (filterValue?.name) {
      case "type":
        if (filterValue.value === "all") {
          movements = await getAllMovForUser();
        } else {
          movements = await movement.findAll({
            where: {
              userEmail: req.query.userEmail,
              [Op.and]: [{ type: filterValue.value }],
            },
          });
        }
        break;
      case "concept":
        console.log(filterValue.value === "all");
        console.log(filterValue.name);
        if (filterValue.value === "all") {
          movements = await getAllMovForUser();
        } else {
          movements = await movement.findAll({
            where: {
              userEmail: req.query.userEmail,
              [Op.and]: [{ concept: filterValue.value }],
            },
          });
        }

        break;

      default:
        movements = await getAllMovForUser();
        break;
    }
    if (movements === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
   // console.log(movements);
    res.json(movements);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};
const getBalance = async (req, res) => {
  try {
    const balance = await movement.sum("amount", {
      where: {
        userEmail: req.query.userEmail,
      },
    });
    console.log(balance);
    if (balance === null) {
      return res
        .status(405)
        .json({ error: " No se pudieron obtener el listado de movimientos" });
    }
    res.json(balance);
  } catch (error) {
    console.log(error);
    res.json(error);
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
  if (req.body.type == "output") {
    req.body.amount = req.body.amount * Math.sign(-req.body.amount);
  }

  const { concept, amount, date, type, userName, userEmail } = req.body;
  if (!concept || !amount || !date || !type || !userName || !userEmail) {
    return res.status(400).json({
      error: "Todos lo campos deben estar completos",
    });
  }
  try {
    const newMovement = await movement.create({
      concept,
      amount,
      date,
      type,
      userName,
      userEmail,
    });
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
  console.log(req);
  try {
    const { concept, amount, date, type } = req.body;
  if (!concept || !amount || !date || !type ) {
    return res.status(400).json({
      error: "Todos lo campos deben estar completos",
    });
  }
   /*  await movement.update(
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

    res.json(result); */
  } catch (error) {
    return res.status(400).json({
      error: "Todos lo campos deben estar completos",
    });
  }
};

module.exports = {
  getAll,
  getForId,
  createMov,
  deleteMov,
  editMov,
  getBalance,
};
