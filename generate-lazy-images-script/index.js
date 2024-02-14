const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");
const { glob } = require("glob");

(async () => {
  const files = await glob(
    path.resolve(__dirname, "../blog.farsetlabs.org.uk/**/*.html"),
    { ignore: "node_modules/**" },
  );

  let images = [];
  files.forEach((file) => {
    const html = fs.readFileSync(file, "utf8");

    const $ = cheerio.load(html);

    $("img").each((_, element) => {
      const srcset = $(element).attr("data-srcset");
      if (srcset) {
        const urls = srcset.split(",").map((url) => {
          return url.trim().split(" ")[0];
        });
        images = images.concat(
          urls.map((url) => url.replace("https://blog.farsetlabs.org.uk", "")),
        );
      }

      const src = $(element).attr("data-src");
      if (src) {
        images = images.concat([
          src.replace("https://blog.farsetlabs.org.uk", ""),
        ]);
      }
    });
  });

  const uniqueUrlPaths = Array.from(new Set(images));
  const commands = uniqueUrlPaths
    .filter((urlPath) => {
      // Filter out full URLs which are external to the blog
      return !urlPath.startsWith("http://") && !urlPath.startsWith("https://");
    })
    .map((urlPath) => {
      return `wget "https://blog.farsetlabs.org.uk${urlPath}" --no-clobber --directory-prefix "./blog.farsetlabs.org.uk${path.dirname(urlPath)}"`;
    });
  console.log(commands.join("\n"));
})();
