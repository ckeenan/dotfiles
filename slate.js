/*
 *  Would be nice to support:
 *      A way to hard-set a window, so that the other windows would size around it
 *      This could be represented as if the screen size had changed?
 *
 *      In the current window, if a certain key configuration is pressed,
 *          all other windows should size around it. `
 *      
 *      Also -- A key that when pressed in concert with a resizing function, will move --all-- windows to that state
 *
 *
 */


//
// Configs
S.cfga({
  "defaultToCurrentScreen" : true,
  "secondsBetweenRepeat" : 0.1,
  "checkDefaultsOnLoad" : true,
  "focusCheckWidthMax" : 3000
});

// Monitors
var monLaptop = "1680x1050";
var monTbolt = "2560x1440";
var monHP = "1920x1080";

// Operations
var lapChat = S.op("corner", {
  "screen" : monLaptop,
  "direction" : "top-left",
  "width" : "screenSizeX/9",
  "height" : "screenSizeY"
});
var lapMain = lapChat.dup({ "direction" : "top-right", "width" : "8*screenSizeX/9" });
var tboltFull = S.op("move", {
  "screen" : monTbolt,
  "x" : "screenOriginX",
  "y" : "screenOriginY",
  "width" : "screenSizeX",
  "height" : "screenSizeY"
});

var lineUp = function(win, opts) {
  var rect = win.rect();
  var wid = win.screen().id();
  win.app().eachWindow(function(w) {
    rect.screen = w.screen().id();
    if (wid == rect.screen)
      w.doOperation("move", rect);
  });
};

var aggressiveLineup = function(win, opts) {
  var rect = win.rect();
  rect.screen = win.screen().id();
  win.app().eachWindow(function(w) {
    w.doOperation("move", rect);
  });
}


var switchScreen = function(win, opts) {
  var screen = S.screen().id();
  screen = ( screen + 1 ) % S.screenCount();
  var opts = {
    "x" : "screenOriginX",
    "y" : "screenOriginY",
    "width" : "screenSizeX",
    "height" : "screenSizeY",
    "screen": screen
  }
  win.doOperation("move", opts);
};

var tboltTop = tboltFull.dup({ "height" : "screenSizeY/2" });
var tboltTopLeft = tboltTop.dup({ "width" : "screenSizeX/2" });
var tboltBottomLeft = tboltTopLeft.dup({ "y": "screenOriginY+screenSizeY/2" });


var tboltTopRight = tboltTopLeft.dup({ "x" : "screenOriginX+screenSizeX/2" });
var tboltTopRightTwoThirds = tboltTopRight.dup({ "height" : "2*screenSizeY/3" });

var tboltBottomRight = tboltTopRight.dup({ "y": "screenOriginY+screenSizeY/2" });
var tboltBottomRightOneThird = tboltBottomRight.dup({ "y": "screenOriginY+2*screenSizeY/3", "height": "screenSizeY/3" });

var tboltBottom = tboltTop.dup({ "y" : "screenOriginY+screenSizeY/2" });
var tboltSmallBottomLeft = tboltBottom.dup({ "width" : "screenSizeX/3" });
var tboltSmallBottomMid = tboltSmallBottomLeft.dup({ "x" : "screenOriginX+screenSizeX/3" });
var tboltSmallBottomRight = tboltSmallBottomLeft.dup({ "x" : "screenOriginX+2*screenSizeX/3" });
var tboltLeft = tboltTopLeft.dup({ "height" : "screenSizeY" });
var tboltRight = tboltTopRight.dup({ "height" : "screenSizeY" });
var hpTopLeft = tboltTopLeft.dup({ "screen" : monHP });
var hpBottomLeft = hpTopLeft.dup({ "y" : "screenOriginY+screenSizeY/2" });
var hpRight = tboltRight.dup({ "screen" : monHP });

// common layout hashes
var lapMainHash = {
  "operations" : [lapMain],
  "ignore-fail" : true,
  "repeat" : true
};
var adiumHash = {
  "operations" : [lapChat, lapMain],
  "ignore-fail" : true,
  "title-order" : ["Contacts"],
  "repeat-last" : true
};
var tboltTopHash  = {
  "operations" : [tboltTop],
  "repeat" : true
};
var mvimHash = {
  "operations" : [tboltTopLeft, tboltTopRight],
  "repeat" : true
};
var iTermHash = {
  "operations" : [tboltSmallBottomLeft, tboltSmallBottomMid, tboltSmallBottomRight, lapMain],
  "sort-title" : true,
  "repeat-last" : true
};
var genBrowserHash = function(regex) {
  return {
    "operations" : [function(windowObject) {
      var title = windowObject.title();
      if (title !== undefined && title.match(regex)) {
        windowObject.doOperation(hpRight);
      } else {
        windowObject.doOperation(lapMain);
      }
    }],
    "ignore-fail" : true,
    "repeat" : true
  };
}

// 3 monitor layout
var threeMonitorLayout = S.lay("threeMonitor", {
  "Adium" : {
    "operations" : [lapChat, hpBottomLeft],
    "ignore-fail" : true,
    "title-order" : ["Contacts"],
    "repeat-last" : true
  },
  "MacVim" : mvimHash,
  "iTerm" : iTermHash,
  "Google Chrome" : genBrowserHash(/^Developer\sTools\s-\s.+$/),
  "Xcode" : {
    "operations" : [tboltTop, hpRight],
    "main-first" : true,
    "repeat-last" : true
  },
  "Flex Builder" : tboltTopHash,
  "GitX" : {
    "operations" : [hpRight],
    "repeat" : true
  },
  "Ooyala Player Debug Console" : {
    "operations" : [hpBottomLeft],
    "repeat" : true
  },
  "Firefox" : genBrowserHash(/^Firebug\s-\s.+$/),
  "Safari" : lapMainHash,
  "Eclipse" : tboltTopHash,
  "Spotify" : {
    "operations" : [hpTopLeft],
    "repeat" : true
  }
});

// 2 monitor layout
var twoMonitorLayout = S.lay("twoMonitor", {
  "Adium" : adiumHash,
  "MacVim" : mvimHash,
  "iTerm" : iTermHash,
  "Google Chrome" : lapMainHash,
  "Xcode" : {
    "operations" : [tboltTop, lapMain],
    "main-first" : true,
    "repeat-last" : true
  },
  "Flex Builder" : tboltTopHash,
  "GitX" : lapMainHash,
  "Ooyala Player Debug Console" : lapMainHash,
  "Firefox" : lapMainHash,
  "Safari" : lapMainHash,
  "Eclipse" : tboltTopHash,
  "Spotify" : lapMainHash
});

// 1 monitor layout
var oneMonitorLayout = S.lay("oneMonitor", {
  "Adium" : adiumHash,
  "MacVim" : lapMainHash,
  "iTerm" : lapMainHash,
  "Google Chrome" : lapMainHash,
  "Xcode" : lapMainHash,
  "Flex Builder" : lapMainHash,
  "GitX" : lapMainHash,
  "Ooyala Player Debug Console" : lapMainHash,
  "Firefox" : lapMainHash,
  "Safari" : lapMainHash,
  "Eclipse" : lapMainHash,
  "Spotify" : lapMainHash
});

// Defaults
S.def([monHP, monTbolt, monLaptop], threeMonitorLayout);
S.def([monTbolt, monLaptop], twoMonitorLayout);
S.def([monLaptop], oneMonitorLayout);

// Layout Operations
var threeMonitor = S.op("layout", { "name" : threeMonitorLayout });
var twoMonitor = S.op("layout", { "name" : twoMonitorLayout });
var oneMonitor = S.op("layout", { "name" : oneMonitorLayout });
var universalLayout = function() {
  // Should probably make sure the resolutions match but w/e
  if (S.screenCount() === 3) {
    threeMonitor.run();
  } else if (S.screenCount() === 2) {
    twoMonitor.run();
  } else if (S.screenCount() === 1) {
    oneMonitor.run();
  }
};

// Batch bind everything. Less typing.
S.bnda({
  // Layout Bindings
  "padEnter:ctrl" : universalLayout,
   //"space:ctrl" : universalLayout,

    /*
     *  New mapping:
     *      1 - Top left
     *      2 - Bottom left 
     *      3 - Bottom right
     *      4 - Top right
     *      5 - Left half
     *      6 - Right half
     *      7 - Whole screen
     *      8 - Right half, top 3/4
     *      9 - Right half, bottom 3/4
     */

  // Basic Location Bindings
  "1:ctrl" : lapChat,
  "[:ctrl" : lapChat,
  ".:ctrl" : lapMain,
  "]:ctrl" : lapMain,
  "1:ctrl" : tboltTopLeft,
  "2:ctrl" : tboltBottomLeft,
  "3:ctrl" : tboltBottomRight,
  "4:ctrl" : tboltTopRight,
  "5:ctrl" : tboltLeft,
  "6:ctrl" : tboltRight,
  "7:ctrl" : tboltFull,
  "8:ctrl" : tboltTopRightTwoThirds,
  "9:ctrl" : tboltBottomRightOneThird,
  "=:ctrl" : tboltTop,
  "/:ctrl" : tboltBottom,
  "backslash:ctrl": lineUp,
  "space:alt": switchScreen,
  "backslash:alt": aggressiveLineup,
  "pad*:ctrl" : hpBottomLeft,
  "pad-:ctrl" : hpTopLeft,
  "pad+:ctrl" : hpRight,

  // Resize Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl" : S.op("resize", { "width" : "+10%", "height" : "+0" }),
  "left:ctrl" : S.op("resize", { "width" : "-10%", "height" : "+0" }),
  "up:ctrl" : S.op("resize", { "width" : "+0", "height" : "-10%" }),
  "down:ctrl" : S.op("resize", { "width" : "+0", "height" : "+10%" }),
  "right:alt" : S.op("resize", { "width" : "-10%", "height" : "+0", "anchor" : "bottom-right" }),
  "left:alt" : S.op("resize", { "width" : "+10%", "height" : "+0", "anchor" : "bottom-right" }),
  "up:alt" : S.op("resize", { "width" : "+0", "height" : "+10%", "anchor" : "bottom-right" }),
  "down:alt" : S.op("resize", { "width" : "+0", "height" : "-10%", "anchor" : "bottom-right" }),

  // Push Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl;shift" : S.op("push", { "direction" : "right", "style" : "bar-resize:screenSizeX/3" }),
  "left:ctrl;shift" : S.op("push", { "direction" : "left", "style" : "bar-resize:screenSizeX/3" }),
  "up:ctrl;shift" : S.op("push", { "direction" : "up", "style" : "bar-resize:screenSizeY/2" }),
  "down:ctrl;shift" : S.op("push", { "direction" : "down", "style" : "bar-resize:screenSizeY/2" }),

  // Nudge Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:ctrl;alt" : S.op("nudge", { "x" : "+10%", "y" : "+0" }),
  "left:ctrl;alt" : S.op("nudge", { "x" : "-10%", "y" : "+0" }),
  "up:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "-10%" }),
  "down:ctrl;alt" : S.op("nudge", { "x" : "+0", "y" : "+10%" }),

  // Throw Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "1:ctrl;alt" : S.op("throw", { "screen" : "2", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "2:ctrl;alt" : S.op("throw", { "screen" : "1", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "3:ctrl;alt" : S.op("throw", { "screen" : "0", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "right:ctrl;alt;cmd" : S.op("throw", { "screen" : "right", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "left:ctrl;alt;cmd" : S.op("throw", { "screen" : "left", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "up:ctrl;alt;cmd" : S.op("throw", { "screen" : "up", "width" : "screenSizeX", "height" : "screenSizeY" }),
  "down:ctrl;alt;cmd" : S.op("throw", { "screen" : "down", "width" : "screenSizeX", "height" : "screenSizeY" }),

  // Focus Bindings
  // NOTE: some of these may *not* work if you have not removed the expose/spaces/mission control bindings
  "right:cmd" : S.op("focus", { "direction" : "right" }),
  "left:cmd" : S.op("focus", { "direction" : "left" }),
  "up:cmd" : S.op("focus", { "direction" : "up" }),
  "down:cmd" : S.op("focus", { "direction" : "down" }),
  "up:cmd;alt" : S.op("focus", { "direction" : "behind" }),
  "down:cmd;alt" : S.op("focus", { "direction" : "behind" }),

  // Window Hints
  "esc:cmd" : S.op("hint"),

  // Switch currently doesn't work well so I'm commenting it out until I fix it.
  //"tab:cmd" : S.op("switch"),

  // Grid
  "esc:ctrl" : S.op("grid")
});

// Test Cases
S.src(".slate.test", true);
S.src(".slate.test.js", true);

// Log that we're done configuring
S.log("[SLATE] -------------- Finished Loading Config --------------");
