/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/{query}",
  duckduckgo: "https://duckduckgo.com/?q={query}",
  ecosia: "https://www.ecosia.org/search?q={query}",
  google: "https://www.google.com/search?q={query}",
  startpage: "https://www.startpage.com/search?q={query}",
  youtube: "https://www.youtube.com/results?q={query}",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  const url = engineUrls[engine] ?? engine
  return url.replace("{query}", value)
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"GzSSgmYfhYVysbGQ","label":"SOCIAL","bookmarks":[{"id":"J4vorZF6ZmAOw4vq","label":"tumblr","url":"https://www.tumblr.com/dashboard/following"},{"id":"jTouWtKEdRtDroEe","label":"youtube","url":"https://www.youtube.com"},{"id":"NkPfKXYbUwoJ6CYD","label":"spacehey","url":"https://spacehey.com/1730096"},{"id":"p2Bgvr1nTJnA0eN2","label":"neocities","url":"https://neocities.org/browse"}]},{"id":"Sps8zvcKwQ9dhG0s","label":"GAMES","bookmarks":[{"id":"FhFPykCXSlcpYdVH","label":"pgr","url":"https://grayravens.com/"},{"id":"fDP5j3HvjlqAcvHh","label":"crk","url":"https://www.reddit.com/r/CookieRunKingdoms/"},{"id":"MXlqq5k3pxLNSgro","label":"maze","url":"https://maze.toys"},{"id":"pz4GBST1hCBT1T40","label":"dangan order","url":"https://docs.google.com/document/d/149_BH8_Op_3DBNWlMrd-ADdn-ddpZ2UV6bDxz8M-eP4/"}]},{"id":"jDXxHGku856jrYA4","label":"DOWNLOADS","bookmarks":[{"id":"6JBTflVaFqgowgmH","label":"fitgirl","url":"https://fitgirl-repacks.site/"},{"id":"WFI0cuJcqVn5Ff07","label":"csrin","url":"https://cs.rin.ru/forum/"},{"id":"tXnZjFZSbBTaOl9Y","label":"nyaa","url":"https://nyaa.si"},{"id":"4MwSLXZUVGp8ChKM","label":"music","url":"https://spotidownloader.com/"}]},{"id":"JoFYh60qPLEhkPhV","label":"USEFUL","bookmarks":[{"id":"jbUfsfgj5xdEmEMd","label":"bash bible","url":"https://github.com/dylanaraps/pure-bash-bible"},{"id":"3YZH5k7A4IOl69aq","label":"milanote","url":"https://app.milanote.com/"},{"id":"k31e5Y9iOtaNMKjT","label":"colorpick","url":"https://html-color.codes/"},{"id":"E7GFYNn0uRapQJjW","label":"translate","url":"https://translate.google.com/?sl=auto&tl=en&op=translate"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
