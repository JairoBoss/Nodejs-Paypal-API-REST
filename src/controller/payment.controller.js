const axios = require("axios");
const { param } = require("express/lib/request");

exports.crearOrden = async (req, res) => {
  try {
    if (!req.body.cantidad || !req.body.motivo) {
      if (!req.body.cantidad) {
        res.status(400).send({
          message: "Error debes de colocar una cantidad.",
        });
      } else if (!req.body.motivo) {
        res.status(400).send({
          message: "Error debes de colocar un motivo.",
        });
      }
      return;
    }

    const datos = {
      nombre: req.body.nombre,
      cantidad: req.body.cantidad,
      motivo: req.body.motivo,
    };

    const order = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "MXN",
            value: datos.cantidad,
          },
          description: datos.motivo,
        },
      ],
      application_context: {
        brand_name: `Mercado libre${datos.motivo}`, //Nombre de la tienda
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${process.env.SERVER_URL}/pagos/validando-orden`,
        cancel_url: `${process.env.SERVER_URL}/pagos/cancelando-orden`,
      },
    };

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_SECRECT,
        },
      }
    );

    const response = await axios.post(
      "https://api-m.sandbox.paypal.com/v2/checkout/orders",
      order,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    
    return res.send(response.data);

  } catch (error) {
    return res.status(500).send(`Ocurrio un error al crear la  orden`);
  }
};

exports.validarOrden = async (req, res) => {
  const { token } = req.query;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const {
      data: { access_token },
    } = await axios.post(
      "https://api-m.sandbox.paypal.com/v1/oauth2/token",
      params,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.PAYPAL_API_CLIENT,
          password: process.env.PAYPAL_API_SECRECT,
        },
      }
    );

    const response = await axios.post(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
      {},
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    //console.log(response.data);
    res.send(`Orden validada con el siguiente ID ${response.data.id}`);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "error" });
  }
};

exports.cancelarOrden = (req, res) => {
  res.send(`Cancelando orden`);
};
