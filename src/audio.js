import React from "react";
import Hls from "hls.js";

let __assign =
  (this && __assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (let s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (let p in s) if (Object.hasOwn(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
let __rest =
  (this && this.__rest) ||
  function (s, e) {
    let t = {};
    for (let p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (let i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };

function ReactHlsPlayer(_a) {
  let hlsConfig = _a.hlsConfig,
    _b = _a.playerRef,
    playerRef = _b === void 0 ? React.createRef() : _b,
    src = _a.src,
    autoPlay = _a.autoPlay,
    props = __rest(_a, ["hlsConfig", "playerRef", "src", "autoPlay"]);
  React.useEffect(
    function () {
      let hls;
      function _initPlayer() {
        if (hls != null) {
          hls.destroy();
        }
        let newHls = new Hls(__assign({ enableWorker: false }, hlsConfig));
        if (playerRef.current != null) {
          newHls.attachMedia(playerRef.current);
        }
        newHls.on(Hls.Events.MEDIA_ATTACHED, function () {
          newHls.loadSource(src);
          newHls.on(Hls.Events.MANIFEST_PARSED, function () {
            let _a;
            if (autoPlay) {
              (_a =
                playerRef === null || playerRef === void 0
                  ? void 0
                  : playerRef.current) === null || _a === void 0
                ? void 0
                : _a.play().catch(function () {
                    return console.log(
                      "Unable to autoplay prior to user interaction with the dom."
                    );
                  });
            }
          });
        });
        newHls.on(Hls.Events.ERROR, function (event, data) {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                newHls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                newHls.recoverMediaError();
                break;
              default:
                _initPlayer();
                break;
            }
          }
        });
        hls = newHls;
      }
      if (Hls.isSupported()) {
        _initPlayer();
      }
      return function () {
        if (hls != null) {
          hls.destroy();
        }
      };
    },
    [autoPlay, hlsConfig, playerRef, src]
  );
  if (Hls.isSupported())
    return React.createElement("video", __assign({ ref: playerRef }, props));
  return React.createElement(
    "video",
    __assign({ ref: playerRef, src: src, autoPlay: autoPlay }, props)
  );
}
export default ReactHlsPlayer;
