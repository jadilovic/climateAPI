const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

for (let i = arr.length - 1; i >= 0; i--) {
	const randomIndex = Math.floor(Math.random() * i);
	let tempValue = arr[i];
	arr[i] = arr[randomIndex];
	arr[randomIndex] = tempValue;
}

console.log(arr);

(function () {
	return function () {
		console.log('Hi');
	};
})()();

// for (let i = 0; i < 5; i++) {
// 	setTimeout(function () {
// 		console.log(i);
// 	}, 1000);
// }

console.log(2 + 3 + '4');
console.log('2' + 3 + 4);
console.log(2 + '3' + 4);

('use strict');
a = 4;
console.log(a);

let i;
let j;
console.log(i == j);

a = { count: 1, value: 2 };
b = { count: 1, value: 2 };
a_keys = Object.keys(a).toString();
b_keys = Object.keys(b).toString();
console.log(a_keys == b_keys);

a = { count: 1, value: 2 };
b = { count: 1, value: 3 };
a_keys = Object.keys(a).toString();
b_keys = Object.keys(b).toString();
console.log(a_keys == b_keys);

a = { count: 1, value: 2 };
b = { value: 2, count: 1 };
a_keys = Object.keys(a).toString();
b_keys = Object.keys(b).toString();
console.log(a_keys == b_keys);

console.log(true == 3);

const o = console.log;
o('Hello');

function abc({ name: { first, last }, marks }) {
	console.log(first + last + '--->' + marks);
}
obj = {
	name: {
		first: 'john',
		last: 'mark',
	},
	marks: 100,
};
abc(obj);

const planets = ['Mercury', 'Venus', 'Mars'];
planets.fill('Earth');
console.log(planets);

console.log('first');
setTimeout(() => {
	console.log('second');
}, 1000);
console.log('third');

obj1 = { a: 1 };
obj2 = { a: 2, b: 2 };
obj3 = { c: 3 };
const newObj = Object.assign({}, obj1, obj2, obj3);
console.log(newObj);
