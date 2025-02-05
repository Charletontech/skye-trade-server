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

const { protect } = require("../middleware/auth");
const { multerFileUpload } = require("../middleware/elite");

const {
  validateEliteVideoDetails,
  videoEndedWebhookObj,
} = require("../validators/elite");

// videos routes
router.post(
  "/create-elite-video",
  protect,
  multerFileUpload.array("files"),
  validateEliteVideoDetails,
  eliteVideo
);

router.get("/get-all-elite-videos/:videoId", protect, getAllEliteVideos);
router.get(
  "/get-all-elite-videos-analytics/:videoId",
  protect,
  getAllEliteVideosAnalytics
);
router.get(
  "/get-all-elite-video-views-count/:videoId",
  protect,
  getAllEliteVideosViewsCount
);

router.get("/webhook/video-played/:videoId", videoPlayedWebhook);
router.post("/webhook/video-ended", videoEndedWebhookObj, videoEndedWebhook);

module.exports = router;
