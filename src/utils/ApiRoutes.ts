export class ApiRoutes {
  static readonly launchCampaign = "/api/v1/campaign/launch";
  static readonly campaign_metrics_increase_views =
    "/api/v1/campaign/metrics/increase-views";
  static readonly campaign_metrics_increase_clicks =
    "/api/v1/campaign/metrics/increase-clicks";
  static readonly removeAds = "/api/v1/ads/remove";
  static readonly advertiserAds = "/api/v1/ads/";
  static readonly advertiserCampaigns = "/api/v1/campaign";
  static readonly createAd = "/api/v1/ads/create/";
  static readonly createBannerAd = "/api/v1/ads/create/banner";
  static readonly createVideoAd = "/api/v1/ads/create/video";
  static readonly login = "/api/v1/auth/login/";
  static readonly logout = "/api/v1/auth/logout/";
  static readonly addReferral = "/api/v1/referral/add";
  static readonly getUserReferralData = "/api/v1/referral/get-data";
  static readonly cloudinaryCloudName = "fernanprojects";
  static readonly cloudinarySignedProfilePic =
    "/api/v1/auth/cloudinary/profilepic-sign-request";
  static readonly cloudinarySignedVideoData =
    "/api/v1/auth/cloudinary/video-sign-request";
  static readonly cloudinarySignedBannerData =
    "/api/v1/auth/cloudinary/banner-sign-request";
  static readonly cloudinaryVideoEndPoint = `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/video/upload/`;
  static readonly cloudinaryImageEndPoint = `https://api.cloudinary.com/v1_1/${this.cloudinaryCloudName}/image/upload/`;
  static readonly stripePayWithPMethod =
    "/api/v1/payments/stripe/campaign/with-pmethod";
  static readonly stripePayWithoutPMethod =
    "/api/v1/payments/stripe/campaign/without-pmethod";
  static readonly paymentCompleted = () => {
    const host = window.location.host;
    if (host === "localhost:3000") return `http://${host}/campaigns`;
    else return `https://${host}/campaigns`;
  };
  static readonly advertiserDataProfile = "/api/v1/profile";
  static readonly updateProfile = "/api/v1/profile/update";
  static readonly stripeSetupIntent = "/api/v1/payments/stripe/setup-intent";
  static readonly stripeSaveNewPaymentMethod =
    "/api/v1/payments/stripe/save-new-pm";
  static readonly stripeRemovePaymentMethod =
    "/api/v1/payments/stripe/remove-pm";
  static readonly stripeGetCardDetails = (pmId: string) =>
    `/api/v1/payments/stripe/cards/get-card-details?pmId=${pmId}`;

    static readonly websocketDisconnect = "api/v1/channel-events/close-connection";
    static readonly websocketAdWatched = "api/v1/channel-events/ad-watched";
}
