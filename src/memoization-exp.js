const memo = [];
const factorial = (n) => {
    if(n === 1) {
        console.log(`${memo}`);
        console.log(`memo[${n}] = ${n} * factorial(${n - 1}) Fin.`);
        return 1;
    } else if (!memo[n]) {
        console.log(`${!memo[n]}`);
        console.log(`memo[${n}] = ${n} * factorial(${n - 1})`);
        return memo[n] = n * factorial(n - 1);
    }
    return memo[n];
}
factorial(5);

const memo_ = []
const fibonacci = (n) => {
    if(n === 0 || n === 1) {
        console.log(`memo_[${n}] = fibonacci(${n - 1}) + fibonacci(${n - 2})`)
        return 1;
    } else if(!memo_[n]) {
        console.log(`memo_[${n}] = fibonacci(${n - 1}) + fibonacci(${n - 2})`)
        memo_[n] = fibonacci(n - 1) + fibonacci(n - 2);
    }
    return memo_[n];
}
console.log(fibonacci(10));
console.log(fibonacci(13));
console.log(fibonacci(10));
console.log(fibonacci(4));
