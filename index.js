// Dom elements
const arrayEle = document.getElementById('slider_arr');
const delayEle = document.getElementById('slider_del');
const genBtn = document.querySelector('.generate');
const compareBtn = document.querySelector('.compare');
const container = document.querySelectorAll('.visualizer');


// array size
let n = parseInt(arrayEle.value);
// iteration time control variable
let delay = 510 - parseInt(delayEle.value);

let array = [];

//which algo to run
let algo_One = 'bub';
let algo_two = 'bub';

//is both sorted
let arr_one = false ;
let arr_two = false ;

//auto fill the array at start 
fill();

//helper functions
function disable(ele){
    arrayEle.disabled = true;
    genBtn.disabled = true;
    compareBtn.disabled = true;
}
function enable(ele){

    if(arr_one && arr_two){
    arrayEle.disabled = false;
    genBtn.disabled = false;
    compareBtn.disabled = false;
    }
    
}
function removeAllChildNodes(parent) {
    
    parent.innerHTML = '';

}
function fill(){
    
    container.forEach((ele)=>{

        array =[];
        removeAllChildNodes(ele);
    });

    for(let i=0 ; i<n ; i++){

        let number = parseInt(Math.random()*(200-5)+5);
        array.push(number);
    }

    container.forEach((ele)=>{

        array.forEach(number=>{
            let item = document.createElement('div');
    
            item.classList.add("bar");

            item.style.height = number+'px';

            ele.appendChild(item);

        })
    });

    arr_two = false;
    arr_one = false
}

function delayFunc(ms){

    return new Promise(resolve => {setTimeout(()=>resolve(''),ms)});

}

//compare function
function compareAlgo(){

    algo_One = document.querySelector('input[name="sortType"]:checked').value;
    algo_two = document.querySelector('input[name="sortType2"]:checked').value;

    switch(algo_One){
        case 'bub': runBubbleSort(0);
            break;
        case 'in': runInsertionSort(0);
            break;
        case 'sel': runSelectionSort(0);
            break;
        case 'qu': runQuickSort(0);
            break;
        case 'mer': runMergeSort(0);
            break;
        default:
            break;
    }
    switch(algo_two){
        case 'bub': runBubbleSort(1);
            break;
        case 'in': runInsertionSort(1);
            break;
        case 'sel': runSelectionSort(1);
            break;
        case 'qu': runQuickSort(1);
            break;
        case 'mer': runMergeSort(1);
            break;
        default:
            break;
    }

    
}
//sorting helper function
function swap(e1, e2,j){   
        
    let temp = e1.style.height;
    e1.style.height = e2.style.height;
    e2.style.height = temp;  
}

//sorting algos
async function bubbleSort(i){

    const ele = container[i].querySelectorAll(".bar");

    for(let i=0;i<n-1;i++){

        for(let j=0; j<n-i-1;j++){
        
            ele[j].style.background = "red";
            ele[j+1].style.background = "red";

            await delayFunc(delay);

            if(parseInt(ele[j].style.height) > parseInt(ele[j+1].style.height)){
                swap(ele[j],ele[j+1],j);
            }

            ele[j].style.background = 'rgb(200,255,250)';
            ele[j+1].style.background = 'rgb(200,255,250)';
        }

        ele[n-1-i].style.background = "green";
    }

    ele[0].style.background = "green";

    
}
async function insertionSort(i){
    const ele = container[i].querySelectorAll(".bar");

    for(i=0; i< n; i++){

        let j = i - 1;
        let key = ele[i].style.height;
        
        ele[i].style.background = 'red';

        await delayFunc(delay);

        while(j >= 0 && (parseInt(ele[j].style.height) > parseInt(key))){

            ele[j].style.background = 'red';
            ele[j + 1].style.height = ele[j].style.height;
            
            j--;
            
            await delayFunc(delay);

            for(let k = i; k >= 0; k--){
                ele[k].style.background = 'green';
            }
        }

        ele[j + 1].style.height = key;
        
    }

    
}
async function selectionSort(i){

    const ele = container[i].querySelectorAll(".bar");

    for(let i = 0; i < ele.length; i++){

        let min = i;

        ele[i].style.background = 'red';

        for(let j = i+1; j < ele.length; j++){

            ele[j].style.background = 'red';

            await delayFunc(delay);

            if(parseInt(ele[j].style.height) < parseInt(ele[min].style.height)){

                if(min !== i) ele[min].style.background = 'rgb(200,255,250)'; 

                min = j;

                ele[min].style.background = "blue";
            }
            else{ 
                ele[j].style.background = 'rgb(200,255,250)'; 
            }
        }

        await delayFunc(delay);

        swap(ele[min], ele[i]);

        ele[min].style.background = 'rgb(200,255,250)';
        
        ele[i].style.background = 'green';
    }

    
}
//merge sorting helper function
async function merge(ele, low, mid, high){
    
    const n1 = mid - low + 1;
    const n2 = high - mid;
    
    let left = new Array(n1);
    let right = new Array(n2);

    //left sort loop
    for(let i = 0; i < n1; i++){

        await delayFunc(delay);
        
        ele[low + i].style.background = 'orange';
        left[i] = ele[low + i].style.height;

    }
    //right sort loop
    for(let i = 0; i < n2; i++){
        await delayFunc(delay);
        
        ele[mid + 1 + i].style.background = 'yellow';
        right[i] = ele[mid + 1 + i].style.height;
    }

    await delayFunc(delay);
    let i = 0, j = 0, k = low;

    //merge loop
    while(i < n1 && j < n2){

        await delayFunc(delay);
        
        if(parseInt(left[i]) <= parseInt(right[j])){
            
            (n1 + n2) === ele.length ? ele[k].style.background = 'green' : ele[k].style.background = 'lightgreen' ;
            
            ele[k].style.height = left[i];

            i++;
            k++;

        }
        else{
            
            (n1 + n2) === ele.length ? ele[k].style.background = 'green' : ele[k].style.background = "lightgreen" ;

            ele[k].style.height = right[j];

            j++;
            k++;

        }
    }

    while(i < n1){

        await delayFunc(delay);
        
        (n1 + n2) === ele.length ? ele[k].style.background = 'green' : ele[k].style.background = 'lightgreen' ;

        ele[k].style.height = left[i];

        i++;
        k++;

    }

    while(j < n2){
        await delayFunc(delay);
        
        (n1 + n2) === ele.length ? ele[k].style.background = 'green' : ele[k].style.background = 'lightgreen';

        ele[k].style.height = right[j];

        j++;
        k++;
    }
}
async function mergeSort(ele,l,r){
    
    //checking if only one element return
    if(l >= r) return;

    const m = l + Math.floor((r - l) / 2);
    
    await mergeSort(ele, l, m);
    await mergeSort(ele, m + 1, r);
    await merge(ele, l, m, r);

    
}
//quick orting helper function
async function partitionLomuto(ele, l , r){
    
    let i = l - 1;
    
    ele[r].style.background = 'red';

    for(let j = l; j < r ; j++){
        
        ele[j].style.background = 'red';
       
        await delayFunc(delay);

        if(parseInt(ele[j].style.height) < parseInt(ele[r].style.height)){
            
            i++;

            swap(ele[i], ele[j]);
            
            ele[i].style.background = 'blue';

            if(i != j) ele[j].style.background = 'blue';
            
            await delayFunc(delay);

        }
        else{
            
            ele[j].style.background = 'yellow';

        }
    }

    i++; 
    
    await delayFunc(delay);

    swap(ele[i], ele[r]); 
    
    ele[r].style.background = 'yellow';
    ele[i].style.background = 'green';

    await delayFunc(delay);
    
    for(let k = 0; k < r + 1 ; k++){

        if(ele[k].style.background != 'green') ele[k].style.background = 'cyan';

    }

    return i;
}
async function quickSort(ele,l,r){

    if(l < r){

        let pivot_index = await partitionLomuto(ele, l, r);
        await quickSort(ele, l, pivot_index - 1);
        await quickSort(ele, pivot_index + 1, r);
    }

    
}


// array slider event listener
arrayEle.addEventListener('input',()=>{
    n = parseInt(arrayEle.value);
    fill();
})
//delay slider event listener
delayEle.addEventListener('input',()=>{
    delay = 510 - parseInt(delayEle.value);
})
// array generate button listener
genBtn.addEventListener('click',fill);
//compare button listener
compareBtn.addEventListener('click',()=>{
     if(!arr_one && !arr_two) compareAlgo() ; 
});


//helper function for calling sort algos 
async function runQuickSort(i){
    let ele = container[i].querySelectorAll('.bar');
    let l = 0;
    let r = ele.length - 1;

    disable(i);
    await quickSort(ele,l,r);
    i<1? arr_one = true : arr_two = true;
    enable(i);
}
async function runMergeSort(i){
    let ele = container[i].querySelectorAll('.bar');
    let l = 0;
    let r = parseInt(ele.length) - 1;

    disable(i);
    await mergeSort(ele,l,r);
    i<1? arr_one = true : arr_two = true;
    enable(i);  
}
async function runSelectionSort(i){
    
    disable(i);
    await selectionSort(i);
    i<1? arr_one = true : arr_two = true;
    enable(i);
}
async function runInsertionSort(i){
    
    disable(i);
    await insertionSort(i);
    i<1? arr_one = true : arr_two = true;
    enable(i);
}
async function runBubbleSort(i){
    disable(i);
    await bubbleSort(i);
    i<1? arr_one = true : arr_two = true;
    enable(i);
}