function tripleDoors () { // calculate the result after change the door you choose.
    const doors = [0, 1, 2]; // doors, 0 is car, 1 & 2 is goat.
    const pick = Math.floor(Math.random() * 3); // the number of door that I pick
    return pick !== 0;
}

let count = 0;
const total = 10000;
for (let i = 0; i < total; i++) {
    if (tripleDoors()) {
        count++;
    }
}

console.log(count / total);
console.log('daily push')
console.log('爱倩倩啦')
console.log('爱倩倩啦')
console.log('爱倩倩啦')
