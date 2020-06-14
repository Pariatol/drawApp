const box = document.querySelector('.paintDiv');
const colorsChoice = document.querySelector('.differentColors');

const colorsList = ['red','blue','green','yellow','white','pink','purple','brown','gray','cyan']

let whatColor = "";
let nb = 0;
let draw = [];
let previouslySaved = [];

if(localStorage.getItem('drawSave')!==null){
    previouslySaved = localStorage.getItem('drawSave');
} else{
    console.log('nufin')
}

/* fill the paintdiv */
for(let i=0;i<1856;i++){
  
    let miniBox = document.createElement('div');
    miniBox.classList.add('miniBox');
    miniBox.id = nb;
    nb += 1;

    if(previouslySaved.length>0){
        JSON.parse(previouslySaved).map(item=>{
            if(item.id === miniBox.id){
                miniBox.style.backgroundColor = item.color;
            }
        });
    }


    box.appendChild(miniBox);

    
    miniBox.addEventListener('click',()=>{
        miniBox.style.backgroundColor = whatColor;
        draw.push({
            id:miniBox.id,
            color:whatColor
        });
        console.log(draw);
    })

    miniBox.addEventListener('contextmenu',(e)=>{
        e.preventDefault();
        miniBox.style.backgroundColor = "black";

        // remove item from draw array
        draw = draw.filter(item=>{
            if(item.id !== miniBox.id){
                return item;
            }
        })
    })
    
  }

/* create color panel */
for(let i=0;i<colorsList.length;i++){
    let colorItem = document.createElement('div');
    colorItem.classList.add('colorItem');
    colorItem.style.backgroundColor = colorsList[i];
    colorsChoice.appendChild(colorItem);

    colorItem.addEventListener('click',(e)=>{
        whatColor = e.target.style.backgroundColor;
        document.querySelectorAll('.miniBox').forEach(item=>{
            item.addEventListener('mouseover',()=>{
                item.style.border = `1px solid ${whatColor}`;
            });
        })

        document.querySelectorAll('.miniBox').forEach(item=>{
            item.addEventListener('mouseout',()=>{
                item.style.border = `1px solid transparent`;
            });
        })
    })
}

/* custom color */
document.getElementById('customColor').addEventListener('change',(e)=>{
    whatColor = e.target.value;

    document.querySelectorAll('.miniBox').forEach(item=>{
        item.addEventListener('mouseover',()=>{
            item.style.border = `1px solid ${whatColor}`;
        });
    })

    document.querySelectorAll('.miniBox').forEach(item=>{
        item.addEventListener('mouseout',()=>{
            item.style.border = `1px solid transparent`;
        });
    })
})

/* controls */
document.querySelector('.fa-question-circle').addEventListener('click',()=>{
    document.querySelector('.help').classList.toggle('displayFlex');
});

document.querySelector('.fa-times-circle').addEventListener('click',()=>{
    document.querySelector('.help').classList.toggle('displayFlex');
});

/* remove all pixels */
document.body.addEventListener('keydown',(e)=>{
    if(e.keyCode===82){
        document.querySelectorAll('.miniBox').forEach(item=>{
            item.style.backgroundColor = 'black';
            draw = [];
        })
    }
})

document.querySelector('.fa-save').addEventListener('click',()=>{
    localStorage.setItem('drawSave', JSON.stringify(draw));
    document.querySelector('.saved').classList.toggle('displayFlex');
    setTimeout(()=>{
        document.querySelector('.saved').classList.toggle('displayFlex');
    },1500);
})