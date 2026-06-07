/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "startpage"
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

const bookmarks = [{"id":"Dg2H2MLKYY79tDpW","label":"social","bookmarks":[{"id":"1VcWsmb6DuIcbfJp","label":"youtube","url":"youtube.com"},{"id":"CANb9QSsgwIfxprL","label":"tumblr","url":"tumblr.com"},{"id":"Ok1MIYkxQP8dlTDe","label":"napo","url":"napochan.moe"}]},{"id":"fWKyCxMRNmdkybie","label":"self","bookmarks":[{"id":"1BLU87Uj5QIgFDcM","label":"pluralspace","url":"pluralspace.app"},{"id":"JawFfIo56upp9x9R","label":"milanote","url":"https://app.milanote.com/"},{"id":"JvcDdZmU6L0QyNML","label":"maze","url":"https://maze.toys/"}]},{"id":"IAO4z5PzfKLugrYn","label":"media","bookmarks":[{"id":"j7tcjSpBWCSQgiis","label":"everythingmoe","url":"https://everythingmoe.com/"},{"id":"5VUC5bIfNe9In4mA","label":"spotidown","url":"https://spotidownloader.com/"},{"id":"8Ez0s6jzPQY1zRGo","label":"csrin","url":"cs.rin.ru/forum"}]},{"id":"xnXYye1aLTs05DSo","label":"useful","bookmarks":[{"id":"ZdQiluZnukBWAGL3","label":"crouton.net","url":"crouton.net"},{"id":"kZCAzCrX13mHDIGC","label":"being many","url":"https://beingmany.net/"},{"id":"VMIELZSTA7KGDdZC","label":"translate","url":"https://translate.google.com/?sl=auto&tl=en&op=translate"}]}]

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
