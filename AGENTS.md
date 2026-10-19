# Architecture rules
- Route public content reads through the browser-safe content cache, with bounded live requests and bundled fallback data, so backend outages do not block reading.
- Cache only public content globally; scope local viewing history by user and never treat cached data as authentication or proof of a successful server write.