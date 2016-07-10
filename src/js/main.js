// Todo:
// - add color generator for canvas to gradually change text of the matrix code.

(function() {
  'use strict';
  var app = {
    settings: {
      indexCanvas: document.querySelectorAll('#indexCanvas'),
      lazyImages: document.getElementsByClassName('lazy'),
      contactForm: document.querySelectorAll('#contactForm'),
      portfolioItem: document.querySelectorAll('.work__item')
    },
    controllers: function() {

      /**
       * Custom transitions for page loading and closing
       * info: https://www.smashingmagazine.com/2016/07/improving-user-flow-through-page-transitions/
       */
      (function() {
        console.log('transition running');

        // Custom fade in function
        function fadeInCustom(el, display) {
          el.style.opacity = 0;
          el.style.display = display || 'block';

          (function fade() {
            var val = parseFloat(el.style.opacity);

            if (!((val += .1) > 1)) {
              el.style.opacity = val;
              requestAnimationFrame(fade);
            }
          })();
        }

        function fadeOutCustom(el) {
           el.style.opacity = 1;

           (function fade() {
            if ((el.style.opacity -= .1) < 0) {
              el.style.display = 'none';
            } else {
              requestAnimationFrame(fade);
            }
           })();
        }

        window.onload = function() {
          var el = document.querySelector('body');
          el.style.display = 'none';

          setTimeout(function() {
            //$('body').attr('id', 'loaded');

            fadeInCustom(el);
          }, 350);
        }

        document.addEventListener('click', function(e) {
          var elTarget = e.target;

          if (elTarget.href.indexOf('.html') != -1) {
            e.preventDefault();

            console.log('Inbound link');

            // Go up in the nodelist until we find a node with .href (HTMLAnchorElement)
            while (elTarget && !elTarget.href) {
              elTarget = elTarget.parentNode;
            }

            // Change current URL
            if (elTarget) {
              e.preventDefault();

              setTimeout(changePage, 100);

              function changePage() {
                var el = document.querySelector('body');

                history.pushState(null, elTarget.title, elTarget.href);

                //$('html').fadeOut(350);
                fadeOutCustom(el);

                setTimeout(function() {
                  location.replace(elTarget.href);
                },750);

                //location.replace(elTarget.href);
              }

              //changePage();

              return;
            }

            //window.addEventListener('popstate', changePage);
          } else {
            console.log('Outbound link');

            $('html').fadeOut(350);

            setTimeout(function() {
              return true;
            },750);
          }
        });
      })();

      /**
        * Index Canvas
        */
      if (this.settings.indexCanvas.length > 0) {
        (function() {
          var canvas = document.getElementById('indexCanvas');
          var ctx = canvas.getContext('2d');

          // Making the canvas full screen
          canvas.height = window.innerHeight;
          canvas.width = window.innerWidth;

          // Chinese and other characters - taken from the unicode charset
          var //chineseCaracters = '田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑',
              chineseCharacters = '\u4E00\u4E10\u4E20\u4E30\u4E40\u4E50\u4E60\u4E70\u4E80\u4E90\u4EA0\u4EB0\u4EC0\u4ED0\u4EE0\u4EF0\u4F00\u4F10\u4F20\u4F30\u4F40\u4F50\u4F60\u4F70\u4F80\u4F90\u4FA0\u4FB0\u4FC0\u4FD0\u4FE0\u4FF0',
              egyptianHieroglyphCharacters = '\u13000\u13001\u13002\u13003\u13004\u13005\u13006\u13007\u13008\u13009\u1300A\u1300B\u1300C\u1300D\u1300E\u1300F\u13010\u13011\u13012\u13013\u13014\u13015\u13016\u13017\u13018\u13019\u1301A\u1301B\u1301C\u1301D\u1301E\u1301F\u13020\u13021\u13022\u13023\u13024\u13025\u13026\u13027\u13028\u13029\u1302A\u1302B\u1302C\u1302D\u1302E\u1302F\u13030\u13031\u13032\u13033\u13034\u13035\u13036\u13037\u13038\u13039\u1303A\u1303B\u1303C\u1303D\u1303E\u1303F\u13040\u13041\u13042\u13043\u13044\u13045\u13046\u13047\u13048\u13049\u1304A\u1304B\u1304C\u1304D\u1304E\u1304F\u13050\u13051\u13052\u13053\u13054\u13055\u13056\u13057\u13058\u13059\u1305A\u1305B\u1305C\u1305D\u1305E\u1305F\u13060\u13061\u13062\u13063\u13064\u13065\u13066\u13067\u13068\u13069\u1306A\u1306B\u1306C\u1306D\u1306E\u1306F\u13070\u13071\u13072\u13073\u13074\u13075\u13076\u13077\u13078\u13079\u1307A\u1307B\u1307C\u1307D\u1307E\u1307F\u13080\u13081\u13082\u13083\u13084\u13085\u13086\u13087\u13088\u13089\u1308A\u1308B\u1308C\u1308D\u1308E\u1308F\u13090\u13091\u13092\u13093\u13094\u13095\u13096\u13097\u13098\u13099\u1309A\u1309B\u1309C\u1309D\u1309E\u1309F\u130A0\u130A1\u130A2\u130A3\u130A4\u130A5\u130A6\u130A7\u130A8\u130A9\u130AA\u130AB\u130AC\u130AD\u130AE\u130AF\u130B0\u130B1\u130B2\u130B3\u130B4\u130B5\u130B6\u130B7\u130B8\u130B9\u130BA\u130BB\u130BC\u130BD\u130BE\u130BF\u130C0\u130C1\u130C2\u130C3\u130C4\u130C5\u130C6\u130C7\u130C8\u130C9\u130CA\u130CB\u130CC\u130CD\u130CE\u130CF\u130D0\u130D1\u130D2\u130D3\u130D4\u130D5\u130D6\u130D7\u130D8\u130D9\u130DA\u130DB\u130DC\u130DD\u130DE\u130DF\u130E0\u130E1\u130E2\u130E3\u130E4\u130E5\u130E6\u130E7\u130E8\u130E9\u130EA\u130EB\u130EC\u130ED\u130EE\u130EF\u130F0\u130F1\u130F2\u130F3\u130F4\u130F5\u130F6\u130F7\u130F8\u130F9\u130FA\u130FB\u130FC\u130FD\u130FE\u130FF\u13100\u13101\u13102\u13103\u13104\u13105\u13106\u13107\u13108\u13109\u1310A\u1310B\u1310C\u1310D\u1310E\u1310F\u13110\u13111\u13112\u13113\u13114\u13115\u13116\u13117\u13118\u13119\u1311A\u1311B\u1311C\u1311D\u1311E\u1311F\u13120\u13121\u13122\u13123\u13124\u13125\u13126\u13127\u13128\u13129\u1312A\u1312B\u1312C\u1312D\u1312E\u1312F\u13130\u13131\u13132\u13133\u13134\u13135\u13136\u13137\u13138\u13139\u1313A\u1313B\u1313C\u1313D\u1313E\u1313F\u13140\u13141\u13142\u13143\u13144\u13145\u13146\u13147\u13148\u13149\u1314A\u1314B\u1314C\u1314D\u1314E\u1314F\u13150\u13151\u13152\u13153\u13154\u13155\u13156\u13157\u13158\u13159\u1315A\u1315B\u1315C\u1315D\u1315E\u1315F\u13160\u13161\u13162\u13163\u13164\u13165\u13166\u13167\u13168\u13169\u1316A\u1316B\u1316C\u1316D\u1316E\u1316F\u13170\u13171\u13172\u13173\u13174\u13175\u13176\u13177\u13178\u13179\u1317A\u1317B\u1317C\u1317D\u1317E\u1317F\u13180\u13181\u13182\u13183\u13184\u13185\u13186\u13187\u13188\u13189\u1318A\u1318B\u1318C\u1318D\u1318E\u1318F\u13190\u13191\u13192\u13193\u13194\u13195\u13196\u13197\u13198\u13199\u1319A\u1319B\u1319C\u1319D\u1319E\u1319F\u131A0\u131A1\u131A2\u131A3\u131A4\u131A5\u131A6\u131A7\u131A8\u131A9\u131AA\u131AB\u131AC\u131AD\u131AE\u131AF\u131B0\u131B1\u131B2\u131B3\u131B4\u131B5\u131B6\u131B7\u131B8\u131B9\u131BA\u131BB\u131BC\u131BD\u131BE\u131BF\u131C0\u131C1\u131C2\u131C3\u131C4\u131C5\u131C6\u131C7\u131C8\u131C9\u131CA\u131CB\u131CC\u131CD\u131CE\u131CF\u131D0\u131D1\u131D2\u131D3\u131D4\u131D5\u131D6\u131D7\u131D8\u131D9\u131DA\u131DB\u131DC\u131DD\u131DE\u131DF\u131E0\u131E1\u131E2\u131E3\u131E4\u131E5\u131E6\u131E7\u131E8\u131E9\u131EA\u131EB\u131EC\u131ED\u131EE\u131EF\u131F0\u131F1\u131F2\u131F3\u131F4\u131F5\u131F6\u131F7\u131F8\u131F9\u131FA\u131FB\u131FC\u131FD\u131FE\u131FF\u13200\u13201\u13202\u13203\u13204\u13205\u13206\u13207\u13208\u13209\u1320A\u1320B\u1320C\u1320D\u1320E\u1320F\u13210\u13211\u13212\u13213\u13214\u13215\u13216\u13217\u13218\u13219\u1321A\u1321B\u1321C\u1321D\u1321E\u1321F\u13220\u13221\u13222\u13223\u13224\u13225\u13226\u13227\u13228\u13229\u1322A\u1322B\u1322C\u1322D\u1322E\u1322F\u13230\u13231\u13232\u13233\u13234\u13235\u13236\u13237\u13238\u13239\u1323A\u1323B\u1323C\u1323D\u1323E\u1323F\u13240\u13241\u13242\u13243\u13244\u13245\u13246\u13247\u13248\u13249\u1324A\u1324B\u1324C\u1324D\u1324E\u1324F\u13250\u13251\u13252\u13253\u13254\u13255\u13256\u13257\u13258\u13259\u1325A\u1325B\u1325C\u1325D\u1325E\u1325F\u13260\u13261\u13262\u13263\u13264\u13265\u13266\u13267\u13268\u13269\u1326A\u1326B\u1326C\u1326D\u1326E\u1326F\u13270\u13271\u13272\u13273\u13274\u13275\u13276\u13277\u13278\u13279\u1327A\u1327B\u1327C\u1327D\u1327E\u1327F\u13280\u13281\u13282\u13283\u13284\u13285\u13286\u13287\u13288\u13289\u1328A\u1328B\u1328C\u1328D\u1328E\u1328F\u13290\u13291\u13292\u13293\u13294\u13295\u13296\u13297\u13298\u13299\u1329A\u1329B\u1329C\u1329D\u1329E\u1329F\u132A0\u132A1\u132A2\u132A3\u132A4\u132A5\u132A6\u132A7\u132A8\u132A9\u132AA\u132AB\u132AC\u132AD\u132AE\u132AF\u132B0\u132B1\u132B2\u132B3\u132B4\u132B5\u132B6\u132B7\u132B8\u132B9\u132BA\u132BB\u132BC\u132BD\u132BE\u132BF\u132C0\u132C1\u132C2\u132C3\u132C4\u132C5\u132C6\u132C7\u132C8\u132C9\u132CA\u132CB\u132CC\u132CD\u132CE\u132CF\u132D0\u132D1\u132D2\u132D3\u132D4\u132D5\u132D6\u132D7\u132D8\u132D9\u132DA\u132DB\u132DC\u132DD\u132DE\u132DF\u132E0\u132E1\u132E2\u132E3\u132E4\u132E5\u132E6\u132E7\u132E8\u132E9\u132EA\u132EB\u132EC\u132ED\u132EE\u132EF\u132F0\u132F1\u132F2\u132F3\u132F4\u132F5\u132F6\u132F7\u132F8\u132F9\u132FA\u132FB\u132FC\u132FD\u132FE\u132FF\u13300\u13301\u13302\u13303\u13304\u13305\u13306\u13307\u13308\u13309\u1330A\u1330B\u1330C\u1330D\u1330E\u1330F\u13310\u13311\u13312\u13313\u13314\u13315\u13316\u13317\u13318\u13319\u1331A\u1331B\u1331C\u1331D\u1331E\u1331F\u13320\u13321\u13322\u13323\u13324\u13325\u13326\u13327\u13328\u13329\u1332A\u1332B\u1332C\u1332D\u1332E\u1332F\u13330\u13331\u13332\u13333\u13334\u13335\u13336\u13337\u13338\u13339\u1333A\u1333B\u1333C\u1333D\u1333E\u1333F\u13340\u13341\u13342\u13343\u13344\u13345\u13346\u13347\u13348\u13349\u1334A\u1334B\u1334C\u1334D\u1334E\u1334F\u13350\u13351\u13352\u13353\u13354\u13355\u13356\u13357\u13358\u13359\u1335A\u1335B\u1335C\u1335D\u1335E\u1335F\u13360\u13361\u13362\u13363\u13364\u13365\u13366\u13367\u13368\u13369\u1336A\u1336B\u1336C\u1336D\u1336E\u1336F\u13370\u13371\u13372\u13373\u13374\u13375\u13376\u13377\u13378\u13379\u1337A\u1337B\u1337C\u1337D\u1337E\u1337F\u13380\u13381\u13382\u13383\u13384\u13385\u13386\u13387\u13388\u13389\u1338A\u1338B\u1338C\u1338D\u1338E\u1338F\u13390\u13391\u13392\u13393\u13394\u13395\u13396\u13397\u13398\u13399\u1339A\u1339B\u1339C\u1339D\u1339E\u1339F\u133A0\u133A1\u133A2\u133A3\u133A4\u133A5\u133A6\u133A7\u133A8\u133A9\u133AA\u133AB\u133AC\u133AD\u133AE\u133AF\u133B0\u133B1\u133B2\u133B3\u133B4\u133B5\u133B6\u133B7\u133B8\u133B9\u133BA\u133BB\u133BC\u133BD\u133BE\u133BF\u133C0\u133C1\u133C2\u133C3\u133C4\u133C5\u133C6\u133C7\u133C8\u133C9\u133CA\u133CB\u133CC\u133CD\u133CE\u133CF\u133D0\u133D1\u133D2\u133D3\u133D4\u133D5\u133D6\u133D7\u133D8\u133D9\u133DA\u133DB\u133DC\u133DD\u133DE\u133DF\u133E0\u133E1\u133E2\u133E3\u133E4\u133E5\u133E6\u133E7\u133E8\u133E9\u133EA\u133EB\u133EC\u133ED\u133EE\u133EF\u133F0\u133F1\u133F2\u133F3\u133F4\u133F5\u133F6\u133F7\u133F8\u133F9\u133FA\u133FB\u133FC\u133FD\u133FE\u133FF\u13400\u13401\u13402\u13403\u13404\u13405\u13406\u13407\u13408\u13409\u1340A\u1340B\u1340C\u1340D\u1340E\u1340F\u13410\u13411\u13412\u13413\u13414\u13415\u13416\u13417\u13418\u13419\u1341A\u1341B\u1341C\u1341D\u1341E\u1341F\u13420\u13421\u13422\u13423\u13424\u13425\u13426\u13427\u13428\u13429\u1342A\u1342B\u1342C\u1342D\u1342E',
              greekCharacters = '\u0370\u0371\u0372\u0373\u0374\u0375\u0376\u0377\u0378\u0379\u037a\u037b\u037c\u037d\u037e\u037f\u0380\u0381\u0382\u0383\u0384\u0385\u0386\u0387\u0388\u0389\u038a\u038b\u038c\u038d\u038e\u038f\u0390\u0391\u0392\u0393\u0394\u0395\u0396\u0397\u0398\u0399\u039a\u039b\u039c\u039d\u039e\u039f\u03a0\u03a1\u03a2\u03a3\u03a4\u03a5\u03a6\u03a7\u03a8\u03a9\u03aa\u03ab\u03ac\u03ad\u03ae\u03af\u03b0\u03b1\u03b2\u03b3\u03b4\u03b5\u03b6\u03b7\u03b8\u03b9\u03ba\u03bb\u03bc\u03bd\u03be\u03bf\u03c0\u03c1\u03c2\u03c3\u03c4\u03c5\u03c6\u03c7\u03c8\u03c9\u03ca\u03cb\u03cc\u03cd\u03ce\u03cf\u03d0\u03d1\u03d2\u03d3\u03d4\u03d5\u03d6\u03d7\u03d8\u03d9\u03da\u03db\u03dc\u03dd\u03de\u03df\u03e0\u03e1\u03e2\u03e3\u03e4\u03e5\u03e6\u03e7\u03e8\u03e9\u03ea\u03eb\u03ec\u03ed\u03ee\u03ef\u03f0\u03f1\u03f2\u03f3\u03f4\u03f5\u03f6\u03f7\u03f8\u03f9\u03fa\u03fb\u03fc\u03fd\u03fe\u03ff',
              katakanaCharacters = '\u30a0\u30a1\u30a2\u30a3\u30a4\u30a5\u30a6\u30a7\u30a8\u30a9\u30aa\u30ab\u30ac\u30ad\u30ae\u30af\u30b0\u30b1\u30b2\u30b3\u30b4\u30b5\u30b6\u30b7\u30b8\u30b9\u30ba\u30bb\u30bc\u30bd\u30be\u30bf\u30c0\u30c1\u30c2\u30c3\u30c4\u30c5\u30c6\u30c7\u30c8\u30c9\u30ca\u30cb\u30cc\u30cd\u30ce\u30cf\u30d0\u30d1\u30d2\u30d3\u30d4\u30d5\u30d6\u30d7\u30d8\u30d9\u30da\u30db\u30dc\u30dd\u30de\u30df\u30e0\u30e1\u30e2\u30e3\u30e4\u30e5\u30e6\u30e7\u30e8\u30e9\u30ea\u30eb\u30ec\u30ed\u30ee\u30ef\u30f0\u30f1\u30f2\u30f3\u30f4\u30f5\u30f6\u30f7\u30f8\u30f9\u30fa\u30fb\u30fc\u30fd\u30fe\u30ff',
              //latinCharacters = 'ABCDEFGHIKLMNOPQRSTVXYZ',
              latinCharacters = 'DEVRO',
              latinNumbers = '1234567890',
              runicCharacters = '\u16A0\u16A1\u16A2\u16A3\u16A4\u16A5\u16A6\u16A7\u16A8\u16A9\u16AA\u16AB\u16AC\u16AD\u16AE\u16AF\u16B0\u16B1\u16B2\u16B3\u16B4\u16B4\u16B5\u16B6\u16B7\u16B8\u16B9\u16BA\u16BB\u16BC\u16BD\u16BE\u16BF\u16C0\u16C1\u16C2\u16C3\u16C4\u16C5\u16C6\u16C7\u16C8\u16C9\u16CA\u16CB\u16CC\u16CD\u16CE\u16CF\u16D0\u16D1\u16D2\u16D3\u16D4\u16D5\u16D6\u16D7\u16D8\u16D9\u16DA\u16DB\u16DC\u16DE\u16DF\u16E0\u16E1\u16E2\u16E3\u16E4\u16E5\u16E6\u16E7\u16E8\u16E9\u16EA\u16EB\u16EC\u16ED\u16EE\u16EF\u16F0';

          var characters = chineseCharacters + runicCharacters + greekCharacters + katakanaCharacters + latinCharacters + latinNumbers;

          // Converting the string into an array of single characters
          var text = characters.split('');

          var fontSize = 16;
          var columns = canvas.width/fontSize; //number of columns for the rain

          // Array of drops - one per column
          var drops = [];

          // x below is the x coordinate
          // 1 = y co-ordinate of the drop(same for every drop initially)
          for (var x = 0; x < columns; x++) {
            drops[x] = 1;
          }

          // Drawing the characters
          function draw() {
            // Black BG for the canvas
            // Translucent BG to show trail
            ctx.fillStyle = 'rgba(255,255,255,.035)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = 'rgba(50,50,50,.55)'; // text color
            ctx.font = fontSize + 'px arial';

            // Looping over drops
            for (var i = 0; i < drops.length; i++) {
              // Random character to print
              var textPrint = text[Math.floor(Math.random()*text.length)];

              // x = i*fontSize, y = value of drops[i]*fontSize
              ctx.fillText(textPrint, i*fontSize, drops[i]*fontSize);

              // Sending the drop back to the top randomly after it has crossed the screen
              // Adding a randomness to the reset to make the drops scattered on the Y axis
              if (drops[i]*fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
              }

              // Incrementing Y coordinate
              drops[i]++;
            }
          }

          setInterval(draw, 95);
        })();
      }

      /**
       * Form controller
       */
      if (this.settings.contactForm.length > 0) {
        (function() {
          console.log('running');
          $('#contactForm').submit(function(e) {
            e.preventDefault();

            if (document.getElementById('subject').value.length === 0) {
              if (window.location.href.split('com/')[1] == 'contact.html') {
                alert('Please select \'What are you looking for\'.');
              } else {
                alert('Prosím zvolte \'Druh projektu\'.');
              }

              $('#subject').trigger('focus');
            } else {

              var $this = $(this);

              $.ajax({
                type: 'POST',
                url: 'contact.php',
                data: $($this).serialize()
              }).done(function(response) {
                e.preventDefault();

                if (window.location.href.split('com/')[1] == 'contact.html') {
                  alert('Thank you very much for contacting. I will reply in two days.');
                } else {
                  alert('Děkuji Vám za kontaktování. Do dvou dnů se Vám ozvu.');
                }

                // Clear the form.
                $($this)[0].reset();
              }).fail(function(data) {
                e.preventDefault();

                if (window.location.href.split('com/')[1] == 'contact.html') {
                  alert('Oops! There was a problem with your submission. Please complete the form and try again.');
                } else {
                  alert('Během odesílání zprávy došlo k problému. Prosím zkuste to znovu.');
                }
              });
            }
          });
        })();
      }

      /**
       * Lazy images
       */
      if (this.settings.lazyImages.length > 0) {
        (function() {
          // Test if image is in the viewport
          function isImageInViewport(img) {
            var rect = img.getBoundingClientRect();
            return (
              rect.top >= 0 &&
              rect.left >= 0 &&
              rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
              rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
          }

          // Add event listeners to images
          window.addEventListener('DOMContentLoaded', lazyLoadImages);
          window.addEventListener('load', lazyLoadImages);
          window.addEventListener('resize', lazyLoadImages);
          window.addEventListener('scroll', lazyLoadImages);

          // lazyLoadImages function
          function lazyLoadImages() {
            var lazyImagesArray = document.querySelectorAll('img[data-src]');
            for (var i = 0; i < lazyImagesArray.length; i++) {
              if (isImageInViewport(lazyImagesArray[i])) {
                lazyImagesArray[i].setAttribute('src', lazyImagesArray[i].getAttribute('data-src'));
                lazyImagesArray[i].removeAttribute('data-src');
              }
            }

            // Remove event listeners if all images are loaded
            if (lazyImagesArray.length == 0) {
              window.removeEventListener('DOMContentLoaded', lazyLoadImages);
              window.removeEventListener('load', lazyLoadImages);
              window.removeEventListener('resize', lazyLoadImages);
              window.removeEventListener('scroll', lazyLoadImages);
            }
          }
        })();
      }

      /**
       * Portfolio click blocker
       */
      if (this.settings.portfolioItem.length > 0) {
        (function() {
          // Get all portfolio items and store them inside an array
          var portfolioItems = document.querySelectorAll('.work__item');

          // Cycle through array of portfolio items and temporarily change 'href' attribute
          for (var i = 0, j = portfolioItems.length; i<j; i++) {
            //portfolioItems[i].setAttribute('href', '#');
          }
        })();
      }
    },
    init: function() {
      if (document.getElementsByClassName('no-js').length > 0) {
        document.getElementsByClassName('no-js')[0].classList.remove('no-js');
      }

      if (document.querySelectorAll('.no-js-img').length > 0) {
        var imagesArray = document.querySelectorAll('.no-js-img');

        for (var i = 0; i < imagesArray.length; i++) {
          imagesArray[i].classList.remove('no-js-img');
        }
      }

      app.controllers();
    }
  };

  app.init();
})();
