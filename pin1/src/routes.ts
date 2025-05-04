import express from 'express';
import { CreateUserController } from './use-cases/create-user/create-user-controller';
import { ReadUserController } from './use-cases/read-user/read-user-controller';
import { UpdateUserController } from './use-cases/update-user/update-user-controller';
import { DeleteUserController } from './use-cases/delete-user/delete-user-controller';
import { CreateEmployeeController } from './use-cases/create-employee/create-employee-controller';
import { ReadEmployeeController } from './use-cases/read-employee/read-employee-controller';
import { DeleteEmployeeController } from './use-cases/delete-employee/delete-employee-controller';
import { UpdateEmployeeController } from './use-cases/update-employee/update-employee-controller';
import { CreateOrderController } from './use-cases/create-order/create-order-controller';
import { ReadOrderController } from './use-cases/read-order/read-order-controller';
import { DeleteOrderController } from './use-cases/delete-order/delete-order-controller';
import { UpdateOrderController } from './use-cases/update-order/update-order-controller';
import { CreateCartController } from './use-cases/create-cart/create-cart-controller';
import { ReadCartController } from './use-cases/read-cart/read-cart-controller';
import { UpdateCartController } from './use-cases/update-cart/update-cart-controller';
import { DeleteCartController } from './use-cases/delete-cart/delete-cart-controller';
import { CreateCatalogueController } from './use-cases/create-catalogue/create-catalogue-controller';
import { ReadCatalogueController } from './use-cases/read-catalogue/read-catalogue-controller';
import { UpdataCatalogueController } from './use-cases/update-catalogue/updade-catalogue-controller';
import { DeleteCatalogueController } from './use-cases/delete-catalogue/delete-catalogue-controller';
import { CreateItemController } from './use-cases/create-item/create-item-controller';
import { ReadItemController } from './use-cases/read-item/read-item-controller';
import { UpdateItemController } from './use-cases/update-item/update-item-controller';
import { DeleteItemController } from './use-cases/delete-item/delete-item-controller';
import { CreateProductController } from './use-cases/create-product/create-product-controller';
import { DeleteProductController } from './use-cases/delete-product/delete-product-controller';
import { ReadProductController } from './use-cases/read-product/read-product-controller';
import { UpdateProductController } from './use-cases/update-product/update-product-controller';
import { LoginController } from './use-cases/login/login-controller';
import { CreateClientAddressController } from './use-cases/create-clientAddress/create-clientAddress-controller';
import { UpdateClientAddressController } from './use-cases/update-clientAddress/update-clientAddress-controller';
import { ReadClientAddressController } from './use-cases/read-clientAddress/read-clientAddress-controller';
import { DeleteClientAddressController } from './use-cases/delete-clientAddress/delete-clientAddress-controller';
import { CreateClientController } from './use-cases/create-client/create-client-controller';
import { ReadClientController } from './use-cases/read-client/read-client-controller';
import { DeleteClientController } from './use-cases/delete-client/delete-client-controller';
import { GeneratePixController } from './use-cases/generate-pix/generate-pix-controller';

const routes = express.Router();

// set cors to allow all origins
routes.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', '*');
	res.header('Access-Control-Allow-Headers', '*');
	next();
});

routes.get('/', (req, res) => res.send('Pong!'));

// user routes
routes.post('/user', (req, res) => new CreateUserController().create(req, res));
routes.get('/user', (req, res) => new ReadUserController().read(req, res));
routes.get('/user/:id', (req, res) => new ReadUserController().findById(req, res));
routes.put('/user/:id', (req, res) =>new UpdateUserController().update(req, res),);
routes.delete('/user/:id', (req, res) =>new DeleteUserController().delete(req, res),);

// employee routes
routes.post('/employee', (req, res) =>
	new CreateEmployeeController().create(req, res),
);
routes.get('/employee', (req, res) =>
	new ReadEmployeeController().read(req, res),
);
routes.put('/employee/:id', (req, res) =>
	new UpdateEmployeeController().update(req, res),
);
routes.delete('/employee/:id', (req, res) =>
	new DeleteEmployeeController().delete(req, res),
);

// cart routes
routes.post('/cart', (req, res) => new CreateCartController().create(req, res));
routes.get('/cart', (req, res) => new ReadCartController().read(req, res));
routes.get('/cart/:id', (req, res) => new ReadCartController().readById(req, res));
routes.put('/cart/:id', (req, res) =>
	new UpdateCartController().update(req,res));
routes.delete('/cart/:id', (req, res) =>
	new DeleteCartController().delete(req, res),
);

// order routes
routes.post('/order', (req, res) => new CreateOrderController().create(req, res));
routes.get('/order', (req, res) => new ReadOrderController().read(req, res));
routes.put('/order/:id', (req, res) =>
 	new UpdateOrderController().update(req,res));
routes.delete('/order/:id', (req, res) =>
	new DeleteOrderController().delete(req, res),
);

// catalogue Routes
routes.post('/catalogue', (req, res) => new CreateCatalogueController().create(req, res));
routes.get('/catalogue', (req, res) => new ReadCatalogueController().read(req, res));
routes.put('/catalogue/:id', (req, res) =>new UpdataCatalogueController().update(req, res),);
routes.delete('/catalogue/:id', (req, res) =>new DeleteCatalogueController().delete(req, res),);

//item routes
routes.post('/item', (req, res) => new CreateItemController().create(req, res));
routes.get('/item', (req, res) => new ReadItemController().read(req, res));
routes.get('/item/cart/:cart_id', (req, res) => new ReadItemController().readByCartId(req, res));
routes.put('/item/:id', (req, res) =>new UpdateItemController().update(req, res),);
routes.delete('/item/:id', (req, res) =>new DeleteItemController().delete(req, res),);

// product routes
routes.post('/product', (req, res) => new CreateProductController().create(req, res));
routes.get('/product', (req, res) => new ReadProductController().read(req, res));
routes.get('/product/:id', (req, res) => new ReadProductController().readById(req, res));
routes.put('/product/:id', (req, res) => new UpdateProductController().update(req, res));
routes.delete('/product/:id', (req, res) => new DeleteProductController().delete(req, res));

//login routes
routes.post('/login', (req, res) => new LoginController().login(req, res));
// client routes
routes.post('/client', (req, res) => new CreateClientController().create(req, res));
routes.get('/client', (req, res) => new ReadClientController().read(req, res));
routes.get('/client/:id', (req, res) => new ReadClientController().readById(req, res));
routes.put('/client/:id', (req, res) => new UpdateCartController().update(req, res));
routes.delete('/client/:id', (req, res) => new DeleteClientController().delete(req, res));

// clientAddress routes
routes.post('/user', (req, res) => new CreateClientAddressController().create(req, res));
routes.get('/clientAddress', (req, res) => new ReadClientAddressController().read(req, res));
routes.get('/clientAddress/client/:client_id', (req, res) => new ReadClientAddressController().findByClientId(req, res));
routes.put('/clientAddress/:clad_id', (req, res) => new UpdateClientAddressController().update(req, res));
routes.delete('/clientAddress/:id', (req, res) => new DeleteClientAddressController().delete(req, res));

// pix routes
routes.get('/pix', (req, res) => new GeneratePixController().generate(req, res));

//cadastro Routes

export default routes;

