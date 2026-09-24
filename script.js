const menuButton=document.querySelector('.menu-button');
const nav=document.querySelector('.nav');
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',open)});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const escapeHtml=value=>String(value??'').replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
const productGrid=document.getElementById('productGrid');
const products=window.BDL_PRODUCTS||[];
products.forEach(product=>{product.status=/unavailable/i.test(String(product.status||''))?'Unavailable':'Available'});
const productSearch=document.getElementById('productSearch');
const clearSearch=document.getElementById('clearSearch');
const searchResults=document.getElementById('searchResults');
const noResults=document.getElementById('noResults');
const filters=document.querySelectorAll('.filter');
let activeFilter=null;

function searchableText(product){return [product.brand,product.product,product.size,product.categoryLabel,product.status,product.description,...product.categories].join(' ').toLocaleLowerCase()}
function productImageMarkup(p){
  const label=escapeHtml(`${p.brand} ${p.product}`);
  if(!p.image)return `<div class="product-image-placeholder"><span>IMAGE COMING SOON</span></div>`;
  const imageSrc=String(p.image).split('/').map(segment=>encodeURIComponent(segment)).join('/');
  const cacheBustedSrc=`${imageSrc}${imageSrc.includes('?')?'&':'?'}v=${Date.now()}`;
  return `<div class="product-image"><img src="${escapeHtml(cacheBustedSrc)}" alt="${label}" loading="lazy" decoding="async" onerror="this.parentElement.className='product-image-placeholder';this.parentElement.innerHTML='<span>IMAGE COMING SOON</span>'"></div>`;
}
function renderProducts(){
  const query=productSearch.value.trim().toLocaleLowerCase();
  if(!activeFilter&&!query){productGrid.innerHTML='';noResults.hidden=true;searchResults.textContent='Choose a collection above to view products.';clearSearch.hidden=true;return}
  const matches=products.filter(product=>{const matchesCategory=!activeFilter||product.categories.includes(activeFilter);const matchesSearch=!query||searchableText(product).includes(query);return matchesCategory&&matchesSearch}).sort((a,b)=>{
    const brandCompare=String(a.brand||'').localeCompare(String(b.brand||''),undefined,{sensitivity:'base'});
    if(brandCompare!==0)return brandCompare;
    return String(a.product||'').localeCompare(String(b.product||''),undefined,{sensitivity:'base'});
  });
  productGrid.innerHTML=matches.map(p=>`<article class="product-card" data-category="${escapeHtml(p.categories.join(' '))}">${productImageMarkup(p)}<div class="product-body"><p class="brand">${escapeHtml(p.brand)}</p><dl><div><dt>Product:</dt><dd>${escapeHtml(p.product)}</dd></div><div><dt>Size:</dt><dd>${escapeHtml(p.size)}</dd></div><div><dt>Retail:</dt><dd>${escapeHtml(p.retail)}</dd></div><div><dt><strong>Boutique De Leon Price:</strong></dt><dd><strong>${escapeHtml(p.price)}</strong></dd></div><div><dt>Category:</dt><dd>${escapeHtml(p.categoryLabel)}</dd></div><div><dt>Status:</dt><dd>${escapeHtml(p.status)}</dd></div>${p.description?`<div class="product-description"><dt>Description:</dt><dd>${escapeHtml(p.description)}</dd></div>`:''}</dl><button class="button card-button inquire" data-product="${escapeHtml(p.brand+' '+p.product)}">Inquire</button></div></article>`).join('');
  clearSearch.hidden=!query;noResults.hidden=matches.length!==0;searchResults.textContent=`${matches.length} product${matches.length===1?'':'s'} found`;
}
renderProducts();
productSearch.addEventListener('input',()=>{if(productSearch.value.trim()){activeFilter=null;filters.forEach(b=>b.classList.remove('active'))}renderProducts()});
clearSearch.addEventListener('click',()=>{productSearch.value='';productSearch.focus();renderProducts()});
filters.forEach(btn=>btn.addEventListener('click',()=>{filters.forEach(b=>b.classList.remove('active'));btn.classList.add('active');activeFilter=btn.dataset.filter;productSearch.value='';renderProducts();productGrid.scrollIntoView({behavior:'smooth',block:'start'})}));

const dialog=document.getElementById('inquiryDialog');const item=document.getElementById('inquiryItem');const inquirySubject=document.getElementById('inquirySubject');
document.addEventListener('click',e=>{const btn=e.target.closest('.inquire');if(!btn)return;const product=btn.dataset.product||'General inquiry';item.value=product;inquirySubject.value=`Boutique De Leon — Inquiry: ${product}`;dialog.showModal()});
document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

const approvedReviews=Array.isArray(window.BDL_APPROVED_REVIEWS)?window.BDL_APPROVED_REVIEWS:[];
const approvedReviewsEl=document.getElementById('approvedReviews');
const reviewsEmpty=document.getElementById('reviewsEmpty');
if(approvedReviewsEl){
 approvedReviewsEl.innerHTML=approvedReviews.map(r=>{const rating=Math.max(1,Math.min(5,Number(r.rating)||5));return `<article class="review-card"><div class="review-stars" aria-label="${rating} out of 5 stars">${'★'.repeat(rating)}<span>${'★'.repeat(5-rating)}</span></div><blockquote>“${escapeHtml(r.review)}”</blockquote><p class="reviewer">${escapeHtml(r.name)}</p><p class="review-product">${escapeHtml(r.product)}</p></article>`}).join('');
 if(reviewsEmpty)reviewsEmpty.hidden=approvedReviews.length>0;
}

const reviewDialog=document.getElementById('reviewDialog');
const openReviewButtons=[document.getElementById('openReview'),document.getElementById('openReviewSection')].filter(Boolean);
const reviewCategory=document.getElementById('reviewCategory');
const reviewBrand=document.getElementById('reviewBrand');
const reviewBrandLabel=document.getElementById('reviewBrandLabel');
const reviewProduct=document.getElementById('reviewProduct');
const reviewableProducts=products.filter(p=>!/unavailable/i.test(String(p.status||'')));
const reviewCategoryLabels={cosmetics:'Cosmetics',skincare:'Skincare',fragrance:'Fragrance',hair:'Hair',gifts:'Sets',electronics:'Electronics'};
const reviewCategories=[...new Set(reviewableProducts.flatMap(p=>p.categories||[]).filter(x=>reviewCategoryLabels[x]))];
reviewCategory.innerHTML='<option value="">Select a category</option>'+reviewCategories.map(x=>`<option value="${escapeHtml(x)}">${reviewCategoryLabels[x]}</option>`).join('');
function reviewMatches(){
 const category=reviewCategory.value;
 const brand=reviewBrand.value;
 return reviewableProducts.filter(p=>(p.categories||[]).includes(category)&&(!brand||p.brand===brand));
}
function populateReviewProducts(){
 const matches=reviewMatches().sort((a,b)=>String(a.product).localeCompare(String(b.product)));
 reviewProduct.innerHTML='<option value="">Select a product</option>'+matches.map(p=>`<option value="${escapeHtml(p.brand+' — '+p.product)}">${escapeHtml(p.product)}</option>`).join('');
 reviewProduct.disabled=!reviewCategory.value;
}
reviewCategory.addEventListener('change',()=>{
 const category=reviewCategory.value;
 const deeper=['skincare','cosmetics','fragrance','hair','gifts'].includes(category);
 reviewBrandLabel.hidden=!deeper;
 reviewBrand.required=deeper;
 const brands=[...new Set(reviewableProducts.filter(p=>(p.categories||[]).includes(category)).map(p=>p.brand))].sort((a,b)=>a.localeCompare(b));
 reviewBrand.innerHTML='<option value="">Select a brand</option>'+brands.map(b=>`<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`).join('');
 reviewBrand.value='';
 populateReviewProducts();
});
reviewBrand.addEventListener('change',populateReviewProducts);
openReviewButtons.forEach(btn=>btn.addEventListener('click',()=>reviewDialog.showModal()));
document.querySelector('.review-close').addEventListener('click',()=>reviewDialog.close());
reviewDialog.addEventListener('click',e=>{if(e.target===reviewDialog)reviewDialog.close()});

function setupForm(form){form.addEventListener('submit',async e=>{e.preventDefault();if(!form.reportValidity())return;const name=form.querySelector('[name="name"]');const phone=form.querySelector('[name="phone"]');const email=form.querySelector('[name="email"]');if(!name.value.trim()){name.setCustomValidity('Please enter your name.');name.reportValidity();name.setCustomValidity('');return}const digits=phone.value.replace(/\D/g,'');if(digits.length!==10){phone.setCustomValidity('Please enter a 10-digit phone number.');phone.reportValidity();phone.setCustomValidity('');return}phone.value=digits;if(!email.value.trim()){email.setCustomValidity('Please enter your email address.');email.reportValidity();email.setCustomValidity('');return}const button=form.querySelector('button[type="submit"]');const status=form.querySelector('.form-status');const original=button.textContent;button.disabled=true;button.textContent='Sending...';status.textContent='';try{const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(response.ok){status.textContent=form.id==='reviewForm'?'Thank you! Your review was submitted for approval.':'Thank you! Your message has been sent to Boutique De Leon.';form.reset();if(form.id==='inquiryForm')setTimeout(()=>dialog.close(),1800)}else status.textContent="We couldn't send your message. Please try again."}catch(error){status.textContent="We couldn't send your message. Please try again."}finally{button.disabled=false;button.textContent=original}})}
document.querySelectorAll('.live-form').forEach(setupForm);document.getElementById('year').textContent=new Date().getFullYear();