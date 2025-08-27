import { Router } from "express";
import { createSubscription, deleteSubscription, getSubscription, getSubscriptions, getUpcomingRenewals, getUserSubscriptions, updateSubscription } from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const subscriptionRouter = Router();

subscriptionRouter.get('/', getSubscriptions);

subscriptionRouter.get('/:id', getSubscription);

subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', authorize, updateSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/upcoming-renewals', authorize, getUpcomingRenewals);

export default subscriptionRouter;