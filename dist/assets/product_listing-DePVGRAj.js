import{r as s,l as i,a as c}from"./utils-BJByaD23.js";import{P as o}from"./ProductData-Cqu801TC.js";function n(r){return`
    <li class="product-card">
      <a href="/product_pages/?product=${r.Id}">
        <img src="${r.Images.PrimaryMedium}" alt="${r.Name}">
        <h3>${r.Brand.Name}</h3>
        <p>${r.NameWithoutBrand}</p>
        <p class="product-card__price">$${r.FinalPrice}</p>
      </a>
    </li>
    `}class l{constructor(a,t,e){this.category=a,this.dataSource=t,this.listElement=e,this.list=[]}async init(){this.list=await this.dataSource.getData(this.category),this.renderList(this.list),document.querySelector(".title").textContent=this.category;const a=document.querySelector("#sortProducts");a&&a.addEventListener("change",t=>{this.sortProducts(t.target.value),this.renderList(this.list)})}sortProducts(a){switch(a){case"name-asc":this.list.sort((t,e)=>t.NameWithoutBrand.localeCompare(e.NameWithoutBrand));break;case"name-desc":this.list.sort((t,e)=>e.NameWithoutBrand.localeCompare(t.NameWithoutBrand));break;case"price-asc":this.list.sort((t,e)=>t.FinalPrice-e.FinalPrice);break;case"price-desc":this.list.sort((t,e)=>e.FinalPrice-t.FinalPrice);break}}renderList(a){this.listElement.innerHTML="",s(n,this.listElement,a)}}i();const d=c("category"),h=new o,m=document.querySelector(".product-list"),u=new l(d,h,m);u.init();
