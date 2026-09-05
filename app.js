const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY } = window.APP_CONFIG || {};
const configured = SUPABASE_URL && !SUPABASE_URL.includes("YOUR_") && SUPABASE_PUBLISHABLE_KEY && !SUPABASE_PUBLISHABLE_KEY.includes("YOUR_");
const db = configured ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

const DEFAULT_SETTINGS = {
  base_currency:"AED",
  pin_hash:"",
  currencies:[{code:"AED",symbol:"AED"},{code:"BDT",symbol:"৳"}],
  expense_categories:["Family Support","Rent","Grocery / Bazar","Tabby","Debt Repayment","Fuel","Market","Online Order","Bills","Eating Out","Personal","Other"],
  income_sources:["Salary","Overtime","Bonus","Refund","Other"],
  payment_methods:["Bank","Cash","Card","Bank Transfer","Tabby"],
  saving_accounts:[{name:"Future Savings",currency:"AED"},{name:"Bangladesh Savings",currency:"BDT"}]
};

let state = { user:null, settings:structuredClone(DEFAULT_SETTINGS), transactions:[], targets:[], selectedMonth:new Date().toISOString().slice(0,7), unlocked:false };

const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const money = (value,currency=state.settings.base_currency) => `${currency} ${Number(value||0).toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:2})}`;
const localDate = () => new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().slice(0,10);
const sha256 = async txt => Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(txt)))).map(b=>b.toString(16).padStart(2,"0")).join("");

function toast(msg){ const el=$("#toast"); el.textContent=msg; el.classList.add("show"); setTimeout(()=>el.classList.remove("show"),2200); }
function openDialog(id){ $("#"+id).showModal(); }
function closeDialog(id){ $("#"+id).close(); }

async function boot(){
  initMonthPicker();
  bindEvents();
  if(!configured){
    $("#loginForm").addEventListener("submit",e=>{e.preventDefault();toast("Add your Supabase URL and publishable key in config.js first.");});
    return;
  }
  const {data:{session}}=await db.auth.getSession();
  if(session){ await enterApp(session.user); }
  db.auth.onAuthStateChange(async(_e,session)=>{ if(session && !state.user) await enterApp(session.user); });
}

async function enterApp(user){
  state.user=user; $("#loginView").classList.add("hidden"); $("#app").classList.remove("hidden");
  await ensureSettings();
  await Promise.all([loadTransactions(),loadTargets()]);
  populateDynamicOptions(); renderAll();
}

async function ensureSettings(){
  const {data,error}=await db.from("app_settings").select("settings").eq("id",1).maybeSingle();
  if(error) throw error;
  if(data?.settings) state.settings={...DEFAULT_SETTINGS,...data.settings};
  else{
    const pinHash=await sha256("9988");
    state.settings={...structuredClone(DEFAULT_SETTINGS),pin_hash:pinHash};
    const {error:e}=await db.from("app_settings").upsert({id:1,settings:state.settings,updated_by:state.user.id});
    if(e) throw e;
  }
}

async function saveSettings(){
  const {error}=await db.from("app_settings").upsert({id:1,settings:state.settings,updated_by:state.user.id,updated_at:new Date().toISOString()});
  if(error) throw error;
  populateDynamicOptions();renderSettings();toast("Settings saved");
}

async function loadTransactions(){
  const {data,error}=await db.from("transactions").select("*").is("deleted_at",null).order("transaction_date",{ascending:false}).order("created_at",{ascending:false});
  if(error) throw error; state.transactions=data||[];
}
async function loadTargets(){
  const {data,error}=await db.from("targets").select("*").is("deleted_at",null).order("created_at",{ascending:false});
  if(error) throw error; state.targets=data||[];
}

function initMonthPicker(){
  const sel=$("#monthPicker"), now=new Date();
  for(let i=-24;i<=12;i++){
    const d=new Date(now.getFullYear(),now.getMonth()+i,1),v=d.toISOString().slice(0,7);
    const o=document.createElement("option");o.value=v;o.textContent=d.toLocaleDateString(undefined,{month:"short",year:"numeric"});if(v===state.selectedMonth)o.selected=true;sel.append(o);
  }
}

function inMonth(t){ return String(t.transaction_date).slice(0,7)===state.selectedMonth; }
function baseValue(t){ return Number(t.amount||0)*Number(t.exchange_rate||1); }
function monthTx(){ return state.transactions.filter(inMonth); }

function renderAll(){ renderDashboard();renderHistory();renderTargets();renderSettings(); }
function renderDashboard(){
  const tx=monthTx(), income=tx.filter(x=>x.type==="income").reduce((s,x)=>s+baseValue(x),0);
  const expense=tx.filter(x=>x.type==="expense").reduce((s,x)=>s+baseValue(x),0);
  const saved=tx.filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0);
  const allIncome=state.transactions.filter(x=>x.type==="income").reduce((s,x)=>s+baseValue(x),0);
  const allExpense=state.transactions.filter(x=>x.type==="expense").reduce((s,x)=>s+baseValue(x),0);
  const allSaved=state.transactions.filter(x=>x.type==="saving").reduce((s,x)=>s+baseValue(x),0);
  const family=tx.filter(x=>x.type==="expense"&&x.category==="Family Support");
  const mehedi=family.filter(x=>x.family_group==="Mehedi Family").reduce((s,x)=>s+baseValue(x),0);
  const mou=family.filter(x=>x.family_group==="Mou Family").reduce((s,x)=>s+baseValue(x),0);
  $("#incomeTotal").textContent=money(income);$("#expenseTotal").textContent=money(expense);$("#savedThisMonth").textContent=money(saved);
  $("#familyTotal").textContent=money(mehedi+mou);$("#familySplit").textContent=`Mehedi ${money(mehedi)} • Mou ${money(mou)}`;
  $("#availableBalance").textContent=money(allIncome-allExpense-allSaved);
  $("#totalSavings").textContent=money(allSaved);
  const d=new Date(state.selectedMonth+"-01T00:00:00");$("#monthLabel").textContent=d.toLocaleDateString(undefined,{month:"long",year:"numeric"});
  renderCategoryBars(tx); renderRecent(); renderTargetPreview();
}
function renderCategoryBars(tx){
  const exp=tx.filter(x=>x.type==="expense"), map={}; exp.forEach(x=>map[x.category]=(map[x.category]||0)+baseValue(x));
  const rows=Object.entries(map).sort((a,b)=>b[1]-a[1]);$("#expenseCount").textContent=`${exp.length} entries`;
  if(!rows.length){$("#categoryBars").innerHTML="No expenses yet.";return}
  const max=rows[0][1];$("#categoryBars").innerHTML=rows.slice(0,7).map(([k,v])=>`<div class="bar-row"><span>${escapeHtml(k)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(4,v/max*100)}%"></div></div><strong>${money(v)}</strong></div>`).join("");
}
function txIcon(type){return type==="income"?"＋":type==="expense"?"−":"↗"}
function renderRecent(){
  const list=state.transactions.slice(0,7);$("#recentList").innerHTML=list.length?list.map(txHtml).join(""):"No transactions yet."; bindTxButtons();
}
function txHtml(t){
  let sub=t.category||t.source||t.saving_account||"Record";
  if(t.family_group)sub+=` • ${t.family_group}`;
  const sign=t.type==="income"?"+":t.type==="expense"?"−":"→";
  return `<div class="tx"><div class="tx-icon">${txIcon(t.type)}</div><div class="tx-main"><strong>${escapeHtml(sub)}</strong><small>${t.transaction_date} • ${escapeHtml(t.owner||"Shared")}${t.note?` • ${escapeHtml(t.note)}`:""}</small></div><div class="tx-amount ${t.type}">${sign} ${money(t.amount,t.currency)}</div><button class="icon-btn tx-delete" data-id="${t.id}" title="Move to trash">⋯</button></div>`;
}
function renderHistory(){
  const q=$("#historySearch").value.toLowerCase(), type=$("#historyType").value, cat=$("#historyCategory").value;
  let arr=state.transactions.filter(t=>(type==="all"||t.type===type)&&(cat==="all"||t.category===cat));
  if(q)arr=arr.filter(t=>JSON.stringify(t).toLowerCase().includes(q));
  $("#historyList").innerHTML=arr.length?arr.map(txHtml).join(""):'<div class="empty-state">No matching records.</div>';bindTxButtons();
}
function bindTxButtons(){ $$(".tx-delete").forEach(b=>b.onclick=async()=>{if(!confirm("Move this record to Trash?"))return;await softDeleteTransaction(b.dataset.id);});}
async function softDeleteTransaction(id){
  const {error}=await db.from("transactions").update({deleted_at:new Date().toISOString()}).eq("id",id);if(error)return toast(error.message);
  await loadTransactions();renderAll();toast("Moved to Trash");
}
function renderTargetPreview(){const arr=state.targets.slice(0,3);$("#targetPreview").innerHTML=arr.length?arr.map(targetHtml).join(""):"No targets yet."}
function targetSaved(t){return state.transactions.filter(x=>x.type==="saving"&&x.target_id===t.id).reduce((s,x)=>s+Number(x.amount||0),0)}
function targetHtml(t){
  const saved=targetSaved(t),pct=t.target_amount?Math.min(100,saved/Number(t.target_amount)*100):0;
  return `<div class="target-card"><div class="target-top"><strong>${escapeHtml(t.name)}</strong><span>${Math.round(pct)}%</span></div><div class="progress"><span style="width:${pct}%"></span></div><div class="target-meta"><span>${money(saved,t.currency)} saved</span><span>${money(t.target_amount,t.currency)} target</span></div></div>`;
}
function renderTargets(){ $("#targetsGrid").innerHTML=state.targets.length?state.targets.map(targetHtml).join(""):'<div class="empty-state">No targets. Create your first future plan.</div>'; }
function renderSettings(){
  const c=state.settings.currencies;
  fillSelect($("#baseCurrency"),c.map(x=>x.code),state.settings.base_currency);
  $("#currencyManager").innerHTML=c.map((x,i)=>chip(`${x.code} ${x.symbol}`,`currency`,i)).join("");
  $("#categoryManager").innerHTML=state.settings.expense_categories.map((x,i)=>chip(x,"category",i)).join("");
  $("#methodManager").innerHTML=state.settings.payment_methods.map((x,i)=>chip(x,"method",i)).join("");
  $("#savingAccountManager").innerHTML=state.settings.saving_accounts.map((x,i)=>chip(`${x.name} • ${x.currency}`,"saving",i)).join("");
  bindManagerDeletes();
}
function chip(label,type,i){return `<span class="manager-chip">${escapeHtml(label)}<button data-manager="${type}" data-index="${i}">×</button></span>`}
function bindManagerDeletes(){ $$("[data-manager]").forEach(b=>b.onclick=async()=>{const type=b.dataset.manager,i=+b.dataset.index;if(!confirm("Remove this option? Existing history will remain unchanged."))return;
  if(type==="currency"&&state.settings.currencies.length<=1)return toast("Keep at least one currency");
  const map={currency:"currencies",category:"expense_categories",method:"payment_methods",saving:"saving_accounts"};state.settings[map[type]].splice(i,1);await saveSettings();
});}
function fillSelect(el,items,selected){
  const current=selected??el.value;el.innerHTML=items.map(x=>{const val=typeof x==="string"?x:x.value,label=typeof x==="string"?x:x.label;return `<option value="${escapeAttr(val)}">${escapeHtml(label)}</option>`}).join("");if([...el.options].some(o=>o.value===current))el.value=current;
}
function populateDynamicOptions(){
  const codes=state.settings.currencies.map(x=>x.code);
  [$("#entryCurrency"),$("#targetCurrency"),$("#newSavingCurrency")].forEach(e=>fillSelect(e,codes,state.settings.base_currency));
  fillSelect($("#expenseCategory"),state.settings.expense_categories);
  fillSelect($("#incomeSource"),state.settings.income_sources);
  fillSelect($("#entryMethod"),state.settings.payment_methods);
  fillSelect($("#savingAccount"),state.settings.saving_accounts.map(x=>({value:x.name,label:`${x.name} (${x.currency})`})));
  fillSelect($("#savingTarget"),[{value:"",label:"No target"},...state.targets.map(x=>({value:x.id,label:x.name}))]);
  fillSelect($("#historyCategory"),[{value:"all",label:"All categories"},...state.settings.expense_categories.map(x=>({value:x,label:x}))],"all");
  renderSettings();
}
function setEntryType(type){
  $("#entryType").value=type;$$("[data-entry-type]").forEach(b=>b.classList.toggle("active",b.dataset.entryType===type));
  $("#incomeFields").classList.toggle("hidden",type!=="income");$("#expenseFields").classList.toggle("hidden",type!=="expense");$("#savingFields").classList.toggle("hidden",type!=="saving");
  $("#entryTitle").textContent=type==="income"?"Add Income":type==="expense"?"Add Expense":"Add Savings";
  updateFamilyField();
}
function openEntry(type="expense"){setEntryType(type);$("#entryDate").value=localDate();$("#entryAmount").value="";$("#entryNote").value="";$("#entryCurrency").value=state.settings.base_currency;$("#entryRate").value=1;updateRateField();openDialog("entryDialog")}
function updateFamilyField(){ $("#familyGroupWrap").classList.toggle("hidden",!($("#entryType").value==="expense"&&$("#expenseCategory").value==="Family Support")); }
function updateRateField(){ $("#rateWrap").classList.toggle("hidden",$("#entryCurrency").value===state.settings.base_currency); if($("#entryCurrency").value===state.settings.base_currency)$("#entryRate").value=1; }

async function submitEntry(e){
  e.preventDefault();
  const type=$("#entryType").value, amount=Number($("#entryAmount").value),currency=$("#entryCurrency").value,rate=currency===state.settings.base_currency?1:Number($("#entryRate").value||0);
  if(!amount||amount<=0)return toast("Enter an amount");if(rate<=0)return toast("Enter the conversion rate");
  const row={type,amount,currency,exchange_rate:rate,transaction_date:$("#entryDate").value,owner:$("#entryOwner").value,payment_method:$("#entryMethod").value,note:$("#entryNote").value.trim()||null,created_by:state.user.id};
  if(type==="income")row.source=$("#incomeSource").value;
  if(type==="expense"){row.category=$("#expenseCategory").value;if(row.category==="Family Support")row.family_group=$("#familyGroup").value;}
  if(type==="saving"){row.saving_account=$("#savingAccount").value;row.target_id=$("#savingTarget").value||null;}
  const {error}=await db.from("transactions").insert(row);if(error)return toast(error.message);
  closeDialog("entryDialog");await Promise.all([loadTransactions(),loadTargets()]);renderAll();toast("Saved");
}
async function submitTarget(e){
  e.preventDefault();const row={name:$("#targetName").value.trim(),target_amount:Number($("#targetAmount").value),currency:$("#targetCurrency").value,target_date:$("#targetDate").value||null,created_by:state.user.id};
  const {error}=await db.from("targets").insert(row);if(error)return toast(error.message);closeDialog("targetDialog");e.target.reset();await loadTargets();populateDynamicOptions();renderAll();toast("Target created");
}
async function showTrash(){
  const {data,error}=await db.from("transactions").select("*").not("deleted_at","is",null).order("deleted_at",{ascending:false});if(error)return toast(error.message);
  $("#trashList").innerHTML=(data||[]).length?(data||[]).map(t=>`<div class="tx"><div class="tx-icon">${txIcon(t.type)}</div><div class="tx-main"><strong>${escapeHtml(t.category||t.source||t.saving_account||"Record")}</strong><small>${t.transaction_date}</small></div><div class="tx-amount ${t.type}">${money(t.amount,t.currency)}</div><button class="btn restore-btn" data-id="${t.id}">Restore</button></div>`).join(""):'<div class="empty-state">Trash is empty.</div>';
  $$(".restore-btn").forEach(b=>b.onclick=async()=>{await db.from("transactions").update({deleted_at:null}).eq("id",b.dataset.id);await loadTransactions();renderAll();showTrash();toast("Restored");});openDialog("trashDialog");
}
async function exportJson(){
  const {data:trash}=await db.from("transactions").select("*").not("deleted_at","is",null);downloadBlob(`our-finance-backup-${localDate()}.json`,JSON.stringify({exported_at:new Date().toISOString(),settings:state.settings,transactions:[...state.transactions,...(trash||[])],targets:state.targets},null,2),"application/json");
}
function exportCsv(){
  const cols=["transaction_date","type","amount","currency","exchange_rate","source","category","family_group","saving_account","payment_method","owner","note","created_at"];
  const q=v=>`"${String(v??"").replaceAll('"','""')}"`;const csv=[cols.join(","),...state.transactions.map(r=>cols.map(c=>q(r[c])).join(","))].join("\n");downloadBlob(`our-finance-${localDate()}.csv`,csv,"text/csv");
}
function downloadBlob(name,text,type){const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
function escapeHtml(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function escapeAttr(v){return escapeHtml(v)}

function goPage(page){
  $$(".page").forEach(p=>p.classList.remove("active"));$("#"+page+"Page").classList.add("active");$$(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  $("#pageTitle").textContent={home:"Dashboard",history:"History",targets:"Savings Targets",settings:"Settings"}[page];
  if(page==="settings"&&!state.unlocked){$("#settingsLock").classList.remove("hidden");$("#settingsContent").classList.add("hidden");}
}

function bindEvents(){
  $("#loginForm").addEventListener("submit",async e=>{e.preventDefault();if(!db)return;const {data,error}=await db.auth.signInWithPassword({email:$("#loginEmail").value,password:$("#loginPassword").value});if(error)toast(error.message);else if(data.user)await enterApp(data.user);});
  $("#logoutBtn").onclick=async()=>{await db.auth.signOut();location.reload()};
  $$(".nav-item").forEach(b=>b.onclick=()=>goPage(b.dataset.page));
  $$("[data-page-jump]").forEach(b=>b.onclick=()=>goPage(b.dataset.pageJump));
  $("#monthPicker").onchange=e=>{state.selectedMonth=e.target.value;renderDashboard()};
  $("#quickAddBtn").onclick=()=>openEntry("expense");$("#mobileAdd").onclick=()=>openEntry("expense");$$(".quick-action").forEach(b=>b.onclick=()=>openEntry(b.dataset.kind));
  $$("[data-entry-type]").forEach(b=>b.onclick=()=>setEntryType(b.dataset.entryType));$("#expenseCategory").onchange=updateFamilyField;$("#entryCurrency").onchange=updateRateField;$("#entryForm").addEventListener("submit",submitEntry);
  $$("[data-close]").forEach(b=>b.onclick=()=>closeDialog(b.dataset.close));
  $("#addTargetBtn").onclick=()=>openDialog("targetDialog");$("#targetForm").addEventListener("submit",submitTarget);
  $("#historySearch").oninput=renderHistory;$("#historyType").onchange=renderHistory;$("#historyCategory").onchange=renderHistory;
  $("#pinForm").onsubmit=async e=>{e.preventDefault();const h=await sha256($("#pinInput").value);if(h===state.settings.pin_hash){state.unlocked=true;$("#settingsLock").classList.add("hidden");$("#settingsContent").classList.remove("hidden");$("#pinInput").value="";}else toast("Wrong PIN");};
  $("#saveGeneralBtn").onclick=async()=>{state.settings.base_currency=$("#baseCurrency").value;const p=$("#newPin").value.trim();if(p){if(p.length<4)return toast("PIN must be at least 4 digits");state.settings.pin_hash=await sha256(p);$("#newPin").value="";}await saveSettings();renderAll();};
  $("#addCurrencyBtn").onclick=async()=>{const code=$("#newCurrencyCode").value.trim().toUpperCase(),symbol=$("#newCurrencySymbol").value.trim()||code;if(!/^[A-Z]{3}$/.test(code))return toast("Use a 3-letter currency code");if(state.settings.currencies.some(x=>x.code===code))return toast("Currency already exists");state.settings.currencies.push({code,symbol});$("#newCurrencyCode").value=$("#newCurrencySymbol").value="";await saveSettings();};
  $("#addCategoryBtn").onclick=async()=>{const v=$("#newCategory").value.trim();if(!v)return;if(state.settings.expense_categories.includes(v))return toast("Already exists");state.settings.expense_categories.push(v);$("#newCategory").value="";await saveSettings();};
  $("#addMethodBtn").onclick=async()=>{const v=$("#newMethod").value.trim();if(!v)return;if(state.settings.payment_methods.includes(v))return toast("Already exists");state.settings.payment_methods.push(v);$("#newMethod").value="";await saveSettings();};
  $("#addSavingAccountBtn").onclick=async()=>{const name=$("#newSavingAccount").value.trim(),currency=$("#newSavingCurrency").value;if(!name)return;state.settings.saving_accounts.push({name,currency});$("#newSavingAccount").value="";await saveSettings();};
  $("#exportBtn").onclick=exportJson;$("#exportCsvBtn").onclick=exportCsv;$("#showTrashBtn").onclick=showTrash;
}
boot();
