export class ApiRoutes {
  static launchCampaign = "/api/v1/campaign/launch";
  static campaign_metrics_increase_views =
    "/api/v1/campaign/metrics/increase-views";
  static campaign_metrics_increase_clicks =
    "/api/v1/campaign/metrics/increase-clicks";
  static removeAds = "/api/v1/ads/remove";
  static allAds = "/api/v1/ads/";
  static advertiserCampaigns = "/api/v1/campaign";
  static createBannerAd = "/api/v1/ads/create/banner";
  static createVideoAd = "/api/v1/ads/create/video";
  static login = "/api/v1/auth/login/";
  static logout = "/api/v1/auth/logout/";
  static addReferral = "/api/v1/referral/add";
  static getUserReferralData = "/api/v1/referral/";
  static cloudinaryCloudName = "fernanprojects";
  static cloudinarySignedVideoData =
    "/api/v1/auth/cloudinary/video-sign-request";
  static cloudinarySignedBannerData =
    "/api/v1/auth/cloudinary/banner-sign-request";
  static cloudinaryVideoEndPoint = `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/video/upload/`;
  static cloudinaryImageEndPoint = `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/image/upload/`;
  static stripePayWithPMethod = "/api/v1/payments/stripe/pay-campaign/with-pmethod";
  static stripePayWithoutPMethod = "/api/v1/payments/stripe/pay-campaign/without-pmethod";
  static paymentCompleted = () => {
    const host = window.location.host;
    if (host === "localhost:3000") return `http://${host}/campaigns`;
    else return `https://${host}/campaigns`;
  };
}
