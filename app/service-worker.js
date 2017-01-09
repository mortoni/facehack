/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/components/card/card.ctrl.js","7e39d6f25eb683c9a30f032513135750"],["/components/card/card.tpl.html","d78dfcd861534d572f6eb82100bc7b8d"],["/components/components.module.js","87370e07da259a7ae2faae45f4e2801b"],["/components/contents-pool/contents-pool.ctrl.js","6989d701bfadf8f016b4ea82be5411e7"],["/components/contents-pool/contents-pool.tpl.html","b736aef80018c5ed9b8b8c6660ed66c4"],["/components/database/database.ctrl.js","2e46ac7a9917872523d20c6d98b7d455"],["/components/database/database.tpl.html","dc029d0f31870c81b21b8be84d9cbdf6"],["/components/pages-pool/pages-pool.ctrl.js","7660ca1adf30c5c6f1576ec6f4eedc61"],["/components/pages-pool/pages-pool.tpl.html","0ebc4bfef069bcd8a1ecf9db193ea7ac"],["/components/profile/profile.ctrl.js","0b53ead35a5815a51a726a8ea2a45e4b"],["/components/profile/profile.tpl.html","7017e32395414021775ed1a80417ebfb"],["/components/sidebar/sidebar.ctrl.js","f186c207b437ee94ec7b23ecd8b7006c"],["/components/sidebar/sidebar.tpl.html","88d83f17d5deff826d036ac5143f7a07"],["/images/facehack.png","083d498c3c0fc1d1e1dda47264f4096c"],["/images/facehack2.png","94e4ba5eeff0670cd0fa7da326bad8ce"],["/images/logo.svg","a911ed4910c578a86846c0661e98414c"],["/images/noti-cross-2x.png","1c36cfb6cbc9106ce7e74be20225bd94"],["/images/steps-steps.png","a28dae9c92d118a56a084ad1a9738807"],["/index.html","3d331a77f0643bfd5c87bf83662c714a"],["/js/app.js","30f14b6e4a833d184d6d8c982f63448b"],["/js/config.js","7d09b0eb964d78748c7fff45772af87b"],["/js/controllers/content.js","57e1d2615e6170999e7567b6a62ffc83"],["/js/controllers/dashboard.js","95335b02665e8d4de3171b03958f5135"],["/js/controllers/hack.js","046ac4466c1442973a607f7875551f9d"],["/js/controllers/login.js","1bdb908c0e4191bd584d3ed41c5b841d"],["/js/controllers/widget.js","aee5bebb94e04b2b5e8729cc0a05b77c"],["/js/directives/cs-select.js","24825fcdb8cd5615dc6cf30f00a959b0"],["/js/directives/pg-dropdown.js","a7d6777b4fc697cdfabb0b00a52f370f"],["/js/directives/pg-form-group.js","d22bd868f2fc36d2f27ffce1eac1bdf3"],["/js/directives/pg-horizontal-menu.js","e55a63af5642bfa57b2a47aa87d447a5"],["/js/directives/pg-navigate.js","dfdcfd62a3541b8e675e3947ae53969d"],["/js/directives/pg-notification-center.js","c37e2fbd5192025d3f8ea8a7e754b4c1"],["/js/directives/pg-portlet.js","37c4c86566da70f08f76a5395fcc4236"],["/js/directives/pg-quickview.js","21d25f9a3db96982a08502aa27e3bf7d"],["/js/directives/pg-search.js","7557da54268e8bb6b3fdf1d80fb05bdf"],["/js/directives/pg-sidebar.js","624cdc8e3e58a387217a94c548b61c35"],["/js/directives/pg-tab-dropdownfx.js","8c6f16cd9fccb1d912ef2f1c49987cca"],["/js/directives/pg-tab.js","d5e8ac3a430eafaaaca4234b8fab354c"],["/js/directives/skycons.js","9c74397547b34f5a19ed21933195c984"],["/js/lib/jquery.ioslist.min.js","81ef7019c917877b5246ea76570b329c"],["/js/lib/jquery.unveil.min.js","ac79eb2770936161725e07ec34eae695"],["/js/lib/modernizr.custom.js","84abc5a8d4fe9cf20cb2bc84e3da4443"],["/js/lib/pages.js","6420bfe2cd73d556a486eb02a056e295"],["/js/lib/ui.utils.min.js","f6bbb1626dc76271e80925cac7c54895"],["/js/routes.js","5c0a2f0b8cff0cebd34633c4d4e2666c"],["/js/services/configuration.js","e4aa93dd16a22dc4ec0ddfcdf87518bd"],["/js/services/facebook.js","ad0241e2f554a35905e16defc13dbe70"],["/js/services/notification.js","033e44f957f647f789542ab1a96ec895"],["/js/services/pool.js","d667db9c9de22db0d5a4fe8336754f58"],["/js/services/user.js","c93ff32732f3e2ddaedca0c162d4eda2"],["/styles/main.css","95e0e49ccea6d3adc579c879348168ba"],["/views/app/app.html","5f3e4aeca205fcf93a58b0b57325a329"],["/views/app/content.html","58cb027c370f50489bf43cd874f3b4a4"],["/views/app/dashboard.html","989a440fb946ee51bac306ea22c9e668"],["/views/app/hack.html","7426de3c0f547614da38c93717f79762"],["/views/blocks/footer.html","ffbf95ac77832f3d8c3311508d6e8bb1"],["/views/blocks/header.html","5e6259ce094c52f38392b6ce59a44973"],["/views/blocks/quick_view.html","e52658b02bbd656d1f97d88da949ee76"],["/views/blocks/sidebar.html","2f1a60a2d9bb1a1ed092799ec373979e"],["/views/core/login.html","c951b4a862515e2715b79656443feec5"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {
                credentials: 'same-origin',
                redirect: 'follow'
              }));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







