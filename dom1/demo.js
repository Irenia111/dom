const div1 = dom.create("<div>newDiv</div>");
console.log(div1);
dom.style(div1,"color","blue");
const div2 = dom.find("#test1")[0]; // 获取对应的元素
const div3 = document.querySelectorAll(".test2")
console.log(div2);
console.log(div3);
dom.style(div2, 'color', 'red') // 设置 div.style.color

const divList = dom.find('.red') // 获取多个 div.red 元素
dom.each(divList, (n)=> console.log(n)) // 遍历 divList 里的所有元素