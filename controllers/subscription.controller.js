import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";

export const getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.findById(req.params.id);

    if (!subscriptions) {
      const error = new Error("Subscriptions not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const createSubscription = async (req, res, next) => {
  try {
    const { name } = req.body;

    const existingSubscription = await Subscription.find({ name });

    if (existingSubscription) {
      const error = new Error("Subscription already esists for the user");
      error.statusCode = 409;
      throw error;
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    const { workflowRunId } = await workflowClient.trigger({
      url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
      body: {
        subscriptionId: subscription.id,
      },
      headers: {
        "content-type": "application/json",
      },
      retries: 0,
    });

    res
      .status(201)
      .json({ success: true, data: { subscription, workflowRunId } });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id != req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({ user: req.params.id });

    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const updateSubscription = async (req, res, next) => {
  const subscriptionId = req.params.id;

  const checkSubscription = await Subscription.findById(subscriptionId);

  if (!checkSubscription) {
    const error = new Error("Subscriptions not found");
    error.statusCode = 404;
    throw error;
  }

  const subscription = await Subscription.findByIdAndUpdate(subscriptionId, req.body, {new: true});

  res.status(200).json({ success: true, data: subscription });
  
};

export const deleteSubscription = async (req, res, next) => {
  const subscriptionId = req.params.id;

  const checkSubscription = await Subscription.findById(subscriptionId);

  if (!checkSubscription) {
    const error = new Error("Subscriptions not found");
    error.statusCode = 404;
    throw error;
  }
  
  const subscription = Subscription.findByIdAndDelete(subscriptionId);

  res.status(204).json({ success: true, data: subscription });
};

//for further upgrades
export const getUpcomingRenewals = async (req, res, next) => {};
