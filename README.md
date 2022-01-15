# Nodejs-Paypal-API-REST

API-REST Para integrar en algún proyecto donde necesites hacer pagos
## Requisitos
Necesitas crear una cuenta Business Sandbox en la página [developer de paypal](https://developer.paypal.com/developer/accounts), después en la parte de [My Apps & Credentials](https://developer.paypal.com/developer/applications) tienes que crear una nueva app (con la cuenta que acabas de crear), después de esto tienes que colocar tu Client ID y secrect en el [.env](https://github.com/JairoBoss/Nodejs-Paypal-API-REST/blob/main/.env).

De igual forma necesitas crear una cuenta Personal Sandbox para hacer las pruebas.

## Instalación
```bash
git clone https://github.com/JairoBoss/Nodejs-Paypal-API-REST.git
cd Nodejs-Paypal-API-REST
npm install
```

## Uso
Antes de seguir necesitas asignar un numero de puerto en el [.env](https://github.com/JairoBoss/Nodejs-Paypal-API-REST/blob/main/.env) a las siguientes variables: (ejemplo)

SERVER_URL="http://localhost:3000"

PORT=3000

Después de haber asignado las variables de entorno, para empezar a usarlo necesitas 
```bash
npm run dev
```

## Ejemplos
En mi caso use postman para hacer pruebas. Hice una peticion post a 
[localhost:3000/pagos/creando-orden](localhost:3000/pagos/creando-orden) con los siguientes datos
```json
{
    "nombre": "Jairo",
    "cantidad": 1500,
    "motivo": ", compra de un celular"
}
```

Esto nos devolverá un JSON con el ID de la transaccion de paypal, el status y un array de links, el que nos importa es el segundo, el que tiene la propiedad de _approve_.

![image](https://user-images.githubusercontent.com/61020858/149610038-ccb73ff9-f619-41f4-8952-1efa8a973a43.png)

Este link nos llevara a la página de PayPal, donde vamos a iniciar sesión con la cuenta Personal Sandbox para poder pagar.

![image](https://user-images.githubusercontent.com/61020858/149610269-f1e5af0f-d9a4-434c-b113-ac1a83b4491c.png)

Después de pagar nos redireccionará a la siguiente pagina.

![image](https://user-images.githubusercontent.com/61020858/149610339-63b693c2-ac25-46ca-82ed-e27f20b71081.png)

Si quieres ver las transacciones que has realizado en tus cuentas Personal y Business Sandbox tienes que iniciar sesión [aquí](https://www.sandbox.paypal.com/signin)


## Comentario
Si piensas usar PayPal como método de pago para productos o servicios con un costo menor a $100 MXN, recomendaría optar por usar [stripe](https://stripe.com/mx), ya que la comisión es menor, suponiendo que vas a recibir un pago de $100 MXN

En PayPal al final recibes $86.01 MXN

![image](https://user-images.githubusercontent.com/61020858/149610673-c80318c7-22d1-419e-be1f-8dbe91e98d18.png)

Y en Stripe recibes $92.34 MXN

![image](https://user-images.githubusercontent.com/61020858/149610737-06d73769-0cc3-4329-ae8c-b9f1e54ab26f.png)
