export class ApiRoutes{
    static launchCampaign = "/api/v1/campaign/launch";
    static campaignMetrics = "/api/v1/campaign/metrics";
    static removeAds = "/api/v1/ads/remove";
    static allAds = "/api/v1/ads/";
    static advertiserCampaigns = "/api/v1/campaign";
    static createBannerAd = "/api/v1/ads/create/banner";
    static createVideoAd = "/api/v1/ads/create/video";
    static login = "/api/v1/auth/login/";
    static logout = "/api/v1/auth/logout/";
    static addReferral = "/api/v1/referral/add";
    static getUserReferralData = "/api/v1/referral/"
    static getCloudinarySignedData = "/api/v1/auth/cloudinary/";
    static cloudinaryVideoEndPoint = "https://api.cloudinary.com/v1_1/fernanprojects/video/upload/";
    static cloudinaryImageEndPoint = "https://api.cloudinary.com/v1_1/fernanprojects/image/upload/";
}