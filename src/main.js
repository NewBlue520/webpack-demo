const as = async () => {
    let text = 'hello world';
    await new Promise((resolve, reject) =>{
        setTimeout( () => {
            text = 'hello';
            return resolve();
        }, 2000);
    });
    return text;
};
(async () => {
    console.log(await as());
})();

let {keys, values, entries} = Object;
let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
    console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
    console.log(value); // 1, 2, 3
}

for (let [key, value] of entries(obj)) {
    console.log([key, value]); // ['a', 1], ['b', 2], ['c', 3]
}
