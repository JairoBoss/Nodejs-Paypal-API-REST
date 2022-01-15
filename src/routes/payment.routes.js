module.exports = (app) => {
  const ordenes = require("../controller/payment.controller.js");
  var router = require("express").Router();

  router.post("/creando-orden", ordenes.crearOrden);

  router.get("/validando-orden", ordenes.validarOrden);

  router.get("/cancelando-orden", ordenes.cancelarOrden);

  app.use("/pagos", router);
};
