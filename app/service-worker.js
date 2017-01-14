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

var precacheConfig = [["/components/card/card.ctrl.js","7e39d6f25eb683c9a30f032513135750"],["/components/card/card.tpl.html","d78dfcd861534d572f6eb82100bc7b8d"],["/components/components.module.js","87370e07da259a7ae2faae45f4e2801b"],["/components/contents-pool/contents-pool.ctrl.js","98b20adb8e30460fab2fd48de1cc7304"],["/components/contents-pool/contents-pool.tpl.html","b736aef80018c5ed9b8b8c6660ed66c4"],["/components/database/database.ctrl.js","5876e39240164d7ecea12c07da47dc6e"],["/components/database/database.tpl.html","5912bca1f086df49f811a6ecb9b34936"],["/components/pages-pool/pages-pool.ctrl.js","7660ca1adf30c5c6f1576ec6f4eedc61"],["/components/pages-pool/pages-pool.tpl.html","0ebc4bfef069bcd8a1ecf9db193ea7ac"],["/components/profile/profile.ctrl.js","3b956b9698795c10b755144ef992b42b"],["/components/profile/profile.tpl.html","0fc2e88d02d5e0d6332dbe0712ce0624"],["/components/sidebar/sidebar.ctrl.js","f186c207b437ee94ec7b23ecd8b7006c"],["/components/sidebar/sidebar.tpl.html","88d83f17d5deff826d036ac5143f7a07"],["/images/facehack.png","083d498c3c0fc1d1e1dda47264f4096c"],["/images/facehack2.png","94e4ba5eeff0670cd0fa7da326bad8ce"],["/images/logo.svg","a911ed4910c578a86846c0661e98414c"],["/images/noti-cross-2x.png","1c36cfb6cbc9106ce7e74be20225bd94"],["/images/steps-steps.png","a28dae9c92d118a56a084ad1a9738807"],["/index.html","581b77eb5a7755b741862a8f1c51808f"],["/js/app.js","30f14b6e4a833d184d6d8c982f63448b"],["/js/config.js","d0be4e30c92fcecc50ea1640a45633cd"],["/js/controllers/content.js","57e1d2615e6170999e7567b6a62ffc83"],["/js/controllers/dashboard-old.js","5bbd685ba755de4509772a79cfa7bc34"],["/js/controllers/dashboard.js","e911e0887501cf2423fa33e20f8891c5"],["/js/controllers/hack.js","046ac4466c1442973a607f7875551f9d"],["/js/controllers/login.js","dd7018afe0b24c3033b9035a19c8f0fc"],["/js/controllers/widget.js","58182a6afd3c4d69190c70139cd2a25a"],["/js/directives/cs-select.js","24825fcdb8cd5615dc6cf30f00a959b0"],["/js/directives/pg-dropdown.js","a7d6777b4fc697cdfabb0b00a52f370f"],["/js/directives/pg-form-group.js","d22bd868f2fc36d2f27ffce1eac1bdf3"],["/js/directives/pg-horizontal-menu.js","e55a63af5642bfa57b2a47aa87d447a5"],["/js/directives/pg-navigate.js","dfdcfd62a3541b8e675e3947ae53969d"],["/js/directives/pg-notification-center.js","c37e2fbd5192025d3f8ea8a7e754b4c1"],["/js/directives/pg-portlet.js","37c4c86566da70f08f76a5395fcc4236"],["/js/directives/pg-quickview.js","21d25f9a3db96982a08502aa27e3bf7d"],["/js/directives/pg-search.js","7557da54268e8bb6b3fdf1d80fb05bdf"],["/js/directives/pg-sidebar.js","624cdc8e3e58a387217a94c548b61c35"],["/js/directives/pg-tab-dropdownfx.js","8c6f16cd9fccb1d912ef2f1c49987cca"],["/js/directives/pg-tab.js","d5e8ac3a430eafaaaca4234b8fab354c"],["/js/directives/skycons.js","9c74397547b34f5a19ed21933195c984"],["/js/lib/facebook-sdk.js","c5705c575c7e116b6ba62814c5e9ed34"],["/js/lib/jquery.ioslist.min.js","81ef7019c917877b5246ea76570b329c"],["/js/lib/jquery.unveil.min.js","ac79eb2770936161725e07ec34eae695"],["/js/lib/modernizr.custom.js","84abc5a8d4fe9cf20cb2bc84e3da4443"],["/js/lib/pages.js","6420bfe2cd73d556a486eb02a056e295"],["/js/lib/ui.utils.min.js","f6bbb1626dc76271e80925cac7c54895"],["/js/routes.js","5c0a2f0b8cff0cebd34633c4d4e2666c"],["/js/services/configuration.js","8c6743907d2a17160d74f9c3679ac331"],["/js/services/facebook.js","a23f0797c2c00ce44ed7a2fd5920775a"],["/js/services/indexedDB.js","35e3349d858584eb8a83e800d91eb1b1"],["/js/services/notification.js","033e44f957f647f789542ab1a96ec895"],["/js/services/pool.js","d667db9c9de22db0d5a4fe8336754f58"],["/js/services/user.js","9dd580f2eaa8defbbfe1292246f88aaa"],["/styles/dist-font-face.css","7c1bf9a4265d9b3beb911436df087795"],["/styles/main.css","501275d537ede7a455ff1231da777c95"],["/views/app/app.html","5f3e4aeca205fcf93a58b0b57325a329"],["/views/app/content.html","58cb027c370f50489bf43cd874f3b4a4"],["/views/app/dashboard.html","989a440fb946ee51bac306ea22c9e668"],["/views/app/hack.html","7426de3c0f547614da38c93717f79762"],["/views/blocks/footer.html","ffbf95ac77832f3d8c3311508d6e8bb1"],["/views/blocks/header.html","5e6259ce094c52f38392b6ce59a44973"],["/views/blocks/quick_view.html","15c9fa63676cccdd4734e5486cb06135"],["/views/blocks/sidebar.html","d5519b9883351a0aaf591d52636386f5"],["/views/core/login.html","8b5d1c822c41d554a949a42d168bbcd8"],["bower_components/angular-animate/angular-animate.min.js","be3e9252465c508fa88c2f2ba9108348"],["bower_components/angular-aria/angular-aria.min.js","ae0ea951149b333407f37b42eb627bb4"],["bower_components/angular-logger-max/logger.service.js","19b43efccc657b92b7d19e0caf6e648d"],["bower_components/angular-material-data-table/dist/md-data-table.min.css","3b288199ad8847f678452d00ed1bdb31"],["bower_components/angular-material-data-table/dist/md-data-table.min.js","5da4677ab46b28eed0e7182c120cec66"],["bower_components/angular-material/angular-material.min.css","fd89dced5e4262d1592094a296cf7fdd"],["bower_components/angular-material/angular-material.min.js","63dfa08785d796fda39a787d97f23e17"],["bower_components/angular-ui-grid/ui-grid.js","69d8d20a9394b42c1ed8257998f3174b"],["bower_components/angular-ui-router/release/angular-ui-router.js","a1279756d8925e905aec1bf3924c7e72"],["bower_components/angular/angular.js","fea945437030dbaf178cc608f8cf24ff"],["bower_components/angularfire/dist/angularfire.min.js","9f9a4e5492db9cfa0a1b2f7f360e32fd"],["bower_components/bootstrap/dist/css/bootstrap.min.css","ec3bb52a00e176a7181d454dffaea219"],["bower_components/bootstrap/dist/js/bootstrap.min.js","5869c96cc8f19086aee625d670d741f9"],["bower_components/firebase/firebase.js","24cf2da1908fe34cd1d842f3dfa50411"],["bower_components/font-awesome/css/font-awesome.css","fd209ed7c87ecb84d77ab51433b2dcfe"],["bower_components/font-awesome/fonts/fontawesome-webfont.ttf","b06871f281fee6b241d60582ae9369b9"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff","fee66e712a8a08eef5805a46892932ad"],["bower_components/font-awesome/fonts/fontawesome-webfont.woff2","af7ae505a9eed503f8b8e6982036873e"],["bower_components/idbwrapper/idbstore.min.js","79d2f0df75dd57471634d8698d4198dd"],["bower_components/jquery.scrollbar/jquery.scrollbar.js","870e32d905b7c3f19476993c819747eb"],["bower_components/jquery/dist/jquery.min.js","e071abda8fe61194711cfc2ab99fe104"],["bower_components/lodash/dist/lodash.js","7baebecc8d47b9bc5ba33025176653a8"]];
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







