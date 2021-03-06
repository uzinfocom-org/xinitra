import data from "../all.json" assert { type: "json" };

const pattern = new RegExp(
  "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i",
);

const childObjects = ["name", "desc", "author", "link"];

Deno.test("Testing for Object child", () => {
  for (const item of data) {
    for (const prop of Object.keys(item)) {
      if (!childObjects.includes(prop)) {
        throw new Error(`Unknown property at ${item.name}`);
      }
    }
  }
});

Deno.test("Testing for URL Format", () => {
  for (const item of data) {
    if (!pattern.test(item.link)) {
      throw new Error(`Not valid URL Format at ${item.name}`);
    }
  }
});
