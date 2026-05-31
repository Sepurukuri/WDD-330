import{r as i,l as s,b as c}from"./utils-BLF6_eem.js";import{E as o}from"./ExternalServices-DcrgEka_.js";function n(e){const t=e.FinalPrice<e.SuggestedRetailPrice,r=t?Math.round((e.SuggestedRetailPrice-e.FinalPrice)/e.SuggestedRetailPrice*100):0;return`
    <li class="product-card">
      <a href="/product_pages/?product=${e.Id}">
        <img src="${e.Images.PrimaryMedium}" alt="${e.Name}">

        ${t?`<span class="discount-badge">-${r}% OFF</span>`:""}

        <h3>${e.Brand.Name}</h3>
        <p>${e.NameWithoutBrand}</p>

        ${t?`
              <p class="original-price">
                $${e.SuggestedRetailPrice}
              </p>
            `:""}

        <p class="product-card__price">
          $${e.FinalPrice}
        </p>
      </a>
    </li>
  `}class l{constructor(t,r,a){this.category=t,this.dataSource=r,this.listElement=a}async init(){try{console.log("Category:",this.category);const t=await this.dataSource.getData(this.category);console.log("Products returned:",t),this.renderList(t);const r=document.querySelector(".title");r&&(r.textContent=this.category)}catch(t){console.error("ProductList Error:",t)}}renderList(t){i(n,this.listElement,t)}}s();const d=c("category"),g=new o,m=document.querySelector(".product-list"),u=new l(d,g,m);u.init();
