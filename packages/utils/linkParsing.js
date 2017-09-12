const twitter = require('./twitter.text');

module.exports = {
  parseTwitterLinks: text =>
    twitter.extractEntitiesWithIndices(text)
      .map((entity) => {
        if (entity.url) {
          return {
            displayString: entity.url,
            indices: entity.indices,
            rawString: entity.url,
            url: entity.url,
          };
        } else if (entity.hashtag) {
          return {
            displayString: `#${entity.hashtag}`,
            indices: entity.indices,
            rawString: `#${entity.hashtag}`,
            url: `https://twitter.com/#!/search?q=%23${entity.hashtag}`,
          };
        } else if (entity.screenName) {
          return {
            displayString: `@${entity.screenName}`,
            indices: entity.indices,
            rawString: `@${entity.screenName}`,
            url: `https://twitter.com/${entity.screenName}`,
          };
        } else if (entity.cashtag) {
          return {
            displayString: `$${entity.cashtag}`,
            indices: entity.indices,
            rawString: `$${entity.cashtag}`,
            url: `https://twitter.com/#!/search?q=%24${entity.cashtag}`,
          };
        }
        return null;
      })
      .filter(entity => entity !== null),
};
