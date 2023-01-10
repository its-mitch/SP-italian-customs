(() => {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsload',
        async (listInstances) => {

            const [listInstance] = listInstances;
            const [firstItem] = listInstance.items;
            listInstance.clearItems();
            const itemTemplateElement = firstItem.element;

            const products = await fetchProducts();

            const newItems = products.map((product) => createItem(product, itemTemplateElement));
            await listInstance.addItems(newItems);

            document.getElementById("shop-content").setAttribute("style", "opacity:1");
            document.getElementById("pagination").setAttribute("style", "opacity:1");

            delay(5000);
            document.getElementById("loading-wrapper").setAttribute("style", "display:none");

            let compMatrix = [];
            compMatrix[0] = [];

            let makeArr = [];

            let arrMod = modelString.split("<");


            let k = 0;
            while (k < arrMod.length) {
                let oneModel = arrMod[k].split(">");
                compMatrix[k] = [];
                compMatrix[k] = oneModel;
                makeArr[k] = oneModel[0];
                k++;
            }

            makeArr = makeArr.filter(onlyUnique);

            function onlyUnique(value, index, self) {
                return self.indexOf(value) === index;
            }


            brandArray.sort();
            Array.from(brandArray).forEach(element => {
                $('#brand-filter').append($('<option>', { value: element, text: element }));
            })

            for (var n = 0; n < catArray.length; n++) {
                $('#subcat-filter').append($('<option>', { value: subcatArray[n], text: catArray[n] + " - " + subcatArray[n] }));
            }

            let makeSel = document.getElementById("make-filter");
            let modelSel = document.getElementById("model-filter");
            let yearSel = document.getElementById("year-filter");

            makeArr.sort();
            Array.from(makeArr).forEach(element => {
                $('#make-filter').append($('<option>', { value: element, text: element }));
            })

            let uniqueModels = [];
            makeSel.onchange = function () {
                uniqueModels = [];
                makeSel.selectedOptions;
                while (modelSel.options.length > 0) {
                    modelSel.remove(0);
                }
                for (i = 0; i < compMatrix.length; i++) {
                    if (makeSel.selectedOptions[0].innerText == compMatrix[i][0]) {
                        uniqueModels[i] = compMatrix[i][1];
                    }
                }

                document.cookie = "makeSelection=" + makeSel.selectedOptions[0].innerText + "; path=/articoli"

                uniqueModels = uniqueModels.filter(onlyUnique).sort();
                uniqueModels.forEach(element => {
                    $('#model-filter').append($('<option>', { value: element, text: element }));
                });
                if (makeSel.selectedOptions != undefined) {
                    let supp = makeSel.selectedOptions[0].value;
                    let kv = "makeSelection=" + supp;
                    document.cookie = kv;
                }
                document.cookie = "modelSelection=";
                document.cookie = "yearSelection=";
                resetFilters("model");
                resetFilters("years");
            }

            let uniqueYears = [];
            modelSel.onchange = function () {
                uniqueYears = [];
                yearSel.selectedOptions;
                while (yearSel.options.length > 0) {
                    yearSel.remove(0);
                }
                for (i = 0; i < compMatrix.length; i++) {
                    if (makeSel.selectedOptions[0].innerText == compMatrix[i][0] && modelSel.selectedOptions[0].innerText == compMatrix[i][1]) {
                        let yearRange = compMatrix[i][2].split("-");
                        let yearCount = yearRange[0] * 1;
                        let k = 0;
                        while (yearCount <= yearRange[1 * 1]) {
                            uniqueYears[k] = yearCount * 1;
                            yearCount++;
                            k++;
                        }
                    }
                }

                uniqueYears.sort();
                let reallyUinque = uniqueYears.filter(onlyUnique);
                reallyUinque.forEach(element => {
                    $('#year-filter').append($('<option>', { value: element, text: element }));
                });

                if (modelSel.selectedOptions[0].value != undefined) {
                    let supp = modelSel.selectedOptions[0].value;
                    let kv = "modelSelection=" + supp;
                    document.cookie = kv;

                }
                document.cookie = "yearSelection=";
                resetFilters("years");

            };
            yearSel.onchange = function () {
                if (yearSel.selectedOptions[0].value != undefined) {
                    let supp = yearSel.selectedOptions[0].value;
                    let kv = "yearSelection=" + supp;
                    document.cookie = kv;
                }
            };

        },
    ]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://data.mongodb-api.com/app/sp-gaodj/endpoint/sp_shop_api');
            const data = await response.json();

            return data;
        } catch (error) {
            return [];
        }
    };

    const createItem = (product, templateElement) => {
        // Clone the template element
        const newItem = templateElement.cloneNode(true);

        // Select all the elements that need to be updated
        const image = newItem.querySelector('[data-element="image"]');
        const name = newItem.querySelector('[data-element="name"]');
        const category = newItem.querySelector('[data-element="category"]');
        const subcategory = newItem.querySelector('[data-element="subcategory"]');
        const make = newItem.querySelector('[data-element="make"]');
        const model = newItem.querySelector('[data-element="model"]');
        const producer = newItem.querySelector('[data-element="producer"]');
        const button = newItem.querySelector('[data-element="link"]');
        const price = newItem.querySelector('[data-element="price"]');
        const year = newItem.querySelector('[data-element="year"]');
        const spec = newItem.querySelector('[data-element="spec"]');
        const code = newItem.querySelector('[data-element="code"]');

        // Set the default image
        const defaultImage = "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";
        // Set the image src to either the product image or the default image
        image.src = product.img || defaultImage;
        // Set the name text content to the product name
        name.textContent = product.name;
        // Set the category text content to the product category
        category.textContent = product.category;
        // Set the subcategory text content to the product subcategory
        subcategory.textContent = product.subcategory;
        // Set the spec text content to the product spec, or an empty string if it's not defined
        spec.textContent = (Array.isArray(product.spec) ? product.spec.join("\r\n") : product.spec) || "";

        // Split the product Comp into an array if it's not already an array
        const compArray = Array.isArray(product.Comp) ? product.Comp : product.Comp.split(" <> ");
        // Initialize empty arrays for the year, make, and model sequences
        const yearSequence = [];
        const makeSequence = [];
        const modelSequence = [];
        // Iterate over the compArray
        for (const comp of compArray) {
            // Split the comp into parts
            const compParts = comp.split(" ");
            // Get the compYears from the last part
            const compYears = compParts[compParts.length - 1];
            // Split the compYears into start and end years, with a default end year of 2023
            const [yearStart, yearEnd = 2023] = compYears.length > 4 ? [compYears.slice(0, 4), compYears.slice(4)] : [compYears];
            // Add all the years from start to end (exclusive) to theyearSequence array
            for (let year = yearStart; year < yearEnd; year++) {
                yearSequence.push(year);
            }
            // Add the end year to the yearSequence array
            yearSequence.push(yearEnd);
            // Add the make to the makeSequence array
            makeSequence.push(compParts[0]);
            // Add the model to the modelSequence array
            modelSequence.push(compParts.slice(1, -1).join(" "));
        }
        // Set the make text content to the makeSequence array, joined with a comma and space
        make.textContent = makeSequence.join(", ");
        // Set the model text content to the modelSequence array, joined with a comma and space
        model.textContent = modelSequence.join(", ");
        // Set the year text content to the yearSequence array, joined with a comma and space
        year.textContent = yearSequence.join(", ");
        // Set the producer text content to the product Producer
        producer.textContent = product.Producer;
        // Set the button href to the product link
        button.href = product.link;
        // Set the price text content to the product price
        price.textContent = addZeroes(product.price);
        // Set the code text content to the product code
        code.textContent = product.code;
    };

    function addZeroes(num) {
        var value = Number(num);
        var res = num.split(".");
        if (res.length == 1 || res[1].length < 3) {
            value = value.toFixed(2);
        }
        return value;
    }

     function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
})();