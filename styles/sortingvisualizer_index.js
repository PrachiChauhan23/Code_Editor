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
    return array;
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
    return array;
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
                mergeSort(unsorted_array);
            } else {
                break;
            }
            //console.log(mergeSort(unsorted_array));
            break;
        case "heap":
            HeapSort(unsorted_array);
            break;
        case "insertion":
            InsertionSort(unsorted_array);
            break;
        case "quick":
            console.log(unsorted_array.length);
            quickSort(unsorted_array, 0, unsorted_array.length - 1);
            break;
        default:
            bubbleSort(unsorted_array);
            break;
    }
});