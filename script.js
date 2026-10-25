(() => {
  const PASS_DIGITS = "0308151205";
  const screens = [...document.querySelectorAll(".screen")];
  const codeValue = document.getElementById("code-value");
  const errorMessage = document.getElementById("error-message");
  const toast = document.getElementById("toast");
  const flowerTransition = document.getElementById("flower-transition");
  let entered = "", toastTimer, flowerTimer, wishMade = false;
  function updateCode(){const shown=entered.split("");while(shown.length<10)shown.push("·");codeValue.textContent=shown.slice(0,10).join(" ");errorMessage.textContent="";}
  function showToast(message){toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2400);}
  function showScreen(id){screens.forEach(s=>s.classList.toggle("active",s.id===id));window.scrollTo({top:0,behavior:"smooth"});}
  function transitionTo(id){const active=document.querySelector(".screen.active");if(active && active.id==="welcome" && id==="letter"){flowerTransition.classList.remove("show");void flowerTransition.offsetWidth;flowerTransition.classList.add("show");clearTimeout(flowerTimer);flowerTimer=setTimeout(()=>{showScreen(id);flowerTransition.classList.remove("show");},650);}else showScreen(id);}
  document.querySelectorAll(".key").forEach(button=>button.addEventListener("click",()=>{const key=button.dataset.key;if(key==="clear")entered="";else if(key==="back")entered=entered.slice(0,-1);else if(entered.length<10)entered+=key;updateCode();}));
  function unlock(){if(entered===PASS_DIGITS){showScreen("welcome");showToast("A little surprise, just for you ♡");}else{errorMessage.textContent="Not quite… remember the little clue. Try again ♡";codeValue.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:260});}}
  document.getElementById("unlock-button").addEventListener("click",unlock);
  document.addEventListener("keydown",e=>{if(!document.getElementById("gate").classList.contains("active"))return;if(/^\d$/.test(e.key)&&entered.length<10){entered+=e.key;updateCode();}if(e.key==="Backspace"){entered=entered.slice(0,-1);updateCode();}if(e.key==="Enter")unlock();});
  document.querySelectorAll(".next-screen").forEach(button=>button.addEventListener("click",()=>transitionTo(button.dataset.next)));
  document.querySelectorAll("[data-back]").forEach(button=>button.addEventListener("click",()=>showScreen(button.dataset.back)));
  const dialog=document.getElementById("love-note-dialog"), openNote=document.getElementById("open-love-note"), closeNote=document.getElementById("close-love-note");
  openNote.addEventListener("click",()=>{dialog.hidden=false;closeNote.focus();});
  function hideNote(){dialog.hidden=true;openNote.focus();}closeNote.addEventListener("click",hideNote);dialog.addEventListener("click",e=>{if(e.target===dialog)hideNote();});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!dialog.hidden)hideNote();});
  document.getElementById("wish-button").addEventListener("click",()=>{if(wishMade)return;wishMade=true;const wish=document.getElementById("wish-message");wish.textContent="May this year bring you peace in your heart, laughter in your days, courage for your dreams, and love in all the places you need it. You deserve beautiful things, Quinter. ♡";const art=document.getElementById("wish-art");for(let i=0;i<22;i++){const spark=document.createElement("span");spark.textContent=["✦","✧","·","✳"][i%4];spark.style.cssText=`position:absolute;left:${10+Math.random()*80}%;top:${10+Math.random()*75}%;color:${i%2?"#b8785e":"#c5a46a"};font-size:${10+Math.random()*17}px;pointer-events:none;animation:float ${1.3+Math.random()*1.7}s ease-out forwards;`;art.appendChild(spark);setTimeout(()=>spark.remove(),3200);}document.getElementById("wish-button").innerHTML="Wish sent with love ♡";document.getElementById("finish-wish").hidden=false;showToast("A birthday wish, sent with love ✨");});
  document.getElementById("finish-wish").addEventListener("click",()=>showScreen("final"));
  document.getElementById("restart-button").addEventListener("click",()=>{entered="";wishMade=false;updateCode();document.getElementById("wish-message").textContent="";document.getElementById("wish-button").innerHTML="I've made my wish ✨ <span>✦</span>";document.getElementById("finish-wish").hidden=true;showScreen("gate");showToast("Back to the beginning ✳");});
  document.getElementById("read-letter-again").addEventListener("click",()=>showScreen("letter"));
  updateCode();
})();