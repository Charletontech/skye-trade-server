const express = require("express");

const router = express.Router();

const {
  eliteVideo,
  getAllEliteVideos,
  getAllEliteVideosAnalytics,
  getAllEliteVideosViewsCount,
  videoPlayedWebhook,
  videoEndedWebhook,
} = require("../controllers/elite");

const { protect, verified } = require("../middleware/auth");
const { multerFileUpload } = require("../middleware/elite");

const {
  validateEliteVideoDetails,
  videoEndedWebhookObj,
} = require("../validators/elite");

// videos routes
router.post(
  "/create-elite-video",
  protect,
  verified,
  multerFileUpload.array("files"),
  validateEliteVideoDetails,
  eliteVideo
);

router.get("/get-all-elite-videos", protect, verified, getAllEliteVideos);
router.get(
  "/get-all-elite-videos-analytics/:videoId",
  protect,
  verified,
  getAllEliteVideosAnalytics
);
router.get(
  "/get-all-elite-video-views-count/:videoId",
  protect,
  verified,
  getAllEliteVideosViewsCount
);

router.get("/webhook/video-played/:videoId", videoPlayedWebhook);
router.post("/webhook/video-ended", videoEndedWebhookObj, videoEndedWebhook);

module.exports = router;
