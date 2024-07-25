let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let select_algo = document.getElementById("algo");
let slider = document.getElementById("slider");
let minRange = 1;
let maxRange = slider.value;
let numOfBars = slider.value;
let heightFactor = 4;
let speedFactor = 400;
let unsorted_array = new Array(numOfBars);


function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function createRandomArray() {
    let array = new Array(numOfBars);
    for (let i = 0; i < numOfBars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;
}
document.addEventListener("DOMContentLoaded", function () {
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
});

function renderBars(array) {
    for (let i = 0; i < numOfBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }
}

slider.addEventListener("input", function () {
    numOfBars = slider.value;
    maxRange = slider.value;

    bars_container.innerHTML = "";
    unsorted_array = createRandomArray();
    renderBars(unsorted_array);
})
speed.addEventListener("change", (e) => {
    speedFactor = parseInt(e.target.value);
});

let algotouse = "";
select_algo.addEventListener("change", function () {
    algotouse = select_algo.value;
    console.log(algotouse);
});

randomize_array.addEventListener("click", function () {
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
})
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

//BUBBLE SORT
async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "rgb(218, 206, 199)";
                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "lightgreen";
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                await sleep(speedFactor);
            }
        }
        await sleep(speedFactor);
    }
    resetArrayColor(array);
}

//INSERTION SORT
async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "rgb(218, 206, 199)";
                }
            }
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "lightgreen";
            await sleep(speedFactor);
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
    }
    resetArrayColor(array);
}

//SELECTION SORT
async function SelectionSort(array){
    let bars = document.getElementsByClassName("bar");
    for(let i=0;i<array.length;i++){
        let minIdx=i;
        for(let j=i+1;j<array.length;j++){
            for (let k = 0; k < bars.length; k++) {
                if (k != minIdx) {
                    bars[k].style.backgroundColor = "rgb(218, 206, 199)";
                }
            }
            if(array[minIdx]>array[j]){
                minIdx=j;
            }
            bars[minIdx].style.backgroundColor = "lightgreen";
            await sleep(speedFactor);
            
        }
        let temp=array[minIdx];
        array[minIdx]=array[i];
        array[i]=temp;
        bars[i].style.height = array[i] * heightFactor + "px";
        bars[i].style.backgroundColor = "yellow";
        bars[minIdx].style.height = array[minIdx] * heightFactor + "px";
        bars[minIdx].style.backgroundColor = "lightgreen";
        await sleep(speedFactor);
    }
    resetArrayColor(array);
}


//MERGE SORT
async function merge(array, left, middle, right) {
    let bars = document.getElementsByClassName("bar");
    let leftArray = array.slice(left, middle + 1);
    let rightArray = array.slice(middle + 1, right + 1);

    let i = 0;
    let j = 0;
    let k = left;

    // Highlight the two halves being merged
    for (let idx = left; idx <= middle; idx++) {
        bars[idx].style.backgroundColor = "lightblue"; // Left half
    }
    for (let idx = middle + 1; idx <= right; idx++) {
        bars[idx].style.backgroundColor = "lightcoral"; // Right half
    }
    await sleep(speedFactor);

    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            bars[k].style.height = array[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "orange"; // Merging elements
            i++;
        } else {
            array[k] = rightArray[j];
            bars[k].style.height = array[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "orange"; // Merging elements
            j++;
        }
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "rgb(218, 206, 199)"; // Reset to default color
        k++;
    }

    // Copy remaining elements of leftArray, if any
    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = array[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "orange"; // Merging elements
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "rgb(218, 206, 199)"; // Reset to default color
        i++;
        k++;
    }

    // Copy remaining elements of rightArray, if any
    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = array[k] * heightFactor + "px";
        bars[k].style.backgroundColor = "orange"; // Merging elements
        await sleep(speedFactor);
        bars[k].style.backgroundColor = "rgb(218, 206, 199)"; // Reset to default color
        j++;
        k++;
    }
}

async function mergeSort(array, left, right) {
    if (left < right) {
        let middle = Math.floor((left + right) / 2);

        await mergeSort(array, left, middle);
        await mergeSort(array, middle + 1, right);
        await merge(array, left, middle, right);
    }

    // After sorting, mark all elements as sorted
    if (left === 0 && right === array.length - 1) {
        resetArrayColor(array); // All elements are sorted
    }
}



//QUICK SORT
async function swap(array, leftIndex, rightIndex) {
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    // Update the DOM to reflect the swap
    let bars = document.getElementsByClassName("bar");
    bars[leftIndex].style.height = array[leftIndex] * heightFactor + "px";
    bars[rightIndex].style.height = array[rightIndex] * heightFactor + "px";
    bars[leftIndex].style.backgroundColor = "orange"; // Swapped elements
    bars[rightIndex].style.backgroundColor = "orange"; // Swapped elements
    await sleep(speedFactor);
    bars[leftIndex].style.backgroundColor = "rgb(218, 206, 199)";
    bars[rightIndex].style.backgroundColor = "rgb(218, 206, 199)";
}

async function partition(array, left, right) {
    let bars = document.getElementsByClassName("bar");
    var pivot = array[left]; // First element as pivot
    bars[left].style.backgroundColor = "red"; // Pivot
    var i = left + 1; // Left pointer
    var j = right; // Right pointer

    while (i <= j) {
        while (i <= j && array[i] <= pivot) {
            bars[i].style.backgroundColor = "yellow"; // Active comparison
            await sleep(speedFactor);
            bars[i].style.backgroundColor = "rgb(218, 206, 199)"; // Reset to default color
            i++;
        }
        if (i <= j) {
            bars[i].style.backgroundColor = "orange"; // Mark the stopping point
        }
        while (i <= j && array[j] >= pivot) {
            bars[j].style.backgroundColor = "yellow"; // Active comparison
            await sleep(speedFactor);
            bars[j].style.backgroundColor = "rgb(218, 206, 199)"; // Reset to default color
            j--;
        }
        if (i < j) {
            await swap(array, i, j); // Swapping two elements
            i++;
            j--;
        }
    }

    // Move pivot to its correct position
    await swap(array, left, j);
    bars[j].style.backgroundColor = "rgb(218, 206, 199)"; // Pivot in correct position

    return j;
}

async function quickSort(array, left, right) {
    if (left < right) {
        let index = await partition(array, left, right); // Index returned from partition
        if (left < index - 1) { // More elements on the left side of the pivot
            await quickSort(array, left, index - 1);
        }
        if (index + 1 < right) { // More elements on the right side of the pivot
            await quickSort(array, index + 1, right);
        }
    }

    // After sorting, mark all elements as sorted
    if (left === 0 && right === array.length - 1) {
        resetArrayColor(array); // All elements are sorted
    }
}


function resetArrayColor(array) {
    let bars = document.getElementsByClassName("bar");
    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "rgb(218, 206, 199)";
    }
}

sort_btn.addEventListener("click", function () {
    switch (algotouse) {
        case "bubble":
            bubbleSort(unsorted_array);
            break;
        case "merge":
            if (
                confirm(
                    "Merge Sort is not visualized properly. Do you want to continue?"
                )
            ) {
                mergeSort(unsorted_array,0,unsorted_array.length-1);
            } else {
                break;
            }
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        case "quick":
            quickSort(unsorted_array, 0, unsorted_array.length - 1);
            break;
        case "selection":
            SelectionSort(unsorted_array);
            break;
        default:
            bubbleSort(unsorted_array);
            break;
    }
});