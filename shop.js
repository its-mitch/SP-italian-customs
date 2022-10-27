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
        const newItems = products.map((product) => createItem(product, itemTemplateElement));
        await listInstance.addItems(newItems);
        //window.fsAttributes.cmsfilter.init();
        
        document.getElementById("shop-content").setAttribute("style","opacity:1");
        //document.getElementById("filterHeader").setAttribute("style","opacity:1");
        document.getElementById("pagination").setAttribute("style","opacity:1");
        
        delay(5000);
        document.getElementById("loading-wrapper").setAttribute("style","display:none");
        
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
    
     
  
   
     // Populate inner elements
     var defaultImage= 
     "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";
     
     if (product.img!=null){
         if (image) image.src = product.img;
     }else{
         if (image) image.src = defaultImage;
     }
     if (name) name.textContent = product.name;
     if (category) category.textContent = product.category;
     if (subcategory) subcategory.textContent = product.subcategory;

     //important
     if (product.comp!=null){
        let yearSequence=[];
        let makeSequence=[];
        let modelSequence=[];
        let compArr=product.comp.split("<>");
        var i=0;
        while(i<compArr.length){
            let compParts=compArr[i].split(" ");
            let compYears=compParts[compParts.length-1];
            let yearStart=0;
            let yearEnd=0;
            if (compYears.length>4){
                yearStart=compYears.slice(0,4);
                yearEnd=compYears.slice(4);
            }else{
                yearStart=compYears;
                yearEnd=2023;
            }
            while(yearStart<yearEnd){
                yearSequence[yearStart]=yearStart;
                yearStart++;
            }
            makeSequence[i]=compParts[0];
            let j=1;
            while(j<compParts.length-1){
                modelSequence[i]=modelSequence[i]+" "+compParts[j];
            }
            i++;
        }
        make.textContent=makeSequence;
        model.textContent=modelSequence;
        year.textContent=yearSequence;
     }else{
        if(product.make!=null){
            if (make) make.textContent = product.make.toString().split(",").filter(onlyUnique);
        }else{
            if (make) make.textContent ="";
        }
        if(product.model!=null){
            if (model) model.textContent = product.model.toString().split(",").filter(onlyUnique);
        }else{
            if (model) model.textContent ="";
        }
        if (product.year!=null){
            if(product.year!="Universale"){
                if(Array.isArray(product.year)){
                  var yearArray= product.year;
                  yearArray= yearArray.filter(onlyUnique);
                  yearArray= yearArray.sort();
                  if (year) year.textContent = yearArray;
                  years=product.year.filter(onlyUnique);
                  }else{
                      if (year) year.textContent = product.year;
                  }
              }else{
                  if (year) year.textContent = product.year;
              }
          }else{
               year.textContent[0] = "Universale";
            years="Universale";
          }
     } 
     if (producer) producer.textContent = product.producer;
     if (button) button.setAttribute('href', 'https://sp-customs-2.webflow.io/articoli?id='+ product._id);
     //if (code) code.textContent = product.code;
     //if (year) year.textContent = product.year;
     
     let priceArr= product.price.toString();
     priceArr= priceArr.split(",").filter(onlyUnique);
     priceArr= priceArr.sort();
     if (price) price.textContent = "€"+priceArr[0];
  
   
     return newItem;
   };
   
    function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  })();