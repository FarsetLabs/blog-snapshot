# Blog Snapshot

Snapshot of the Farset Labs blog, taken `13/02/2024`

Blog hosted at https://blog.farsetlabs.org.uk

## Steps taken to generate the blog snapshot

Grab all website files using `wget`
```sh
./scrape.sh
```

Generate a list of the lazy loaded iamges which will have been missed

```sh
node generate-lazy-images-script/index.js > ./get-lazy-images.sh
```

Grab all the lazy loading images using `wget`
```sh
./get-lazy-images.sh
```

## View the blog snapshot

Run a simple server in the `blog.farsetlabs.org.uk/` directory.

**Example:**
```sh
cd blog.farsetlabs.org.uk
python -m SimpleHTTPServer 8080
```
And open your browser at http://localhost:8080