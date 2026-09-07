const {SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY}=window.APP_CONFIG||{};
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

const ICONS={
home:`<svg viewBox="0 0 24 24"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/></svg>`,
history:`<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/></svg>`,
reports:`<svg viewBox="0 0 24 24"><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></svg>`,
target:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 1v3M23 12h-3M12 23v-3M1 12h3"/></svg>`,
settings:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.6V21h-4v-.2A1.8 1.8 0 0 0 8.8 19a1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 2.8 13H2v-4h.8A1.8 1.8 0 0 0 4.4 8a1.8 1.8 0 0 0-.4-2l-.1-.1 2.8-2.8.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 9.9 2H14v.8A1.8 1.8 0 0 0 15 4.4a1.8 1.8 0 0 0 2-.4l.1-.1 2.8 2.8-.1.1a1.8 1.8 0 0 0-.4 2A1.8 1.8 0 0 0 21 9.9V14h-.8a1.8 1.8 0 0 0-1.6 1z"/></svg>`,
plus:`<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>`
};

document.querySelectorAll("[data-icon]").forEach(el=>el.innerHTML=ICONS[el.dataset.icon]||"");

const DEFAULT_SETTINGS={
base_currency:"AED",pin_hash:"",
currencies:[{code:"AED",symbol:"AED"},{code:"BDT",symbol:"৳"}],
categories:[
{name:"Family Support",subs:["Mehedi Family","Mou Family"]},
{name:"Rent / Home",subs:["House Rent","Maintenance","Furniture / Home Item","Other Home Expense"]},
{name:"Bills",subs:["Mobile Bill","Internet / Wi-Fi","Electricity","Water","Gas","Subscription","Government / Service Fee","Other Bill"]},
{name:"Grocery / Bazar",subs:["Monthly Grocery","Daily Grocery","Meat / Fish","Vegetables / Fruits","Rice / Oil / Essentials","Household Items","Cleaning Items","Other Grocery"]},
{name:"Market / Shopping",subs:["Clothes","Shoes","Personal Items","Cosmetics","Electronics","Home Accessories","Gift","Other Shopping"]},
{name:"Online Order",subs:["Amazon","Noon","Temu","AliExpress","Food Delivery","Other Online Order"]},
{name:"Car / Transport",subs:["Fuel","Parking","Salik / Toll","Car Wash","Service / Maintenance","Repair","Registration / Insurance","Taxi / Ride","Other Transport"]},
{name:"Tabby / Installment",subs:["Tabby","Tamara","Credit Card Installment","Other Installment"]},
{name:"Debt Repayment",subs:["Borrowed Money Repayment","Personal Loan","Friend / Family Repayment","Other Debt"]},
{name:"Eating Out",subs:["Restaurant","Cafe","Fast Food","Snacks / Drinks","Delivery Food"]},
{name:"Personal",subs:["Barber / Salon","Medicine / Pharmacy","Personal Care","Entertainment","Gym / Fitness","Other Personal"]},
{name:"Travel",subs:["Flight","Hotel","Transport","Food","Visa / Documents","Other Travel"]},
{name:"Other",subs:["Miscellaneous"]}
],
income_owners:["Mehedi Income","Mousumi Income"],
income_sources:["Salary","Overtime","Bonus","Refund","Other"],
payment_methods:["Bank","Cash","Card","Bank Transfer","Tabby"],
saving_accounts:[{name:"Future Savings",currency:"AED"},{name:"Bangladesh Savings",currency:"BDT"}]
};

const T={
en:{privateFinance:"Private daily finance for Mehedi & Mou",email:"Email",password:"Password",signIn:"Sign in",signOut:"Sign out",home:"Home",history:"History",reports:"Reports",targets:"Targets",settings:"Settings",dashboard:"Dashboard",add:"Add",availableBalance:"Available Balance",tapDetails:"Tap for details",income:"Income",expense:"Expense",savings:"Savings",familySupport:"Family Support",incomeAction:"Salary or other money in",expenseAction:"Daily & monthly spending",savingAction:"Move money to future",spending:"SPENDING",whereMoneyWent:"Where money went",futurePlans:"Future plans",viewAll:"View all",recent:"RECENT",latestActivity:"Latest activity",fullHistory:"Full history",searchHistory:"Search amount, note, category...",allTypes:"All types",allCategories:"All categories",simpleReportTitle:"See the full calculation instantly",simpleReportHelp:"Choose a period and type. All entries appear first, and the total is calculated automatically at the bottom.",thisMonth:"This Month",lastMonth:"Last Month",thisYear:"This Year",lastYear:"Last Year",custom:"Custom",from:"From",to:"To",all:"All",category:"Category",subcategory:"Subcategory",addedBy:"Added by",currency:"Currency",breakdown:"BREAKDOWN",categoryBreakdown:"Category breakdown",subcategories:"SUBCATEGORIES",subcategoryBreakdown:"Subcategory breakdown",details:"DETAILS",reportTransactions:"Entries",targetsIntro:"Track future plans.",newTarget:"New Target",settingsLocked:"Settings Locked",enterPin:"Enter your settings PIN.",unlock:"Unlock",myPreferences:"MY PREFERENCES",displayName:"Display name",language:"Language",savePreferences:"Save Preferences",profileHint:"Language changes only your screen. Financial data stays shared.",general:"GENERAL",sharedSettings:"Shared Settings",baseCurrency:"Base currency",newSettingsPin:"New Settings PIN",saveSettings:"Save Settings",currencies:"CURRENCIES",activeCurrencies:"Active currencies",expenseStructure:"EXPENSE STRUCTURE",categoriesSubcategories:"Categories & subcategories",newCategory:"New category",addCategory:"Add Category",methods:"METHODS",paymentMethods:"Payment methods",data:"DATA",backupDeleted:"Backup & deleted records",exportBackup:"Export JSON Backup",openTrash:"Open Trash",newRecord:"NEW RECORD",amount:"Amount",rateToBase:"Rate to base currency",source:"Source",incomeOwner:"Income Owner",incomeSetup:"Income Owners & Sources",incomeOwners:"Income Owners",incomeSources:"Income Sources",editRecord:"Edit Record",psaHint:"Private to your login. It never appears in shared dashboard, history, savings or reports.",saveTo:"Save to",targetOptional:"Target (optional)",method:"Method",date:"Date",time:"Time",createdAt:"Created At",transactionDateTime:"Transaction Date & Time",noteOptional:"Note (optional)",shortNote:"Short note",cancel:"Cancel",saveRecord:"Save Record",targetName:"Target name",targetAmount:"Target amount",targetDateOptional:"Target date (optional)",createTarget:"Create Target",recovery:"RECOVERY",trash:"Trash",viewInHistory:"View in History",totalIncome:"Total Income",totalExpense:"Total Expense",totalSavings:"Total Savings",totalFamily:"Total Family Support",balanceBreakdown:"Balance Breakdown",entries:"entries",noData:"No data yet."},
bn:{privateFinance:"মেহেদী ও মৌ-এর দৈনন্দিন ব্যক্তিগত হিসাব",email:"ইমেইল",password:"পাসওয়ার্ড",signIn:"লগইন",signOut:"লগআউট",home:"হোম",history:"হিস্টোরি",reports:"রিপোর্ট",targets:"টার্গেট",settings:"সেটিংস",dashboard:"ড্যাশবোর্ড",add:"যোগ করুন",availableBalance:"বর্তমান ব্যালেন্স",tapDetails:"বিস্তারিত দেখতে চাপুন",income:"আয়",expense:"খরচ",savings:"সঞ্চয়",familySupport:"ফ্যামিলি সাপোর্ট",incomeAction:"বেতন বা অন্য আয়",expenseAction:"দৈনিক ও মাসিক খরচ",savingAction:"ভবিষ্যতের জন্য সঞ্চয়",spending:"খরচ",whereMoneyWent:"কোথায় টাকা খরচ হয়েছে",futurePlans:"ভবিষ্যৎ পরিকল্পনা",viewAll:"সব দেখুন",recent:"সাম্প্রতিক",latestActivity:"সর্বশেষ লেনদেন",fullHistory:"পুরো হিস্টোরি",searchHistory:"পরিমাণ, নোট বা ক্যাটাগরি খুঁজুন...",allTypes:"সব ধরন",allCategories:"সব ক্যাটাগরি",simpleReportTitle:"ডাউনলোড ছাড়াই পুরো হিসাব দেখুন",simpleReportHelp:"সময়কাল ও ধরন বাছুন। সব এন্ট্রি আগে দেখাবে এবং নিচে মোট পরিমাণ অটো হিসাব হবে।",thisMonth:"এই মাস",lastMonth:"গত মাস",thisYear:"এই বছর",lastYear:"গত বছর",custom:"কাস্টম",from:"শুরু",to:"শেষ",all:"সব",category:"ক্যাটাগরি",subcategory:"সাবক্যাটাগরি",addedBy:"যোগ করেছেন",currency:"কারেন্সি",breakdown:"বিস্তারিত",categoryBreakdown:"ক্যাটাগরি অনুযায়ী",subcategories:"সাবক্যাটাগরি",subcategoryBreakdown:"সাবক্যাটাগরি অনুযায়ী",details:"বিস্তারিত",reportTransactions:"এন্ট্রি",targetsIntro:"ভবিষ্যৎ পরিকল্পনা ট্র্যাক করুন।",newTarget:"নতুন টার্গেট",settingsLocked:"সেটিংস লক করা",enterPin:"সেটিংস PIN দিন।",unlock:"আনলক",myPreferences:"আমার পছন্দ",displayName:"নাম",language:"ভাষা",savePreferences:"পছন্দ সেভ করুন",profileHint:"ভাষা শুধু আপনার স্ক্রিনে বদলাবে। হিসাব দুইজনের জন্য একই থাকবে।",general:"সাধারণ",sharedSettings:"শেয়ার্ড সেটিংস",baseCurrency:"মূল কারেন্সি",newSettingsPin:"নতুন সেটিংস PIN",saveSettings:"সেটিংস সেভ করুন",currencies:"কারেন্সি",activeCurrencies:"সক্রিয় কারেন্সি",expenseStructure:"খরচের ধরন",categoriesSubcategories:"ক্যাটাগরি ও সাবক্যাটাগরি",newCategory:"নতুন ক্যাটাগরি",addCategory:"ক্যাটাগরি যোগ করুন",methods:"মেথড",paymentMethods:"পেমেন্ট মেথড",data:"ডাটা",backupDeleted:"ব্যাকআপ ও ডিলিটেড রেকর্ড",exportBackup:"JSON ব্যাকআপ",openTrash:"ট্র্যাশ খুলুন",newRecord:"নতুন রেকর্ড",amount:"পরিমাণ",rateToBase:"বেস কারেন্সিতে রেট",source:"উৎস",incomeOwner:"আয়ের মালিক",incomeSetup:"আয়ের মালিক ও উৎস",incomeOwners:"আয়ের মালিক",incomeSources:"আয়ের উৎস",editRecord:"রেকর্ড এডিট করুন",psaHint:"এটি শুধু আপনার লগইনে দেখা যাবে। শেয়ার্ড ড্যাশবোর্ড, হিস্টোরি, সেভিংস বা রিপোর্টে দেখাবে না।",saveTo:"যেখানে সেভ করবেন",targetOptional:"টার্গেট (ঐচ্ছিক)",method:"মেথড",date:"তারিখ",time:"সময়",createdAt:"অ্যাপে যোগ করার সময়",transactionDateTime:"লেনদেনের তারিখ ও সময়",noteOptional:"নোট (ঐচ্ছিক)",shortNote:"ছোট নোট",cancel:"বাতিল",saveRecord:"রেকর্ড সেভ করুন",targetName:"টার্গেটের নাম",targetAmount:"টার্গেট পরিমাণ",targetDateOptional:"টার্গেট তারিখ (ঐচ্ছিক)",createTarget:"টার্গেট তৈরি করুন",recovery:"রিকভারি",trash:"ট্র্যাশ",viewInHistory:"হিস্টোরিতে দেখুন",totalIncome:"মোট আয়",totalExpense:"মোট খরচ",totalSavings:"মোট সঞ্চয়",totalFamily:"মোট ফ্যামিলি সাপোর্ট",balanceBreakdown:"ব্যালেন্সের হিসাব",entries:"এন্ট্রি",noData:"এখনও কোনো ডাটা নেই।"}
};

let state={user:null,profile:null,profiles:[],settings:structuredClone(DEFAULT_SETTINGS),transactions:[],targets:[],selectedMonth:new Date().toISOString().slice(0,7),unlocked:false,reportPeriod:"thisMonth",reportType:"income",reportRows:[],detailFilter:null,editingId:null,currentTxId:null,expenseSlides:[],expenseSlideIndex:0,expenseSlideTimer:null,savingsRevealTimer:null,psaUnlocked:false,psaHasCode:false,psaEntries:[],offlineEnabled:localStorage.getItem("ourMoneyOfflineMode")!=="off",pendingOps:[],syncBusy:false,lastSyncError:null};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const lang=()=>state.profile?.language||"en",tr=k=>T[lang()]?.[k]||T.en[k]||k;
const money=(v,c=state.settings.base_currency)=>`${c} ${Number(v||0).toLocaleString(undefined,{maximumFractionDigits:2})}`;
const localDate=()=>new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
const localTime=()=>new Date().toTimeString().slice(0,5);
const sha256=async s=>Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s)))).map(b=>b.toString(16).padStart(2,"0")).join("");
const baseValue=x=>Number(x.amount||0)*Number(x.exchange_rate||1);
function toast(m){const e=$("#toast");e.textContent=m;e.classList.add("show");setTimeout(()=>e.classList.remove("show"),2200)}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openD(id){$("#"+id).showModal()}function closeD(id){$("#"+id).close()}

async function boot(){
  bind();
  const {data:{session}}=await db.auth.getSession();
  if(session)await enter(session.user);
}
async function enter(user){
  state.user=user;$("#loginView").classList.add("hidden");$("#app").classList.remove("hidden");
  await offlineInit();await loadPendingOps();
  await ensureProfile();await ensureSettings();await Promise.all([loadProfiles(),loadTx(),loadTargets(),loadPsaMeta()]);
  applyLanguage();initMonthPicker();populate();renderAll();$("#sidebarUser").textContent=state.profile.display_name;$("#autoOwner").textContent=state.profile.display_name;updateSyncUI();registerOfflineWorker();if(navigator.onLine&&state.offlineEnabled)syncPending();
}
async function ensureProfile(){
  if(navigator.onLine){
    let {data,error}=await db.from("profiles").select("*").eq("user_id",state.user.id).maybeSingle();
    if(!error){
      if(!data){const fallback=(state.user.user_metadata?.full_name||state.user.email.split("@")[0]||"User").replace(/[._-]/g," ");const r=await db.from("profiles").insert({user_id:state.user.id,display_name:fallback,language:"en"}).select().single();if(r.error)throw r.error;data=r.data}
      state.profile=data;await offlineCachePut("profile",data);return;
    }
  }
  const cached=state.offlineEnabled?await offlineCacheGet("profile"):null;
  if(cached){state.profile=cached;return}
  throw new Error("Profile is not available offline yet. Open the app once while online.");
}
async function ensureSettings(){
  if(navigator.onLine){
    const {data,error}=await db.from("app_settings").select("settings").eq("id",1).maybeSingle();
    if(!error){
      if(data?.settings){state.settings={...structuredClone(DEFAULT_SETTINGS),...data.settings};if(!state.settings.categories&&state.settings.expense_categories)state.settings.categories=state.settings.expense_categories.map(x=>({name:x,subs:[]}))}
      else{state.settings={...structuredClone(DEFAULT_SETTINGS),pin_hash:await sha256("9988")};await db.from("app_settings").upsert({id:1,settings:state.settings,updated_by:state.user.id})}
      await offlineCachePut("settings",state.settings);return;
    }
  }
  const cached=state.offlineEnabled?await offlineCacheGet("settings"):null;
  if(cached){state.settings={...structuredClone(DEFAULT_SETTINGS),...cached};return}
  throw new Error("Settings are not available offline yet. Open the app once while online.");
}
async function loadProfiles(){
  if(navigator.onLine){const {data,error}=await db.from("profiles").select("*");if(!error){state.profiles=data||[];await offlineCachePut("profiles",state.profiles);return}}
  state.profiles=state.offlineEnabled?(await offlineCacheGet("profiles")||[]):[];
}
async function loadTx(){
  let serverRows=null;
  if(navigator.onLine){
    try{
      const {data,error}=await db.from("transactions").select("*").is("deleted_at",null).order("transaction_date",{ascending:false}).order("transaction_time",{ascending:false,nullsFirst:false}).order("created_at",{ascending:false});
      if(!error){serverRows=data||[];await offlineCachePut("transactions",serverRows)}
      else if(!state.offlineEnabled)throw error;
    }catch(e){if(!state.offlineEnabled)throw e}
  }
  if(serverRows!==null)state.transactions=serverRows;
  else state.transactions=state.offlineEnabled?(await offlineCacheGet("transactions")||[]):[];
  if(state.offlineEnabled)mergePendingIntoState();
}
async function loadTargets(){
  if(navigator.onLine){const {data,error}=await db.from("targets").select("*").is("deleted_at",null).order("created_at",{ascending:false});if(!error){state.targets=data||[];await offlineCachePut("targets",state.targets);return}}
  state.targets=state.offlineEnabled?(await offlineCacheGet("targets")||[]):[];
}

function applyLanguage(){
  document.documentElement.lang=lang()==="bn"?"bn":"en";
  $$("[data-i18n]").forEach(e=>e.textContent=tr(e.dataset.i18n));
  $$("[data-i18n-placeholder]").forEach(e=>e.placeholder=tr(e.dataset.i18nPlaceholder));
  $("#pageTitle").textContent=tr("dashboard");
  if($("#headerLanguage")) $("#headerLanguage").value=lang();
}
function initMonthPicker(){
  const s=$("#monthPicker"),now=new Date();s.innerHTML="";
  for(let i=-36;i<=12;i++){const d=new Date(now.getFullYear(),now.getMonth()+i,1),v=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;const o=document.createElement("option");o.value=v;o.textContent=d.toLocaleDateString(lang()==="bn"?"bn-BD":"en-US",{month:"short",year:"numeric"});if(v===state.selectedMonth)o.selected=true;s.append(o)}
}
function fill(el,items,selected){
  const cur=selected??el.value;el.innerHTML=items.map(x=>{const v=typeof x==="string"?x:x.value,l=typeof x==="string"?x:x.label;return `<option value="${esc(v)}">${esc(l)}</option>`}).join("");if([...el.options].some(o=>o.value===cur))el.value=cur;
}
function populate(){
  const cats=state.settings.categories.map(x=>x.name),codes=state.settings.currencies.map(x=>x.code);
  fill($("#historyType"),[{value:"all",label:tr("allTypes")},{value:"income",label:tr("income")},{value:"expense",label:tr("expense")},{value:"saving",label:tr("savings")}],"all");
  fill($("#historyCategory"),[{value:"all",label:tr("allCategories")},...cats.map(x=>({value:x,label:x}))],"all");
  fill($("#expenseCategory"),cats);updateSubs();
  fill($("#incomeOwner"),state.settings.income_owners||["Mehedi Income","Mousumi Income"]);fill($("#incomeSource"),state.settings.income_sources);fill($("#entryMethod"),state.settings.payment_methods);
  [$("#entryCurrency"),$("#targetCurrency"),$("#newSavingCurrency")].forEach(e=>fill(e,codes,state.settings.base_currency));
  fill($("#savingAccount"),state.settings.saving_accounts.map(x=>({value:x.name,label:`${x.name} (${x.currency})`})));
  fill($("#savingTarget"),[{value:"",label:lang()==="bn"?"কোনো টার্গেট নয়":"No target"},...state.targets.map(x=>({value:x.id,label:x.name}))]);
  fill($("#reportCategory"),[{value:"all",label:tr("allCategories")},...cats.map(x=>({value:x,label:x}))],"all");updateReportSubs();
  fill($("#reportIncomeOwner"),[{value:"all",label:tr("all")},...(state.settings.income_owners||[]).map(x=>({value:x,label:x}))],"all");
  fill($("#reportOwner"),[{value:"all",label:tr("all")},...state.profiles.map(p=>({value:p.display_name,label:p.display_name}))],"all");
  fill($("#reportCurrency"),[{value:"all",label:tr("all")},...codes.map(x=>({value:x,label:x}))],"all");
  renderSettings();
}
function renderAll(){renderDashboard();renderHistory();renderTargets();renderSettings();renderReport()}
function monthRows(){return state.transactions.filter(x=>String(x.transaction_date).slice(0,7)===state.selectedMonth)}
function renderDashboard(){
  const tx=monthRows(),sum=t=>tx.filter(x=>x.type===t).reduce((s,x)=>s+baseValue(x),0),inc=sum("income"),exp=sum("expense"),sav=sum("saving");
  const allInc=state.transactions.filter(x=>x.type==="income").reduce((s,x)=>s+baseValue(x),0),allExp=state.transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+baseValue(x),0),allSav=state.transactions.filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0);
  const fam=tx.filter(x=>x.type==="expense"&&x.category==="Family Support"),mf=fam.filter(x=>x.subcategory==="Mehedi Family").reduce((s,x)=>s+baseValue(x),0),mouf=fam.filter(x=>x.subcategory==="Mou Family").reduce((s,x)=>s+baseValue(x),0);
  $("#incomeTotal").textContent=money(inc);$("#expenseTotal").textContent=money(exp);renderSavingsMasked(sav);$("#availableBalance").textContent=money(allInc-allExp-allSav);$("#totalSavings").textContent=money(allSav);prepareExpenseSlides(tx);
  const d=new Date(state.selectedMonth+"-01T00:00:00");$("#monthLabel").textContent=d.toLocaleDateString(lang()==="bn"?"bn-BD":"en-US",{month:"long",year:"numeric"});
  const cmap={};tx.filter(x=>x.type==="expense").forEach(x=>cmap[x.category]=(cmap[x.category]||0)+baseValue(x));const arr=Object.entries(cmap).sort((a,b)=>b[1]-a[1]);$("#expenseCount").textContent=`${tx.filter(x=>x.type==="expense").length} ${tr("entries")}`;$("#categoryBars").innerHTML=arr.length?arr.map(([k,v])=>`<div class="bar-row"><span>${esc(k)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(5,v/arr[0][1]*100)}%"></div></div><strong>${money(v)}</strong></div>`).join(""):`<div class="empty-state">${tr("noData")}</div>`;
  $("#recentList").innerHTML=state.transactions.slice(0,7).length?state.transactions.slice(0,7).map(txHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`;bindTxMenu();
  $("#targetPreview").innerHTML=state.targets.slice(0,3).length?state.targets.slice(0,3).map(targetHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`;
}
function ownerName(uid){return state.profiles.find(p=>p.user_id===uid)?.display_name||"User"}
function txHtml(x){
  const label=x.category?`${x.category}${x.subcategory?` → ${x.subcategory}`:""}`:(x.source||x.saving_account||"Record"),sign=x.type==="income"?"+":x.type==="expense"?"−":"→",pending=x._pending?`<span class="pending-badge">Pending Sync</span>`:"";
  return `<div class="tx" data-tx-id="${x.id}"><div class="tx-icon">${x.type==="income"?"＋":x.type==="expense"?"−":"↗"}</div><div class="tx-main"><strong>${esc(label)} ${pending}</strong><small>${x.transaction_date} • ${tr("addedBy")}: ${esc(x.owner_name||ownerName(x.created_by))}${x.payment_method?` • ${esc(x.payment_method)}`:""}${x.note?` • ${esc(x.note)}`:""}</small></div><div class="tx-amount ${x.type}">${sign} ${money(x.amount,x.currency)}</div><button class="icon-btn tx-menu" data-id="${x.id}" aria-label="More">⋯</button></div>`;
}
function bindTxMenu(){
  $$(".tx[data-tx-id]").forEach(row=>row.onclick=()=>openTransactionDetail(row.dataset.txId));
  $$(".tx-menu").forEach(b=>b.onclick=async(e)=>{e.stopPropagation();if(!confirm(lang()==="bn"?"রেকর্ডটি ট্র্যাশে পাঠাবেন?":"Move this record to Trash?"))return;if(!navigator.onLine&&state.offlineEnabled){await queueOfflineOp({op:"delete",server_id:b.dataset.id});state.transactions=state.transactions.filter(x=>x.id!==b.dataset.id);await offlineCachePut("transactions",state.transactions.filter(x=>!x._pending));renderAll();return toast("Deleted offline • Pending Sync")}
    if(!navigator.onLine)return toast("No internet. Offline Mode is disabled.");await db.from("transactions").update({deleted_at:new Date().toISOString()}).eq("id",b.dataset.id);await loadTx();renderAll()})
}
function renderHistory(){
  let a=[...state.transactions],q=$("#historySearch").value.toLowerCase(),typ=$("#historyType").value||"all",cat=$("#historyCategory").value||"all";
  if(typ!=="all")a=a.filter(x=>x.type===typ);if(cat!=="all")a=a.filter(x=>x.category===cat);if(q)a=a.filter(x=>JSON.stringify(x).toLowerCase().includes(q));
  $("#historyList").innerHTML=a.length?a.map(txHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`;bindTxMenu();
}
function targetSaved(tg){return state.transactions.filter(x=>x.type==="saving"&&x.target_id===tg.id).reduce((s,x)=>s+Number(x.amount||0),0)}
function targetHtml(tg){const sv=targetSaved(tg),p=tg.target_amount?Math.min(100,sv/Number(tg.target_amount)*100):0;return `<div class="target-card"><div class="target-top"><strong>${esc(tg.name)}</strong><span>${Math.round(p)}%</span></div><div class="progress"><span style="width:${p}%"></span></div><div class="target-meta"><span>${money(sv,tg.currency)}</span><span>${money(tg.target_amount,tg.currency)}</span></div></div>`}
function renderTargets(){$("#targetsGrid").innerHTML=state.targets.length?state.targets.map(targetHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`}

function updateSubs(){const c=state.settings.categories.find(x=>x.name===$("#expenseCategory").value),s=c?.subs||[];fill($("#expenseSubcategory"),s);$("#subcategoryWrap").classList.toggle("hidden",!s.length)}
function setEntryType(type){$("#entryType").value=type;$$("[data-entry-type]").forEach(b=>b.classList.toggle("active",b.dataset.entryType===type));$("#incomeFields").classList.toggle("hidden",type!=="income");$("#expenseFields").classList.toggle("hidden",type!=="expense");$("#savingFields").classList.toggle("hidden",type!=="saving");$("#entryTitle").textContent=type==="income"?tr("income"):type==="expense"?tr("expense"):tr("savings")}
function openEntry(type="expense"){state.editingId=null;$("#entryForm button[type='submit']").textContent=tr("saveRecord");setEntryType(type);$("#entryDate").value=localDate();$("#entryTime").value=localTime();$("#entryAmount").value="";$("#entryNote").value="";$("#entryCurrency").value=state.settings.base_currency;$("#entryRate").value=1;$("#autoOwner").textContent=state.profile.display_name;updateRate();openD("entryDialog")}
function updateRate(){$("#rateWrap").classList.toggle("hidden",$("#entryCurrency").value===state.settings.base_currency);if($("#entryCurrency").value===state.settings.base_currency)$("#entryRate").value=1}
async function submitEntry(e){
  e.preventDefault();
  const entrySubmitBtn=e.submitter||$("#entryForm button[type='submit']");
  if(entrySubmitBtn?.disabled)return;
  if(entrySubmitBtn){entrySubmitBtn.disabled=true;entrySubmitBtn.dataset.oldText=entrySubmitBtn.textContent;entrySubmitBtn.textContent=lang()==="bn"?"সেভ হচ্ছে…":"Saving…";}
  try{
    const type=$("#entryType").value;
    const amount=Number($("#entryAmount").value);
    const currency=$("#entryCurrency").value;
    const rate=currency===state.settings.base_currency?1:Number($("#entryRate").value||0);
    if(!amount||amount<=0)return toast("Enter amount");
    if(rate<=0)return toast("Enter conversion rate");

    const row={
      type,amount,currency,exchange_rate:rate,
      transaction_date:$("#entryDate").value,
      transaction_time:$("#entryTime").value||localTime(),
      payment_method:$("#entryMethod").value,
      note:$("#entryNote").value.trim()||null,
      created_by:state.user.id,
      owner_name:state.profile.display_name
    };
    if(type==="income"){row.income_owner=$("#incomeOwner").value;row.source=$("#incomeSource").value}
    if(type==="expense"){row.category=$("#expenseCategory").value;row.subcategory=$("#expenseSubcategory").value||null}
    if(type==="saving"){row.saving_account=$("#savingAccount").value;row.target_id=$("#savingTarget").value||null}

    if(state.editingId){
      if(state.offlineEnabled){
        await queueOfflineOp({op:"update",server_id:state.editingId,row:{...row,updated_at:new Date().toISOString()}});
        applyOfflineUpdate(state.editingId,row);
        state.editingId=null;
        closeD("entryDialog");renderAll();
        toast(navigator.onLine?"Saved • Syncing…":"Saved offline • Pending Sync");
        if(navigator.onLine)syncPending();
        return;
      }
      if(!navigator.onLine)return toast("No internet. Offline Mode is disabled.");
      const r=await db.from("transactions").update({...row,updated_at:new Date().toISOString()}).eq("id",state.editingId);
      if(r.error)return toast(r.error.message);
      state.editingId=null;closeD("entryDialog");await loadTx();renderAll();return toast(lang()==="bn"?"সেভ হয়েছে":"Saved");
    }

    row.client_id=crypto.randomUUID();

    // SAFE MODE: queue locally first, before any network call.
    if(state.offlineEnabled){
      await queueOfflineOp({op:"insert",client_id:row.client_id,row});
      addPendingTransaction(row);
      closeD("entryDialog");renderAll();
      toast(navigator.onLine?"Saved • Syncing…":"Saved offline • Pending Sync");
      if(navigator.onLine)syncPending();
      return;
    }

    if(!navigator.onLine)return toast("No internet. Enable Offline Mode to save without internet.");
    const existing=await db.from("transactions").select("id").eq("client_id",row.client_id).maybeSingle();
    if(existing.error && existing.error.code!=="PGRST116")return toast(existing.error.message);
    if(!existing.data){
      const r=await db.from("transactions").insert(row);
      if(r.error && r.error.code!=="23505")return toast(r.error.message);
    }
    closeD("entryDialog");await loadTx();renderAll();toast(lang()==="bn"?"সেভ হয়েছে":"Saved");
  }catch(err){
    console.error("Save Record failed",err);
    toast("Save error: "+String(err?.message||err));
  }finally{
    if(entrySubmitBtn){
      entrySubmitBtn.disabled=false;
      entrySubmitBtn.textContent=entrySubmitBtn.dataset.oldText||tr("saveRecord");
      delete entrySubmitBtn.dataset.oldText;
    }
  }
}
async function submitTarget(e){e.preventDefault();const row={name:$("#targetName").value.trim(),target_amount:Number($("#targetAmount").value),currency:$("#targetCurrency").value,target_date:$("#targetDate").value||null,created_by:state.user.id};const {error}=await db.from("targets").insert(row);if(error)return toast(error.message);closeD("targetDialog");e.target.reset();await loadTargets();populate();renderAll()}

function formatCreatedAt(value){
  if(!value)return "—";
  try{return new Date(value).toLocaleString(lang()==="bn"?"bn-BD":"en-US",{year:"numeric",month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}catch{return value}
}
function openTransactionDetail(id){
  const x=state.transactions.find(r=>r.id===id);if(!x)return;state.currentTxId=id;
  const label=x.category?`${x.category}${x.subcategory?` → ${x.subcategory}`:""}`:(x.source||x.saving_account||"Transaction");
  $("#transactionDetailTitle").textContent=label;
  const rows=[
    [tr("amount"),money(x.amount,x.currency)],
    [tr("transactionDateTime"),`${x.transaction_date}${x.transaction_time?` • ${String(x.transaction_time).slice(0,5)}`:""}`],
    [tr("addedBy"),x.owner_name||ownerName(x.created_by)],
    [tr("method"),x.payment_method||"—"],
    [tr("createdAt"),formatCreatedAt(x.created_at)]
  ];
  if(x.type==="income"){rows.splice(2,0,[tr("incomeOwner"),x.income_owner||"—"]);rows.splice(3,0,[tr("source"),x.source||"—"]);}
  if(x.type==="expense"){rows.splice(2,0,[tr("category"),x.category||"—"]);rows.splice(3,0,[tr("subcategory"),x.subcategory||"—"])}
  if(x.type==="saving"){rows.splice(2,0,[tr("saveTo"),x.saving_account||"—"]);const tg=state.targets.find(t=>t.id===x.target_id);rows.splice(3,0,[tr("targets"),tg?.name||(lang()==="bn"?"কোনো টার্গেট নয়":"No target")])}
  if(x.note)rows.push([tr("noteOptional").replace(" (optional)",""),x.note]);
  $("#transactionDetailBody").innerHTML=rows.map(([k,v])=>`<div class="transaction-detail-row"><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join("");
  openD("transactionDialog");
}

function openDrill(kind){
  const tx=monthRows();let rows=[],title="",summary="";
  if(kind==="category"){const c=state.expenseSlides[state.expenseSlideIndex]?.category;rows=tx.filter(x=>x.type==="expense"&&x.category===c);title=c||tr("expense");summary=`<div class="detail-kpi"><span>${tr("totalExpense")}</span><strong>${money(rows.reduce((s,x)=>s+baseValue(x),0))}</strong></div><div class="detail-kpi"><span>${tr("entries")}</span><strong>${rows.length}</strong></div>`}
  else if(kind==="income"){rows=tx.filter(x=>x.type==="income");title=tr("income");summary=`<div class="detail-kpi"><span>${tr("totalIncome")}</span><strong>${money(rows.reduce((s,x)=>s+baseValue(x),0))}</strong></div><div class="detail-kpi"><span>${tr("entries")}</span><strong>${rows.length}</strong></div>`}
  else if(kind==="expense"){rows=tx.filter(x=>x.type==="expense");title=tr("expense");summary=`<div class="detail-kpi"><span>${tr("totalExpense")}</span><strong>${money(rows.reduce((s,x)=>s+baseValue(x),0))}</strong></div><div class="detail-kpi"><span>${tr("entries")}</span><strong>${rows.length}</strong></div>`}
  else if(kind==="family"){rows=tx.filter(x=>x.type==="expense"&&x.category==="Family Support");title=tr("familySupport");const m=rows.filter(x=>x.subcategory==="Mehedi Family").reduce((s,x)=>s+baseValue(x),0),mo=rows.filter(x=>x.subcategory==="Mou Family").reduce((s,x)=>s+baseValue(x),0);summary=`<div class="detail-kpi"><span>Mehedi Family</span><strong>${money(m)}</strong></div><div class="detail-kpi"><span>Mou Family</span><strong>${money(mo)}</strong></div><div class="detail-kpi"><span>${tr("totalFamily")}</span><strong>${money(m+mo)}</strong></div>`}
  else if(kind==="saving"){rows=tx.filter(x=>x.type==="saving");title=tr("savings");summary=`<div class="detail-kpi"><span>${tr("totalSavings")}</span><strong>${money(rows.reduce((s,x)=>s+baseValue(x),0))}</strong></div><div class="detail-kpi"><span>${tr("entries")}</span><strong>${rows.length}</strong></div>`}
  else{const inc=state.transactions.filter(x=>x.type==="income").reduce((s,x)=>s+baseValue(x),0),exp=state.transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+baseValue(x),0),sav=state.transactions.filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0);rows=state.transactions;title=tr("balanceBreakdown");summary=`<div class="detail-kpi"><span>${tr("totalIncome")}</span><strong>${money(inc)}</strong></div><div class="detail-kpi"><span>${tr("totalExpense")}</span><strong>${money(exp)}</strong></div><div class="detail-kpi"><span>${tr("totalSavings")}</span><strong>${money(sav)}</strong></div><div class="detail-kpi"><span>${tr("availableBalance")}</span><strong>${money(inc-exp-sav)}</strong></div>`}
  state.detailFilter=kind;$("#detailTitle").textContent=title;$("#detailSummary").innerHTML=summary;$("#detailList").innerHTML=rows.length?rows.map(txHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`;bindTxMenu();openD("detailDialog")
}

function reportDateRange(){
  const now=new Date(),p=state.reportPeriod;let a,b;
  if(p==="thisMonth"){a=new Date(now.getFullYear(),now.getMonth(),1);b=new Date(now.getFullYear(),now.getMonth()+1,0)}
  else if(p==="lastMonth"){a=new Date(now.getFullYear(),now.getMonth()-1,1);b=new Date(now.getFullYear(),now.getMonth(),0)}
  else if(p==="thisYear"){a=new Date(now.getFullYear(),0,1);b=new Date(now.getFullYear(),11,31)}
  else if(p==="lastYear"){a=new Date(now.getFullYear()-1,0,1);b=new Date(now.getFullYear()-1,11,31)}
  else{return {from:$("#reportFrom").value||"0000-01-01",to:$("#reportTo").value||"9999-12-31"}}
  const f=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;return {from:f(a),to:f(b)}
}
function updateReportSubs(){const c=$("#reportCategory").value,s=c&&c!=="all"?state.settings.categories.find(x=>x.name===c)?.subs||[]:[];fill($("#reportSubcategory"),[{value:"all",label:tr("all")},...s.map(x=>({value:x,label:x}))],"all")}
function getReportRows(){
  const {from,to}=reportDateRange(),cat=$("#reportCategory").value||"all",sub=$("#reportSubcategory").value||"all",incomeOwner=$("#reportIncomeOwner").value||"all",owner=$("#reportOwner").value||"all",cur=$("#reportCurrency").value||"all";
  let rows=state.transactions.filter(x=>x.transaction_date>=from&&x.transaction_date<=to);
  if(state.reportType==="family")rows=rows.filter(x=>x.type==="expense"&&x.category==="Family Support");
  else if(state.reportType!=="all")rows=rows.filter(x=>x.type===state.reportType);
  if(incomeOwner!=="all")rows=rows.filter(x=>x.income_owner===incomeOwner);if(cat!=="all")rows=rows.filter(x=>x.category===cat);if(sub!=="all")rows=rows.filter(x=>x.subcategory===sub);if(owner!=="all")rows=rows.filter(x=>(x.owner_name||ownerName(x.created_by))===owner);if(cur!=="all")rows=rows.filter(x=>x.currency===cur);
  return rows;
}
function reportLabel(){
  if(state.reportType==="income")return tr("totalIncome");if(state.reportType==="expense")return tr("totalExpense");if(state.reportType==="saving")return tr("totalSavings");if(state.reportType==="family")return tr("totalFamily");return lang()==="bn"?"নেট পরিবর্তন":"Net Change";
}
function renderReport(){
  const rows=getReportRows();state.reportRows=rows;
  let total=0;if(state.reportType==="all")total=rows.reduce((s,x)=>s+(x.type==="income"?baseValue(x):-baseValue(x)),0);else total=rows.reduce((s,x)=>s+baseValue(x),0);
  const label=reportLabel();$("#reportSummaryLabel").textContent=label;$("#reportSummaryValue").textContent=money(total);$("#reportSummaryMeta").textContent=`${rows.length} ${tr("entries")}`;$("#reportBottomLabel").textContent=label;$("#reportBottomTotal").textContent=money(total);$("#reportCount").textContent=`${rows.length} ${tr("entries")}`;
  const cmap={},smap={};
  if(state.reportType==="income"){
    rows.forEach(x=>{const k=x.income_owner||"Unassigned";cmap[k]=(cmap[k]||0)+baseValue(x);if(x.source)smap[x.source]=(smap[x.source]||0)+baseValue(x)});
  }else{
    rows.forEach(x=>{if(x.category)cmap[x.category]=(cmap[x.category]||0)+baseValue(x);if(x.subcategory)smap[x.subcategory]=(smap[x.subcategory]||0)+baseValue(x)});
  }
  const breakdown=m=>{const a=Object.entries(m).sort((a,b)=>b[1]-a[1]);return a.length?a.map(([k,v])=>`<div class="breakdown-item"><span>${esc(k)}</span><strong>${money(v)}</strong></div>`).join(""):`<div class="empty-state">${tr("noData")}</div>`};
  $("#reportCategoryBreakdown").innerHTML=breakdown(cmap);$("#reportSubcategoryBreakdown").innerHTML=breakdown(smap);$("#reportBreakdownWrap").classList.toggle("hidden",state.reportType==="saving");
  $("#reportIncomeOwnerWrap").classList.toggle("hidden",!(state.reportType==="income"||state.reportType==="all"));
  $("#reportTransactions").innerHTML=rows.length?rows.map(txHtml).join(""):`<div class="empty-state">${tr("noData")}</div>`;bindTxMenu();
}
function pdfReport(){
  const {jsPDF}=window.jspdf,doc=new jsPDF({unit:"pt",format:"a4"}),rows=state.reportRows;let y=42;
  doc.setFont("helvetica","bold");doc.setFontSize(18);doc.text("Our Money - Finance Report",40,y);y+=18;doc.setFont("helvetica","normal");doc.setFontSize(9);doc.text(`Generated: ${new Date().toLocaleString()} | User: ${state.profile.display_name}`,40,y);y+=20;
  let total=state.reportType==="all"?rows.reduce((s,x)=>s+(x.type==="income"?baseValue(x):-baseValue(x)),0):rows.reduce((s,x)=>s+baseValue(x),0);
  doc.autoTable({startY:y,head:[[reportLabel(),"Entries"]],body:[[money(total),String(rows.length)]],theme:"grid",styles:{fontSize:9}});y=doc.lastAutoTable.finalY+14;
  if(state.reportType==="expense"||state.reportType==="family"||state.reportType==="all"){const map={};rows.filter(x=>x.type==="expense").forEach(x=>{const k=x.subcategory?`${x.category} > ${x.subcategory}`:(x.category||"Expense");map[k]=(map[k]||0)+baseValue(x)});doc.autoTable({startY:y,head:[["Category / Subcategory","Total"]],body:Object.entries(map).sort((a,b)=>b[1]-a[1]).map(([k,v])=>[k,money(v)]),theme:"striped",styles:{fontSize:8}});y=doc.lastAutoTable.finalY+14}
  doc.autoTable({startY:y,head:[["Date","Type","Category","Subcategory / Source","Amount","Added by"]],body:rows.map(x=>[`${x.transaction_date}${x.transaction_time?` ${String(x.transaction_time).slice(0,5)}`:""}`,x.type,x.category||"",x.subcategory||x.source||x.saving_account||"",money(x.amount,x.currency),x.owner_name||ownerName(x.created_by)]),theme:"grid",styles:{fontSize:7}});
  doc.save(`our-money-${state.reportType}-${localDate()}.pdf`);
}


function renderSavingsMasked(value){
  const el=$("#savedThisMonth");
  el.dataset.real=money(value);
  el.innerHTML=`<span class="savings-mask">AED ••••••</span><button type="button" class="savings-eye" aria-label="Show savings">◉</button>`;
  const eye=el.querySelector(".savings-eye");
  eye.onclick=(e)=>{e.stopPropagation();revealSavings()};
}
function revealSavings(){
  const el=$("#savedThisMonth");if(!el)return;
  clearTimeout(state.savingsRevealTimer);
  const real=el.dataset.real||"AED 0";
  el.innerHTML=`<span>${esc(real)}</span><button type="button" class="savings-eye" aria-label="Hide savings">◉</button>`;
  el.querySelector(".savings-eye").onclick=(e)=>{e.stopPropagation();renderSavingsMasked(Number(monthRows().filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0)))};
  state.savingsRevealTimer=setTimeout(()=>renderSavingsMasked(monthRows().filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0)),4000);
}
function prepareExpenseSlides(tx){
  const map={};
  tx.filter(x=>x.type==="expense").forEach(x=>{
    if(!map[x.category])map[x.category]={total:0,subs:{}};
    map[x.category].total+=baseValue(x);
    if(x.subcategory)map[x.category].subs[x.subcategory]=(map[x.category].subs[x.subcategory]||0)+baseValue(x);
  });
  state.expenseSlides=Object.entries(map).sort((a,b)=>b[1].total-a[1].total).map(([category,v])=>({category,...v}));
  if(state.expenseSlideIndex>=state.expenseSlides.length)state.expenseSlideIndex=0;
  renderExpenseSlide();
  clearInterval(state.expenseSlideTimer);
  if(state.expenseSlides.length>1)state.expenseSlideTimer=setInterval(()=>{state.expenseSlideIndex=(state.expenseSlideIndex+1)%state.expenseSlides.length;renderExpenseSlide()},3800);
}
function renderExpenseSlide(){
  const s=state.expenseSlides[state.expenseSlideIndex];
  if(!s){$("#expenseSlideTitle").textContent=tr("expense");$("#expenseSlideAmount").textContent=money(0);$("#expenseSlideSub").textContent=tr("noData");$("#expenseSlideDots").innerHTML="";return}
  $("#expenseSlideTitle").textContent=s.category;$("#expenseSlideAmount").textContent=money(s.total);
  const subs=Object.entries(s.subs).sort((a,b)=>b[1]-a[1]).slice(0,2).map(([k,v])=>`${k} ${money(v)}`);
  $("#expenseSlideSub").textContent=subs.join(" • ")||tr("tapDetails");
  $("#expenseSlideDots").innerHTML=state.expenseSlides.map((_,i)=>`<i class="${i===state.expenseSlideIndex?"active":""}"></i>`).join("");
}
function editCurrentTransaction(){
  const x=state.transactions.find(r=>r.id===state.currentTxId);if(!x)return;
  closeD("transactionDialog");state.editingId=x.id;setEntryType(x.type);
  $("#entryAmount").value=x.amount;$("#entryCurrency").value=x.currency;updateRate();$("#entryRate").value=x.exchange_rate||1;
  $("#entryDate").value=x.transaction_date;$("#entryTime").value=(x.transaction_time||localTime()).slice(0,5);$("#entryMethod").value=x.payment_method||"";$("#entryNote").value=x.note||"";
  if(x.type==="income"){$("#incomeOwner").value=x.income_owner||"";$("#incomeSource").value=x.source||""}
  if(x.type==="expense"){$("#expenseCategory").value=x.category||"";updateSubs();$("#expenseSubcategory").value=x.subcategory||""}
  if(x.type==="saving"){$("#savingAccount").value=x.saving_account||"";$("#savingTarget").value=x.target_id||""}
  $("#entryTitle").textContent=(lang()==="bn"?"এডিট ":"Edit ")+(x.type==="income"?tr("income"):x.type==="expense"?tr("expense"):tr("savings"));
  $("#entryForm button[type='submit']").textContent=lang()==="bn"?"পরিবর্তন সেভ করুন":"Save Changes";
  openD("entryDialog");
}
async function loadPsaMeta(){
  const {data,error}=await db.from("psa_settings").select("code_hash").eq("user_id",state.user.id).maybeSingle();
  if(error && error.code!=="PGRST116")console.warn(error);
  state.psaHasCode=!!data?.code_hash;
}
function openPsaCodeChange(){
  $("#psaCurrentCodeWrap").classList.toggle("hidden",!state.psaHasCode);
  $("#psaCurrentCode").value=$("#psaNewCode").value=$("#psaConfirmCode").value="";
  $("#psaCodeTitle").textContent=state.psaHasCode?"Change PSA Code":"Create PSA Code";openD("psaCodeDialog");
}
async function savePsaCode(e){
  e.preventDefault();
  const current=$("#psaCurrentCode").value,newCode=$("#psaNewCode").value,confirm=$("#psaConfirmCode").value;
  if(!/^\d{4,8}$/.test(newCode))return toast("PSA code must be 4-8 digits");
  if(newCode!==confirm)return toast("Codes do not match");
  if(state.psaHasCode){
    const {data}=await db.from("psa_settings").select("code_hash").eq("user_id",state.user.id).single();
    if(!data||await sha256(current)!==data.code_hash)return toast("Current PSA code is wrong");
  }
  const code_hash=await sha256(newCode);
  const {error}=await db.from("psa_settings").upsert({user_id:state.user.id,code_hash,updated_at:new Date().toISOString()});
  if(error)return toast(error.message);
  state.psaHasCode=true;closeD("psaCodeDialog");toast("PSA code saved");
}
async function openPsa(){
  if(!state.psaHasCode){
    toast(lang()==="bn"?"প্রথমে Settings unlock করে PSA Code সেট করুন":"Unlock Settings first and set a PSA Code");
    return;
  }
  $("#psaUnlockCode").value="";
  openD("psaUnlockDialog");
}
async function unlockPsa(e){
  e.preventDefault();const code=$("#psaUnlockCode").value;
  const {data,error}=await db.from("psa_settings").select("code_hash").eq("user_id",state.user.id).single();
  if(error)return toast(error.message);if(await sha256(code)!==data.code_hash)return toast("Wrong PSA code");
  state.psaUnlocked=true;closeD("psaUnlockDialog");await loadPsaEntries();openPsaPanel();
}
async function loadPsaEntries(){
  const {data,error}=await db.from("psa_entries").select("*").eq("user_id",state.user.id).order("entry_date",{ascending:false}).order("entry_time",{ascending:false});
  if(error)return toast(error.message);state.psaEntries=data||[];
}
function openPsaPanel(){
  fill($("#psaCurrency"),state.settings.currencies.map(x=>x.code),state.settings.base_currency);
  $("#psaDate").value=localDate();$("#psaTime").value=localTime();$("#psaAmount").value="";$("#psaNote").value="";
  renderPsa();openD("psaDialog");
}
function renderPsa(){
  const balance=state.psaEntries.reduce((s,x)=>s+(x.entry_type==="saving"?Number(x.amount): -Number(x.amount)),0);
  $("#psaBalance").textContent=money(balance,state.settings.base_currency);
  $("#psaHistory").innerHTML=state.psaEntries.length?state.psaEntries.map(x=>`<div class="tx"><div class="tx-icon">${x.entry_type==="saving"?"＋":"−"}</div><div class="tx-main"><strong>${x.entry_type==="saving"?"Savings":"Expense"}</strong><small>${x.entry_date} • ${String(x.entry_time||"").slice(0,5)}${x.note?` • ${esc(x.note)}`:""}</small></div><div class="tx-amount ${x.entry_type==="saving"?"income":"expense"}">${x.entry_type==="saving"?"+":"−"} ${money(x.amount,x.currency)}</div></div>`).join(""):`<div class="empty-state">${tr("noData")}</div>`;
}
async function savePsaEntry(e){
  e.preventDefault();if(!state.psaUnlocked)return;
  const amount=Number($("#psaAmount").value);if(!amount||amount<=0)return toast("Enter amount");
  const row={user_id:state.user.id,entry_type:$("#psaType").value,amount,currency:$("#psaCurrency").value,entry_date:$("#psaDate").value,entry_time:$("#psaTime").value||localTime(),note:$("#psaNote").value.trim()||null};
  const {error}=await db.from("psa_entries").insert(row);if(error)return toast(error.message);
  await loadPsaEntries();$("#psaAmount").value="";$("#psaNote").value="";renderPsa();toast("PSA entry saved");
}

function renderSettings(){
  $("#preferenceTitle").textContent=state.profile?.display_name||"—";$("#profileName").value=state.profile?.display_name||"";
  fill($("#baseCurrency"),state.settings.currencies.map(x=>x.code),state.settings.base_currency);
  $("#currencyManager").innerHTML=state.settings.currencies.map((x,i)=>chip(`${x.code} ${x.symbol}`,"currency",i)).join("");
  $("#incomeOwnerManager").innerHTML=(state.settings.income_owners||[]).map((x,i)=>chip(x,"incomeOwner",i)).join("");
  $("#incomeSourceManager").innerHTML=state.settings.income_sources.map((x,i)=>chip(x,"incomeSource",i)).join("");
  $("#methodManager").innerHTML=state.settings.payment_methods.map((x,i)=>chip(x,"method",i)).join("");
  $("#savingAccountManager").innerHTML=state.settings.saving_accounts.map((x,i)=>chip(`${x.name} • ${x.currency}`,"saving",i)).join("");
  $("#categoryManager").innerHTML=state.settings.categories.map((c,i)=>`<div class="cat-card"><div class="cat-head"><strong>${esc(c.name)}</strong><div class="cat-actions"><button class="btn cat-toggle" data-i="${i}">Sub</button><button class="icon-btn cat-delete" data-i="${i}">×</button></div></div><div class="cat-body hidden" id="catBody${i}"><div class="subchips">${c.subs.map((s,j)=>`<span class="subchip">${esc(s)}<button data-ci="${i}" data-si="${j}">×</button></span>`).join("")}</div><div class="sub-add"><input id="subInput${i}" placeholder="New subcategory"><button class="btn sub-add-btn" data-i="${i}">${tr("add")}</button></div></div></div>`).join("");
  bindManagers();
}
function chip(l,t,i){return `<span class="manager-chip">${esc(l)}<button data-manager="${t}" data-index="${i}">×</button></span>`}
function bindManagers(){
  $$(".cat-toggle").forEach(b=>b.onclick=()=>$("#catBody"+b.dataset.i).classList.toggle("hidden"));
  $$(".cat-delete").forEach(b=>b.onclick=async()=>{if(!confirm("Remove category? Existing history stays unchanged."))return;state.settings.categories.splice(+b.dataset.i,1);await saveSettings()});
  $$("[data-ci]").forEach(b=>b.onclick=async()=>{state.settings.categories[+b.dataset.ci].subs.splice(+b.dataset.si,1);await saveSettings()});
  $$(".sub-add-btn").forEach(b=>b.onclick=async()=>{const i=+b.dataset.i,v=$("#subInput"+i).value.trim();if(v&&!state.settings.categories[i].subs.includes(v))state.settings.categories[i].subs.push(v);await saveSettings()});
  $$("[data-manager]").forEach(b=>b.onclick=async()=>{const map={currency:"currencies",method:"payment_methods",saving:"saving_accounts",incomeOwner:"income_owners",incomeSource:"income_sources"},k=map[b.dataset.manager];if(b.dataset.manager==="currency"&&state.settings.currencies.length<=1)return toast("Keep one currency");state.settings[k].splice(+b.dataset.index,1);await saveSettings()})
}
async function saveSettings(){const {error}=await db.from("app_settings").upsert({id:1,settings:state.settings,updated_by:state.user.id,updated_at:new Date().toISOString()});if(error)return toast(error.message);populate();renderAll();toast(lang()==="bn"?"সেটিংস সেভ হয়েছে":"Settings saved")}
async function saveProfile(){const n=$("#profileName").value.trim();if(!n)return;const {error}=await db.from("profiles").update({display_name:n}).eq("user_id",state.user.id);if(error)return toast(error.message);state.profile={...state.profile,display_name:n};await loadProfiles();applyLanguage();initMonthPicker();populate();renderAll();$("#sidebarUser").textContent=n;$("#autoOwner").textContent=n}
async function changeLanguage(language){
  if(!["en","bn"].includes(language)||language===lang())return;
  const {error}=await db.from("profiles").update({language}).eq("user_id",state.user.id);
  if(error){toast(error.message);$("#headerLanguage").value=lang();return}
  state.profile={...state.profile,language};
  applyLanguage();initMonthPicker();populate();renderAll();
}
async function showTrash(){const {data}=await db.from("transactions").select("*").not("deleted_at","is",null).order("deleted_at",{ascending:false});$("#trashList").innerHTML=(data||[]).length?data.map(x=>`<div class="tx"><div class="tx-icon">↶</div><div class="tx-main"><strong>${esc(x.category||x.source||x.saving_account||"Record")}</strong><small>${x.transaction_date}</small></div><div class="tx-amount ${x.type}">${money(x.amount,x.currency)}</div><button class="btn restore" data-id="${x.id}">Restore</button></div>`).join(""):`<div class="empty-state">${tr("noData")}</div>`;$$(".restore").forEach(b=>b.onclick=async()=>{await db.from("transactions").update({deleted_at:null}).eq("id",b.dataset.id);await loadTx();renderAll();showTrash()});openD("trashDialog")}
async function exportJson(){const {data:trash}=await db.from("transactions").select("*").not("deleted_at","is",null);const blob=new Blob([JSON.stringify({exported_at:new Date().toISOString(),profiles:state.profiles,settings:state.settings,transactions:[...state.transactions,...(trash||[])],targets:state.targets},null,2)],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`our-money-backup-${localDate()}.json`;a.click()}

function go(page){$$(".page").forEach(p=>p.classList.remove("active"));$("#"+page+"Page").classList.add("active");$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));$("#pageTitle").textContent={home:tr("dashboard"),history:tr("history"),reports:tr("reports"),targets:tr("targets"),settings:tr("settings")}[page];if(page==="settings"&&!state.unlocked){$("#settingsLock").classList.remove("hidden");$("#settingsContent").classList.add("hidden")}if(page==="reports")renderReport()}

// ---------- SAFE OFFLINE ENGINE ----------
const OFFLINE_DB="our-money-offline-v1",OFFLINE_STORE="kv",QUEUE_STORE="queue";
let offlineDb=null;
function offlineInit(){return new Promise((resolve,reject)=>{if(offlineDb)return resolve(offlineDb);const r=indexedDB.open(OFFLINE_DB,1);r.onupgradeneeded=()=>{const d=r.result;if(!d.objectStoreNames.contains(OFFLINE_STORE))d.createObjectStore(OFFLINE_STORE);if(!d.objectStoreNames.contains(QUEUE_STORE))d.createObjectStore(QUEUE_STORE,{keyPath:"qid"})};r.onsuccess=()=>{offlineDb=r.result;resolve(offlineDb)};r.onerror=()=>reject(r.error)})}
async function offlineCachePut(key,value){if(!state.offlineEnabled)return;await offlineInit();return new Promise((res,rej)=>{const tx=offlineDb.transaction(OFFLINE_STORE,"readwrite"),rq=tx.objectStore(OFFLINE_STORE).put(value,key);rq.onsuccess=()=>res();rq.onerror=()=>rej(rq.error)})}
async function offlineCacheGet(key){await offlineInit();return new Promise((res,rej)=>{const tx=offlineDb.transaction(OFFLINE_STORE,"readonly"),rq=tx.objectStore(OFFLINE_STORE).get(key);rq.onsuccess=()=>res(rq.result);rq.onerror=()=>rej(rq.error)})}
async function loadPendingOps(){await offlineInit();state.pendingOps=await new Promise((res,rej)=>{const tx=offlineDb.transaction(QUEUE_STORE,"readonly"),rq=tx.objectStore(QUEUE_STORE).getAll();rq.onsuccess=()=>res(rq.result||[]);rq.onerror=()=>rej(rq.error)});updateSyncUI()}
async function queueOfflineOp(op){await offlineInit();const item={...op,qid:crypto.randomUUID(),queued_at:new Date().toISOString(),user_id:state.user.id};await new Promise((res,rej)=>{const tx=offlineDb.transaction(QUEUE_STORE,"readwrite"),rq=tx.objectStore(QUEUE_STORE).put(item);rq.onsuccess=()=>res();rq.onerror=()=>rej(rq.error)});state.pendingOps.push(item);updateSyncUI();return item}
async function removeQueued(qid){await offlineInit();await new Promise((res,rej)=>{const tx=offlineDb.transaction(QUEUE_STORE,"readwrite"),rq=tx.objectStore(QUEUE_STORE).delete(qid);rq.onsuccess=()=>res();rq.onerror=()=>rej(rq.error)});state.pendingOps=state.pendingOps.filter(x=>x.qid!==qid);updateSyncUI()}
function mergePendingIntoState(){for(const q of state.pendingOps.filter(x=>x.user_id===state.user.id)){if(q.op==="insert"&&!state.transactions.some(t=>t.client_id===q.client_id)){state.transactions.unshift({...q.row,id:`local:${q.client_id}`,_pending:true})}else if(q.op==="update"){const i=state.transactions.findIndex(t=>t.id===q.server_id);if(i>=0)state.transactions[i]={...state.transactions[i],...q.row,_pending:true}}else if(q.op==="delete")state.transactions=state.transactions.filter(t=>t.id!==q.server_id)}sortStateTransactions()}
function addPendingTransaction(row){state.transactions.unshift({...row,id:`local:${row.client_id}`,_pending:true,created_at:new Date().toISOString()});sortStateTransactions()}
function applyOfflineUpdate(id,row){const i=state.transactions.findIndex(x=>x.id===id);if(i>=0)state.transactions[i]={...state.transactions[i],...row,_pending:true};sortStateTransactions()}
function sortStateTransactions(){state.transactions.sort((a,b)=>`${b.transaction_date} ${b.transaction_time||""}`.localeCompare(`${a.transaction_date} ${a.transaction_time||""}`))}
function isNetworkLikeError(e){const s=String(e?.message||e||"").toLowerCase();return !navigator.onLine||s.includes("fetch")||s.includes("network")||s.includes("failed")}
async function syncPending(){
  if(!state.offlineEnabled||!navigator.onLine||state.syncBusy||!state.user)return;
  state.syncBusy=true;
  state.lastSyncError=null;
  updateSyncUI();

  try{
    await loadPendingOps();
    const mine=state.pendingOps.filter(x=>x.user_id===state.user.id).sort((a,b)=>a.queued_at.localeCompare(b.queued_at));

    for(const q of mine){
      let ok=false;
      let errMsg=null;
      try{
        if(q.op==="insert"){
          const check=await db.from("transactions").select("id,client_id").eq("client_id",q.client_id).maybeSingle();
          if(check.error && check.error.code!=="PGRST116") throw check.error;
          if(check.data){
            ok=true;
          }else{
            const ins=await db.from("transactions").insert(q.row).select("id,client_id").single();
            if(!ins.error){
              ok=true;
            }else if(ins.error.code==="23505"){
              const verify=await db.from("transactions").select("id").eq("client_id",q.client_id).maybeSingle();
              if(verify.data) ok=true; else errMsg=ins.error.message;
            }else{
              errMsg=ins.error.message;
            }
          }
        }else if(q.op==="update"){
          const r=await db.from("transactions").update(q.row).eq("id",q.server_id);
          if(r.error) errMsg=r.error.message; else ok=true;
        }else if(q.op==="delete"){
          const r=await db.from("transactions").update({deleted_at:new Date().toISOString()}).eq("id",q.server_id);
          if(r.error) errMsg=r.error.message; else ok=true;
        }
      }catch(e){
        errMsg=String(e?.message||e);
      }

      if(!ok){
        state.lastSyncError=errMsg||"Unknown sync error";
        console.error("Our Money sync failed; local queue retained:",q,state.lastSyncError);
        break;
      }

      await removeQueued(q.qid);
    }

    await loadTx();
    renderAll();
    if(!state.lastSyncError && pendingForUser()===0) toast("All pending records synced");
    else if(state.lastSyncError) toast("Sync failed: "+state.lastSyncError);
  }catch(e){
    state.lastSyncError=String(e?.message||e);
    console.error("syncPending fatal",e);
    toast("Sync failed: "+state.lastSyncError);
  }finally{
    state.syncBusy=false;
    updateSyncUI();
  }
}
function pendingForUser(){return state.pendingOps.filter(x=>!state.user||x.user_id===state.user.id).length}
function updateSyncUI(){const n=pendingForUser(),online=navigator.onLine,btn=$("#syncStatusBtn"),txt=$("#syncStatusText");if(!btn)return;btn.classList.remove("offline","pending","failed");if(state.lastSyncError){btn.classList.add("failed");txt.textContent=`Sync Failed (${n})`;btn.title=String(state.lastSyncError).toLowerCase().includes("client_id")?"Run supabase-offline-safe-patch.sql in Supabase SQL Editor":state.lastSyncError}else if(!online){btn.classList.add("offline");txt.textContent=n?`Offline • ${n} Pending`:"Offline"}else if(n||state.syncBusy){btn.classList.add("pending");txt.textContent=state.syncBusy?"Syncing…":`${n} Pending`}else txt.textContent="Synced";if($("#pendingSyncCount"))$("#pendingSyncCount").textContent=String(n);if($("#connectionStatus"))$("#connectionStatus").textContent=online?"Online":"Offline";if($("#offlineModeToggle"))$("#offlineModeToggle").checked=state.offlineEnabled;if($("#offlineModeBadge"))$("#offlineModeBadge").textContent=state.offlineEnabled?"ON":"OFF";
  if($("#syncNowBtn")){$("#syncNowBtn").disabled=!!state.syncBusy;$("#syncNowBtn").textContent=state.syncBusy?"Syncing…":"Sync Now";}
}
async function setOfflineMode(enabled){await loadPendingOps();if(!enabled&&pendingForUser()>0){$("#offlineModeToggle").checked=true;return toast("Sync pending records before turning Offline Mode off")};state.offlineEnabled=enabled;localStorage.setItem("ourMoneyOfflineMode",enabled?"on":"off");if(enabled)await registerOfflineWorker();else await unregisterOfflineWorker();updateSyncUI();toast(enabled?"Offline Mode enabled":"Online-only mode enabled")}
async function registerOfflineWorker(){if(!("serviceWorker" in navigator)||!state.offlineEnabled)return;try{await navigator.serviceWorker.register("./service-worker.js")}catch(e){console.warn("Service worker",e)}}
async function unregisterOfflineWorker(){if(!("serviceWorker" in navigator))return;for(const r of await navigator.serviceWorker.getRegistrations())if(r.active?.scriptURL.includes("service-worker.js")||r.installing?.scriptURL.includes("service-worker.js"))await r.unregister()}
window.addEventListener("online",()=>{updateSyncUI();if(state.offlineEnabled)syncPending()});window.addEventListener("offline",updateSyncUI);document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="visible"&&navigator.onLine&&state.offlineEnabled)syncPending()});

function bind(){
  $("#loginForm").addEventListener("submit",async e=>{e.preventDefault();const {data,error}=await db.auth.signInWithPassword({email:$("#loginEmail").value,password:$("#loginPassword").value});if(error)toast(error.message);else if(data.user)await enter(data.user)});
  const performSignOut=async()=>{
    const pending=(typeof pendingForUser==="function")?pendingForUser():0;
    if(pending>0){
      const ok=confirm(`${pending} transaction${pending===1?" is":"s are"} still pending sync. Sign out anyway? The pending record will remain safely on this device.`);
      if(!ok)return;
    }

    try{
      // Prefer a local-scope Supabase logout so mobile/offline logout does not wait on remote session revocation.
      await Promise.race([
        db.auth.signOut({scope:"local"}),
        new Promise((_,reject)=>setTimeout(()=>reject(new Error("logout timeout")),1800))
      ]);
    }catch(err){
      console.warn("Supabase local sign out fallback",err);
    }

    // Guaranteed local-session cleanup fallback.
    // IMPORTANT: does NOT clear Our Money IndexedDB, pending transactions, PSA, or app preferences.
    try{
      for(const key of Object.keys(localStorage)){
        if(/^sb-.*-auth-token$/.test(key)) localStorage.removeItem(key);
      }
      for(const key of Object.keys(sessionStorage)){
        if(/^sb-.*-auth-token$/.test(key)) sessionStorage.removeItem(key);
      }
    }catch(err){ console.warn("Local auth cleanup",err); }

    location.reload();
  };

  const desktopLogout=$("#logoutBtn");
  if(desktopLogout)desktopLogout.addEventListener("click",performSignOut);
  const mobileLogout=$("#mobileLogoutBtn");
  if(mobileLogout)mobileLogout.addEventListener("click",performSignOut);
  $$(".nav-item").forEach(b=>b.onclick=()=>go(b.dataset.page));$$("[data-page-jump]").forEach(b=>b.onclick=()=>go(b.dataset.pageJump));
  $("#headerLanguage").onchange=e=>changeLanguage(e.target.value);
  $("#monthPicker").onchange=e=>{state.selectedMonth=e.target.value;renderDashboard()};$("#quickAddBtn").onclick=()=>openEntry();$("#mobileAdd").onclick=()=>openEntry();$$(".quick-action").forEach(b=>b.onclick=()=>openEntry(b.dataset.kind));$$("[data-entry-type]").forEach(b=>b.onclick=()=>setEntryType(b.dataset.entryType));$("#expenseCategory").onchange=updateSubs;$("#entryCurrency").onchange=updateRate;$("#entryForm").onsubmit=submitEntry;$$("[data-close]").forEach(b=>b.onclick=()=>closeD(b.dataset.close));$("#addTargetBtn").onclick=()=>openD("targetDialog");$("#targetForm").onsubmit=submitTarget;
  $("#historySearch").oninput=renderHistory;$("#historyType").onchange=renderHistory;$("#historyCategory").onchange=renderHistory;
  $$(".clickable-card").forEach(b=>b.onclick=()=>openDrill(b.dataset.drill));$("#detailHistoryBtn").onclick=()=>{closeD("detailDialog");go("history");if(state.detailFilter==="income")$("#historyType").value="income";else if(state.detailFilter==="expense"||state.detailFilter==="family")$("#historyType").value="expense";else if(state.detailFilter==="saving")$("#historyType").value="saving";renderHistory()};
  $$("#reportPeriodSegment button").forEach(b=>b.onclick=()=>{state.reportPeriod=b.dataset.period;$$('#reportPeriodSegment button').forEach(x=>x.classList.toggle("active",x===b));$("#customRange").classList.toggle("hidden",state.reportPeriod!=="custom");renderReport()});
  $$("#reportTypeGrid button").forEach(b=>b.onclick=()=>{state.reportType=b.dataset.reportType;$$('#reportTypeGrid button').forEach(x=>x.classList.toggle("active",x===b));renderReport()});
  $("#reportCategory").onchange=()=>{updateReportSubs();renderReport()};["reportSubcategory","reportIncomeOwner","reportOwner","reportCurrency","reportFrom","reportTo"].forEach(id=>$("#"+id).onchange=renderReport);$("#downloadPdfBtn").onclick=pdfReport;
  $("#pinForm").onsubmit=async e=>{e.preventDefault();if(await sha256($("#pinInput").value)===state.settings.pin_hash){state.unlocked=true;$("#settingsLock").classList.add("hidden");$("#settingsContent").classList.remove("hidden");$("#pinInput").value=""}else toast("Wrong PIN")};
  $("#saveProfileBtn").onclick=saveProfile;$("#saveGeneralBtn").onclick=async()=>{state.settings.base_currency=$("#baseCurrency").value;const p=$("#newPin").value.trim();if(p){if(p.length<4)return toast("PIN must be at least 4 digits");state.settings.pin_hash=await sha256(p);$("#newPin").value=""}await saveSettings()};
  $("#addCurrencyBtn").onclick=async()=>{const c=$("#newCurrencyCode").value.trim().toUpperCase(),s=$("#newCurrencySymbol").value.trim()||c;if(!/^[A-Z]{3}$/.test(c))return toast("Use 3-letter currency code");if(!state.settings.currencies.some(x=>x.code===c))state.settings.currencies.push({code:c,symbol:s});$("#newCurrencyCode").value=$("#newCurrencySymbol").value="";await saveSettings()};
  $("#addCategoryBtn").onclick=async()=>{const v=$("#newCategory").value.trim();if(v&&!state.settings.categories.some(x=>x.name===v))state.settings.categories.push({name:v,subs:[]});$("#newCategory").value="";await saveSettings()};
  $("#addMethodBtn").onclick=async()=>{const v=$("#newMethod").value.trim();if(v&&!state.settings.payment_methods.includes(v))state.settings.payment_methods.push(v);$("#newMethod").value="";await saveSettings()};
  $("#addSavingAccountBtn").onclick=async()=>{const n=$("#newSavingAccount").value.trim(),c=$("#newSavingCurrency").value;if(n)state.settings.saving_accounts.push({name:n,currency:c});$("#newSavingAccount").value="";await saveSettings()};
  $("#addIncomeOwnerBtn").onclick=async()=>{const v=$("#newIncomeOwner").value.trim();if(v&&!state.settings.income_owners.includes(v))state.settings.income_owners.push(v);$("#newIncomeOwner").value="";await saveSettings()};
  $("#addIncomeSourceBtn").onclick=async()=>{const v=$("#newIncomeSource").value.trim();if(v&&!state.settings.income_sources.includes(v))state.settings.income_sources.push(v);$("#newIncomeSource").value="";await saveSettings()};
  $("#openPsaBtn").onclick=openPsa;
  $("#changePsaCodeBtn").onclick=openPsaCodeChange;
  $("#psaCodeForm").onsubmit=savePsaCode;
  $("#psaUnlockForm").onsubmit=unlockPsa;
  $("#psaEntryForm").onsubmit=savePsaEntry;
  $$("[data-psa-type]").forEach(b=>b.onclick=()=>{$$("#psaEntryForm [data-psa-type]").forEach(x=>x.classList.toggle("active",x===b));$("#psaType").value=b.dataset.psaType});
  $("#editTransactionBtn").onclick=editCurrentTransaction;
  $("#syncStatusBtn").onclick=()=>{if(navigator.onLine)syncPending();else toast(`${pendingForUser()} pending • will sync automatically when online`)};
  $("#syncNowBtn").onclick=async()=>{if(!navigator.onLine)return toast("No internet. Pending records are safe on this device.");await loadPendingOps();if(pendingForUser()===0)return toast("Nothing pending to sync");syncPending()};
  $("#offlineModeToggle").onchange=e=>setOfflineMode(e.target.checked);
  $("#exportBtn").onclick=exportJson;$("#showTrashBtn").onclick=showTrash;
}
boot();
