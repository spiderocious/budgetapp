   export function toast(e){
   		document.getElementById("toast").style.display="block";
   		document.getElementById("toastext").innerHTML=e;
   				document.getElementById("toast").style.opacity=1;
   		window.setTimeout(()=>{
   			document.getElementById("toast").style.opacity=0;
   			document.getElementById("toast").style.display="none";
   		},20000)
   }
   export function say(e){

         document.getElementById("loader").style.display="block";

   }
export function closemodal(){
    document.getElementById("loader").style.display="none";
}