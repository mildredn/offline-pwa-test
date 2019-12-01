importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');
importScripts("localforage.js");

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.CacheFirst()
);


workbox.routing.registerRoute(
  // Cache CSS files.
  /\.css$/,
  // Use cache but update in the background.
  new workbox.strategies.StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache',
  })
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);

workbox.routing.registerRoute(
    new RegExp('/courses'),
    new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
  new RegExp('/'),
  new workbox.strategies.CacheFirst()
);

workbox.routing.registerRoute(
    new RegExp('http://localhost:3001/courses/\\?slug'),
    (event) => {
            return fetch(event.url)
                .then(resp => {
                    return resp
                }).catch(async err => {
                    const slug = event.url.search.substring(event.url.search.lastIndexOf("=")+1);
                    return await localforage.getItem(event.url.pathname).then(body => {
                        const result = body.find(r => r.slug === slug);
                        let payload = new Blob([JSON.stringify([result],null,2)], {
                            type: "application/json",
                        });
                        let init = {
                            status: 200,
                            statusText: "OK",
                            url: event.url.pathname.toString()
                        };
                        let response = new Response(payload, init);
                        return response
                    })
                })
        }
    );

workbox.routing.registerRoute(
    new RegExp('http://localhost:3001/courses/$'),
    (event) => {
        return fetch(event.url)
            .then(resp => {
                var cloneRes = resp.clone();
                cloneRes.json().then(body => {
                    localforage.setItem(event.url.pathname, body);
                });
                return resp
            }).catch(async err => {
                return await localforage.getItem(event.url.pathname).then(body => {
                    let payload = new Blob([JSON.stringify(body,null,2)], {
                        type: "application/json",
                    });
                    let init = {
                        status: 200,
                        statusText: "OK",
                        url: event.url.pathname.toString()
                    };
                    let response = new Response(payload, init);
                    return response
                })
            })
    }
);

function createSlug(value) {
  return value
    .replace(/[^a-z0-9_]+/gi, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

const queue = new workbox.backgroundSync.Queue('myQueueName');

const customHandler = (event) => {
    const test = event.request.clone();
    const lfReq = event.request.clone();

    return test.json().then((body) => {
        return fetch(event.url,  {
            method: "POST", // POST for create, PUT to update when id already exists.
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
            })
            .then((resp) => {
                return resp
            })
            .catch((err) => {
                queue.pushRequest({request: event.request});
                localforage.getItem('/courses/').then(lfBody => {
                    lfReq.json().then((body) => {
                        tempCourse =  {
                            authorId: body.authorId,
                            category: body.category,
                            createdAt: Date.now(),
                            id: lfBody.length + 1,
                            slug: createSlug(body.title),
                            title: body.title,
                        };

                        lfBody.push(tempCourse);

                        localforage.setItem('/courses/', lfBody)
                    })
                });

                let payload = JSON.stringify({});
                let init = {
                    status: 201,
                    statusText: "OK",
                    url: event.url.pathname.toString()
                };
                return new Response(payload, init);
            })
    })
};

const customPUTHandler = (event) => {
    const test = event.request.clone();
    const lfReq = event.request.clone();

    return test.json().then((body) => {
        return fetch(event.url,  {
            method: "PUT", // POST for create, PUT to update when id already exists.
            headers: { "content-type": "application/json" },
            body: JSON.stringify(body)
            })
            .then((resp) => {

                return resp
            })
            .catch((err) => {
                queue.pushRequest({request: event.request});

                const id = parseInt(event.url.pathname.substring(event.url.pathname.lastIndexOf("/")+1), 10);

                localforage.getItem('/courses/').then(lfBody => {

                    const old = lfBody.find(r => r.id === id);
                    const oldIndex = lfBody.indexOf(old);

                    lfReq.json().then((body) => {
                        tempCourse =  {
                            authorId: body.authorId,
                            category: body.category,
                            id: body.id,
                            slug: body.slug,
                            title: body.title,
                        };
                        lfBody[oldIndex] = tempCourse;
                        localforage.setItem('/courses/', lfBody)
                    })
                });

                let payload = JSON.stringify({});
                let init = {
                    status: 200,
                    statusText: "OK",
                    url: event.url.pathname.toString()
                };
                return new Response(payload, init);
            })
    })
};

workbox.routing.registerRoute(
    /http:\/\/localhost:3001\/courses\//,
    customHandler,
    "POST"
);

workbox.routing.registerRoute(
    /http:\/\/localhost:3001\/courses\//,
    customPUTHandler,
    "PUT"
);



workbox.routing.setDefaultHandler(({url, event, params}) => {
  console.log(url)
});




