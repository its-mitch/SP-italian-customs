(() => {
    // src/cms/populate-external-data/index.ts
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
        'cmsload',
        async (listInstances) => {


            const [listInstance] = listInstances;
            const [firstItem] = listInstance.items;
            listInstance.clearItems();
            const itemTemplateElement = firstItem.element;
            
            const products = await fetchProducts();
            //const storProd=window.localStorage.getItem("storedProducts");
            
            const newItems = products.map((product) => createItem(product, itemTemplateElement));
            await listInstance.addItems(newItems);
            //window.fsAttributes.cmsfilter.init();

            document.getElementById("shop-content").setAttribute("style", "opacity:1");
            //document.getElementById("filterHeader").setAttribute("style","opacity:1");
            document.getElementById("pagination").setAttribute("style", "opacity:1");

            delay(5000);
            document.getElementById("loading-wrapper").setAttribute("style", "display:none");

            //setTimeout(function(){console.log('waiting to end animation');}, 2000);

            //document.getElementById("loadingAnim").setAttribute("style","display:none");
            //filtersInstance.storeFiltersData();

        },
    ]);

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    /**
     * Fetches fake products from Fake Store API.
     * @returns An array of {@link Product}.
     */
    
     const fetchProducts = async () => {
        try {
            const response = await fetch('https://data.mongodb-api.com/app/sp-gaodj/endpoint/sp_shop_api');
            const data = await response.json();

            //var storedProd=JSON.stringify(data);

            //window.localStorage.setItem("storedProducts", storedProd);

            return data;
        } catch (error) {
            return [];
        }
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


        // Populate inner elements
        var defaultImage =
            "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";

        if (product.img != null) {
            if (image) image.src = product.img;
        } else {
            if (image) image.src = defaultImage;
        }
        if (name) name.textContent = product.name;
        if (category) category.textContent = product.category;
        if (subcategory) subcategory.textContent = product.subcategory;

        if(product.spec!=null){
            if (Array.isArray(product.spec)){
                for(let g=0;g<product.spec.length;g++){
                    if(spec) spec.textContent+="\r\n"+product.spec[g];
                }
            }else{
                if(spec) spec.textContent+="\r\n"+product.spec;
            }
        }

        //important
        if (product.Comp != null) {
            let yearSequence = [];
            let makeSequence = [];
            let modelSequence = [];
            let compArray = [];
            if (Array.isArray(product.Comp)) {
                compArray = product.Comp;
            } else {
                compArray = product.Comp.split(" <> ");
            }
            var i = 0;
            while (i < compArray.length) {
                let compParts = compArray[i].split(" ");
                let compYears = compParts[compParts.length - 1];
                let charCount = compYears.split("");
                let yearStart = 0;
                let yearEnd = 0;
                if (charCount.length > 4) {
                    yearStart = compYears.slice(0, 4);
                    yearEnd = compYears.slice(4);
                } else {
                    yearStart = compYears;
                    yearEnd = 2023;
                }
                let yearIndex = 0;
                while (yearStart < yearEnd) {
                    yearSequence[yearIndex] = yearStart;
                    yearIndex++;
                    yearStart++;
                }
                makeSequence[i] = compParts[0];
                let j = 1;
                while (j < compParts.length - 1) {
                    if (modelSequence[i] != undefined) {
                        modelSequence[i] = modelSequence[i] + " " + compParts[j];
                    } else {
                        modelSequence[i] = compParts[j];
                    }
                    j++;
                }
                i++;
            }
            make.textContent = makeSequence;
            if (make) make.textContent = makeSequence;
            model.textContent = modelSequence;
            if (model) model.textContent = modelSequence;
            year.textContent = yearSequence;
            if (year) year.textContent = yearSequence;
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
                if (product.year != "Universale") {
                    if (Array.isArray(product.year)) {
                        var yearArray = product.year;
                        yearArray = yearArray.filter(onlyUnique);
                        yearArray = yearArray.sort();
                        if (year) year.textContent = yearArray;
                        years = product.year.filter(onlyUnique);
                    } else {
                        if (year) year.textContent = product.year;
                    }
                } else {
                    if (year) year.textContent = product.year;
                }
            } else {
                year.textContent[0] = "Universale";
                years = "Universale";
            }
        }
        if (producer) producer.textContent = product.Brand;
        if (button) button.setAttribute('href', 'https://sp-customs-2.webflow.io/articoli?id=' + product._id);
        if (code) code.textContent = product.code;
        //if (year) year.textContent = product.year;

        let priceArr = product.price.toString();
        priceArr = priceArr.split(",").filter(onlyUnique);
        priceArr = priceArr.sort();
        if (price) price.textContent = "€" + addZeroes(priceArr[0]);


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


let compMatrix = [];
compMatrix[0] = [];

let makeArr = [];

let arrMod = modelString.split("<");

//console.table(arrMod);
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

Array.from(subcatArray).forEach(element => {
    let text = element[0] + "-" + element[1];
    $('#subcat-filter').append($('<option>', { value: element[1], text: text }));
})


//populate makes
//console.log(makeArr);
makeArr.sort();
Array.from(makeArr).forEach(element => {
    $('#make-filter').append($('<option>', { value: element, text: element }));
})


let makeSel = document.getElementById("make-filter");
let modelSel = document.getElementById("model-filter");
let yearSel = document.getElementById("year-filter");

//populate models
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
}



//populate years
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
};
yearSel.onchange = function () {
    if (yearSel.selectedOptions[0].value != undefined) {
        let supp = yearSel.selectedOptions[0].value;
        let kv = "yearSelection=" + supp;
        document.cookie = kv;
    }
};