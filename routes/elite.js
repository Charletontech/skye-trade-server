const express = require("express");

const router = express.Router();

const {
  eliteVideo,
  getAllEliteVideos,
  getAllEliteVideosAnalytics,
  getAllEliteVideosViewsCount,
  videoPlayedWebhook,
  videoEndedWebhook,
  createEliteMusic,
  getAllEliteMusic,
  getAllEliteMusicAnalytics,
  getAllEliteMusicStreamsCount,
  musicPlayedWebhook,
  musicEndedWebhook,
  createElitePodcast,
  addPodcastEpisode,
  getPodcastEpisodes,
  getPodcasts,
  podcastPlayedWebhook,
  getEpisodeAnalytics,
  uploadEliteBook,
  editEliteBook,
  getEliteBooks,
  deleteEliteBook,
} = require("../controllers/elite");

const { protect, verified } = require("../middleware/auth");
const { multerFileUpload, multerBookUpload } = require("../middleware/elite");

const {
  validateEliteVideoDetails,
  videoEndedWebhookObj,
  validateEliteMusicDetails,
  musicEndedWebhookObj,
  validatePodcastObj,
  addPodcastEpisodeObj,
  podcastPlayedObj,
  validateBookObj,
  editBookObj,
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
  "/get-elite-video-analytics/:videoId",
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

// music routes
router.post(
  "/create-elite-music",
  protect,
  multerFileUpload.array("files"),
  validateEliteMusicDetails,
  createEliteMusic
);
router.get("/get-all-elite-music", protect, verified, getAllEliteMusic);
router.get(
  "/get-elite-music-analytics/:musicId",
  protect,
  verified,
  getAllEliteMusicAnalytics
);

router.get(
  "/get-elite-music-streams-count/:musicId",
  protect,
  verified,
  getAllEliteMusicStreamsCount
);

router.get("/webhook/music-played/:musicId", musicPlayedWebhook);

router.post("/webhook/music-ended", musicEndedWebhookObj, musicEndedWebhook);

// Podcast routes
router.post(
  "/create-elite-podcast",
  protect,
  verified,
  multerFileUpload.array("files"),
  validatePodcastObj,
  createElitePodcast
);

router.get("/get-podcasts", protect, verified, getPodcasts);

router.post(
  "/add-podcast-episode",
  protect,
  verified,
  multerFileUpload.array("files"),
  addPodcastEpisodeObj,
  addPodcastEpisode
);

router.get(
  "/get-podcast-episodes/:podcastId",
  protect,
  verified,
  getPodcastEpisodes
);

router.get(
  "/get-podcast-episode-analytic/:episodeId",
  protect,
  getEpisodeAnalytics
);

router.post("/webhook/podcast-played", podcastPlayedObj, podcastPlayedWebhook);

// book routes
router.post(
  "/upload-book",
  protect,
  verified,
  multerBookUpload,
  validateBookObj,
  uploadEliteBook
);

router.get("/get-books", protect, verified, getEliteBooks);

router.put(
  "/edit-book-data/:bookId",
  protect,
  verified,
  editBookObj,
  editEliteBook
);

router.get("/delete-book/:bookId", protect, verified, deleteEliteBook);

module.exports = router;
