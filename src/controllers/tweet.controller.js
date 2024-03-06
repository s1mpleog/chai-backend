import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;

  if (!content) {
    return new ApiError(400, "Content is required");
  }

  const tweet = await Tweet.create({
    content,
    owner: req.user._id,
  });

  return new ApiResponse(201, tweet, "Tweet created ok");
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const userId = req.user._id;

  const tweets = await Tweet.find({
    owner: userId,
  });

  if (!tweets) {
    return new ApiError(404, "Tweets not found");
  }
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!content) {
    return new ApiError(404, "Please provide text");
  }

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    return new ApiError(404, "Tweet not found");
  }

  tweet.content = content;

  await tweet.save();

  return new ApiResponse(200, tweet, "Tweet updated success");
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;

  await Tweet.findByIdAndDelete(tweetId);

  return new ApiResponse(200, {}, "Tweet deleted success");
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
