const asyncCatch = require("express-async-catch");
const AppError = require("../utils/AppError");
const { selectModel } = require("../utils/selectModel");
const bcrypt = require("bcrypt");

const api = "http://localhost:5001/uploads/";

//create
const _create = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);
  console.log(req.body);
  if (model) {
    const count = (await model.countDocuments()) + 1;

    const data = await model.create({
      ...req.body,
      image: req.files?.image ? api + req.files.image[0]?.filename : undefined,
      logo: req.files?.logo ? api + req.files.logo[0]?.filename : undefined,
    });

    if (!data)
      return next(
        new AppError("something went wrong unable to create the data")
      );

    return res.status(201).json({
      status: "Success",
      message: "data created successfully",
      data,
    });
  }
});

//read
const _read = asyncCatch(async (req, res, next) => {
  console.log(req.body, req.query, req.params);
  const model = selectModel(req.params.table, next);

  if (model) {
    const params = { ...req.query };
    //removing unnecessary queries for advanced fetching
    const remove = [
      "sort",
      "page",
      "limit",
      "fields",
      "limits",
      "searchField",
      "searchValue",
      "populate",
    ];
    remove.forEach((el) => delete params[el]);

    //filtering
    let queryObject = JSON.parse(
      JSON.stringify(params).replace(
        /\b(gte|lte|lt|gt|eq|ne|or)\b/g,
        (match) => `$${match}`
      )
    );

    //searching
    if (req.query.searchField)
      queryObject[req.query.searchField] = new RegExp(
        req.query.searchValue,
        "gi"
      );

    //sorting
    const query = model.find({ ...queryObject });

    req.query.sort
      ? query.sort(req.query.sort.split(",").join(" "))
      : query.sort("-createdAt");

    //limiting fields
    const fields = req.query.fields
      ? req.query.fields.split(",").join(" ")
      : "-_v";
    query.select(fields);

    //pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || null;
    const skip = (page - 1) * limit;
    query.skip(skip).limit(limit);

    console.log(req.query);
    //populating
    query?.populate(req?.query?.populate?.split(",").join(" "));

    req.query.limits ? query.limit(req.query.limits) : null;

    const total = model.countDocuments({ ...queryObject });
    const data = await Promise.all([total, query]);

    return res.status(200).json({
      status: "success",
      length: data.length,
      total: data[0],
      data: data[1],
    });
  }
  return next(new AppError("something went wrong please try again!!", 500));
});

//update
const _update = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  //remove persistent data from being updated
  const remove = ["password", "role"];
  remove.forEach((el) => delete req.params[el]);

  console.log(model, req.params, req.body);
  if (model) {
    const data = await model.findOneAndUpdate(
      { _id: req.query.id },
      {
        ...req.body,
        profilePicture: req.files?.profilePicture
          ? api + req.files.profilePicture[0]?.filename
          : undefined,
      },
      { runValidators: true, new: true }
    );

    if (!data)
      return next(
        new AppError("something went wrong unable to update the data")
      );

    return res
      .status(201)
      .json({ status: "Success", message: "data updated successfully", data });
  }
  return next(new AppError("something went wrong please try again!!", 500));
});

//delete
const _delete = asyncCatch(async (req, res, next) => {
  const model = selectModel(req.params.table, next);

  if (model) {
    const data = await model.findByIdAndDelete(req.query.id);

    if (!data)
      return next(
        new AppError("something went wrong unable to delete the data")
      );

    return res
      .status(201)
      .json({ status: "Success", message: "data deleted successfully" });
  }
  return next(new AppError("something went wrong please try again!!", 500));
});

module.exports = { _create, _read, _update, _delete };
