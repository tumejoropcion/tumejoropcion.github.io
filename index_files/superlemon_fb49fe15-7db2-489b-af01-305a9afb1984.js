
async function countryCodes(codes) {
  return new Promise(async (resolve, reject) => {
    let res = await fetch("https://cdn.shopify.com/s/files/1/0449/7794/6790/files/countrcodes.json?v=1659071972")
    if (res.status === 200) {
      codes = await res.json();
      resolve(codes)
    }
    else {
      resolve("")
    }
  })
}
function initJQuery(onJQueryLoad) {
  if (typeof jQuery == "undefined") {
    (function () {
      // Load jquery script if doesn't exist
      var script = document.createElement("SCRIPT");
      script.src =
        "https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";
      script.type = "text/javascript";
      script.onload = onJQueryLoad;
      document.head.appendChild(script);
    })();
  } else {
    onJQueryLoad();
  }
}

function initCss(done) {
  var link = document.createElement("link");
  link.setAttribute("rel", "stylesheet");
  link.setAttribute("type", "text/css");
  link.onload = done;
  link.setAttribute(
    "href",
    "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/superlemon_c15de0fe-1ddd-4cbf-afac-f931035001b4.css?v=1661421560"
  );
  document.head.appendChild(link);
}

async function btnLoad() {
  var codes = await countryCodes(codes);
  const SERVER_BASE_URL = "https://settings-api.superlemon.xyz";
  const SERVER_BASE_URL_MESSAGING = "https://optin-api.superlemon.xyz";
  const SERVER_BASE_URL_ANALYTICS = "https://analytics-api.superlemon.xyz";

  var me = document.currentScript;
  if (jQuery("#tadpole-script").length) {
    return;
  }

  function getShopId() {
    if (window.Shopify != undefined) {
      return window.Shopify.shop;
    }

    var url = window.location.href;
    var url = "qa-122.myshopify.com";
    // Get shop id from url
    var domain;
    domain = url.indexOf("://") > -1 ? url.split("/")[2] : url.split("/")[0];
    domain = domain.split(":")[0];

    return domain;
  }

  function deviceType() {
    return mobileCheck() ? 1 : 2;
  }

  function mobileCheck() {
    var check = false;
    (function (a) {
      if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
          a
        ) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
          a.substr(0, 4)
        )
      )
        check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
  }

  function fetchStoreSettings(shopId, successCallback) {
    jQuery.ajax({
      url: SERVER_BASE_URL + `/account/v1/shop/widget/settings?id=${shopId}`,
      type: "GET",
      success: function (response) {
        let settings = response.widget.settings;
        successCallback(settings);
      },
    });
  }

  /*==============*/
  /* OPTIN WIDGET */
  /*==============*/

  function createOptinWidget(settings, originalViewportSize) {
    if (settings.optin.enable) {
      if (isThankYouPage() && settings.optin.actions.includes("THANKYOU")) {
        runThankYouPageLogic(settings);
      } else if (settings.optin.enabledOnStoreFront) {
        if (settings.optin.actions.includes("CLICK_CHECKOUT")) {
          loadOptinWidgetOnCheckout(settings, originalViewportSize);
        }

        if (settings.optin.actions.includes("BUY_NOW")) {
          loadOptinWidgetOnBuyNow(settings, originalViewportSize);
        }

        if (settings.optin.actions.includes("ADD_TO_CART")) {
          loadOptinWidgetOnAddToCart(settings, originalViewportSize);
        }

        if (
          settings.optin.actions.includes("LAND_ON_CART") &&
          top.location.href.indexOf("/cart") > 0
        ) {
          loadOptinWidget(settings, originalViewportSize, function () { });
        }
      }
    }
  }

  function isThankYouPage() {
    return (
      window.location.pathname.match("(.*)/orders/(.*)") ||
      window.location.pathname.match("(.*)/checkouts/(.*)")
    );
  }

  function runThankYouPageLogic(settings, retry = 5) {
    jQuery.ajax({
      url:
        SERVER_BASE_URL_MESSAGING +
        "/messaging/v1/optin/order/phone/status?url=" +
        getShopId() +
        "&orderId=" +
        Shopify.checkout.order_id,
      type: "GET",
      success: function (response) {
        let order = response.orderStatus;
        switch (order.status) {
          case "NOT_FOUND":
            lastLocalStorageOptin = getLastLocalOptinFromThankyouPage();
            if (lastLocalStorageOptin && lastLocalStorageOptin.length !== 0) {
              customOptinFromThankYouPage(
                lastLocalStorageOptin,
                settings.optin.lang
              );
            } else {
              thankYouPageOptinWidget(settings.optin.lang);
            }
            if (retry > 0) {
              setTimeout(runThankYouPageLogic(settings, retry - 1), 500);
            }
            return;
          case "NOT_OPTED_IN":
            thankYouPageOptinWidget(settings.optin.lang, true, order.number, order.countryCode, order.phone);
            if (retry > 0) {
              setTimeout(runThankYouPageLogic(settings, retry - 1), 500);
            }
            return;
          case "CONFIRMED":
            loadOptinConfirmed(settings.optin.lang, order.phone);
            return;
          case "OPEN":
            if (retry > 0) {
              setTimeout(runThankYouPageLogic(settings, retry - 1), 500);
            }
            return;
          default:
            return;
        }
      },
    });
  }

  function getLastLocalOptinFromThankyouPage() {
    var unique_identifier = (
      (Shopify.checkout.email || "") + (Shopify.checkout.phone || "")
    ).replace(" ", "");
    if (
      !localStorage.getItem("previous_thank_you_page_optin") &&
      localStorage.getItem("opted_in_phone_v2") &&
      localStorage.getItem("opted_in_country_code_v2")
    ) {
      return [
        localStorage.getItem("opted_in_phone_v2"),
        localStorage.getItem("opted_in_country_code_v2"),
      ];
    } else if (localStorage.getItem("previous_thank_you_page_optin")) {
      previous_optin_obj = JSON.parse(
        localStorage.getItem("previous_thank_you_page_optin")
      );
      if (previous_optin_obj.unique_identifier == unique_identifier) {
        return [
          previous_optin_obj.phone_number,
          previous_optin_obj.country_code,
        ];
      }
    }
    return null;
  }

  function customOptinFromThankYouPage(phone, widgetLanguage, isPhoneWithCountryCode = false, phoneWithCountryCode) {
    var unique_identifier = (
      (Shopify.checkout.email || "") + (Shopify.checkout.phone || "")
    ).replace(" ", "");
    localStorage.setItem("opted_in_phone_v2", phone[0]);
    localStorage.setItem("opted_in_country_code_v2", phone[1]);
    localStorage.setItem(
      "previous_thank_you_page_optin",
      JSON.stringify({
        unique_identifier: unique_identifier,
        phone_number: phone[0],
        country_code: phone[1],
      })
    );
    var thankYouOptinConfirm = document.getElementById(
      "wa-order-update-widget"
    );
    jQuery.ajax({
      url: SERVER_BASE_URL_MESSAGING + "/messaging/v1/optin/order/phone",
      type: "POST",
      dataType: "json",
      contentType: "application/x-www-form-urlencoded",
      data: {
        url: getShopId(),
        phone: isPhoneWithCountryCode ? "+" + phoneWithCountryCode : phone[1] + phone[0],
        orderId: Shopify.checkout.order_id,
      },
      success: function () {
        if (thankYouOptinConfirm) {
          thankYouOptinConfirm.remove();
        }
        loadOptinConfirmed(widgetLanguage, isPhoneWithCountryCode ? "+" + phoneWithCountryCode : phone[1] + phone[0]);
      },
      error: function (e) {
        localStorage.removeItem("opted_in_phone_v2");
        localStorage.removeItem("opted_in_country_code_v2");
        localStorage.removeItem("previous_thank_you_page_optin");
        let error = JSON.parse(e.responseText);
        alert(error.message);
      },
    });
  }

  function loadOptinConfirmed(widgetLanguage, confirmedPhone) {
    if (!document.getElementById("optin-confirmed-success-true")) {
      var t = document.getElementsByClassName("section")[1];
      var f = t.childNodes[1];
      var d = document.createElement("div");
      d.className = "content-box";
      d.id = "wa-order-update-widget";

      var contentContainer = document.createElement("div");
      contentContainer.className =
        "content-box__row content-box__row--no-border";

      var contentHeader = document.createElement("h2");
      contentHeader.innerHTML = getConfirmedBtnText(widgetLanguage);
      contentHeader.style =
        "color: #2EB840; text-align:left; margin-bottom:10px;";

      var contentTitle = document.createElement("p");
      contentTitle.className = "os-step__description";
      contentTitle.id = "optin-confirmed-success-true";
      contentTitle.style = "margin-bottom:10px;";
      contentTitle.innerHTML =
        getOptinConfirmedText(widgetLanguage) +
        ' <img style="display: inline-block;vertical-align: middle; width:30px; margin-bottom:6px;" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_6.2_957b5e01-dd01-4e30-a595-d6f3bddef357.png?1197"/> ' +
        "<b>" +
        confirmedPhone +
        "</b>";

      contentContainer.appendChild(contentHeader);
      contentContainer.appendChild(contentTitle);

      d.appendChild(contentContainer);
      f.insertBefore(d, f.childNodes[3]);
    }
  }

  function getConfirmedBtnText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Confirmed!";
      case "PORTUGUESE":
        return "Confirmado!";
      case "SPANISH":
        return "¡Confirmado!";
      case "ITALIAN":
        return "Confermata!";
      case "FRENCH":
        return "Confirmé!";
      case "INDONESIAN":
        return "Dikonfirmasi!";
      case "GERMAN":
        return "Bestätigt!";
      case "ARABIC":
        return "تم تأكيد!";
      case "TURKISH":
        return "Onaylanmış!";
      case "HEBREW":
        return "אושר!";
      case "DUTCH":
        return "Bevestigd!";
    }
  }

  function getOptinConfirmedText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "You will receive order and delivery updates at";
      case "PORTUGUESE":
        return "Você receberá atualizações de pedidos e entregas em";
      case "SPANISH":
        return "Recibirá actualizaciones de pedidos y entregas en";
      case "ITALIAN":
        return "Riceverai gli aggiornamenti dell'ordine e della consegna all'indirizzo";
      case "FRENCH":
        return "Vous recevrez les mises à jour de commande et de livraison à l'adresse";
      case "INDONESIAN":
        return "Anda akan menerima rincian pesanan dan informasi pengiriman dari";
      case "GERMAN":
        return "Sie erhalten Bestellund Lieferaktualisierungen unter";
      case "ARABIC":
        return "سوف تتلقى تحديثات الطلب والتسليم على";
      case "TURKISH":
        return "Sipariş ve gönderim güncellemelerini üzerinden alacaksınız";
      case "HEBREW":
        return "אתה תקבל הזמנות ועדכוני משלוח על המספר";
      case "DUTCH":
        return "Je ontvangt je order- en leveringsupdates op";
    }
  }

  function thankYouPageOptinWidget(widgetLanguage, notOptedIn = false, number, countryCode, phoneWithCountryCode) {
    if (!document.getElementById("wa-order-update-widget")) {
      if (notOptedIn) {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML =
          ".numberContainer {} .numberContainer input{border: 0.05px solid; border-color: grey;} .numberInput { padding: 10px; height: 38px; font-size: 16px; width: 62%; box-sizing: border-box;} .confirmBtn { border-radius: 4px;margin-left: 16px; background: #2EB840; color: white; border-style: solid; padding: 4px 8px; position: relative; border: none; outline: none; font-size: 16px;} .confirmBtn:hover {box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.2);}";
        document.head.appendChild(style);

        var t = document.getElementsByClassName("section")[1];
        var f = t.childNodes[1];
        var d = document.createElement("div");
        d.className = "content-box";
        d.id = "wa-order-update-widget";

        var contentContainer = document.createElement("div");
        contentContainer.className =
          "content-box__row content-box__row--no-border";

        var contentHeader = document.createElement("h2");
        contentHeader.innerHTML = "";
        contentHeader.innerHTML =
          '<img style="vertical-align: middle;margin-bottom:8px" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_6.2_957b5e01-dd01-4e30-a595-d6f3bddef357.png?1197"/>' +
          getOrderUpdatesOnText(widgetLanguage);

        var contentTitle = document.createElement("p");
        contentTitle.className = "os-step__description";
        contentTitle.innerHTML = getThankyouPageOptinText(widgetLanguage);

        var numberContainer = document.createElement("div");
        numberContainer.style =
          "text-align: left; margin-top: 10px; margin-bottom: 14px;";
        numberContainer.className = "numberContainer";
        numberContainer.innerHTML = `
                <div style="display:flex; width:100%; justify-content:start;align-content:center">
                    <p style="font-weight:bold;width:80% !important;">Phone Number</p>
                </div>
                <div style="display:flex; width:100%; justify-content:start;align-content:center">
                    <input id="wa-optin-widget-thankyou-phone" class="numberInput" style="width:50% !important;pointer-events:none;" disabled type="tel" placeholder="XXXXXXXXX" value=${phoneWithCountryCode}></input>
                    <button class="confirmBtn" style="width:30% !important;" id="wa-optin-widget-thankyou-confirm-btn">${getOptInButtonText(
          widgetLanguage
        )}</button>
                </div>
                </div>`;
        contentContainer.appendChild(contentHeader);
        contentContainer.appendChild(contentTitle);
        contentContainer.appendChild(numberContainer);

        d.appendChild(contentContainer);
        f.insertBefore(d, f.childNodes[3]);

        jQuery("#wa-optin-widget-thankyou-confirm-btn").on(
          "click",
          function () {
            var phone = jQuery("#wa-optin-widget-thankyou-phone").val();
            if (phone) {
              customOptinFromThankYouPage([number, countryCode], widgetLanguage, true, phoneWithCountryCode);
            }
          }
        );
      } else {
        var style = document.createElement("style");
        style.type = "text/css";
        style.innerHTML =
          ".numberContainer {} .numberContainer input{border: 0.05px solid; border-color: grey;} .numberInput { padding: 10px; height: 38px; font-size: 16px; width: 62%; box-sizing: border-box;} .confirmBtn { border-radius: 4px;margin-left: 16px; background: #2EB840; color: white; border-style: solid; padding: 4px 8px; position: relative; border: none; outline: none; font-size: 16px;} .confirmBtn:hover {box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.2);}";
        document.head.appendChild(style);

        var t = document.getElementsByClassName("section")[1];
        var f = t.childNodes[1];
        var d = document.createElement("div");
        d.className = "content-box";
        d.id = "wa-order-update-widget";

        var contentContainer = document.createElement("div");
        contentContainer.className =
          "content-box__row content-box__row--no-border";

        var contentHeader = document.createElement("h2");
        contentHeader.innerHTML = "";
        contentHeader.innerHTML =
          '<img style="vertical-align: middle;margin-bottom:8px" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_6.2_957b5e01-dd01-4e30-a595-d6f3bddef357.png?1197"/>' +
          getOrderUpdatesOnText(widgetLanguage);

        var contentTitle = document.createElement("p");
        contentTitle.className = "os-step__description";
        contentTitle.innerHTML = getThankyouPageOptinText(widgetLanguage);

        var numberContainer = document.createElement("div");
        numberContainer.style =
          "text-align: left; margin-top: 10px; margin-bottom: 14px;";
        numberContainer.className = "numberContainer";
        numberContainer.innerHTML = `
                <div style="display:flex; width:100%; justify-content:center;align-content:center">
                    <p style="font-weight:bold;width:20% !important;">Country Code</p>
                    <p style="font-weight:bold;width:80% !important;">Phone Number</p>
                </div>
                <div style="display:flex; width:100%; justify-content:center;align-content:center">
                    
                ${!codes ? '<input id="wa-optin-widget-thankyou-countryCode" class="numberInput" style="width:20% !important;" type="tel" placeholder="+XXX"></input>' :
            `<select id="wa-optin-widget-thankyou-countryCode" class="numberInput" style="width:40% !important;">
                  <option selected="" value="">Select Country code</option>
                  ${codes.map(e => {
              return `<option value='${e.value}'>${e.label}</option>`
            })}
                  </select>`}
                    <input id="wa-optin-widget-thankyou-phone" class="numberInput" style="width:50% !important;" type="tel" placeholder="XXXXXXXXX"></input>
                    <button class="confirmBtn" style="width:30% !important;" id="wa-optin-widget-thankyou-confirm-btn">${getConfirmBtnText(
              widgetLanguage
            )}</button>
                </div>
                </div>`;
        contentContainer.appendChild(contentHeader);
        contentContainer.appendChild(contentTitle);
        contentContainer.appendChild(numberContainer);

        d.appendChild(contentContainer);
        f.insertBefore(d, f.childNodes[3]);

        jQuery("#wa-optin-widget-thankyou-confirm-btn").on(
          "click",
          function () {
            var phone = jQuery("#wa-optin-widget-thankyou-phone").val();
            const countryCode = jQuery(
              "#wa-optin-widget-thankyou-countryCode"
            ).val();
            if (!phone || phone.replace(/ /g, "").length < 6) {
              alert("Please enter a valid phone number");
              return;
            }
            if (!countryCode) {
              alert("Please enter a valid country code");
              return;
            }

            if (phone && countryCode && Shopify.checkout.order_id) {
              customOptinFromThankYouPage([phone, countryCode], widgetLanguage);
            }
          }
        );

        if (Shopify.checkout && Shopify.checkout.phone) {
          jQuery("#wa-optin-widget-thankyou-phone").val(Shopify.checkout.phone);
        } else {
          getCountryCodeFromCheckout(function (cc) {
            var phone = getPhoneFromShipping(cc);
            jQuery("#wa-optin-widget-thankyou-countryCode").val("+" + phone);
          });
        }
      }
    }
  }

  function getOrderUpdatesOnText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "WhatsApp notifications";
      case "PORTUGUESE":
        return "Notificações do WhatsApp";
      case "SPANISH":
        return "Notificaciones de WhatsApp";
      case "ITALIAN":
        return "Notifiche di WhatsApp";
      case "FRENCH":
        return "Notifications WhatsApp";
      case "INDONESIAN":
        return "Pemberitahuan WhatsApp";
      case "GERMAN":
        return "WhatsApp-Benachrichtigungen";
      case "ARABIC":
        return "إشعارات WhatsApp";
      case "TURKISH":
        return "WhatsApp bildirimleri";
      case "HEBREW":
        return "התראות WhatsApp";
      case "DUTCH":
        return "WhatsApp-meldingen";
    }
  }

  function getThankyouPageOptinText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Receive order and delivery updates via WhatsApp.";
      case "PORTUGUESE":
        return "Receba atualizações de pedidos e entregas via WhatsApp.";
      case "SPANISH":
        return "Reciba actualizaciones de pedidos y entregas a través de WhatsApp.";
      case "ITALIAN":
        return "Ricevi aggiornamenti su ordini e consegne tramite WhatsApp.";
      case "FRENCH":
        return "Recevez les mises à jour de commande et de livraison via WhatsApp.";
      case "INDONESIAN":
        return "Terima informasi rincian pesanan dan informasi pengiriman di Whatsapp.";
      case "GERMAN":
        return "Erhalten Sie Bestellund Lieferaktualisierungen über WhatsApp.";
      case "ARABIC":
        return "تلقي تحديثات الطلب والتسليم عبر WhatsApp.";
      case "TURKISH":
        return "Sipariş ve gönderim güncellemelerini WhatsApp üzerinden al.";
      case "HEBREW":
        return "קבלו הזמנות ועדכוני משלוח דרך הוואטסאפ";
      case "DUTCH":
        return "Ontvang order- en leveringsupdates op Whatsapp";
    }
  }

  function getConfirmBtnText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "CONFIRM";
      case "PORTUGUESE":
        return "CONFIRME";
      case "SPANISH":
        return "CONFIRMAR";
      case "ITALIAN":
        return "CONFERMARE";
      case "FRENCH":
        return "CONFIRMER";
      case "INDONESIAN":
        return "KONFIRMASI";
      case "GERMAN":
        return "BESTÄTIGEN";
      case "ARABIC":
        return "إرسال";
      case "TURKISH":
        return "ONAYLAMAK";
      case "HEBREW":
        return "אישור";
      case "DUTCH":
        return "BEVESTIGEN";
    }
  }
  function getOptInButtonText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Opt-in";
      case "PORTUGUESE":
        return "Opt-in";
      case "SPANISH":
        return "Optar en";
      case "ITALIAN":
        return "Opt-in";
      case "FRENCH":
        return "Opt-in";
      case "INDONESIAN":
        return "Opt-in";
      case "GERMAN":
        return "Opt-in";
      case "ARABIC":
        return "إرسال";
      case "TURKISH":
        return "Opt-in";
      case "HEBREW":
        return "Opt-in";
      case "DUTCH":
        return "Opt-in";
      default:
        return "Opt-in";
    }
  }

  function getCountryCodeFromCheckout(success) {
    if (
      Shopify.checkout &&
      Shopify.checkout.shipping_address &&
      Shopify.checkout.shipping_address.country_code
    ) {
      jQuery.getJSON(
        "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/iso_code.json?1203",
        function (data) {
          success(data[Shopify.checkout.shipping_address.country_code] || "");
        }
      );
    }
    return "";
  }

  function getPhoneFromShipping(countryCode) {
    var rawPhone = "";
    if (
      Shopify.checkout &&
      Shopify.checkout.shipping_address &&
      Shopify.checkout.shipping_address.phone
    ) {
      rawPhone = Shopify.checkout.shipping_address.phone;
      switch (countryCode) {
        case "91":
          if (rawPhone.startsWith(countryCode) && rawPhone.length == 12) {
            return rawPhone;
          } else if (rawPhone.startsWith(countryCode) && rawPhone.length < 12) {
            return countryCode + rawPhone;
          } else if (!rawPhone.startsWith(countryCode)) {
            return countryCode + rawPhone;
          }
        default:
          if (!rawPhone.startsWith(countryCode)) {
            return countryCode + rawPhone;
          } else {
            return rawPhone;
          }
      }
    }
    return countryCode;
  }

  function loadOptinWidgetOnCheckout(settings, originalViewportSize) {
    var secondClick = false;

    document.body.addEventListener(
      "click",
      function (e) {
        const checkout_btn = getTargetButtonFromEvent(e.target);
        const checkout_ahref = getTargetAhrefFromEvent(e.target);
        const closest_form =
          checkout_btn && checkout_btn.getAttribute("type") == "submit"
            ? jQuery(checkout_btn).closest("form")
            : null;

        if (
          (checkout_btn &&
            (checkout_btn.getAttribute("name") == "checkout" ||
              checkout_btn.getAttribute("onclick") ==
              "window.location='/checkout'")) ||
          (e.target &&
            e.target.name == "checkout" &&
            e.target.tagName == "INPUT") ||
          (checkout_ahref &&
            checkout_ahref.getAttribute("href") == "/checkout") ||
          (closest_form && closest_form.attr("action") == "/checkout")
        ) {
          if (!secondClick) {
            e.stopPropagation();
            e.preventDefault();
            loadOptinWidget(settings, originalViewportSize, function () {
              secondClick = true;
              e.target.click();
            });
          } else {
            secondClick = false;
          }
        }
      },
      true
    );
  }

  function getTargetButtonFromEvent(target) {
    if (!target) {
      return null;
    } else if (target.tagName == "BUTTON") {
      return target;
    } else if (jQuery(target).closest("button")) {
      return jQuery(target).closest("button")[0];
    } else {
      return null;
    }
  }

  function getTargetAhrefFromEvent(target) {
    if (!target) {
      return null;
    } else if (target.tagName == "A") {
      return target;
    } else if (jQuery(target).closest("a")) {
      return jQuery(target).closest("a")[0];
    }
  }

  function loadOptinWidgetOnBuyNow(settings, originalViewportSize) {
    var secondClick = false;

    document.body.addEventListener(
      "click",
      function (e) {
        const buy_now_target = getTargetButtonFromEvent(e.target);
        if (
          buy_now_target &&
          buy_now_target.getAttribute("data-testid") &&
          buy_now_target.getAttribute("data-testid") == "Checkout-button"
        ) {
          if (!secondClick) {
            e.preventDefault();
            e.stopPropagation();
            loadOptinWidget(settings, originalViewportSize, function () {
              secondClick = true;
              buy_now_target.click();
            });
          } else {
            secondClick = false;
          }
        }
      },
      true
    );
  }

  function loadOptinWidgetOnAddToCart(settings, originalViewportSize) {
    var secondClick = false;
    document.body.addEventListener(
      "click",
      function (e) {
        const add_to_cart_target = getTargetButtonFromEvent(e.target);
        const closest_form = jQuery(add_to_cart_target).closest("form");
        if (
          add_to_cart_target &&
          add_to_cart_target.getAttribute("data-testid") != "Checkout-button" &&
          closest_form &&
          closest_form.attr("action") == "/cart/add"
        ) {
          if (!secondClick) {
            e.stopPropagation();
            e.preventDefault();
            loadOptinWidget(settings, originalViewportSize, function () {
              secondClick = true;
              if (e.target.click) {
                e.target.click();
              } else if (e.target["tagName"] === "svg") {
                e.target.parentNode.click();
              } else if (e.target["tagName"] === "path") {
                e.target.closest("svg").parentNode.click();
              }
            });
          } else {
            secondClick = false;
          }
        }
      },
      true
    );
  }

  try {
    function loadOptinWidget(settings, originalViewportSize, onDismiss) {
      jQuery("body").removeClass("wa-optin-widget-stop-scrolling");
      jQuery("#wa-optin-widget-main").remove();

      let current_device_type = deviceType();
      if (
        (((current_device_type == 1) &
          settings.optin.devices.includes("mobile")) |
          ((current_device_type == 2) &
            settings.optin.devices.includes("desktop"))) ===
        0
      ) {
        setTimeout(onDismiss, 200);
        return;
      }

      if (
        Date.now() -
        JSON.parse(localStorage.getItem("optin_widget_last_shown")) <
        settings.optin.delayBetweenEachOptinWidgetShow * 1000
      ) {
        setTimeout(onDismiss, 200);
        return;
      }

      if (localStorage.getItem("opted_in_phone_v2")) {
        setTimeout(onDismiss, 200);
        return;
      }

      if (
        localStorage.getItem("dismiss_count") > 1 &&
        Date.now() -
        JSON.parse(localStorage.getItem("optin_widget_last_dismissed")) <
        settings.optin.delayAfterOptinWidgetDismissed * 1000
      ) {
        setTimeout(onDismiss, 200);
        return;
      } else if (
        localStorage.getItem("dismiss_count") > 1 &&
        Date.now() -
        JSON.parse(localStorage.getItem("optin_widget_last_dismissed")) >=
        settings.optin.delayAfterOptinWidgetDismissed * 1000
      ) {
        localStorage.removeItem("dismiss_count");
      }

      var widgetContainer = document.createElement("div");
      var blurContainer = document.createElement("div");
      blurContainer.className = "wa-blur-container wa-optin-widget-z-index";
      blurContainer.id = "wa-optin-widget-main";
      document.body.appendChild(blurContainer);
      jQuery(blurContainer).hide();

      //zIndex from settings
      var style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML =
        ".wa-optin-widget-z-index { z-index:" +
        (current_device_type === 1
          ? settings.devices.mobile.zIndex.optin
          : settings.devices.desktop.zIndex.optin) +
        ";}";
      document.head.appendChild(style);

      widgetContainer.className =
        "wa-optin-widget-container wa-optin-widget-z-index";

      if (
        window.getComputedStyle(document.body).direction == "rtl" &&
        mobileCheck()
      ) {
        widgetContainer.style.transform = "translate(-50%, -50%)";
      } else if (window.getComputedStyle(document.body).direction == "rtl") {
        widgetContainer.style.transform = "translate(-25%, -50%)";
      }

      var closeBtn = document.createElement("div");
      closeBtn.className = "wa-optin-widget-close-btn";

      var closeImg = document.createElement("img");
      closeImg.className = "wa-optin-widget-close-img";
      closeImg.src =
        "https://cdn.shopify.com/s/files/1/0272/5983/0365/files/Vector_4.png?36";

      closeBtn.appendChild(closeImg);

      closeBtn.onclick = function (e) {
        var dismiss_count = localStorage.getItem("dismiss_count");
        localStorage.setItem(
          "dismiss_count",
          parseInt(dismiss_count) ? parseInt(dismiss_count) + 1 : 1
        );
        localStorage.setItem(
          "optin_widget_last_dismissed",
          JSON.stringify(Date.now())
        );
        removeOptinWidget();
        onDismiss();
      };

      var contentContainer = document.createElement("div");
      contentContainer.className = "wa-optin-widget-content-container";

      var leftSec = document.createElement("div");
      var rightSec = document.createElement("div");

      var title = document.createElement("div");
      title.className = "wa-optin-widget-title-container";
      title.innerHTML = getOptinWidgetTitleText(settings.optin.lang);

      var ulContainer = document.createElement("div");
      ulContainer.className = "wa-optin-widget-ul-container";

      ulContainer.innerHTML = `<ul class="wa-optin-widget-ul">
                  <li class="wa-optin-widget-list-items">
                      <img src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Group_27.png?1401" alt="check icon" />
                      <span> ${getOrderText(settings.optin.lang)}</span>
                  </li>
                  <li class="wa-optin-widget-list-items">
                      <img src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Group_27.png?1401" alt="check icon" />
                      <span> ${getDeliveryText(settings.optin.lang)}</span>
                  </li>
                  <li class="wa-optin-widget-list-items">
                      <img src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Group_27.png?1401" alt="check icon" />
                      <span> ${getCustomerSupportText(settings.optin.lang)}</span>
                  </li>
              </ul>`;

      leftSec.appendChild(title);
      leftSec.appendChild(ulContainer);

      var rightSecTxtCont = document.createElement("div");
      rightSecTxtCont.className = "wa-optin-widget-right-sec-content-container";

      var inputBox = document.createElement("div");
      inputBox.className = "wa-optin-widget-input-box";

      //flag imoji
      var countryLogo = document.createElement("span");
      countryLogo.className = "wa-optin-widget-country-flag";
      countryLogo.id = "wa-splmn-country-flag-logo";

      var buttonConfirm = document.createElement("button");
      buttonConfirm.innerText = getConfirmBtnText(settings.optin.lang);
      buttonConfirm.className = "wa-optin-widget-confirm-btn";
      buttonConfirm.id = "wa-optin-widget-confirm-btn";

      var bgContainer = document.createElement("div");
      bgContainer.className = "wa-optin-widget-title-bg-container";

      leftSec.className = "wa-optin-widget-left-sec";
      rightSec.className = "wa-optin-widget-right-sec";

      var textContent = document.createElement("div");
      var inputContainer = document.createElement("div");
      inputContainer.className = "wa-input-container";

      var countryCodeInput;
      if (!codes) {
        countryCodeInput = document.createElement("input");
        countryCodeInput.className = "wa-optin-widget-input input-country-code";
        countryCodeInput.placeholder = "+XXX";
        countryCodeInput.id = "wa-optin-country-code";
        countryCodeInput.autocomplete = "off";
      }
      else {
        var countryCodeInput = document.createElement("select");
        countryCodeInput.className = "wa-optin-widget-input input-country-code-select";
        countryCodeInput.placeholder = "+XXX";
        countryCodeInput.id = "wa-optin-country-code";
        countryCodeInput.autocomplete = "off";
        inputBox.appendChild(countryCodeInput);
        var option = document.createElement("option");
        option.value = "";
        option.text = "Country code";
        countryCodeInput.appendChild(option);
        //Create and append the options
        for (var i = 0; i < codes.length; i++) {
          var option = document.createElement("option");
          option.value = codes[i].value;
          option.text = codes[i].label; //`(${codes[i].code}) +${codes[i].value}`;
          countryCodeInput.appendChild(option);
        }
      }

      var numberInput = document.createElement("input");
      numberInput.className = "wa-optin-widget-input";
      numberInput.placeholder = "XXXXXXXXX";
      numberInput.id = "wa-optin-phone-number";
      numberInput.autocomplete = "off";
      numberInput.type = "tel";

      numberInput.addEventListener("keydown", (e) => {
        var confirmBtn = document.getElementById("wa-optin-widget-confirm-btn");
        if (e.target.value.length >= 1) {
          if (confirmBtn) {
            confirmBtn.classList.add("wa-optin-widget-confirm-btn-active");
          }
        } else if (!e.target.value.trim()) {
          if (confirmBtn) {
            confirmBtn.classList.remove("wa-optin-widget-confirm-btn-active");
          }
        }
      });

      inputBox.appendChild(countryLogo);
      inputBox.appendChild(countryCodeInput);
      inputBox.appendChild(numberInput);

      rightSecTxtCont.appendChild(inputBox);
      rightSecTxtCont.appendChild(buttonConfirm);

      rightSec.appendChild(rightSecTxtCont);
      contentContainer.appendChild(closeBtn);
      contentContainer.appendChild(bgContainer);

      contentContainer.appendChild(leftSec);
      contentContainer.appendChild(rightSec);

      numberInput.onblur = () => {
        if (mobileCheck()) {
          setTimeout(function () {
            restoreMobileOptinWidgetSize();
          }, 200);
        }
      };

      window.onresize = function () {
        if (mobileCheck()) {
          var updatedSize = jQuery(window).width() + jQuery(window).height();

          if (updatedSize == originalViewportSize) {
            // this means keyboard is not visible
            restoreMobileOptinWidgetSize();
          } else {
            // this means keyboard is visible
            shrinkMobileOptinWidget();
          }
        }
      };

      buttonConfirm.onclick = function () {
        var phone = jQuery("#wa-optin-phone-number").val();
        var countryCode = jQuery("#wa-optin-country-code").val();
        if (!countryCode) {
          alert("Please enter a country code");
          return;
        }
        if (!phone || phone.replace(/ /g, "").length < 6) {
          alert("Please enter a valid phone number");
          return;
        }

        if (phone && countryCode) {
          jQuery.ajax({
            url: SERVER_BASE_URL_MESSAGING + "/messaging/v1/optin/widget",
            type: "POST",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            data: {
              url: getShopId(),
              number: phone,
              countryCode: countryCode,
            },
            success: function (e) {
              localStorage.setItem("opted_in_phone_v2", phone);
              localStorage.setItem("opted_in_country_code_v2", countryCode);
              removeOptinWidget();
              onDismiss();
            },
            error: function (e) {
              if (e && e.status === 202) {
                localStorage.setItem("opted_in_phone_v2", phone);
                localStorage.setItem("opted_in_country_code_v2", countryCode);
                removeOptinWidget();
                onDismiss();
              } else {
                if (e.responseText) {
                  let error = JSON.parse(e.responseText);
                  alert(error.message);
                }
              }
            },
          });
        }
      };

      contentContainer.appendChild(textContent);
      widgetContainer.appendChild(contentContainer);
      jQuery("body").addClass("wa-optin-widget-stop-scrolling");

      blurContainer.appendChild(widgetContainer);
      jQuery(blurContainer).fadeIn();

      localStorage.setItem(
        "optin_widget_last_shown",
        JSON.stringify(Date.now())
      );

      // document.getElementById("wa-optin-country-code").addEventListener('focus', (e) => {
      //     if (e.relatedTarget) {
      //         e.relatedTarget.removeAttribute('tabindex');
      //         e.target.focus();
      //     }
      //     return false;
      // })

      document
        .getElementById("wa-optin-country-code")
        .addEventListener("focus", (e) => {
          if (e.relatedTarget) {
            setTimeout(() => {
              e.relatedTarget.removeAttribute("tabindex");
              e.target.focus();
            }, 100);
          }
          return false;
        });
      document
        .getElementById("wa-optin-phone-number")
        .addEventListener("focus", (e) => {
          if (e.relatedTarget) {
            setTimeout(() => {
              e.relatedTarget.removeAttribute("tabindex");
              e.target.focus();
            }, 100);
          }
          return false;
        });

      if (!mobileCheck()) {
        jQuery("#wa-optin-country-code").focus();
      }
    }
  } catch (e) { }

  function removeOptinWidget() {
    jQuery("#wa-optin-widget-main").fadeOut(600, "linear");
    setTimeout(function () {
      jQuery("body").removeClass("wa-optin-widget-stop-scrolling");
      jQuery("#wa-optin-widget-main").remove();
    }, 200);
  }

  function getOptinWidgetTitleText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Receive updates on </span>
                  <br/>
                  <span class="wa-optin-widget-title-text"><img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp
                  </span>
                  </p>`;

      case "PORTUGUESE":
        return `<p class="wa-optin-widget-title">
                  <span class="title-text">Receba atualizações</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">no<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "SPANISH":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Recibe actualizaciones</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">en<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "ITALIAN":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Ricevi aggiornamenti</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">su<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "FRENCH":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Recevez des mises à</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">jour<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "INDONESIAN":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Terima informasi</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">di<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "GERMAN":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Erhalte Updates</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">über<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "ARABIC":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">تلقي التحديثات على</span>
                  <br/>
                  <span class="wa-optin-widget-title-text"><img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "TURKISH":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Güncellemeleri buradan</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">al<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "HEBREW":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">קבל עדכונים דרך</span>
                  <br/>
                  <span class="wa-optin-widget-title-text"><img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      case "DUTCH":
        return `<p class="wa-optin-widget-title">
                  <span class="wa-optin-widget-title-text">Ontvang updates</span>
                  <br/>
                  <span class="wa-optin-widget-title-text">op<img class="wa-optin-widget-title-text-logo" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/whatsapp-logo-large.png?1435" alt="whatsapp logo" />WhatsApp</span>
                  </p>`;

      default:
        return "";
    }
  }

  function getOrderText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Order details";
      case "PORTUGUESE":
        return "Detalhes do pedido";
      case "SPANISH":
        return "Detalles del pedido";
      case "ITALIAN":
        return "Dettagli dell'ordine";
      case "FRENCH":
        return "Détails de la commande";
      case "INDONESIAN":
        return "Rincian pesanan";
      case "GERMAN":
        return "Bestelldetails";
      case "ARABIC":
        return "تفاصيل الطلب";
      case "TURKISH":
        return "Sipariş detayları";
      case "HEBREW":
        return "פרטי הזמנה";
      case "DUTCH":
        return "Bestel Details";
      default:
        return "";
    }
  }

  function getDeliveryText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Delivery updates";
      case "PORTUGUESE":
        return "Atualizações de entrega";
      case "SPANISH":
        return "Actualizaciones de entrega";
      case "ITALIAN":
        return "Aggiornamenti di consegna";
      case "FRENCH":
        return "Mises à jour de livraison";
      case "INDONESIAN":
        return "Informasi pengiriman";
      case "GERMAN":
        return "Lieferaktualisierungen";
      case "ARABIC":
        return "تحديثات التسليم";
      case "TURKISH":
        return "Gönderim güncellemeleri";
      case "HEBREW":
        return "עדכוני משלוח";
      case "DUTCH":
        return "Levering updates";
      default:
        return "";
    }
  }

  function getCustomerSupportText(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        return "Customer support";
      case "PORTUGUESE":
        return "Suporte ao cliente";
      case "SPANISH":
        return "Atención al cliente";
      case "ITALIAN":
        return "Servizio Clienti";
      case "FRENCH":
        return "Service client";
      case "INDONESIAN":
        return "Dukungan pelanggan";
      case "GERMAN":
        return "Kundendienst";
      case "ARABIC":
        return "دعم العملاء";
      case "TURKISH":
        return "Müşteri desteği";
      case "HEBREW":
        return "שירות לקוחות";
      case "DUTCH":
        return "Klantenservice";
      default:
        return "";
    }
  }

  function restoreMobileOptinWidgetSize() {
    if (document.querySelector(".wa-optin-widget-ul-container")) {
      document.querySelector(".wa-optin-widget-ul-container").style.display =
        "flex";
      document.querySelector(".wa-optin-widget-right-sec").style.marginTop =
        "0";
      document
        .querySelector(".wa-optin-widget-right-sec")
        .classList.remove(
          "wa-optin-widget-virtual-keyboard-right-sec-margin-top"
        );
      document
        .querySelector(".wa-optin-widget-confirm-btn")
        .classList.remove(
          "wa-optin-widget-virtual-keyboard-confirm-btn-margin"
        );
    }
  }

  function shrinkMobileOptinWidget() {
    if (document.querySelector(".wa-optin-widget-ul-container")) {
      document.querySelector(".wa-optin-widget-ul-container").style.display =
        "none";
      document
        .querySelector(".wa-optin-widget-right-sec")
        .classList.add("wa-optin-widget-virtual-keyboard-right-sec-margin-top");
      document
        .querySelector(".wa-optin-widget-confirm-btn")
        .classList.add("wa-optin-widget-virtual-keyboard-confirm-btn-margin");
    }
  }

  function createOldOptinWidget(settings) {
    if (settings.optin.enable) {
      if (isThankYouPage()) {
        if (localStorage.getItem("opted_in_phone_v2")) {
          if (Shopify.checkout.order_id) {
            jQuery.ajax({
              url: SERVER_BASE_URL + "/shop/order/optin/v2",
              type: "POST",
              dataType: "json",
              contentType: "application/json",
              data: JSON.stringify({
                shop_id: getShopId(),
                phone: localStorage.getItem("opted_in_phone_v2"),
                order_id: Shopify.checkout.order_id,
              }),
            });
          }
          loadOptinConfirmed(settings.optin.lang);
        } else {
          thankYouPageOptinWidget(settings.optin.lang);
        }
      } else {
        jQuery("form[action^='/cart']").on("submit", function () {
          loadOldOptinWidget(settings);
        });
        jQuery("form[action^='/cart']")
          .find("button")
          .on("click", function () {
            loadOldOptinWidget(settings);
          });
        jQuery("form[action^='/cart/add']")
          .find("button")
          .on("click", function () {
            loadOldOptinWidget(settings);
          });
        jQuery("#add-to-cart").on("click", function () {
          loadOldOptinWidget(settings);
        });
        if (top.location.href.indexOf("/cart") > 0) {
          loadOldOptinWidget(settings);
        }
      }
    }
  }

  function loadOldOptinWidget(settings) {
    jQuery("#wa-optin-widget-root-old").remove();

    if (localStorage.getItem("opted_in_phone_v2")) {
      return;
    }

    if (localStorage.getItem("dismiss_count") > 1) {
      return;
    }

    let current_device_type = deviceType();
    var widgetContainer = document.createElement("div");
    widgetContainer.id = "wa-optin-widget-root-old";

    //zIndex from settings
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML =
      ".wa-optin-widget-z-index-old { z-index:" +
      (current_device_type === 1
        ? settings.devices.mobile.zIndex.optin
        : settings.devices.desktop.zIndex.optin) +
      ";}";
    document.head.appendChild(style);

    widgetContainer.className =
      "wa-optin-widget-container-old wa-optin-widget-z-index-old";

    var closeBtn = document.createElement("div");
    closeBtn.className = "wa-optin-widget-close-btn-old";
    closeBtn.onclick = function () {
      var dismiss_count = localStorage.getItem("dismiss_count");
      localStorage.setItem(
        "dismiss_count",
        parseInt(dismiss_count) ? parseInt(dismiss_count) + 1 : 1
      );
      jQuery("#wa-optin-widget-root-old").remove();
    };

    var closeImg = document.createElement("img");
    closeImg.className = "wa-optin-widget-close-img-old";
    closeImg.src =
      "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Group_2.png?1194";

    closeBtn.appendChild(closeImg);

    var contentContainer = document.createElement("div");
    contentContainer.className = "wa-optin-widget-content-container-old";

    var logoImg = document.createElement("img");
    logoImg.className = "wa-optin-widget-logo-img-old";
    logoImg.src = getOptinWidgetLogoImg(settings.optin.lang);

    var numberContainer = document.createElement("div");
    numberContainer.style = "text-align: center";

    var countryCodeInput = document.createElement("input");
    countryCodeInput.className =
      "wa-optin-widget-number-input-old input-country-code";
    countryCodeInput.placeholder = "+91";
    countryCodeInput.id = "wa-optin-country-code-old";
    countryCodeInput.autocomplete = "off";

    var numberInput = document.createElement("input");
    numberInput.className = "wa-optin-widget-number-input-old";
    numberInput.placeholder = "XXXXXXXXXX";
    numberInput.id = "wa-optin-phone-number-old";
    numberInput.type = "tel";

    var confirmButton = document.createElement("button");
    confirmButton.className = "wa-optin-widget-confirm-button-old";
    confirmButton.innerHTML = getConfirmBtnText(settings.optin.lang);
    confirmButton.onclick = function () {
      var phone = jQuery("#wa-optin-phone-number-old").val();
      var countryCode = jQuery("#wa-optin-country-code-old").val();

      if (phone && countryCode) {
        localStorage.setItem("opted_in_phone_v2", phone);
        localStorage.setItem("opted_in_country_code_v2", countryCode);
        jQuery.ajax({
          url: SERVER_BASE_URL_MESSAGING + "/messaging/v1/optin/widget",
          type: "POST",
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          data: {
            url: getShopId(),
            number: phone,
            countryCode: countryCode,
          },
          success: function () {
            jQuery("#wa-optin-widget-root-old").remove();
          },
          error: function (e) {
            let error = JSON.parse(e.responseText);
            alert(error.message);
          },
        });
      }
    };

    numberContainer.appendChild(countryCodeInput);
    numberContainer.appendChild(numberInput);
    numberContainer.appendChild(confirmButton);

    contentContainer.appendChild(logoImg);
    contentContainer.appendChild(numberContainer);

    widgetContainer.appendChild(closeBtn);
    widgetContainer.appendChild(contentContainer);

    document.body.appendChild(widgetContainer);
    document
      .getElementById("wa-optin-country-code-old")
      .addEventListener("focus", (e) => {
        if (e.relatedTarget) {
          e.relatedTarget.removeAttribute("tabindex");
          e.target.focus();
        }
        return false;
      });
    jQuery("#wa-optin-country-code-old").focus();
  }

  function getOptinWidgetLogoImg(widgetLanguage) {
    switch (widgetLanguage) {
      case "ENGLISH":
        if (mobileCheck()) {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-eng-mobile.png";
        } else {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-eng-desktop.png";
        }
      case "PORTUGUESE":
        if (mobileCheck()) {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-por-mobile.png";
        } else {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-por-desktop-s.png?1306";
        }
      case "SPANISH":
        if (mobileCheck()) {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-spa-mobile.png";
        } else {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-spa-desktop-s.png?1306";
        }
      case "ITALIAN":
        if (mobileCheck()) {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-ita-mobile.png?1538";
        } else {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-ita-desktop.png?1538";
        }
      default:
        if (mobileCheck()) {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-eng-mobile.png";
        } else {
          return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/optin-eng-desktop.png";
        }
    }
  }

  /*======================*/
  /* WhatsApp Chat Button */
  /*======================*/

  function createWhatsappBtn(settings) {
    var current_device_type = deviceType();
    var settingsDeviceType = getDeviceTypeFromSettings(settings);

    if (
      settings.chatButton.enabled &&
      (settingsDeviceType & current_device_type) != 0 &&
      settings.agents.length > 0 &&
      settings.agents[0].phone &&
      (settings.store.showButtonWhenOffline ||
        (settings.store.open && isAtleastOneAgentAvailable(settings))) &&
      isWhatsAppBtnVisible(settings)
    ) {
      var style = document.createElement("style");
      style.type = "text/css";

      var chatButton = settings.chatButton;

      //zindex from settings
      style.innerHTML =
        ".wa-splmn-chat-btn-offset {" +
        getButtonAlignment(settings) +
        ": " +
        getHeightOffset(current_device_type, settings) +
        "px;" +
        getButtonPosition(current_device_type, settings, "chat") +
        ":" +
        getHorizontalOffset(current_device_type, settings) +
        "px;" +
        "z-index:" +
        (current_device_type === 1
          ? settings.devices.mobile.zIndex.chat
          : settings.devices.desktop.zIndex.chat) +
        ";}";
      document.head.appendChild(style);

      var d = document.createElement("div");
      d.id = "wa-chat-btn-root";

      d.className = "wa-chat-btn-fixed wa-splmn-chat-btn-offset";

      var icon_url = chatButton.iconUrl;

      if (!icon_url) {
        icon_url =
          "https://cdn.shopify.com/s/files/1/0265/2572/8803/files/wa.svg?v=1586952948";
      }

      var is_chat_btn_solid_background = settings.chatButton.colors.solidBg;
      var bgColor1 = settings.chatButton.colors.bg[0] || "#20802C";
      var bgColor2 = settings.chatButton.colors.bg[1] || "#30BF42";
      var iconColor = settings.chatButton.colors.icon || "#ffffff";
      var chat_btn_text_color = settings.chatButton.colors.text || "#ffffff";
      var mainStyleStr = "";
      var imgStyleStr = "";
      var textStyleStr = "";
      var iconStyleStr = "";
      var iconClass = "";

      if (chatButton.colors.custom) {
        d.className += " wa-custom-chat-btn";
        textStyleStr = `color: ${chat_btn_text_color}`;

        iconStyleStr = `background: ${iconColor}; -webkit-mask-image: url(${icon_url}); -webkit-mask-size: cover; -webkit-mask-position: center;`;

        if (
          chatButton.cssClasses.btn.includes("wa-chat-btn-base-cta-with-icon")
        ) {
          if (is_chat_btn_solid_background) {
            imgStyleStr = `background: ${bgColor1};`;
          } else {
            imgStyleStr = `background-image: linear-gradient(112.42deg, ${bgColor1} 0%, ${bgColor1} 0.01%, ${bgColor2} 100%);`;
          }

          if (chatButton.cssClasses.icon.includes("no-box-shadow")) {
            iconClass += " " + "no-box-shadow";
          }
        } else {
          if (is_chat_btn_solid_background) {
            mainStyleStr = `background: ${bgColor1};`;
          } else {
            mainStyleStr = `background-image: linear-gradient(112.42deg, ${bgColor1} 0%, ${bgColor1} 0.01%, ${bgColor2} 100%);`;
          }

          imgStyleStr += iconStyleStr;

          if (chatButton.cssClasses.icon.includes("no-box-shadow")) {
            d.className += " " + "no-box-shadow";
            iconClass += " " + "no-box-shadow";
          }
        }

        if (chatButton.cssClasses.btn.includes("bordered")) {
          mainStyleStr += " " + "border: 1px solid " + iconColor;
        }
        d.style = mainStyleStr;
      }

      if (chatButton && chatButton.cssClasses.btn) {
        d.className += " " + chatButton.cssClasses.btn;
      } else {
        d.className += " wa-chat-btn-default";
      }

      var btn_position = getButtonPosition(
        current_device_type,
        settings,
        "chat"
      );

      var defaultTextMarkUp = `<div class="wa-chat-button-cta-text" style="${textStyleStr}">${chatButton.cta}</div>`;
      var defaultImageMarkUp = chatButton.colors.custom
        ? `<div class="${chatButton.cssClasses.icon} wa-custom-icon" style="${imgStyleStr}"></div>`
        : `<img class="${chatButton.cssClasses.icon}" alt="Whatsapp Chat Button" style="${imgStyleStr}" src=${settings.chatButton.iconUrl}/>`;

      if (
        chatButton &&
        chatButton.cssClasses.btn.includes("wa-chat-btn-base-cta-with-icon") &&
        chatButton.ctaEnabled
      ) {
        if (chatButton.colors.custom) {
          defaultImageMarkUp = `<div class="wa-chat-btn-base-icon ${iconClass}" style="${imgStyleStr}">
                      <div style="${iconStyleStr}" class="${chatButton.cssClasses.icon}"></div>
                    </div>`;
        }

        d.innerHTML =
          btn_position === "right"
            ? defaultTextMarkUp + defaultImageMarkUp
            : defaultImageMarkUp + defaultTextMarkUp;
      } else if (chatButton && chatButton.ctaEnabled) {
        d.innerHTML = defaultImageMarkUp + defaultTextMarkUp;
      } else if (chatButton) {
        d.innerHTML = defaultImageMarkUp + "<span></span>";
      } else {
        d.innerHTML =
          '<img class="wa-chat-btn-default-waicon" src="https://cdn.shopify.com/s/files/1/0021/6799/6525/files/whatsicon.png?11367248219507062847"/><div class="wa-chat-button-cta-text">' +
          chatButton.cta +
          "</div>";
      }

      d.onclick = onClick(settings, current_device_type);
      document.body.appendChild(d);
    }
  }

  function getDeviceTypeFromSettings(settings, type = "chat") {
    let deviceType = 3; // By default for both mobile and desktop

    const positionType = type === "chat" ? "chatPos" : type === "share" ? "sharePos" : "spinWheelPos";

    let isMobile =
      settings.devices &&
      settings.devices.mobile &&
      settings.devices.mobile[positionType];
    let isDesktop =
      settings.devices &&
      settings.devices.desktop &&
      settings.devices.desktop[positionType];

    if (isMobile && isDesktop) deviceType = 3;
    else if (isMobile) deviceType = 1;
    else if (isDesktop) deviceType = 2;

    return deviceType;
  }

  function isAtleastOneAgentAvailable(settings) {
    for (var i = 0; i < settings.agents.length; i++) {
      if (
        isAgentCurrentlyAvailable(settings.agents[i], settings.store.timezone)
      ) {
        return true;
      }
    }

    return false;
  }

  const weekday = {
    Sun: 6,
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
  };

  function isAgentCurrentlyAvailable(agent, store_timezone = "UTC") {
    // options for intl object
    options = {
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: store_timezone,
      hourCycle: "h23",
    };

    // get intl string with options
    const intlObj = new Intl.DateTimeFormat("en-US", options)
      .format(new Date())
      .trim();
    // get weekday name and time from intlObj
    const dateObjSplit = intlObj.split(" ");
    // get week day index
    const currentDayIndex = weekday[dateObjSplit[0]];
    // get current hours and minutes
    const time = dateObjSplit[1].split(":");
    const hours = parseInt(time[0]);
    const minutes = parseInt(time[1]);

    var currentHourMinutes = hours * 60 + minutes;
    var startHourMinutes =
      parseInt(agent.timings[currentDayIndex].start_time.substring(0, 2)) * 60 +
      parseInt(agent.timings[currentDayIndex].start_time.substring(2, 4));
    var endHourMinutes =
      parseInt(agent.timings[currentDayIndex].end_time.substring(0, 2)) * 60 +
      parseInt(agent.timings[currentDayIndex].end_time.substring(2, 4));

    return (
      startHourMinutes <= currentHourMinutes &&
      endHourMinutes >= currentHourMinutes
    );
  }

  function isWhatsAppBtnVisible(settings) {
    let showOnPages = settings.chatButton.showOnPages;
    if (window.location.pathname === "/" && !showOnPages?.includes("HOME")) {
      return false;
    } else if (isCollectionsPage() && !showOnPages?.includes("COLLECTION")) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/products/(.*)") ||
        window.location.pathname.match("(.*)/products")) &&
      !showOnPages?.includes("PRODUCT")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/cart/(.*)") ||
        window.location.pathname.match("(.*)/cart")) &&
      !(
        (deviceType() === 2 && showOnPages?.includes("CART_DESKTOP")) ||
        (deviceType() === 1 && showOnPages.includes("CART_MOBILE"))
      )
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/orders/(.*)") ||
        window.location.pathname.match("(.*)/orders") ||
        window.location.pathname.match("(.*)/checkouts/(.*)")) &&
      !showOnPages?.includes("THANKYOU")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/blogs/(.*)") ||
        window.location.pathname.match("(.*)/blogs")) &&
      !showOnPages?.includes("BLOGPOST")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/pages/(.*)") ||
        window.location.pathname.match("(.*)/pages")) &&
      !showOnPages?.includes("PAGE")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/account/(.*)") ||
        window.location.pathname.match("(.*)/account")) &&
      !showOnPages?.includes("ACCOUNT")
    ) {
      return false;
    } else {
      return true;
    }
  }

  function isCollectionsPage() {
    if (
      (window.location.pathname.match("(.*)/collections/(.*)") ||
        window.location.pathname.match("(.*)/collections")) &&
      !(
        window.location.pathname.match("(.*)/products/(.*)") ||
        window.location.pathname.match("(.*)/products")
      )
    ) {
      return true;
    } else {
      return false;
    }
  }

  function getButtonAlignment(settings) {
    if (settings.chatButton.chatAlign == 2) {
      return "top";
    } else {
      return "bottom";
    }
  }

  function getHeightOffset(current_device_type, settings) {
    if (current_device_type == 1) {
      return settings.devices.mobile.pages.product.differentHeight &&
        isProductPage()
        ? settings.devices.mobile.pages.product.offset
        : settings.devices.mobile.verticalOffset;
    } else if (current_device_type == 2) {
      return settings.devices.desktop.pages.product.differentHeight &&
        isProductPage()
        ? settings.devices.desktop.pages.product.offset
        : settings.devices.desktop.verticalOffset;
    }
  }

  function isProductPage() {
    if (window.location.pathname.match("(.*)/products/(.*)")) {
      return true;
    } else {
      return false;
    }
  }

  function getButtonPosition(current_device_type, settings, type) {
    var pos = "right";
    if (current_device_type == 1) {
      if (settings && settings.devices && settings.devices.mobile) {
        switch (type) {
          case "share":
            pos = settings.devices.mobile.sharePos;
            break;
          case "spinWheel":
            pos = settings.devices.mobile.spinWheelPos;
            break;
          default:
            pos = settings.devices.mobile.chatPos;
            break;
        }
      }
    } else if (current_device_type == 2) {
      if (settings && settings.devices && settings.devices.desktop) {
        switch (type) {
          case "share":
            pos = settings.devices.desktop.sharePos;
            break;
          case "spinWheel":
            pos = settings.devices.desktop.spinWheelPos;
            break;
          default:
            pos = settings.devices.desktop.chatPos;
            break;
        }
      }
    }

    return pos;
  }

  function getHorizontalOffset(current_device_type, settings) {
    if (current_device_type == 1) {
      return settings.devices.mobile.horizontalOffset;
    } else if (current_device_type == 2) {
      return settings.devices.desktop.horizontalOffset;
    }
  }

  /*=======================*/
  /* Callout/Greeting Card */
  /*=======================*/
  function loadCalloutCard(settings, current_device_type) {
    var current_device_type = deviceType();
    var settingsDeviceType = getDeviceTypeFromSettings(settings);
    if (
      settings.chatButton.enabled &&
      (settingsDeviceType & current_device_type) != 0 &&
      settings.agents.length > 0 &&
      settings.agents[0].phone &&
      settings.store.open &&
      settings.callout.enabled &&
      settings.callout.text
    ) {
      let closeBtn = document.createElement("div");
      closeBtn.className =
        "wa-callout-card-close-btn wa-callout-card-close-btn-" +
        getButtonPosition(current_device_type, settings);

      closeBtn.innerHTML +=
        '<img src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/cancel_button_final.png?1361">';

      var calloutCard = document.createElement("div");
      var callout = document.createElement("div");
      calloutCard.id = "wa-callout-card";
      callout.className = "callout-text-container";
      callout.appendChild(closeBtn);
      var p = document.createElement("p");
      p.innerText = settings.callout.text;
      callout.appendChild(p);
      calloutCard.appendChild(callout);

      var style = document.createElement("style");
      style.type = "text/css";
      //zIndex from settings
      style.innerHTML =
        ".wa-callout-card-offset { bottom: " +
        getHeightOffset(current_device_type, settings) +
        "px;" +
        getButtonPosition(current_device_type, settings) +
        ":" +
        getHorizontalOffset(current_device_type, settings) +
        "px;" +
        "z-index:" +
        (current_device_type === 1
          ? settings.devices.mobile.zIndex.callout
          : settings.devices.desktop.zIndex.callout) +
        ";}";
      document.head.appendChild(style);

      calloutCard.className = "wa-callout-card-fixed wa-callout-card-offset";

      calloutCard.onclick = function (e) {
        handleCalloutCard(e, settings, current_device_type);
      };

      var url =
        "https://cdn.shopify.com/s/files/1/0272/5983/0365/files/whatsapp_message-_AudioTrimmer.com.mp3?21";

      checkCalloutCardVisibilityTiming(
        settings,
        current_device_type,
        calloutCard,
        style,
        url
      );
    }
  }

  function handleCalloutCard(e, settings, current_device_type) {
    if (
      e.target.classList.contains("wa-callout-card-close-btn") ||
      e.target.parentNode.classList.contains("wa-callout-card-close-btn")
    ) {
      hideCalloutCard();
    } else {
      onClick(settings, current_device_type)();
      jQuery("#wa-callout-card").hide();
    }
  }

  function hideCalloutCard() {
    var isCalloutCard = document.getElementById("wa-callout-card");
    if (isCalloutCard) {
      document
        .getElementById("wa-callout-card")
        .classList.remove("animate-callout-card");
      document
        .getElementById("wa-callout-card")
        .classList.add("hide-callout-card");
      setTimeout(function () {
        jQuery("#wa-callout-card").hide();
      }, 500);
    }
  }

  function onClick(settings, current_device_type) {
    return function () {
      hideCalloutCard();
      if (settings.store.multiAgentEnabled && settings.agents.length > 1) {
        loadGreetingWidget(settings, current_device_type);
      } else {
        if (!settings.store.open) {
          var message = getStoreClosedMessage(settings);
          alert(message);
        } else if (!getOnlineAgentsCount(settings)) {
          var message = settings.greeting.offlineMessages.agent
            ? settings.greeting.offlineMessages.agent
            : "Apologies for the inconvenience but none of our agents are online at this time. Please check after sometime.";
          alert(message);
        } else {
          var message = getFinalWhatsappMsg(settings);
          var available_agent = getFirstAvailableAgent(settings);
          var link = getWhatsappLink(
            available_agent.phone,
            message,
            current_device_type
          );

          onChatInitiated(settings, null);
          openInNewTab(link);
        }
      }
    };
  }

  function loadGreetingWidget(settings, current_device_type) {
    if (jQuery("#wa-chat-bubble").length) {
      jQuery("#wa-chat-bubble").show();
      jQuery("#wa-chat-bubble").removeClass("bounceDown");
      jQuery("#wa-chat-bubble").addClass("bounceUp");
      jQuery("#wa-chat-btn-root").hide();
      return;
    }

    var root = document.createElement("div");
    root.id = "wa-chat-bubble";

    //zIndex from settings
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML =
      ".wa-greeting-widget-z-index { z-index:" +
      (current_device_type === 1
        ? settings.devices.mobile.zIndex.greeting
        : settings.devices.desktop.zIndex.greeting) +
      ";}";
    document.head.appendChild(style);

    var greetingTemplateId = settings.greeting.templateId;
    var greetingColors = settings.greeting.colors;
    root.className =
      "wa-chat-bubble-floating-popup animated wa-greeting-widget-z-index wa-chat-bubble-pos-" +
      getButtonPosition(current_device_type, settings, "greeting") +
      (greetingTemplateId > 200 && greetingTemplateId < 300
        ? " wa-intercom"
        : "");

    var header = document.createElement("div");
    header.className =
      "wa-chat-bubble-header-common wa-chat-bubble-header-" +
      greetingTemplateId +
      (greetingTemplateId > 100 && greetingTemplateId < 200 ? " wavy" : "");

    var avatarStyleStr = "";
    var headerStyleStr = "";
    var horizontalGradient = true;
    var bgColor1 = greetingColors.bg[0] || "#20802C";
    var bgColor2 = greetingColors.bg[1] || "#30BF42";
    var headTextStyle = "";
    var descTextStyle = "";

    if (settings.greeting.colors.custom) {
      switch (greetingTemplateId) {
        case 301:
          break;
        case 302:
          header.className += " wavy";
          break;
        case 303:
          horizontalGradient = false;
          root.className += " wa-intercom";
          break;
      }

      headerStyleStr = greetingColors.solidBg
        ? `background: ${bgColor1}`
        : horizontalGradient
          ? `background-image: linear-gradient(110.56deg, ${bgColor1} 0%, ${bgColor2} 100%)`
          : `background-image: linear-gradient(164.25deg, ${bgColor1} 18.04%, ${bgColor2} 81.96%)`;

      header.style = headerStyleStr;
      avatarStyleStr = `background: ${bgColor1};`;
      headTextStyle = `color: ${greetingColors.head || "#ffffff"}`;
      descTextStyle = `color: ${greetingColors.desc || "#ffffff"}`;
    }

    header.appendChild(getCloseButton());
    header.appendChild(getHeaderTitle(settings, headTextStyle));
    header.appendChild(getHeaderDesc(settings, descTextStyle));

    // change the background then, set the agent background.
    var chat = document.createElement("div");
    chat.className = "wa-chat-bubble-chat";

    if (!settings.store.open) {
      var message = getStoreClosedMessage(settings);
      var div = document.createElement("div");
      div.className = "wa-chat-multiple-cs";
      var agent = document.createElement("div");
      agent.className = "list-cs";

      var agentProfile = document.createElement("div");
      agentProfile.className = "wa-chat-bubble-cs-profile";
      agentProfile.innerHTML =
        '<div class="wa-chat-bubble-profile-name">' + message + "</div>";
      agent.appendChild(agentProfile);
      div.appendChild(agent);

      chat.appendChild(div);
      root.appendChild(header);
      root.appendChild(chat);
    } else if (!getOnlineAgentsCount(settings)) {
      var message =
        settings.greeting.offlineMessages.agent ||
        "Apologies for the inconvenience but none of our agents are online at this time. Please check after sometime.";
      var div = document.createElement("div");
      div.className = "wa-chat-multiple-cs";

      var agent = document.createElement("div");
      agent.className = "list-cs";

      var agentProfile = document.createElement("div");
      agentProfile.className = "wa-chat-bubble-cs-profile";
      agentProfile.innerHTML =
        '<div class="wa-chat-bubble-profile-name">' + message + "</div>";
      agent.appendChild(agentProfile);
      div.appendChild(agent);

      chat.appendChild(div);
      root.appendChild(header);
      root.appendChild(chat);
    } else {
      chat.appendChild(
        getMultipleAgents(settings, current_device_type, avatarStyleStr)
      );
      root.appendChild(header);
      root.appendChild(chat);
    }

    let enablePoweredBy;
    if (settings.greeting.disablePoweredBy == null) {
      enablePoweredBy = true;
    } else {
      enablePoweredBy = !settings.greeting.disablePoweredBy;
    }

    if (enablePoweredBy) {
      var footer = document.createElement("div");
      footer.className = "wa-chat-widget-footer";
      footer.innerHTML =
        '<span style="vertical-align: middle;">Powered by <span class="wa-chat-widget-footer-superlemon">SuperLemon</span></span>';
      footer.onclick = function () {
        openInNewTab(
          "https://apps.shopify.com/whatsapp-chat-button?utm_source=poweredby"
        );
      };
      root.appendChild(footer);
    }

    document.body.appendChild(root);

    jQuery("#wa-chat-bubble").addClass("bounceUp");
    jQuery("#wa-chat-btn-root").hide();
  }

  function getCloseButton() {
    var closeBtn = document.createElement("div");
    closeBtn.className = "wa-chat-bubble-close-btn";
    closeBtn.innerHTML =
      '<img style="display: table-row" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Vector.png?574">';

    closeBtn.onclick = function () {
      // new bouncedown greeting widget animation
      jQuery("#wa-chat-bubble").removeClass("bounceUp");
      jQuery("#wa-chat-bubble").addClass("bounceDown");
      jQuery("#wa-chat-btn-root").show();
    };
    return closeBtn;
  }

  function getHeaderTitle(settings, customStyle = "") {
    var headerTitle = document.createElement("div");
    headerTitle.className = "wa-chat-bubble-header-title";
    headerTitle.innerHTML = settings.greeting.multiAgentTitle;
    headerTitle.style = customStyle;
    return headerTitle;
  }

  function getHeaderDesc(settings, customStyle = "") {
    var headerDesc = document.createElement("div");
    headerDesc.className = "wa-chat-bubble-header-desc";
    headerDesc.innerHTML = settings.greeting.multiAgentMsg;
    headerDesc.style = customStyle;
    return headerDesc;
  }

  function getOnlineAgentsCount(settings) {
    var count = 0;
    for (var i = 0; i < settings.agents.length; i++) {
      if (!settings.agents[i].enabled) {
        continue;
      }

      if (
        !isAgentCurrentlyAvailable(settings.agents[i], settings.store.timezone)
      ) {
        continue;
      }

      count += 1;
    }

    return count;
  }

  function getStoreClosedMessage(settings) {
    const today = getDay() - 1;
    let start_time, end_time;

    // get today's shop time
    for (const obj of settings.store.timings) {
      if (obj.day === today) {
        start_time = obj.start_time;
        end_time = obj.end_time;
      }
    }

    start_time = start_time.substring(0, 2) + ":" + start_time.substring(2, 4);
    end_time = end_time.substring(0, 2) + ":" + end_time.substring(2, 4);

    var message =
      settings.greeting.offlineMessages.store ||
      "Hi, our working hours are <start time> to <end time>, request you to reach us at the same time. Apologies for the inconvenience.";
    message = message.replace("<start time>", start_time);
    message = message.replace("<end time>", end_time);

    return message;
  }

  function getDay() {
    return new Date().getDay();
  }

  function getFinalWhatsappMsg(settings) {
    if (settings.chatButton.productLink) {
      return (
        encodeURIComponent(window.location.href.split("?")[0]) +
        "%0A%0A" +
        encodeURIComponent(settings.chatButton.chatMessage)
      );
    } else {
      return encodeURIComponent(settings.chatButton.chatMessage);
    }
  }

  function getFirstAvailableAgent(settings) {
    for (var i = 0; i < settings.agents.length; i++) {
      if (
        isAgentCurrentlyAvailable(
          settings.agents[i],
          settings.store.timezone
        ) &&
        settings.agents[i].enabled
      ) {
        return settings.agents[i];
      }
    }
    return null;
  }

  function getAgentAvatarUrl(agent) {
    switch (agent.avatarId) {
      case 1:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Male-1.png?770";
      case 2:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Male-2.png?770";
      case 3:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Female-1.png?770";
      case 4:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Female-2.png?770";
      case 5:
        return agent.avatarUrl;
      default:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Male-1.png?770";
    }
  }

  function getMultipleAgents(settings, current_device_type, customStyle = "") {
    var multiplecs = document.createElement("div");
    multiplecs.className = "wa-chat-multiple-cs";

    if (settings.greeting.shuffleAgents) {
      settings.agents = shuffle(settings.agents);
    }

    for (var i = 0; i < settings.agents.length; i++) {
      if (!settings.agents[i].enabled) {
        continue;
      }

      if (
        !isAgentCurrentlyAvailable(settings.agents[i], settings.store.timezone)
      ) {
        continue;
      }

      var agent = document.createElement("div");
      agent.className = "list-cs";

      var agentAvatar = document.createElement("div");
      agentAvatar.innerHTML = `<img class="wa-chat-bubble-whatsapp-avatar" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/tiny-logo.png?840"><div class="wa-chat-bubble-avatar"><img style="height: 55px; width: 55px; border-radius: 50%; ${customStyle}" class="${"avatar-theme-" + settings.greeting.templateId
        }" src="${getAgentAvatarUrl(settings.agents[i])}"></div>`;
      agent.appendChild(agentAvatar);

      var agentProfile = document.createElement("div");
      agentProfile.className = "wa-chat-bubble-cs-profile";
      agentProfile.innerHTML =
        '<div class="wa-chat-bubble-profile-name">' +
        settings.agents[i].name +
        "</div><p>" +
        settings.agents[i].role +
        "</p>";
      agent.appendChild(agentProfile);

      var message = getFinalWhatsappMsg(settings);
      var link = getWhatsappLink(
        settings.agents[i].phone,
        message,
        current_device_type
      );

      agent.onclick = getCustomerSuportOnClick(
        link,
        settings,
        settings.agents[i].id
      );
      multiplecs.appendChild(agent);
    }

    return multiplecs;
  }

  function shuffle(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function getCustomerSuportOnClick(link, settings, agent_id) {
    return function () {
      onChatInitiated(settings, agent_id);
      openInNewTab(link);
    };
  }

  function getWhatsappLink(phone, message, current_device_type) {
    var link = "";
    var IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (current_device_type == 2) {
      link = "https://web.whatsapp.com/send?text=" + message;
    } else if (current_device_type == 1 && !IOS) {
      link = "whatsapp://send?text=" + message;
    } else if (current_device_type == 1 && IOS) {
      link = "https://api.whatsapp.com/send?text=" + message;
    }
    if (phone) {
      link += "&phone=" + phone;
    }
    return link;
  }

  function onChatInitiated(settings, agent_id) {
    const shop_id = getShopId();
    jQuery.ajax({
      url: SERVER_BASE_URL_ANALYTICS + '/analytics/click/chat?' + jQuery.param({ url: shop_id }),
      type: 'POST',
    });

    var ga = window.ga;
    // fire the GA event.
    if (
      settings.is_google_analytics_enabled &&
      ga &&
      typeof ga === "function"
    ) {
      ga("send", {
        hitType: "event",
        eventCategory: settings.google_analytics_event_category,
        eventAction: settings.google_analytics_event_action,
        eventLabel: settings.google_analytics_event_label,
      });
    }

    var fbq = window.fbq;
    // fire the Fb pixel event.
    if (settings.is_facebook_pixel_enabled && fbq) {
      fbq("track", settings.fb_pixel_event_name, {});
    }
  }

  function openInNewTab(href) {
    Object.assign(document.createElement("a"), {
      target: "_blank",
      href: href,
    }).click();
  }

  function checkCalloutCardVisibilityTiming(
    settings,
    current_device_type,
    calloutCard,
    style,
    url
  ) {
    if (localStorage.callout_card_last_shown) {
      if (
        Date.now() -
        JSON.parse(localStorage.getItem("callout_card_last_shown")) >=
        settings.callout.timeDelay * 1000
      ) {
        showCalloutCard(settings, current_device_type, calloutCard, style, url);
      }
    } else {
      showCalloutCard(settings, current_device_type, calloutCard, style, url);
    }
  }

  function showCalloutCard(
    settings,
    current_device_type,
    calloutCard,
    style,
    url
  ) {
    setTimeout(function () {
      if (jQuery("#wa-chat-btn-root").is(":visible")) {
        document.body.appendChild(calloutCard);
        if (settings.callout.notification) {
          playSound(url);
        }

        let whatsAppBtnHeigth = document.getElementById("wa-chat-btn-root")
          ? document.getElementById("wa-chat-btn-root").clientHeight
          : 0;
        let bottomOffset =
          Number(getHeightOffset(current_device_type, settings)) +
          whatsAppBtnHeigth +
          12;
        setTimeout(function () {
          style.innerHTML +=
            ".animate-callout-card { bottom: " + bottomOffset + "px;}";
          document.head.appendChild(style);
          calloutCard.classList.add("animate-callout-card");
        }, 400);
      }
      localStorage.setItem(
        "callout_card_last_shown",
        JSON.stringify(Date.now())
      );
    }, settings.callout.delay * 1000);
  }

  function playSound(url) {
    if (!document.getElementById("superlemon-iframe")) {
      var i = document.createElement("iframe");
      i.src =
        "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/silence.mp3?1304";
      i.allow = "autoplay";
      i.id = "audio";
      i.style = "display:none";
      i.id = "superlemon-iframe";
      document.body.appendChild(i);
    }

    var a = document.createElement("audio");
    a.setAttribute("autoplay", "");
    a.innerHTML = '<source src="' + url + '" type="audio/mp3">';
  }

  /*=======================*/
  /* WhatsApp Share Button */
  /*=======================*/
  function createWhatsappShareBtn(settings) {
    var current_device_type = deviceType();
    var settingsDeviceType = getDeviceTypeFromSettings(settings, "share");

    if (
      settings.shareButton.enabled &&
      (settingsDeviceType & current_device_type) != 0 &&
      isShareBtnVisible(settings)
    ) {
      var d = document.createElement("div");
      d.className = "wa-share-btn-container";

      let shareButton = settings.shareButton;

      var textColorStr = "";
      var bgColor1 = shareButton.colors.bg[0];
      var bgColor2 = shareButton.colors.bg[1];
      var iconColor = shareButton.colors.icon || "#ffffff";
      if (shareButton.colors.custom) {
        if (shareButton.colors.solidBg) {
          d.style = `background: ${bgColor1 || "#22ce5b"}`;
        } else {
          d.style = `background-image: linear-gradient(90deg, ${bgColor1} 0%, ${bgColor2} 100%);`;
        }
        textColorStr = `color: ${shareButton.colors.text || "#ffffff"}`;
      }

      //zIndex from settings
      var style = document.createElement("style");
      style.type = "text/css";
      style.innerHTML =
        ".wa-share-btn-z-index { z-index:" +
        (current_device_type === 1
          ? settings.devices.mobile.zIndex.share
          : settings.devices.desktop.zIndex.share) +
        ";}";
      var verticalOffsetShare =
        current_device_type === 1
          ? settings.devices.mobile.verticalOffsetShare
          : settings.devices.desktop.verticalOffsetShare;
      style.innerHTML += ` .wa-splmn-share-btn-offset {${verticalOffsetShare > 88
        ? `top: calc(100% - ${verticalOffsetShare}%); bottom: unset;`
        : `bottom: ${verticalOffsetShare}%;`
        } }`;
      document.head.appendChild(style);

      d.className +=
        " wa-share-btn-pos-" +
        getButtonPosition(current_device_type, settings, "share");
      d.className +=
        " " +
        getShareButtonTheme(shareButton.buttonId) +
        " " +
        "wa-share-btn-z-index" +
        " " +
        "wa-share-btn-theme-" +
        shareButton.buttonId;
      d.className += " wa-splmn-share-btn-offset";

      var img_url = getShareButtonImg(shareButton.buttonId);
      var imgStr = `<img src="${img_url}" class="wa-share-btn-img"></img>`;
      if (shareButton.colors.custom) {
        imgStr = `<div class="wa-share-btn-img wa-share-icon wa-share-mask" style="background: ${iconColor}"></div>`;
      }
      d.innerHTML +=
        '<p class="wa-share-btn-cta" style="' +
        textColorStr +
        '">' +
        shareButton.cta +
        "</p>" +
        imgStr;

      var message = getFinalWhatsappShareMsg(settings);
      var link = getWhatsappLink(null, message, current_device_type);

      d.onclick = onShareBtnClick(link);
      document.body.appendChild(d);
    }
  }

  function isShareBtnVisible(settings) {
    let showOnPages = settings.shareButton.showOnPages;
    if (window.location.pathname === "/" && !showOnPages?.includes("HOME")) {
      return false;
    } else if (isCollectionsPage() && !showOnPages?.includes("COLLECTION")) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/products/(.*)") ||
        window.location.pathname.match("(.*)/products")) &&
      !showOnPages?.includes("PRODUCT")
    ) {
      return false;
    } else if ((window.location.pathname.match("(.*)/cart/(.*)") ||
      window.location.pathname.match("(.*)/cart")) &&
      !(
        (deviceType() === 2 && showOnPages?.includes("CART_DESKTOP")) ||
        (deviceType() === 1 && showOnPages.includes("CART_MOBILE"))
      )) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/orders/(.*)") ||
        window.location.pathname.match("(.*)/orders") ||
        window.location.pathname.match("(.*)/checkouts/(.*)")) &&
      !showOnPages?.includes("THANKYOU")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/blogs/(.*)") ||
        window.location.pathname.match("(.*)/blogs")) &&
      !showOnPages?.includes("BLOGPOST")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/pages/(.*)") ||
        window.location.pathname.match("(.*)/pages")) &&
      !showOnPages?.includes("PAGE")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/account/(.*)") ||
        window.location.pathname.match("(.*)/account")) &&
      !showOnPages?.includes("ACCOUNT")
    ) {
      return false;
    } else {
      return true;
    }
  }

  function getShareButtonTheme(template_id) {
    switch (template_id) {
      case 1:
        return "wa-share-btn-tmpl-regular";
      case 2:
        return "wa-share-btn-tmpl-inverted";
      case 3:
        return "wa-share-btn-tmpl-black-regular";
      case 4:
        return "wa-share-btn-tmpl-black-inverted";
      case 5:
        return "wa-share-btn-tmpl-old";
    }
  }

  function getShareButtonImg(template_id) {
    switch (template_id) {
      case 1:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/new_logo_1_0226a498-7303-4b41-a78c-cc5d9c1db062.png?463";
      case 2:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_2.6.png?463";
      case 3:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/112_2.png?825";
      case 4:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/113.png?819";
      case 5:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/image_6.4.png?816";
      default:
        return "https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Group.svg?v=1583716483";
    }
  }

  function getFinalWhatsappShareMsg(settings) {
    return (
      encodeURIComponent(window.location.href.split("?")[0]) +
      "%0A%0A" +
      encodeURIComponent(settings.shareButton.shareMessage)
    );
  }

  function onShareBtnClick(link) {
    return function () {
      const shop_id = getShopId();
      jQuery.ajax({
        url: SERVER_BASE_URL_ANALYTICS + '/analytics/click/share?' + jQuery.param({ url: shop_id }),
        type: 'POST',
      });
      openInNewTab(link);
    };
  }

  /*=======================*/
  /* Spin The Wheel Button */
  /*=======================*/
  function getSpinSpecialDiscountUnlocked(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Special discount unlocked";
      case "ARABIC":
        return "خصم خاص مفتوح";
      case "DUTCH":
        return "Speciale korting ontgrendeld";
      case "FRENCH":
        return "Remise spéciale débloqué";
      case "GERMAN":
        return "Sonderrabatt freigeschaltet";
      case "HEBREW":
        return "הנחה מיוחדת לא נעולה";
      case "PORTUGUESE":
        return "Desconto especial desbloqueado";
      case "RUSSIAN":
        return "Специальная скидка разблокирована";
      case "SPANISH":
        return "Descuento especial desbloqueado";
      case "TURKISH":
        return "Özel indirim kilidi açıldı";
      case "INDONESIAN":
        return "Diskon Khusus Tidak Terkunci";
      case "ITALIAN":
        return "Sconto speciale sbloccato";
      default:
        return "Special discount unlocked";
    }
  }
  function getSpinTheWheel(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Spin the Wheel";
      case "ARABIC":
        return "تدور العجلة";
      case "DUTCH":
        return "Draai het wiel";
      case "FRENCH":
        return "Tourne la roue";
      case "GERMAN":
        return "Drehe das Rad";
      case "HEBREW":
        return "סובב את הגלגל";
      case "PORTUGUESE":
        return "Gire a roda";
      case "RUSSIAN":
        return "Поверните колесо";
      case "SPANISH":
        return "Gira la rueda";
      case "TURKISH":
        return "Tekerleği döndür";
      case "INDONESIAN":
        return "Putar rodanya";
      case "ITALIAN":
        return "Gira la ruota";
      default:
        return "Spin the Wheel";
    }
  }
  function getSpinWheelGameRules(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return `
      <p><strong>Rules:</strong></p>
      <ul>
        <li>You can spin the wheel only once</li>
        <li>If you win, you can claim the coupon</li>
      </ul>
      `;
      case "ARABIC":
        return `
      <p><strong>قواعد:</strong></p>
      <ul>
      <li> يمكنك تدوير العجلة مرة واحدة فقط </li>
        <li>إذا فزت ، يمكنك المطالبة بالقسيمة</li>
      </ul>
      `;
      case "DUTCH":
        return `
      <p><strong>Reglement:</strong></p>
      <ul>
        <li>U kunt het wiel slechts eenmaal draaien</li>
        <li>Als u wint, kunt u de coupon claimen</li>
      </ul>
      `;
      case "FRENCH":
        return `
      <p><strong>Règles:</strong></p>
      <ul>
        <li>Vous ne pouvez faire tourner la roue qu'une seule fois</li>
        <li>Si vous gagnez, vous pouvez réclamer le coupon</li>
      </ul>
      `;
      case "GERMAN":
        return `
      <p><strong>Regeln</strong></p>
      <ul>
        <li>Sie können das Rad nur einmal drehen</li>
        <li>Wenn Sie gewinnen, können Sie den Gutschein beanspruchen</li>
      </ul>
      `;
      case "HEBREW":
        return `
      <p><strong>כללים:</strong></p>
      <ul>
        <li>אתה יכול לסובב את הגלגל רק פעם אחת</li>
        <li>אם אתה מנצח, אתה יכול לתבוע את הקופון</li>
      </ul>
      `;
      case "PORTUGUESE":
        return `
      <p><strong>Regras:</strong></p>
      <ul>
        <li>Você pode girar a roda apenas uma vez</li>
        <li>Se você vencer, você pode reivindicar o cupom</li>
      </ul>
      `;
      case "RUSSIAN":
        return `
      <p><strong>Правила:</strong></p>
      <ul>
        <li>Вы можете крутить колесо только один раз</li>
        <li>Если вы выиграете, вы можете требовать купона</li>
      </ul>
      `;
      case "SPANISH":
        return `
      <p><strong>Normas:</strong></p>
      <ul>
        <li>Puedes girar la rueda solo una vez</li>
        <li>Si gana, puede reclamar el cupón</li>
      </ul>
      `;
      case "TURKISH":
        return `
      <p><strong>Tüzük:</strong></p>
      <ul>
        <li>Tekerleği yalnızca bir kez döndürebilirsiniz</li>
        <li>Kazanırsanız, kuponu talep edebilirsiniz</li>
      </ul>
      `;
      case "INDONESIAN":
        return `
      <p><strong>Aturan:</strong></p>
      <ul>
        <li>Anda hanya dapat memutar roda sekali</li>
        <li>Jika Anda menang, Anda dapat mengklaim kuponnya</li>
      </ul>
      `;
      case "ITALIAN":
        return `
      <p><strong>Regole:</strong></p>
      <ul>
        <li>Puoi girare la ruota solo una volta</li>
        <li>Se vinci, puoi richiedere il coupon</li>
      </ul>
      `;
      default:
        return `
      <p><strong>Rules:</strong></p>
      <ul>
        <li>You can spin the wheel only once</li>
        <li>If you win, You can claim the coupon</li>
      </ul>
      `;
    }
  }
  function getYayYouWillGet(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Yay!! you will get";
      case "ARABIC":
        return "ياي!! ستحصل";
      case "DUTCH":
        return "Ja !! je zult krijgen";
      case "FRENCH":
        return "Yay!! tu auras";
      case "GERMAN":
        return "Yay!! Sie erhalten";
      case "HEBREW":
        return "יש!! אתה תקבל";
      case "PORTUGUESE":
        return "Yay!! você vai ter";
      case "RUSSIAN":
        return "Ура!! ты получишь";
      case "SPANISH":
        return "¡¡Hurra!! conseguirás";
      case "TURKISH":
        return "Yay!! Alacaksın";
      case "INDONESIAN":
        return "Yay !! kamu akan mendapatkan";
      case "ITALIAN":
        return "Sìì!! otterrete";
      default:
        return "Yay!! you will get";
    }
  }
  function getWeAllSendTheDiscountCode(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "We’ll send the discount code on your WhatsApp number";
      case "ARABIC":
        return "سنرسل رمز الخصم على رقم WhatsApp الخاص بك";
      case "DUTCH":
        return "We sturen de kortingscode op uw WhatsApp -nummer";
      case "FRENCH":
        return "Nous enverrons le code de réduction sur votre numéro WhatsApp";
      case "GERMAN":
        return "Wir senden den Rabattcode auf Ihre WhatsApp -Nummer";
      case "HEBREW":
        return "אנו נשלח את קוד ההנחה במספר WhatsApp שלך";
      case "PORTUGUESE":
        return "Enviaremos o código de desconto no seu número do WhatsApp";
      case "RUSSIAN":
        return "Мы отправим код скидки на ваш номер WhatsApp";
      case "SPANISH":
        return "Enviaremos el código de descuento en su número de WhatsApp";
      case "TURKISH":
        return "WhatsApp numaranızda indirim kodunu göndereceğiz";
      case "INDONESIAN":
        return "Kami akan mengirimkan kode diskon pada nomor whatsapp Anda";
      case "ITALIAN":
        return "Invieremo il codice di sconto sul tuo numero di whatsapp";
    }
  }
  function getSpinGetTheDiscountCode(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Get the Discount Code";
      case "ARABIC":
        return "احصل على رمز الخصم";
      case "DUTCH":
        return "Ontvang de kortingscode";
      case "FRENCH":
        return "Obtenez le code de réduction";
      case "GERMAN":
        return "Holen Sie sich den Rabattcode";
      case "HEBREW":
        return "קבל את קוד ההנחה";
      case "PORTUGUESE":
        return "Obtenha o código de desconto";
      case "RUSSIAN":
        return "Получите код скидки";
      case "SPANISH":
        return "Obtenga el código de descuento";
      case "TURKISH":
        return "İndirim Kodunu Alın";
      case "INDONESIAN":
        return "Dapatkan Kode Diskon";
      case "ITALIAN":
        return "Ottieni il codice di sconto";
      default:
        return "Get the Discount Code";
    }
  }
  function getSpinYouWin(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "You win!";
      case "ARABIC":
        return "فزت!";
      case "DUTCH":
        return "Jij wint!";
      case "FRENCH":
        return "Vous gagnez!";
      case "GERMAN":
        return "Du gewinnst!";
      case "HEBREW":
        return "ניצחת!";
      case "PORTUGUESE":
        return "Você ganha!";
      case "RUSSIAN":
        return "Ты победил!";
      case "SPANISH":
        return "¡Tú ganas!";
      case "TURKISH":
        return "Sen kazandın!";
      case "INDONESIAN":
        return "Kamu menang!";
      case "ITALIAN":
        return "Hai vinto!";
      default:
        return "You win!";
    }
  }
  function getSpinYourCouponCodeIs(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Your Coupon code is:";
      case "ARABIC":
        return "رمز القسيمة الخاص بك هو:";
      case "DUTCH":
        return "Uw couponcode is:";
      case "FRENCH":
        return "Votre code de coupon est:";
      case "GERMAN":
        return "Ihr Gutscheincode lautet:";
      case "HEBREW":
        return "קוד הקופון שלך הוא:";
      case "PORTUGUESE":
        return "Seu código de cupom é:";
      case "RUSSIAN":
        return "Ваш код купона:";
      case "SPANISH":
        return "Su código de cupón es:";
      case "TURKISH":
        return "Kupon kodunuz:";
      case "INDONESIAN":
        return "Kode kupon Anda adalah:";
      case "ITALIAN":
        return "Il tuo codice coupon è:";
      default:
        return "Your Coupon code is:";
    }
  }
  function getSpinCopyCouponCode(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Copy coupon code";
      case "ARABIC":
        return "نسخ رمز القسيمة";
      case "DUTCH":
        return "Kopieer couponcode";
      case "FRENCH":
        return "Copier le code de coupon";
      case "GERMAN":
        return "Couponcode kopieren";
      case "HEBREW":
        return "העתק קוד קופון";
      case "PORTUGUESE":
        return "Copie o código do cupom";
      case "RUSSIAN":
        return "Копировать код купона";
      case "SPANISH":
        return "Copiar código de cupón";
      case "TURKISH":
        return "Kupon Kodunu Kopyala";
      case "INDONESIAN":
        return "Salin kode kupon";
      case "ITALIAN":
        return "Copia il codice coupon";
      default:
        return "Copy coupon code";
    }
  }
  function getSpinWeHaveAlsoSentTheCouponCodeOnYourNumber(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "We have also sent the coupon code on your number";
      case "ARABIC":
        return "لقد أرسلنا أيضًا رمز القسيمة على رقمك";
      case "DUTCH":
        return "We hebben ook de couponcode op uw nummer verzonden";
      case "FRENCH":
        return "Nous avons également envoyé le code de coupon sur votre numéro";
      case "GERMAN":
        return "Wir haben auch den Gutscheincode auf Ihre Nummer gesendet";
      case "HEBREW":
        return "שלחנו גם את קוד הקופון על המספר שלך";
      case "PORTUGUESE":
        return "Também enviamos o código do cupom em seu número";
      case "RUSSIAN":
        return "Мы также отправили код купона на ваш номер";
      case "SPANISH":
        return "También hemos enviado el código de cupón en su número";
      case "TURKISH":
        return "Numaranızda kupon kodunu da gönderdik";
      case "INDONESIAN":
        return "Kami juga telah mengirim kode kupon di nomor Anda";
      case "ITALIAN":
        return "Abbiamo anche inviato il codice coupon sul tuo numero";
      default:
        return "We have also sent the coupon code on your number";
    }
  }
  function getSpinYouAlmostWin(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "You almost win!";
      case "ARABIC":
        return "لقد فزت تقريبا!";
      case "DUTCH":
        return "Je wint bijna!";
      case "FRENCH":
        return "Vous gagnez presque!";
      case "GERMAN":
        return "Sie gewinnen fast!";
      case "HEBREW":
        return "אתה כמעט מנצח!";
      case "PORTUGUESE":
        return "Você quase vence!";
      case "RUSSIAN":
        return "Вы почти выигрываете!";
      case "SPANISH":
        return "¡Casi ganas!";
      case "TURKISH":
        return "Neredeyse kazanıyorsun!";
      case "INDONESIAN":
        return "Anda hampir menang!";
      case "ITALIAN":
        return "Quasi vinci!";
      default:
        return "You almost win!";
    }
  }
  function getSpinBetterLuckNextTime(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Better luck next time";
      case "ARABIC":
        return "حظ أوفر في المرة القادمة";
      case "DUTCH":
        return "Volgende keer beter";
      case "FRENCH":
        return "Plus de chance la prochaine fois";
      case "GERMAN":
        return "Mehr Glück beim nächsten Mal";
      case "HEBREW":
        return "בהצלחה בפעם הבאה";
      case "PORTUGUESE":
        return "Mais sorte da próxima vez";
      case "RUSSIAN":
        return "Повезет в следующий раз";
      case "SPANISH":
        return "Mejor suerte la próxima vez";
      case "TURKISH":
        return "Bir dahaki sefere daha iyi şanslar";
      case "INDONESIAN":
        return "Semoga lain kali lebih beruntung";
      case "ITALIAN":
        return "La prossima volta sarai più fortunato";
      default:
        return "Better luck next time";
    }
  }
  function getSpinBtnClose(SpinWidgetLanguage) {
    switch (SpinWidgetLanguage) {
      case "ENGLISH":
        return "Close";
      case "ARABIC":
        return "قريب";
      case "DUTCH":
        return "Dichtbij";
      case "FRENCH":
        return "proche";
      case "GERMAN":
        return "Nah dran";
      case "HEBREW":
        return "סגור";
      case "PORTUGUESE":
        return "Perto";
      case "RUSSIAN":
        return "Закрывать";
      case "SPANISH":
        return "Cerca";
      case "TURKISH":
        return "Kapat";
      case "INDONESIAN":
        return "Menutup";
      case "ITALIAN":
        return "Chiudere";
      default:
        return "Close";
    }
  }

  function createSpinTheWheelBtn(settings) {
    var current_device_type = deviceType();
    var settingsDeviceType = getDeviceTypeFromSettings(settings, "spinWheel");
    if (
      settings?.spinWheel &&
      settings?.spinWheel?.is_wheel_enabled &&
      settings?.spinWheel?.wheelData?.length > 0 &&
      (settingsDeviceType & current_device_type) != 0 &&
      isSpinBtnVisible(settings)
    ) {
      spinWheelInitConfig.list = settings.spinWheel.wheelData;
      spinWheelInitConfig.wheelId = settings.spinWheel.wheelId;
      // spin-wheel-btn-container
      var spinWheelBtnElement = document.createElement("div");
      spinWheelBtnElement.id = "spinwheel-btn-root";

      let spinWheelButton = settings.spinWheel;

      //zIndex from settings
      var style = document.createElement("style");
      style.type = "text/css";

      var wheelVerticalOffset =
        current_device_type === 1
          ? settings.devices.mobile.wheelVerticalOffset
          : settings.devices.desktop.wheelVerticalOffset;

      var wheelHorizontalOffset =
        current_device_type === 1
          ? settings.devices.mobile.wheelHorizontalOffset
          : settings.devices.desktop.wheelHorizontalOffset;

      var spinWheelBtnPos = getButtonPosition(current_device_type, settings, "spinWheel");

      style.innerHTML =
        ".spin-wheel-splmn-btn-offset {" +
        "bottom: " + wheelVerticalOffset + "px;" +
        spinWheelBtnPos + ":" + wheelHorizontalOffset + "px;" +
        "z-index:" +
        (current_device_type === 1
          ? settings.devices.mobile.zIndex.spinWheel
          : settings.devices.desktop.zIndex.spinWheel) +
        ";}";
      document.head.appendChild(style);

      spinWheelBtnElement.className += "spin-wheel-btn-fixed spin-wheel-splmn-btn-offset";

      var img_url = "https://cdn.shopify.com/s/files/1/0449/7794/6790/files/spin-wheel.svg?v=1658384655";
      var imgStr = `<img src="${img_url}" />`;

      spinWheelBtnElement.innerHTML += imgStr;

      spinWheelBtnElement.onclick = function () {
        const shop_id = getShopId();
        jQuery.ajax({
          url: SERVER_BASE_URL_ANALYTICS + '/analytics/click/spinWheel?' + jQuery.param({ url: shop_id }),
          type: 'POST',
        });
        loadSpinWheelWidget(settings, current_device_type);
      };
      document.body.appendChild(spinWheelBtnElement);
    }
  }

  function isSpinBtnVisible(settings) {
    let wheelPages = settings.spinWheel.wheelPages;
    if (window.location.pathname === "/" && !wheelPages?.includes("HOME")) {
      return false;
    } else if (isCollectionsPage() && !wheelPages?.includes("COLLECTION")) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/products/(.*)") ||
        window.location.pathname.match("(.*)/products")) &&
      !wheelPages?.includes("PRODUCT")
    ) {
      return false;
    } else if ((window.location.pathname.match("(.*)/cart/(.*)") ||
      window.location.pathname.match("(.*)/cart")) &&
      !(
        (deviceType() === 2 && wheelPages?.includes("CART_DESKTOP")) ||
        (deviceType() === 1 && wheelPages.includes("CART_MOBILE"))
      )) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/orders/(.*)") ||
        window.location.pathname.match("(.*)/orders") ||
        window.location.pathname.match("(.*)/checkouts/(.*)")) &&
      !wheelPages?.includes("THANKYOU")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/blogs/(.*)") ||
        window.location.pathname.match("(.*)/blogs")) &&
      !wheelPages?.includes("BLOGPOST")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/pages/(.*)") ||
        window.location.pathname.match("(.*)/pages")) &&
      !wheelPages?.includes("PAGE")
    ) {
      return false;
    } else if (
      (window.location.pathname.match("(.*)/account/(.*)") ||
        window.location.pathname.match("(.*)/account")) &&
      !wheelPages?.includes("ACCOUNT")
    ) {
      return false;
    } else {
      return true;
    }
  }

  function getSpinWheelCloseBtn() {
    var closeBtn = document.createElement("div");
    closeBtn.className = "spinwheel-bubble-close-btn";
    closeBtn.innerHTML =
      '<img style="display: table-row" src="https://cdn.shopify.com/s/files/1/0070/3666/5911/files/Vector.png?574">';

    closeBtn.onclick = function () {
      // new bouncedown greeting widget animation
      jQuery("#spinwheel-bubble").removeClass("bounceUp");
      jQuery("#spinwheel-bubble").addClass("bounceDown");
      jQuery("#spinwheel-btn-root").show();
    };
    return closeBtn;
  }

  function loadSpinWheelWidget(settings, current_device_type) {
    if (jQuery("#spinwheel-bubble").length) {
      jQuery("#spinwheel-bubble").show();
      jQuery("#spinwheel-bubble").removeClass("bounceDown");
      jQuery("#spinwheel-bubble").addClass("bounceUp");
      jQuery("#spinwheel-btn-root").hide();
      return;
    }
    // Spin Widget Language
    var SpinWidgetLanguage = settings?.spinWheel?.language || "ENGLISH";
    // bubble
    var spinWheelBubbleElement = document.createElement("div");
    spinWheelBubbleElement.id = "spinwheel-bubble";
    if (deviceType() != 1) {
      spinWheelBubbleElement.style = `height: ${75 / 100 * screen.height}px`;
    }

    //zIndex from settings
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML =
      ".spinwheel-widget-z-index { z-index:" +
      (current_device_type === 1
        ? settings.devices.mobile.zIndex.spinWheel
        : settings.devices.desktop.zIndex.spinWheel) +
      ";}";
    document.head.appendChild(style);

    var spinWheelBtnPos = getButtonPosition(current_device_type, settings, "spinWheel");

    spinWheelBubbleElement.className = "spinwheel-bubble-floating-popup animated spinwheel-widget-z-index spinwheel-bubble-pos-" + spinWheelBtnPos;

    var header = document.createElement("div");
    header.className = "spinwheel-bubble-header";
    header.appendChild(getSpinWheelCloseBtn());

    // spin wheel widget container
    var spinWheelWidgetContainer = document.createElement("div");
    spinWheelWidgetContainer.className = "spinwheel-bubble-widget-container";

    // spin wheel left side starts
    let canvasSize = spinWheelInitConfig.canvasSize;
    var wheelOfFortuneDiv = document.createElement("div");
    wheelOfFortuneDiv.id = "wheel-of-fortune";
    if (deviceType() == 1) {
      wheelOfFortuneDiv.style = `bottom: -${canvasSize / 2 + 13}px`
    }
    wheelOfFortuneDiv.appendChild(createSpinWheelCanvas(settings));
    // spin wheel left side ends

    // right side starts
    var widgetInfoDiv = document.createElement("div");
    widgetInfoDiv.id = "spin-wheel-info";

    var gameStatusTxt = document.createElement("h1");
    gameStatusTxt.className = "game-status-txt";
    gameStatusTxt.innerHTML = getSpinSpecialDiscountUnlocked(SpinWidgetLanguage);

    var spinTheWheelBtn = document.createElement("button");
    spinTheWheelBtn.innerHTML = getSpinTheWheel(SpinWidgetLanguage);

    spinTheWheelBtn.onclick = () => onSpinWheelBtnClick(SpinWidgetLanguage , spinTheWheelBtn);

    var gameRules = document.createElement("div");
    gameRules.classList = "spin-wheel-game-rules";
    gameRules.innerHTML = getSpinWheelGameRules(SpinWidgetLanguage);

    widgetInfoDiv.append(gameStatusTxt, spinTheWheelBtn, gameRules);

    spinWheelWidgetContainer.append(wheelOfFortuneDiv, widgetInfoDiv);

    spinWheelBubbleElement.append(header, spinWheelWidgetContainer);

    document.body.appendChild(spinWheelBubbleElement);

    jQuery("#spinwheel-bubble").addClass("bounceUp");
    jQuery("#spinwheel-btn-root").hide();

    createSpinWheelSectors(settings);
  }

  function createSpinWheelCanvas(settings) {
    var spinWheelWidget = document.createElement("div");
    let canvasSize = spinWheelInitConfig.canvasSize;
    spinWheelWidget.style = `width: ${canvasSize}px; height: ${canvasSize}px; position: relative;`;
    var spinWheelSelectorImg = "https://cdn.shopify.com/s/files/1/0449/7794/6790/files/location-pin.png?v=1658384655";
    let top = canvasSize / 2 - 21;
    let tempStyle = deviceType() !== 1 ? `style="top: ${top}px;"` : "";
    spinWheelWidget.innerHTML = `
        <span id="spin-wheel-selector" ${tempStyle}>
          <img src="${spinWheelSelectorImg}" width="35px" height="35px" />
        </span>
        <canvas
          id="spin-wheel-canvas"
          width="${canvasSize}"
          height="${canvasSize}"
          style="transform: rotate(0deg); transition: -webkit-transform 0s ease-out 0s;"
        />
      `;
    return spinWheelWidget;
  }

  function createSpinWheelSectors(settings) {
    // determine number/size of sectors that need to created
    let numOptions = settings.spinWheel.wheelData.length;
    let arcSize = (2 * Math.PI) / numOptions;
    // save to config
    spinWheelInitConfig.angle = arcSize;

    // dynamically generate sectors from state list
    let angle = 0;
    for (var x = 0; x < numOptions; x++) {
      let { text, color } = settings.spinWheel.wheelData[x];
      renderSpinWheelSector(x + 1, text, angle, arcSize, color);
      angle += arcSize;
    }

    renderSpinWheelCircle();
    renderSpinWheelCenterCircle();
  }

  function renderSpinWheelCenterCircle() {
    let c = document.getElementById("spin-wheel-canvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    let arcX_Y = spinWheelInitConfig.canvasSize / 2;
    ctx.arc(arcX_Y, arcX_Y, percentToPx(deviceType() == 1 ? 8 : 2), 0, 2 * Math.PI);
    ctx.lineWidth = deviceType() == 1 ? 40 : 20;
    ctx.fillStyle = "white";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "gray";
    ctx.fill();
  }

  function renderSpinWheelCircle() {
    let c = document.getElementById("spin-wheel-canvas");
    let ctx = c.getContext("2d");
    ctx.beginPath();
    let arcX_Y = spinWheelInitConfig.canvasSize / 2;
    ctx.arc(arcX_Y, arcX_Y, spinWheelInitConfig.radius * 2, 0, 2 * Math.PI);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "white";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "#A9A9A9";
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  function renderSpinWheelSector(index, text, start, arc, color) {
    // create canvas arc for each list element
    let canvas = document.getElementById("spin-wheel-canvas");
    let ctx = canvas.getContext("2d");
    let x = y = canvas.width / 2;
    let radius = spinWheelInitConfig.radius;
    let startAngle = start;
    let endAngle = start + arc;
    let angle = index * arc;
    let baseSize = radius * (deviceType() == 1 ? 2.05 : 2.1);
    let textRadius = baseSize - radius;

    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.lineWidth = radius * 2;
    ctx.strokeStyle = color;
    ctx.fillStyle = parseInt(spinWheelInitConfig.wheelId) === 9 || index % 2 === 0 ? 'black' : 'white';
    ctx.shadowBlur = 1;
    ctx.shadowColor = parseInt(spinWheelInitConfig.wheelId) === 9 || index % 2 === 0 ? 'black' : 'white';
    ctx.stroke();

    ctx.save();
    ctx.translate(
      baseSize + Math.cos(angle - arc / 2.5) * textRadius,
      baseSize + Math.sin(angle - arc / 2) * textRadius
    );
    ctx.rotate(angle - arc / 1.9);
    let alignPosition = 90;
    if (parseInt(ctx.measureText(text).width) >= 125) {
      alignPosition = deviceType() == 1 ? 90 : 90;
      ctx.font = `700 ${deviceType() == 1 ? "14px" : "12px"} Arial !important`;
    }
    else if (parseInt(ctx.measureText(text).width) > 90 && parseInt(ctx.measureText(text).width) < 125) {
      alignPosition = deviceType() == 1 ? 40 : 50;
      ctx.font = `700 ${deviceType() == 1 ? "14px" : "12px"} Arial !important`;
    }
    else if (parseInt(ctx.measureText(text).width) >= 70 && parseInt(ctx.measureText(text).width) <= 97) {
      alignPosition = deviceType() == 1 ? 20 : 30;
      ctx.font = `700 ${deviceType() == 1 ? "16px" : "14px"} Arial !important`;
    }
    else {
      ctx.font = `700 ${deviceType() == 1 ? "16px" : "14px"} Arial !important`;
      alignPosition = deviceType() == 1 ? 0 : 0;
    }
    ctx.textAlign = "left";
    ctx.fillText(text, -alignPosition, 0);
    ctx.restore();
  }

  function printAt(context, text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;

    if (fitWidth <= 0) {
      context.fillText(text, x, y);
      return;
    }

    for (var idx = 1; idx <= text.length; idx++) {
      var str = text.substr(0, idx);
      if (context.measureText(str).width > fitWidth) {
        context.fillText(text.substr(0, idx - 1), x, y);
        printAt(
          context,
          text.substr(idx - 1),
          x,
          y + lineHeight,
          lineHeight,
          fitWidth
        );
        return;
      }
    }
    context.fillText(text, x, y);
  }

  function onSpinWheelBtnClick(SpinWidgetLanguage,spinTheWheelBtn) {
    spinTheWheelBtn.disabled = true    
    jQuery(this).attr("disabled", true);
    localStorage.setItem("spin_the_wheel", true);

    const shop_id = getShopId();
    jQuery.ajax({
      url: SERVER_BASE_URL_ANALYTICS + '/analytics/v1/spinWheel?' + jQuery.param({ url: shop_id }),
      type: 'POST',
    });

    // set random spin degree and ease out time
    // set state variables to initiate animation
    let randomSpin = Math.floor(Math.random() * 900) + 500 + spinWheelInitConfig.rotate;

    spinWheelInitConfig = {
      ...spinWheelInitConfig,
      rotate: randomSpin,
      easeOut: 2,
      spinning: true,
    };

    jQuery("#spin-wheel-canvas").css({
      transform: `rotate(${randomSpin}deg)`,
      transition: `-webkit-transform ${2}s ease-out 0s`,
    });

    // calcalute result after wheel stops spinning
    setTimeout(() => {
      getSpinWheelResult(randomSpin, SpinWidgetLanguage);
    }, 2000);
  }

  function getSpinWheelResult(spin, SpinWidgetLanguage) {
    const { list } = spinWheelInitConfig;

    let num = list.length;
    let toPassOne = 360 / list.length;

    let actualPass = 0;

    let isMobile = deviceType();
    // add 90 degree if mobile
    let degreeToAdd = isMobile === 1 ? 90 : 0;

    if (spin > 360) {
      actualPass = (spin + degreeToAdd) % 360;
    } else {
      actualPass = (spin + degreeToAdd);
    }

    let temp = actualPass / toPassOne;

    let ans = Math.floor(num + 1 - temp);

    let result = ans - 1;

    // set state variable to display result
    spinWheelInitConfig = {
      ...spinWheelInitConfig,
      result: result,
    };

    handleSpinWheelResult(
      list[result].code.length > 0 ? "WIN" : "LOOSE",
      SpinWidgetLanguage
    );
  }

  function renderNumberInputForm(SpinWidgetLanguage) {
    let winResult = spinWheelInitConfig.list[spinWheelInitConfig.result];
    jQuery("#spin-wheel-info").html(`
      <h1 class="game-status-txt">${getYayYouWillGet(SpinWidgetLanguage)} ${winResult.text
      }</h1>
      <p class="game-status-subtxt">${getWeAllSendTheDiscountCode(
        SpinWidgetLanguage
      )}</h1>
      `);

    var inputBox = document.createElement("div");
    inputBox.className = "wa-optin-widget-input-box";

    //flag imoji
    var countryLogo = document.createElement("span");
    countryLogo.className = "wa-optin-widget-country-flag";
    countryLogo.id = "wa-splmn-country-flag-logo";
    var countryCodeInput;
    if (!codes) {
      countryCodeInput = document.createElement("input");
      countryCodeInput.className = "wa-optin-widget-input input-country-code";
      countryCodeInput.placeholder = "+XXX";
      countryCodeInput.id = "spin-wheel-optin-country-code";
      countryCodeInput.autocomplete = "off";
    } else {
      var countryCodeInput = document.createElement("select");
      countryCodeInput.className = "wa-optin-widget-input input-country-code-select";
      countryCodeInput.placeholder = "+XXX";
      countryCodeInput.id = "spin-wheel-optin-country-code";
      countryCodeInput.autocomplete = "off";
      inputBox.appendChild(countryCodeInput);
      var option = document.createElement("option");
      option.value = "";
      option.text = "Country code";
      countryCodeInput.appendChild(option);
      //Create and append the options
      for (var i = 0; i < codes.length; i++) {
        var option = document.createElement("option");
        option.value = codes[i].value;
        option.text = codes[i].label; // `(${codes[i].code}) +${codes[i].value}`;
        countryCodeInput.appendChild(option);
      }
    }

    var numberInput = document.createElement("input");
    numberInput.className = "wa-optin-widget-input";
    numberInput.placeholder = "XXXXXXXXX";
    numberInput.id = "spin-wheel-optin-number-input";
    numberInput.autocomplete = "off";
    numberInput.type = "tel";

    let spinWheelformSubmit = document.createElement("button");
    spinWheelformSubmit.id = "spin-wheel-confirm-btn";
    spinWheelformSubmit.innerHTML =
      getSpinGetTheDiscountCode(SpinWidgetLanguage);

    numberInput.addEventListener("keydown", (e) => {
      var confirmBtn = document.getElementById("spin-wheel-confirm-btn");
      if (e.target.value.length >= 1) {
        if (confirmBtn) {
          confirmBtn.classList.add("wa-optin-widget-confirm-btn-active");
        }
      } else if (!e.target.value.trim()) {
        if (confirmBtn) {
          confirmBtn.classList.remove("wa-optin-widget-confirm-btn-active");
        }
      }
    });

    inputBox.appendChild(countryLogo);
    inputBox.appendChild(countryCodeInput);
    inputBox.appendChild(numberInput);

    spinWheelformSubmit.onclick = function () {
      // call api here
      spinWheelformSubmit.disabled = true;
      var phone = jQuery("#spin-wheel-optin-number-input").val();
      var countryCode = jQuery("#spin-wheel-optin-country-code").val();
      let winResult = spinWheelInitConfig.list[spinWheelInitConfig.result];
      if (phone && countryCode) {
        jQuery.ajax({
          url: SERVER_BASE_URL_MESSAGING + "/messaging/v1/optin/spinWheel",
          type: "POST",
          dataType: "json",
          contentType: "application/x-www-form-urlencoded",
          data: {
            url: getShopId(),
            number: phone,
            countryCode: countryCode,
            couponCode: winResult.code,
          },
          success: function () {
            localStorage.setItem("opted_in_phone_v2", phone);
            localStorage.setItem("opted_in_country_code_v2", countryCode);
            handleSpinWheelResult("WIN_SUBMIT_FORM", SpinWidgetLanguage);
          },
          error: function (e) {
            if (e && e.status === 202) {
              // handle
              localStorage.setItem("opted_in_phone_v2", phone);
              localStorage.setItem("opted_in_country_code_v2", countryCode);
            } else {
              if (e.responseText) {
                let error = JSON.parse(e.responseText);
                alert(error.message);
              }
            }
          },
        });
      }
    };

    jQuery("#spin-wheel-info").append(inputBox);
    jQuery("#spin-wheel-info").append(spinWheelformSubmit);

    var gameRules = document.createElement("div");
    gameRules.classList = "spin-wheel-game-rules";
    gameRules.innerHTML = getSpinWheelGameRules(SpinWidgetLanguage);

    jQuery("#spin-wheel-info").append(gameRules);
  }

  function handleSpinWheelResult(status, SpinWidgetLanguage) {
    switch (status) {
      // show mobile number input
      case 'WIN':
        renderNumberInputForm(SpinWidgetLanguage);
        break;
      // show loose message
      case 'LOOSE':
        jQuery("#spin-wheel-info").html(`
          <h1 class="game-status-txt">${getSpinYouAlmostWin(SpinWidgetLanguage)}</h1>
          <p class="game-status-subtxt">${getSpinBetterLuckNextTime(SpinWidgetLanguage)}</h1>
          `);
        var closeBtn = document.createElement("button");
        closeBtn.innerHTML = getSpinBtnClose(SpinWidgetLanguage);

        closeBtn.onclick = function () {
          // new bouncedown greeting widget animation
          jQuery("#spinwheel-bubble").removeClass("bounceUp");
          jQuery("#spinwheel-bubble").addClass("bounceDown");
          jQuery("#spinwheel-btn-root").show();
        };
        jQuery("#spin-wheel-info").append(closeBtn);
        break;
      // show coupon code
      case 'WIN_SUBMIT_FORM':
        let winResult = spinWheelInitConfig.list[spinWheelInitConfig.result];
        jQuery("#spin-wheel-info").html(`
            <h1 class="game-status-txt">${getSpinYouWin(
          SpinWidgetLanguage
        )}</h1>
            <p class="game-status-subtxt">${winResult.text
          } <br/> ${getSpinYourCouponCodeIs(SpinWidgetLanguage)} ${winResult.code
          }</h1>
            `);
        var copyCouponCodeBtn = document.createElement("button");
        copyCouponCodeBtn.innerHTML = getSpinCopyCouponCode(SpinWidgetLanguage);

        copyCouponCodeBtn.onclick = function () {
          navigator.clipboard.writeText(winResult.code);
          alert("Coupon code copied.");
        };
        jQuery("#spin-wheel-info").append(copyCouponCodeBtn);
        jQuery("#spin-wheel-info").append(
          `<p class="spin-wheel-note-txt">${getSpinWeHaveAlsoSentTheCouponCodeOnYourNumber(
            SpinWidgetLanguage
          )}<p>`
        );
        break;
    }
  }

  function resetSpinWheelConfig() {
    spinWheelInitConfig = {
      ...spinWheelInitConfig,
      rotate: 0,
      easeOut: 0,
      result: null,
      spinning: false
    };
  }

  function percentToPx(percentage) {
    return percentage / 100 * screen.width;
  }
  function pxToPercent(size) {
    return size / screen.width * 100
  }

  var spinWheelInitConfig = {
    canvasSize: deviceType() == 1 ? percentToPx(160) : percentToPx(38.62), // PIXELS
    list: [], // coupon list
    // radius: deviceType() == 1 ? percentToPx(25) - 3 : percentToPx(5.54), // PIXELS
    radius: deviceType() == 1 ? percentToPx(40) - 3 : percentToPx(9.15), // PIXELS
    rotate: 0, // DEGREES
    easeOut: 0, // SECONDS
    angle: 0, // RADIANS
    result: null, // INDEX
    spinning: false,
  };

  var shop_id = getShopId();
  var current_device_type = deviceType();
  function checkBlockingScriptPresent() {
    setTimeout(() => {
      if ($("#pushdaddy-widget")[0]) {
        console.log("blocking script present");
      }
    }, 4000);
  }
  checkBlockingScriptPresent();
  this.flag = 'splm_init_' + shop_id;
  if (!window[flag]) {
    window[flag] = true;
    fetchStoreSettings(shop_id, function (settings) {
      var _originalSize = jQuery(window).width() + jQuery(window).height();

      if (settings.optin.templateId == 1) {
        createOptinWidget(settings, _originalSize);
      } else {
        createOldOptinWidget(settings, _originalSize);
      }

      createWhatsappBtn(settings);
      loadCalloutCard(settings, current_device_type);
      createWhatsappShareBtn(settings);

      let haveSpunTheWheel = localStorage.getItem("spin_the_wheel") ?? 'false';

      if (haveSpunTheWheel === 'false') {
        createSpinTheWheelBtn(settings);
      }
    });
  }
}

(function () {
  if (!window.splm_extension_flag) {
    initJQuery(function () {
      initCss(function () {
        btnLoad();
      });
    });
  }
})();