const $notificationsBanner = document.getElementById("notifications_banner");
const $notificationSwitch = document.getElementById("switchRoundedSuccess");

var watchID;
const latitude = document.getElementById("lat");
const longitude = document.getElementById("lon");
const speed = document.getElementById("speed");

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  latitude.innerHTML = crd.latitude;
  longitude.innerHTML = crd.longitude;
  speed.innerHTML = ` ${crd.speed == null ? 0 : crd.speed} m/s`;

  //PERMISSIONS
  if (!"Notification" in window) {
    console.log("This browser does not support notifications.");
  } else {
    if ($notificationSwitch.checked) {
      ReturnAlert(crd.speed);
    }
  }
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

async function ReturnAlert(speed) {
  const status = await Notification.requestPermission();
  if (status == "granted" && speed > 5) {
    new Notification("Codeable", { body: `High Speed ${speed}` });
  }
}
window.onload = function() {
  navigator.permissions.query({ name: "geolocation" }).then(function(result) {
    // Will return ['granted', 'prompt', 'denied']
    if (result.state === "granted") {
      $notificationsBanner.style.display = "none";
    } else if (result.state === "prompt") {
      $notificationsBanner.style.display = "block";
    }
    console.log(result.state);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    $delete => {
      $notification = $delete.parentNode;
      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});
