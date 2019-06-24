// Get the geolocation of the user and show it on the DOM,
// keep listening for changes and update it. If the user is moving fast send a notification.
// If the user is not viewing the page then stop listening to location changes.

//GPS//

const $allowGeolocation = document.getElementById("allow-gelocation");

$allowGeolocation.addEventListener("click", event => {
  // hide the button
  navigator.permissions.query({ name: "geolocation" }).then(function(result) {
    if (result.state === "granted") {
      watchID = navigator.geolocation.watchPosition(success, error, options);
      console.log("main linea 14");
      $notificationsBanner.style.display = "none";
    } else if (result.state === "prompt") {
      watchID = navigator.geolocation.watchPosition(success, error, options);
    }
  });
  $notificationsBanner.style.display = "none";
});

document.addEventListener("visibilitychange", event => {
  switch (document.visibilityState) {
    case "visible": {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function(result) {
          if (result.state === "granted") {
            watchID = navigator.geolocation.watchPosition(
              success,
              error,
              options
            );
            console.log("Page is visible");
            return;
          } else {
            $notificationsBanner.style.display = "block";
          }
        });
    }
    case "hidden": {
      navigator.geolocation.clearWatch(watchID);
      console.log("Page is hidden");
      return;
    }
    case "prerender": {
      navigator.geolocation.clearWatch(watchID);
      console.log("Page is prerendering");
      return;
    }
    case "unloaded": {
      navigator.geolocation.clearWatch(watchID);
      console.log("Page is being unloaded");
      return;
    }
  }
});
