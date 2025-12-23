const randInt = (...n) =>
  n.length > 0
    ? n.length >= 1
      ? Math.floor(Math.random() * n[0])
      : Math.floor(Math.random() * n[0])
    : Math.floor(Math.random() * 6);
console.log(randInt());
