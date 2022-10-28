
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
    const image = newItem.querySelector('[data-element="image"]');
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

    let slides = newItem.querySelector('[data-element="slide"]');
    const leftArrow = document.querySelector('[data-cms="left-arrow"]');
    const rightArrow = document.querySelector('[data-cms="right-arrow"]');


    // Populate inner elements
    /*
    var defaultImage =
      "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";

    if (product.img != null) {
      if (image) image.src = product.img;
      if (fImage) fImage.src = product.img;
    } else {
      if (image) image.src = defaultImage;
      if (fImage) fImage.src = defaultImage;
    }
    */
    var images = [];
    if (product.altImg != null) {
      var imgArr = product.altImg.split(",");
      images[0] = img;
      let ii = 1;
      while (ii < imgArr.length) {
        images[ii] = 'url(\\' + imgArr[ii - 1] + ")";
        ii++;
      }
    } else {
      images[0] = 'url(\\' + product.img + ")";
    } if (images.length !== 0) {

      if (images.length <= 1) {
        [leftArrow, rightArrow].forEach(el => el.style.display = 'none');
      }

      images.forEach((image, i) => slides[i].style.backgroundImage = image);

      const parent = slides[0].parentElement;
      slides.forEach((slide, i) => {
        if (i >= images.length) {
          parent.removeChild(slide);
        }
        slide.style.transition = 'transform 500ms ease 0s';
      });

      slides = [...document.querySelectorAll('[data-cms="slide"]')];

      const parentWidth = parent.offsetWidth;
      const maxX = (parentWidth * (slides.length)) * -1;

      let currentX = 0;

      [leftArrow, rightArrow].forEach((arrow, i) => {
        $(arrow).off();
        const direction = i === 0 ? 'left' : 'right';
        arrow.addEventListener('click', () => {
          if (direction === 'left') {
            if (currentX === 0) {
              currentX = maxX + parentWidth;
            } else {
              currentX = currentX + parentWidth;
            }
          } else {
            let newX = currentX - parentWidth;
            if (newX === maxX) {
              newX = 0;
            }
            currentX = newX;
          }
          slides.forEach(slide => slide.style.transform = `translateX(${currentX}px)`);
        });
      });

      document.querySelector('[data-cms="slider"]').style.opacity = 1;
    }

    if (name) name.textContent = product.name;
    if (fName) fName.value = product.name;
    if (category) category.textContent = product.category;
    if (subcategory) subcategory.textContent = product.subcategory;

    if (product.comp != null) {
      let yearSequence = [];
      let makeSequence = [];
      let modelSequence = [];
      let compArr = product.comp.split("<>");
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
      if (product.descFull != null) {
        let descFull = product.desc + " " + product.descFull;
        if (description) description.textContent = descFull;
      } else {
        if (description) description.textContent = product.desc;
      }
    } else {
      if (product.descFull != null) {
        if (description) description.textContent = descFull;
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
    if (price) price.textContent = "€" + priceArr[0];
    if (fPrice) fPrice.value = priceArr[0];

    if (sku) sku.textContent = product.code;

    if (fCode) fCode.value = product.code;

    globalCode = product.code;

    return newItem;
  };

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }


})();
