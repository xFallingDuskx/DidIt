const { withProjectBuildGradle } = require('expo/config-plugins');

module.exports = function withNdkVersionFix(config, { ndkVersion }) {
  return withProjectBuildGradle(config, async (config) => {
    const contents = config.modResults.contents;

    // Check if the ndkVersion is already defined
    const ndkVersionRegex = /ndkVersion\s*=\s*"[\d.]+"/;

    if (ndkVersionRegex.test(contents)) {
      // Replace the existing ndkVersion with the new one
      config.modResults.contents = contents.replace(
        ndkVersionRegex,
        `ndkVersion = "${ndkVersion}"`,
      );
    } else {
      // If ndkVersion is not defined, add it under the android block
      const androidBlockRegex = /android\s*{[^}]*}/s;
      config.modResults.contents = contents.replace(
        androidBlockRegex,
        (match) => {
          return match.replace(
            /android\s*{/,
            `android {\n    ndkVersion = "${ndkVersion}"`,
          );
        },
      );
    }

    return config;
  });
};
