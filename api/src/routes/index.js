const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
  const apiUrl = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiInfo = await apiUrl.data.map((el) => {
    return {
      id: el.id,
      name: el.name,
      weight: el.weight?.metric,
      temperament: el.temperament,
      image: el.image.url,
    };
  });
  return apiInfo;
};

const getDbInfo = async () => {
  const perros = await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return perros.map((el) => {
    return {
      name: el.name,
      id: el.id,
      weight: el.weight,
      image: el.image,
      createdInDb: true,
      temperament: el.temperaments.map((e) => e.name).join(", "),
    };
  });
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const infoTotal = apiInfo.concat(dbInfo);
  return infoTotal;
};

router.get("/dogs", async (req, res) => {
  const name = req.query.name;
  try {
    let dogTotal = await getAllDogs();
    if (name) {
      let dogName = await dogTotal.filter((el) =>
        el.name.toLowerCase().includes(name.toLowerCase())
      );
      dogName.length
        ? res.status(200).send(dogName)
        : res.status(400).send("No se encontro el perro");
    } else {
      res.status(200).send(dogTotal);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/dogs/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const dogsTotal = await getAllDogs();
    if (id) {
      let dogId = dogsTotal.filter((el) => el.id == id);
      dogId.length
        ? res.status(200).json(dogId)
        : res.status(400).send("No se encontro el perro");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/dogs", async (req, res) => {
  console.log(req.body);
  try {
    let { name, temperaments, height, weight, life_span, img, createdDb } =
      req.body;

    let dogCreated = await Dog.create({
      name,
      weight,
      height,
      life_span,
      img,
      createdDb,
    });

    let temperamentDb = await Temperament.findAll({
      where: { name: temperaments },
    });
    dogCreated.addTemperament(temperamentDb);
    res.send("Perro creado con exito");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const db = await Temperament.findAll();
    if (db.length === 0) {
      const temperamentApi = await axios.get(
        "https://api.thedogapi.com/v1/breeds"
      );
      const temperaments = temperamentApi.data
        .map((el) => el.temperament?.split(", "))
        .flat();

      const temperamentosObjetos = temperaments.map((el) => {
        return {
          name: el,
        };
      });

      for (let i = 0; i < temperamentosObjetos.length; i++) {
        if (temperamentosObjetos[i].name) {
          await Temperament.findOrCreate({
            where: temperamentosObjetos[i],
          });
        }
      }
      //  await Temperament.bulkCreate(temperamentosObjetos)
      console.log("Estoy trayendo desde la api");
      const AllTemperaments = await Temperament.findAll();
      res.json(AllTemperaments);
    } else {
      console.log("Estoy trayendo desde la db");
      res.json(db);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
