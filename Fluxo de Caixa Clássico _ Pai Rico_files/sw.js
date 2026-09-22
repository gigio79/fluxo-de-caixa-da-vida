var CACHE = 'fluxo-de-caixa-v2';
var ASSETS = [
  "./2108039232768421",
  "./24px.svg",
  "./295681840792558",
  "./3814.js.transferir",
  "./analytics.js.transferir",
  "./anchor.html",
  "./api.js.transferir",
  "./assets/audio/baby_land.mp3",
  "./assets/audio/bigdeal_smalldeal.mp3",
  "./assets/audio/bot_to_open.mp3",
  "./assets/audio/button_push.mp3",
  "./assets/audio/cashflow_day_land_v1.mp3",
  "./assets/audio/cashflow_day_land_v2.mp3",
  "./assets/audio/charity_land.mp3",
  "./assets/audio/dice_roll.mp3",
  "./assets/audio/divorce_land.mp3",
  "./assets/audio/doodad_land.mp3",
  "./assets/audio/downsized_land.mp3",
  "./assets/audio/financial_statments_in.mp3",
  "./assets/audio/financial_statments_out.mp3",
  "./assets/audio/human_to_bot.mp3",
  "./assets/audio/lawsuit_land.mp3",
  "./assets/audio/leave_rat_race_enter_fast_track.mp3",
  "./assets/audio/market_land.mp3",
  "./assets/audio/next_player.mp3",
  "./assets/audio/online.mp3",
  "./assets/audio/open_to_human_v1.mp3",
  "./assets/audio/open_to_human_v2.mp3",
  "./assets/audio/pass_and_play.mp3",
  "./assets/audio/payday_land.mp3",
  "./assets/audio/piece_movement_v1.mp3",
  "./assets/audio/piece_movement_v2.mp3",
  "./assets/audio/piece_movement_v3.mp3",
  "./assets/audio/press_to_begin.mp3",
  "./assets/audio/tax_audit_land.mp3",
  "./assets/data/bigdeal.json",
  "./assets/data/bigdeal_pt_br.json",
  "./assets/data/careers.json",
  "./assets/data/careers_pt_br.json",
  "./assets/data/doodads.json",
  "./assets/data/doodads_pt_br.json",
  "./assets/data/fasttrack.json",
  "./assets/data/fasttrack_pt_br.json",
  "./assets/data/market.json",
  "./assets/data/market_pt_br.json",
  "./assets/data/smalldeal.json",
  "./assets/data/smalldeal_pt_br.json",
  "./assets/data/templates/card_template.json",
  "./assets/data/templates/card_template_pt_br.json",
  "./assets/data/templates/dream_selector_screen.json",
  "./assets/data/templates/dream_selector_screen_pt_br.json",
  "./assets/data/templates/end_game_widget.json",
  "./assets/data/templates/end_game_widget_pt_br.json",
  "./assets/data/templates/game_screen.json",
  "./assets/data/templates/game_screen_pt_br.json",
  "./assets/data/templates/lobby_screen.json",
  "./assets/data/templates/lobby_screen_pt_br.json",
  "./assets/data/templates/mode_select_screen.json",
  "./assets/data/templates/mode_select_screen_pt_br.json",
  "./assets/data/templates/party_setup_screen.json",
  "./assets/data/templates/party_setup_screen_pt_br.json",
  "./assets/data/templates/player_header.json",
  "./assets/data/templates/player_header_pt_br.json",
  "./assets/data/templates/splash_screen.json",
  "./assets/data/templates/splash_screen_pt_br.json",
  "./assets/data/templates/statement_sheet_template.json",
  "./assets/data/templates/statement_sheet_template_pt_br.json",
  "./assets/data/templates/title_screen.json",
  "./assets/data/vocab_en_us.json",
  "./assets/data/vocab_pt_br.json",
  "./assets/fonts/GrantAvenue-Regular.otf",
  "./assets/img/background_01.json",
  "./assets/img/background_01.png",
  "./assets/img/board.json",
  "./assets/img/board.png",
  "./assets/img/chat.json",
  "./assets/img/chat.png",
  "./assets/img/dice.json",
  "./assets/img/dice.png",
  "./assets/img/fasttrack.json",
  "./assets/img/fasttrack.png",
  "./assets/img/loadingscreen.json",
  "./assets/img/loadingscreen.png",
  "./assets/img/statement.json",
  "./assets/img/statement.png",
  "./assets/img/ui.json",
  "./assets/img/ui.png",
  "./assets/img/ui2.json",
  "./assets/img/ui2.png",
  "./banner-1-optin.css",
  "./cashflow.js.transferir",
  "./complianz.min.js.transferir",
  "./cookieblocker.min.css",
  "./createjs.min.js.transferir",
  "./f(1).txt",
  "./f.txt",
  "./fbevents.js.transferir",
  "./firebase.js.transferir",
  "./frontend-gtag.js.transferir",
  "./game.css",
  "./gtm.js.transferir",
  "./index.min.js.transferir",
  "./jquery-3.3.1.min.js.transferir",
  "./jquery-migrate.min.js.transferir",
  "./jquery.min.js.transferir",
  "./js",
  "./js(1)",
  "./js(2)",
  "./js(3)",
  "./m=el_main_css",
  "./mm_c3ef0d32-6551-4b6a-9c25-0065f7473b64-64433804.js.transferir",
  "./Preloader.js",
  "./Preloader.js.transferir",
  "./recaptcha__pt_br.js.transferir",
  "./richdadcfclassic.css",
  "./saved_resource(1).html",
  "./site-styles.css",
  "./smoothscroll.js.transferir",
  "./style-block-editor.css",
  "./style.min.css",
  "./styles__ltr.css",
  "./wp-emoji-release.min.js.transferir",
  "./zci-styles.css"
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (k) {
        return k !== CACHE && k.indexOf('fluxo-de-caixa-') === 0;
      }).map(function (k) {
        return caches.delete(k);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var req = event.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res && res.status === 200 && (res.type === 'basic' || res.type === 'default')) {
          var copy = res.clone();
          caches.open(CACHE).then(function (cache) { cache.put(req, copy); });
        }
        return res;
      }).catch(function () {
        return caches.match('./saved_resource(1).html');
      });
    })
  );
});