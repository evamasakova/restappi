const Pet = require("../models/pet");

exports.getPets = async (req, res) => {
  try {
    const result = await Pet.find().select("name year breed color _id");
    if (result && result.length !== 0) {
      return res.status(200).json({
        count: result.length,
        pets: result.map((pet) => {
          return {
            ...pet.toObject(),
            request: {
              type: "GET",
              url: `http://localhost:3000/pet/${pet._id}`,
            },
          };
        }),
      });
    }
    res.status(404).json({ msg: "Pets not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.getPet = async (req, res) => {
  try {
    const result = await Pet.findById(req.params.id).select("-__v");
    if (result) {
      return res.status(200).json({
        ...result.toObject(),
        request: {
          type: "GET",
          url: "http://127.0.0.1:3000/pet",
        },
      });
    }
    res.status(404).json({ msg: "Pet not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.postPet = async (req, res) => {
  try {
    const pet = new Pet({
      name: req.body.name,
      year: req.body.year,
      breed: req.body.breed,
      color: req.body.color,
    });
    const result = await pet.save();
    if (result) {
      return res.status(201).json({
        message: "Your pet was created",
        createdPet: {
          ...result.toObject(),
          payload: {
            type: "GET",
            url: `http://127.0.0.1:3000/pet/${result._id}`,
          },
        },
      });
    }
    res.status(500).json({ msg: "Pet was not created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.putPet = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      year: req.body.year,
      breed: req.body.breed,
      color: req.body.color,
    };
    const result = await Pet.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Pet ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/pet/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Pet could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.patchPet = async (req, res) => {
  try {
    const update = {};
    for (const ops of req.body) {
      update[ops.propName] = ops.value;
    }
    const result = await Pet.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Pet ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/pet/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Pet could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.deletePet = async (req, res) => {
  try {
    const result = await Pet.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Pet ${result.name}, id: ${result._id} was deleted`,
      });
    }
    res.status(404).json({
      msg: "Pet not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
