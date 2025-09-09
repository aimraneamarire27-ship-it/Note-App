const color = document.getElementById('color');
const addNoteBtn = document.querySelector('.add-note');
const listEl = document.querySelector('.list');


document.addEventListener('click',(e)=>{
  if(e.target.classList.contains('close')){
    e.target.parentNode.remove()
  }
})

addNoteBtn.addEventListener('click',()=>{
 let targetColor = color.value;
 let noteHTML = `
  <div class="note">
    <textarea style='  border-top:30px solid ${targetColor} ;' placeholder="Write Content ..." name="note" id="note-text"></textarea>
    <span class="material-symbols-outlined close">close</span>
  </div>
  `
  listEl.innerHTML += noteHTML;
})

let cursor = {
  x:null,
  y:null
}

let elementData = {
  dom:null,
  x:null,
  y:null
}
let lastZIndex = 1;
document.addEventListener('mousedown',(e)=>{
  if(e.target.parentNode.classList.contains('note')){
    elementData = {
      dom : e.target.parentNode,
      x : e.target.getBoundingClientRect().left,
      y : e.target.getBoundingClientRect().top
    }
    cursor = {
      x : e.clientX,
      y : e.clientY
    }
    elementData.dom.style.zIndex = `${lastZIndex}`;
    lastZIndex++
    console.log(lastZIndex);
    
 }
})
document.addEventListener('mousemove',(e)=>{
  if(elementData.dom == null) return;
  let newCursor = {
    x : e.clientX,
    y : e.clientY 
  }
  let distance = {
    x : newCursor.x - cursor.x,
    y : newCursor.y - cursor.y
  }
  
  elementData.dom.style.top = (distance.y + elementData.y) + 'px';
  elementData.dom.style.left = (distance.x + elementData.x) + 'px';

});

document.addEventListener('mouseup' , ()=>{
  elementData.dom = null
})