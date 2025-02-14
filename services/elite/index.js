module.exports = {
  // importing all elite videos services
  eliteVideoService: require("./eliteVideo/eliteVideo"),
  getAllEliteVideosService: require("./eliteVideo/getAllEliteVideos"),
  getAllEliteVideosAnalyticsService: require("./eliteVideo/getAllEliteVideosAnalytics"),
  getAllEliteVideosViewsCountService: require("./eliteVideo/getAllEliteVideosViewsCount"),
  videoPlayedWebhookService: require("./eliteVideo/videoPlayedWebhook"),
  videoEndedWebhookService: require("./eliteVideo/videoEndedWebhook"),
  // importing all elite music services
  createEliteMusicService: require("./eliteMusic/createEliteMusic"),
  getAllEliteMusicService: require("./eliteMusic/getAllEliteMusic"),
  getAllEliteMusicAnalyticsService: require("./eliteMusic/getAllEliteMusicAnalytics"),
  getAllEliteMusicStreamsCountService: require("./eliteMusic/getAllEliteMusicStreamsCount"),
  musicPlayedWebhookService: require("./eliteMusic/musicPlayedWebhook"),
  musicEndedWebhookService: require("./eliteMusic/musicEndedWebhook"),
  // importing all elite podcast services
  createElitePodcastService: require("./elitePodcast/createElitePodcast"),
  getPodcastsService: require("./elitePodcast/getPodcasts"),
  addPodcastEpisodeService: require("./elitePodcast/addPodcastEpisode"),
  getPodcastEpisodesService: require("./elitePodcast/getPodcastEpisodes"),
  podcastPlayedWebhookService: require("./elitePodcast/podcastPlayedWebhook"),
  getEpisodeAnalyticsService: require("./elitePodcast/getEpisodeAnalytics"),
  // importing all elite books services
  uploadEliteBookService: require("./eliteBooks/uploadEliteBook"),
  editEliteBookService: require("./eliteBooks/editEliteBook"),
  getEliteBooksService: require("./eliteBooks/getEliteBooks"),
  deleteEliteBookService: require("./eliteBooks/deleteEliteBook"),
};
