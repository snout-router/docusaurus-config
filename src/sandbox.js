module.exports = {
  buildUrl,
}

function buildUrl (id) {
  const url = new URL('https://codesandbox.io/')
  url.pathname = `/s/${id}`

  return url.toString()
}
