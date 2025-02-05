const asyncHandler = require("../middleware/async");
const {
  eliteVideoService,
  getAllEliteVideosService,
  getAllEliteVideosAnalyticsService,
  getAllEliteVideosViewsCountService,
  videoPlayedWebhookService,
  videoEndedWebhookService,
} = require("../services/elite");

exports.eliteVideo = asyncHandler(async (req, res, next) => {
  const responseObj = await eliteVideoService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getAllEliteVideos = asyncHandler(async (req, res, next) => {
  const responseObj = await getAllEliteVideosService(req, next);
  const prepare = {
    success: true,
    data: responseObj.length !== 0 ? responseObj : null,
  };
  res.status(200).json(prepare);
});

exports.getAllEliteVideosAnalytics = asyncHandler(async (req, res, next) => {
  const responseObj = await getAllEliteVideosAnalyticsService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getAllEliteVideosViewsCount = asyncHandler(async (req, res, next) => {
  const responseObj = await getAllEliteVideosViewsCountService(req, next);
  const prepare = {
    success: true,
    data: responseObj.length !== 0 ? responseObj : null,
  };
  res.status(200).json(prepare);
});

exports.videoPlayedWebhook = asyncHandler(async (req, res, next) => {
  const responseObj = await videoPlayedWebhookService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.videoEndedWebhook = asyncHandler(async (req, res, next) => {
  const responseObj = await videoEndedWebhookService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});
