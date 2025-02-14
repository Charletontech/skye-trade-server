const asyncHandler = require("../middleware/async");
const {
  eliteVideoService,
  getAllEliteVideosService,
  getAllEliteVideosAnalyticsService,
  getAllEliteVideosViewsCountService,
  videoPlayedWebhookService,
  videoEndedWebhookService,
  createEliteMusicService,
  getAllEliteMusicService,
  getAllEliteMusicAnalyticsService,
  getAllEliteMusicStreamsCountService,
  musicPlayedWebhookService,
  musicEndedWebhookService,
  createElitePodcastService,
  addPodcastEpisodeService,
  getPodcastEpisodesService,
  getPodcastsService,
  podcastPlayedWebhookService,
  getEpisodeAnalyticsService,
  uploadEliteBookService,
  editEliteBookService,
  getEliteBooksService,
  deleteEliteBookService,
} = require("../services/elite");
const ErrorResponse = require("../utils/errorResponse");

// elite videos controllers
exports.eliteVideo = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await eliteVideoService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getAllEliteVideos = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllEliteVideosService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getAllEliteVideosAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllEliteVideosAnalyticsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});
exports.getAllEliteVideosViewsCount = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllEliteVideosViewsCountService(req, next);
    const prepare = {
      success: true,
      data: responseObj.length !== 0 ? responseObj : null,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
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
  try {
    const responseObj = await videoEndedWebhookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

// elite music controllers
exports.createEliteMusic = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await createEliteMusicService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});
exports.getAllEliteMusic = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllEliteMusicService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getAllEliteMusicAnalytics = asyncHandler(async (req, res, next) => {
  const responseObj = await getAllEliteMusicAnalyticsService(req, next);
  const prepare = {
    success: true,
    data: responseObj,
  };
  res.status(200).json(prepare);
});

exports.getAllEliteMusicStreamsCount = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getAllEliteMusicStreamsCountService(req, next);
    const prepare = {
      success: true,
      data: responseObj.length !== 0 ? responseObj : null,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.musicPlayedWebhook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await musicPlayedWebhookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.musicEndedWebhook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await musicEndedWebhookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

// podcast controllers
exports.createElitePodcast = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await createElitePodcastService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getPodcasts = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getPodcastsService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.addPodcastEpisode = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await addPodcastEpisodeService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getPodcastEpisodes = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getPodcastEpisodesService(req, next);
    const prepare = {
      success: true,
      data: responseObj.length !== 0 ? responseObj : null,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.podcastPlayedWebhook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await podcastPlayedWebhookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getEpisodeAnalytics = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getEpisodeAnalyticsService(req, next);
    const prepare = {
      success: true,
      data: responseObj.length !== 0 ? responseObj : null,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

// Elite Book Reading controllers
exports.uploadEliteBook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await uploadEliteBookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.getEliteBooks = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await getEliteBooksService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.editEliteBook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await editEliteBookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});

exports.deleteEliteBook = asyncHandler(async (req, res, next) => {
  try {
    const responseObj = await deleteEliteBookService(req, next);
    const prepare = {
      success: true,
      data: responseObj,
    };
    res.status(200).json(prepare);
  } catch (err) {
    next(new ErrorResponse(err.message.replace(/[\\"]/gi, ""), 500));
  }
});
