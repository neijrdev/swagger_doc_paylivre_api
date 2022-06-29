import express from "express";
import ApiDocController from "./controllers/ApiDocController";
const routes = express();

const apiDocController = new ApiDocController();

routes.get("/api-docs/json", apiDocController.index);

export default routes;
