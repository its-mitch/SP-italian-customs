//window.onload = () => {
var makes;
var models;
var years;
var globVariants;
var globalCode;
(() => {
  window.fsAttributes = window.fsAttributes || [];
  window.fsAttributes.push([
    'cmsload',
    async (listInstances) => {

      const [listInstance] = listInstances;
      const [firstItem] = listInstance.items;
      listInstance.clearItems();
      const itemTemplateElement = firstItem.element;
      let id = getUrlParameter('id');
      const products = await fetchProducts(id);
      const newItems = products.map((product) => createItem(product, itemTemplateElement));
      await listInstance.addItems(newItems);
      document.getElementById("colWrap").setAttribute("style", "opacity:1");
      if (makes != null) {
        if (makes[0] == "Universale") {
          document.getElementById("make-wrap").setAttribute("style", "display:none");
        } else {
          Array.from(makes).forEach(element => {
            $('#Marca').append($('<option>', { value: element, text: element }));
          })
        }
      }
      if (models != null) {
        if (models[0] == "Universale") {
          document.getElementById("model-wrap").setAttribute("style", "display:none");
        } else {
          Array.from(models).forEach(element => {
            var s = element;
            $('#Modello').append('<option value="' + s + '">' + s + '</option>');
          })
        }
      }
      if (years != null) {
        if (Array.isArray(years)) {
          Array.from(years).forEach(element => {
            var s = element;
            $('#Anno').append('<option value="' + s + '">' + s.toString() + '</option>');
          })
        } else {
          $('#Anno').append('<option value="' + "Universale" + '">' + "Universale" + '</option>');
          document.getElementById("year-wrap").setAttribute("style", "display:none");

        }
      }
      if (globVariants != null) {
        if (Array.isArray(globVariants)) {
          Array.from(globVariants).forEach(element => {
            var s = element;
            $('#variante').append('<option value="' + s + '">' + s + '</option>');
          })
        } else {
          $('#variante').append('<option value="' + globVariants + '">' + globVariants + '</option>');
          document.getElementById("var-wrap").setAttribute("style", "display:none");

        }
      }
      const itemCode = document.getElementById("addToCart");
      const fCode = globalCode;

      document.getElementById("img-slider").onmouseover = function (e) {
        Webflow.require('slider').redraw();
      };

      document.getElementById("fc-sku").value = globalCode;


      var cookieMake = getCookie("makeSelection").toUpperCase();
      var cookieModel = getCookie("modelSelection").toUpperCase();
      var cookieYear = getCookie("yearSelection").toUpperCase();


      if (cookieMake != "") {
        const $select = document.querySelector('#Marca');
        $select.value = cookieMake.toUpperCase();
      }
      if (cookieModel != "") {
        const $select = document.querySelector('#Modello');
        $select.value = cookieModel.toUpperCase();
      }
      if (cookieYear != "") {
        const $select = document.querySelector('#Anno');
        $select.value = cookieYear.toUpperCase();
      }




      function getCookie(name) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");

        // Loop through the array elements
        for (var i = 0; i < cookieArr.length; i++) {
          var cookiePair = cookieArr[i].split("=");

          /* Removing whitespace at the beginning of the cookie name
          and compare it with the given string */
          if (name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
          }
        }

        // Return null if not found
        return null;
      }
    },
  ]);

  /**
   * Fetches fake products from Fake Store API.
   * @returns An array of {@link Product}.
   */
  const fetchProducts = async (id) => {
    var settings_list = {
      async: true,
      crossDomain: true,
      url: 'https://eu-west-1.aws.data.mongodb-api.com/app/sp-item-detui/endpoint/sp_item',
      data: {
        id: id,
      },
      method: "GET"
    };
    const data = $.ajax(settings_list).done(function (response) {

    });

    return data;

  };

  /**
   * Creates an item from the template element.
   * @param product The product data to create the item from.
   * @param templateElement The template element.
   *
   * @returns A new Collection Item element.
   */
  const createItem = (product, templateElement) => {
    // Clone the template element
    const newItem = templateElement.cloneNode(true);

    // Query inner elements
    //const image = newItem.querySelector('[data-element="image"]');
    const fImage = newItem.querySelector('[data-element="f-image"]');
    const name = newItem.querySelector('[data-element="name"]');
    const fName = newItem.querySelector('[data-element="f-name"]');
    const category = newItem.querySelector('[data-element="category"]');
    const subcategory = newItem.querySelector('[data-element="subcategory"]');
    const make = newItem.querySelector('[data-element="make"]');
    const model = newItem.querySelector('[data-element="model"]');
    const variant = newItem.querySelector('[data-element="variante"]');
    const producer = newItem.querySelector('[data-element="producer"]');
    //const button = newItem.querySelector('[data-element="button"]');
    const description = newItem.querySelector('[data-element="description"]');
    const year = newItem.querySelector('[data-element="year"]');
    const price = newItem.querySelector('[data-element="displayPrice"]');
    const fPrice = newItem.querySelector('[data-element="price"]');
    const sku = newItem.querySelector('[data-element="sku"]');
    const fCode = newItem.querySelector('[data-element="f-code"]');

    let slides = newItem.querySelectorAll('[data-cms="slide"]');




    // Populate inner elements

    var defaultImage =
      "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";

    if (product.img != null) {
      //if (image) image.src = product.img;
      if (fImage) fImage.src = product.img;
    } else {
      //if (image) image.src = defaultImage;
      if (fImage) fImage.src = defaultImage;
    }

    var images = [];
    var slash = /\\/;
    if (product.altImg != null) {
      var imgArr = product.altImg;
      let ii = 0;
      while (ii < imgArr.length) {
        images[ii] = imgArr[ii];
        ii++;
      }
    } else {
      images[0] = product.img;
    } if (images.length !== 0) {

      //images.forEach((image, i) => slides[i].style.backgroundImage = 'url(\"'+image+'")');
      let kk = 0;
      const parent = slides[0].parentElement;
      while (kk < slides.length) {
        if (kk >= images.length) {
          parent.removeChild(slides[kk]);
        }
        slides[kk].style.transition = 'transform 500ms ease 0s';
        kk++;
      }
      /*
      slides.forEach((slide, i) => {
        if (i >= images.length) {
          parent.removeChild(slide);
        }
      });
      */

      kk = 0;
      while (kk < images.length) {
        var childImg = slides[kk].querySelector('[data-element="image"]');
        childImg.src = images[kk];
        kk++;
      }

    }
    newItem.querySelector('[data-cms="slider"]').style.opacity = 1;

    if (name) name.textContent = product.name;
    if (fName) fName.value = product.name;
    if (category) category.textContent = product.category;
    if (subcategory) subcategory.textContent = product.subcategory;

    if (product.Comp != null) {
      let yearSequence = [];
      let makeSequence = [];
      let modelSequence = [];
      let compArray = [];
      if (Array.isArray(product.Comp)) {
        compArr = product.Comp;
      } else {
        compArr = product.Comp.split("<>");
      }
      var i = 0;
      while (i < compArr.length) {
        let compParts = compArr[i].split(" ");
        let compYears = compParts[compParts.length - 1];
        let yearStart = 0;
        let yearEnd = 0;
        if (compYears.length > 4) {
          yearStart = compYears.slice(0, 4);
          yearEnd = compYears.slice(4);
        } else {
          yearStart = compYears;
          yearEnd = 2023;
        }
        while (yearStart < yearEnd) {
          yearSequence[yearStart] = yearStart;
          yearStart++;
        }
        makeSequence[i] = compParts[0];
        let j = 1;
        while (j < compParts.length - 1) {
          modelSequence[i] = modelSequence[i] + " " + compParts[j];
        }
        i++;
      }
      make.textContent = makeSequence;
      makes = makeSequence.filter(onlyUnique);
      model.textContent = modelSequence;
      models = modelSequence.filter(onlyUnique);
      year.textContent = yearSequence;
      years = yearSequence.filter(onlyUnique);
    } else {
      if (product.make != null) {
        if (make) make.textContent = product.make.toString().split(",").filter(onlyUnique);
      } else {
        if (make) make.textContent = "";
      }
      if (product.model != null) {
        if (model) model.textContent = product.model.toString().split(",").filter(onlyUnique);
      } else {
        if (model) model.textContent = "";
      }
      if (product.year != null) {
        var yearArray = product.year.split(",");
        yearArray = yearArray.filter(onlyUnique);
        yearArray = yearArray.sort();
        if (year) year.textContent = yearArray;
        if (product.year != null) years = product.year.split(",").filter(onlyUnique);
      } else {
        year.textContent[0] = "Universale";
        years = "Universale";
      }
      if (product.make != null) makes = product.make.split(",").filter(onlyUnique);
      if (product.model != null) models = product.model.split(",").filter(onlyUnique);
    }

    if (product.make != null) if (make) make.textContent = product.make.split(",").filter(onlyUnique);
    if (product.model != null) if (model) model.textContent = product.model.split(",").filter(onlyUnique);
    if (producer) producer.textContent = product.brand;
    if (product.desc != null) {
      if (product.desFull != null) {
        let desFull = product.desc + "<br><br>" + product.desFull;
        if (description) description.textContent = desFull;
      } else {
        if (description) description.textContent = product.desc;
      }
    } else {
      if (product.desFull != null) {
        if (description) description.textContent = desFull;
      } else {
        description.textContent = "";
      }
    }
    if (product.variant != null) {
      if (Array.isArray(product.variant)) {
        var variantArr = product.variant;
        variantArr = variantArr;
        if (variant) variant.textContent = variantArr;
        globVariants = product.variant;
      } else {
        variant.textContent = product.variant;
        globVariants = product.variant;
      }

    } else {
      if (variant) variant.textContent[0] = "Universale";
      globVariants = "Universale";
    }
    let priceArr = product.price.toString();
    priceArr = priceArr.split(",").filter(onlyUnique);
    priceArr = priceArr.sort();
    if (price) price.textContent = "€" + addZeroes(priceArr[0]);
    if (fPrice) fPrice.value = priceArr[0];

    if (sku) sku.textContent = product.code;

    if (fCode) fCode.value = product.code;

    globalCode = product.code;

    return newItem;
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  function addZeroes(num) {
    // Convert input string to a number and store as a variable.
    var value = Number(num);
    // Split the input string into two arrays containing integers/decimals
    var res = num.split(".");
    // If there is no decimal point or only one decimal place found.
    if (res.length == 1 || res[1].length < 3) {
      // Set the number to two decimal places
      value = value.toFixed(2);
    }
    // Return updated or original number.
    return value;
  }


})();
if (typeof makes == undefined || typeof models == undefined || typeof years == undefined || typeof globVariants == undefined || makes == null || moels == null || years == null || globVariants == null) {
  var options = options || {};
  options["formArticolo"] = {};
  options["formArticolo"]["Marca"] = "";
  options["formArticolo"]["Modello"] = "";
  options["formArticolo"]["Anno"] = "";
  options["formArticolo"]["Variant"] = "";
} else {
  var options = options || {};
  options["formArticolo"] = {};
  options["formArticolo"]["Marca"] = makes;
  options["formArticolo"]["Modello"] = models;
  options["formArticolo"]["Anno"] = years;
  options["formArticolo"]["Variant"] = globVariants;
}
/*
  var currency_symbol = '€';
  var modifier_text_summary = true;

  var foxy_pattern = /^([^\{,]+)(\{((?:[pwcy][+:-][^\|\}]+\|?)+)\})?$/, modifier_pattern = /^p([+:-])([\d.]+)/; function convertSlugAsNeeded(a) { return a.replace(/^\d/, function (a) { return "\\" + a.charCodeAt(0).toString(16) + " " }) }
  for (var slug in options) {
    var target = document.querySelectorAll("form." + convertSlugAsNeeded(slug))[0]; if (target) for (var key in options[slug]) if ("" != options[slug][key]) {
      var select = target.querySelectorAll("select." + convertSlugAsNeeded(key))[0]; if (select) for (options_arr = options[slug][key].split(","), i = 0; i < options_arr.length; i++) {
        var curr = options_arr[i].trim(), option = curr.match(foxy_pattern), modifiers = []; option[1] = option[1].trim(); var option_text = ""; option[3] && (modifiers = option[3].split("|")); if (modifiers) for (var j =
          0; j < modifiers.length; j++) { var price_modifier = modifiers[j].match(modifier_pattern); !price_modifier || "undefined" !== typeof modifier_text_summary && !0 !== modifier_text_summary || (option_text += " (", option_text += ":" == price_modifier[1] ? "" : price_modifier[1], option_text += currency_symbol + price_modifier[2], option_text += ")") } select.options[select.options.length] = new Option(option[1] + option_text, option[0])
      }
    }
  };

  var pricemod_regex = /[{\|]p([+\-:])([\d\.]+)(?:\D{3})?(?=[\|}])/, id_regex = /^(\d+):/, FC = FC || {}; FC.onLoad = function () { FC.client.on("ready.done", initDynamicPrice) };
  function initDynamicPrice() {
    ADJUST = {}; $("input,select").off("change.foxy-dynamic-price"); $('form[action*="' + FC.settings.storedomain + '"]').each(function () {
      var b = $(this), d = "", g = { products: {} }; $(this).find("[name='name'],[name^='name||'],[name$=':name'],[name*=':name||']").each(function () {
        var k = getId(this.name), c = k ? k + ":" : "", e = parseFloat(b.find("[name='" + c + "price'],[name^='" + c + "price||']").first().val()); e = { id: k, code: "", base_price: isNaN(e) ? 0 : e, quantity: 1, attributes: {}, has_quantity: !1 }; var h = b.find("[name='" +
          c + "quantity'],[name^='" + c + "quantity||']"); c = b.find("[name='" + c + "code'],[name^='" + c + "code||']"); 0 < c.length && (e.code = clearHash(c.first().val()), "" === d && (d = e.code)); if (0 < h.length) { c = 0; var l = getElementType(h); -1 < ["select", "text"].indexOf(l) ? (e.has_quantity = !0, c = parseFloat(clearHash(h.val()))) : -1 < ["radio", "checkbox"].indexOf(l) && (e.has_quantity = !0, 1 == h.filter(":checked").length && (c = parseFloat(clearHash(h.filter(":checked").val())))); isNaN(c) && (c = 0); e.quantity = c } g.products[k] = e
      }); b.attr("data-fc-form-code") &&
        (d = b.attr("data-fc-form-code")); "" !== d && ($(this).find("input,select").each(function () {
          var b = getId(this.name), c = getName(this.name), e = getElementType($(this)); if ("quantity" == c) $(this).data("fc-adjust-for", d).on("change.foxy-dynamic-price", function () { var c = 0; if (-1 < ["select", "text"].indexOf(e) || -1 < ["radio", "checkbox"].indexOf(e) && $(this).is(":checked")) c = parseFloat(clearHash(this.value)); isNaN(c) && (c = 0); ADJUST[$(this).data("fc-adjust-for")].products[b].quantity = c; recalcTotal() }); else if ("price" == c && "hidden" !=
            e) $(this).data("fc-adjust-for", d).on("change.foxy-dynamic-price", function () { var c = 0; if (-1 < ["select", "text"].indexOf(e) || -1 < ["radio", "checkbox"].indexOf(e) && $(this).is(":checked")) c = parseFloat(clearHash(this.value)); isNaN(c) && (c = 0); ADJUST[$(this).data("fc-adjust-for")].products[b].base_price = c; recalcTotal() }); else if ("SELECT" == this.tagName) {
              var h = !1; $(this).children("option").each(function () { -1 < this.value.search(pricemod_regex) && (h = !0) }); h && ($(this).data("fc-adjust-for", d), g.products[b].attributes[clearHash(this.name)] =
                clearHash(this.value), $(this).on("change.foxy-dynamic-price", function () { ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)] = clearHash(this.value); recalcTotal() }))
            } else if (-1 < this.value.search(pricemod_regex)) switch ($(this).data("fc-adjust-for", d), $(this).attr("type")) {
              case "checkbox": $(this).is(":checked") ? g.products[b].attributes[clearHash(this.name)] = clearHash(this.value) : g.products[b].attributes[clearHash(this.name)] = ""; $(this).on("change.foxy-dynamic-price", function () {
                $(this).is(":checked") ?
                ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)] = clearHash(this.value) : ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)] = ""; recalcTotal()
              }); break; case "radio": g.products[b].attributes.hasOwnProperty(clearHash(this.name)) || (g.products[b].attributes[clearHash(this.name)] = ""), $(this).is(":checked") && (g.products[b].attributes[clearHash(this.name)] = clearHash(this.value)), $("[name='" + this.name + "']").data("fc-adjust-for", d).on("change.foxy-dynamic-price",
                function () { ADJUST[$(this).data("fc-adjust-for")].products[b].attributes[clearHash(this.name)] = clearHash(this.value); recalcTotal() })
            }
        }), ADJUST[d] = g)
    }); recalcTotal()
  } function clearHash(b) { return b.replace(/\|\|[\d\w]+(?:\|\|open)?$/, "") } function getNameParts(b) { b = clearHash(b); return b.match(/(?:(\d+):)?(.*)/) } function getId(b) { b = getNameParts(b); id_regex.test(this.name) && (prefix = parseInt(this.name.match(id_regex)[0])); return void 0 === b[1] ? 0 : parseInt(b[1]) }
  function getName(b) { return getNameParts(b)[2] } function getElementType(b) { if ("SELECT" == b[0].tagName) return "select"; if ("INPUT" == b[0].tagName) switch (b.attr("type").toLowerCase()) { case "text": case "number": case "tel": return "text"; default: return b.attr("type").toLowerCase() } }
  function recalcTotal() {
    for (f in ADJUST) {
      var b = 0, d = 0; for (p in ADJUST[f].products) { var g = ADJUST[f].products[p].base_price, k = 0; for (a in ADJUST[f].products[p].attributes) { var c = ADJUST[f].products[p].attributes[a].match(pricemod_regex); if (c) switch (c[1]) { case ":": g = parseFloat(c[2]); break; case "+": k += parseFloat(c[2]); break; case "-": k -= parseFloat(c[2]) } } g += k; g *= ADJUST[f].products[p].quantity; b += g; d += ADJUST[f].products[p].quantity } "function" === typeof fcFormatPrice && (b = fcFormatPrice(b, f)); "function" === typeof fcFormatQuantity &&
        (d = fcFormatQuantity(d, f)); b = "object" == typeof FC && FC.hasOwnProperty("json") && FC.json.config.hasOwnProperty("currency_format") ? jQuery.trim(FC.util.money_format(FC.json.config.currency_format, b)) : b.formatMoney(2); $("." + f + "_total").html(b); $("." + f + "_total_quantity").html(d)
    }
  }
  Number.prototype.formatMoney = function (b, d, g) { var k = this; b = isNaN(b = Math.abs(b)) ? 2 : b; d = void 0 == d ? "." : d; g = void 0 == g ? "," : g; var c = 0 > k ? "-" : "", e = parseInt(k = Math.abs(+k || 0).toFixed(b)) + "", h = 3 < (h = e.length) ? h % 3 : 0; return c + (h ? e.substr(0, h) + g : "") + e.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + g) + (b ? d + Math.abs(k - e).toFixed(b).slice(2) : "") };

  $(document).ready(function () {
    $(".w-condition-invisible").each(function () {
      $(this).remove();
    });

    $('input[name="quantity"]').val("1").attr("min", "1");
  });
  */

//}
