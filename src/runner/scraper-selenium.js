const { execFile } = require("child_process");

const scraperSelenium = async (sourceUrl) => {
  execFile(
    "node",
    ["src/runner/runner.js", sourceUrl],
    (err, stdout, stderr) => {
      console.log(stdout);
      console.log(stderr);
    },
  );
  return;
};

module.exports = { scraperSelenium };
