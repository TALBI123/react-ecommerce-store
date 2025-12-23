let arr = [
  { name: "iphone", price: 320, contity: 3 },
  { name: "pc", price: 1020, contity: 1 },
  { name: "tv", price: 820, contity: 2 },
  { name: "mac", price: 2120, contity: 1 },
];
// const deleteProduct = (name) => {
//     return arr.reduce(
//         (acc, elm) =>
//             elm.name === name && elm.contity > 1
//         ? [...acc, { ...elm, contity: elm.contity - 1 }]
//         : elm.name === name
//         ? acc
//         : [...acc, { ...elm }],
//         []
//     );
// };
// // delete item form iphone
// arr = deleteProduct("iphone");
// console.log(arr);
// // delete item form pc
// arr = deleteProduct("pc");
// console.log(arr);
// // delete item form Tv
// arr = deleteProduct("tv");
// console.log(arr);
// arr = deleteProduct("tv");
// // console.log(arr);
// const [{name,price,contity},{name:nameSecnode,price:priceSeconde,contity:contitySeconde}] = arr;
// console.log(nameSecnode,priceSeconde,contitySeconde);
// let obj = {
//     name:"ali",
//     age:17,
//     skills:["html","css","js"],
// }// obj {name:"",age:23,skills:[]}
// const obj2 = {...obj};
// obj2.name = "mohamed";
// console.log(obj)
// console.log(obj2)