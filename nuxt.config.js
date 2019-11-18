module.exports = {
  head: {
    title: "B2 Upload Test",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "B2 Upload Test" },
      { hid: "title", name: "title", content: "Backblaze upload test" },
      { hid: "abstract", name: "abstract", content: "B2 upload" },
      { hid: "description", name: "description", content: "Organise" },
      { hid: "keywords", name: "keywords", content: "b2 upload" },
      { hid: "author", name: "author", content: "vohzd" },
      { hid: "language", name: "language", content: "EN" },
      { hid: "robots", name: "robots", content: "All" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  loading: { color: '#b56d82' },
  modules: [
    "@nuxtjs/axios"
  ],
  axios: {
    baseURL: "/",
    proxyHeaders: false,
    credentials: true
  }
}
