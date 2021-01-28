/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }

  // Your custom JavaScript goes here
  // Original Snippet: https://gist.github.com/endel/dfe6bb2fbe679781948c
document.addEventListener("DOMContentLoaded", function () {
	// Handler when the DOM is fully loaded

var b;
var jd;
var e;

	var Moon = {
		phases: [
			"new-moon",
			"waxing-crescent-moon",
			"quarter-moon",
			"waxing-gibbous-moon",
			"full-moon",
			"waning-gibbous-moon",
			"last-quarter-moon",
			"waning-crescent-moon"
		],
		phase: function (year, month, day) {
			let c = (e = jd = b = 0);

			if (month < 3) {
				year--;
				month += 12;
			}

			++month;
			c = 365.25 * year;
			e = 30.6 * month;
			jd = c + e + day - 694039.09; // jd is total days elapsed
			jd /= 29.5305882; // divide by the moon cycle
			b = parseInt(jd); // int(jd) -> b, take integer part of jd
			jd -= b; // subtract integer part to leave fractional part of original jd
			b = Math.round(jd * 8); // scale fraction from 0-8 and round

			if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
			return { phase: b, name: Moon.phases[b] };
		}
	};

	var today = new Date();
	var phase = Moon.phase(
		today.getFullYear(),
		today.getMonth() + 1,
		today.getDate()
	);

	console.log(phase);

	document.getElementById("text").innerHTML = phase.name;

  document.getElementById("moon").src =
    "images/moons/Moon_phase_" + phase.phase + ".svg";

});

})();
