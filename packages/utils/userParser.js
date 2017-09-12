module.exports = userData => ({
  id: userData.id,
  email: userData.email,
  avatar: 'https://pbs.twimg.com/profile_images/847849987841167360/WEVTxvUA_400x400.jpg', // userData.avatar,
  /* TODO: Return the actual `avatar` once the API is doing that. */
  features: userData.features,
  hasTwentyFourHourTimeFormat: userData.twentyfour_hour_time,
  imageDimensionsKey: userData.imagedimensions_key,
  is_business_user: ( // Same logic as user_model.php#onBusinessPlan()
    userData.features.includes('improved_analytics') ||
    (userData.plan_code >= 10 && userData.plan_code <= 19)
  ),
  is_free_user: userData.plan === 'free',
  skip_empty_text_alert: userData.messages.includes('remember_confirm_saving_modal'),
  profile_groups: userData.profile_groups || [],
  s3_upload_signature: userData.s3_upload_signature,
  uses_24h_time: userData.twentyfour_hour_time,
  week_starts_monday: userData.week_starts_monday,
});
