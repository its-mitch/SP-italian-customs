/**
 * Populate CMS Data from an external API.
 */

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
        
        document.getElementById("shopId").setAttribute("style","opacity:1");
        document.getElementById("pagination").setAttribute("style","opacity:1");
        
        //setTimeout(function(){console.log('waiting to end animation');}, 2000);
        //let item=getElementsByClassName("shop_item");
        /*
        while(item!=null){
            item=getElementsByClassName("shop_item");
        }
        */
        
        document.getElementById("loadingAnim").setAttribute("style","display:none");
  
     },
   ]);
   
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
     const button = newItem.querySelector('[data-element="button"]');
     //const code = newItem.querySelector<HTMLDivElement>('[data-element="code"]');
     //const year = newItem.querySelector<HTMLDivElement>('[data-element="code"]');
  
   
     // Populate inner elements
     var defaultImage= 
     "https://uploads-ssl.webflow.com/61e6e776f7b79f4f941b254e/61eb5f843eec5928ee20796b_logo_slate_grey.svg";
     
     if (product.image!=null){
         if (image) image.src = product.image;
     }else{
         if (image) image.src = defaultImage;
     }
     if (name) name.textContent = product.name;
     if (category) category.textContent = product.category;
     if (subcategory) subcategory.textContent = product.subcategory;
     if (make) make.textContent = product.make;
     if (model) model.textContent = product.model;
     if (producer) producer.textContent = product.producer;
     if (button) button.setAttribute('href', 'https://sp-customs-2.webflow.io/articoli?id='+ product._id);
     //if (code) code.textContent = product.code;
     //if (year) year.textContent = product.year;
  
   
     return newItem;
   };
   
   
  
  })();


  <style>
.shop_grid{
opacity:0;
}
.pagination{
opacity:0;
}
.shop_item_details {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    overflow-y: hidden; /* Hide vertical scrollbar */
  	overflow-x: hidden; /* Hide horizontal scrollbar */
    
}

.shop_item_details::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}
</style>