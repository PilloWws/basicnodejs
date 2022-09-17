import express from "express";
import homeController from '../controller/homeController.js';
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/detail/user/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.get('/about', (req, res) => {
        res.send(`Hello mm`);
    })
    return app.use('/', router)
}

export default initWebRoute;