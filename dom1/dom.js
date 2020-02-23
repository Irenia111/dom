console.log("hi");
window.dom = {
    /*creat 新增节点
    *支持属于嵌套的多个标签
     */
    create(string){
        console.log("hi1");
        const container = document.createElement("template");
        /*template 标签在html内无限制，所以当做创建节点的容器*/
        container.innerHTML = string.trim();
        console.log(container.content.firstChild);
        return container.content.firstChild;
        /*在content里面的firstChild*/
    },
    /*afterinsert 在已有节点之后新增节点*/
    afterinsert(node, node2){
        node.parentNode.insertBefore(node2,node.nextSibiling);
        /*使用insertBefore，将追加的节点添加在已有节点之后的节点前*/
    },
    /*beforeappend 在已有节点之前添加节点*/
    beforeinsert(node, node2){
        node.parentNode.insertBefore(node2,node);
    },
    /*append 在父节点中增加新的节点*/
    append(parent, node){
        parent.appendChild(node);
    },
    /*wrap 将现有节点作为另一个节点的父节点*/
    wrap(node, parent){
        dom.before(node, parent);
        dom.append(parent, node);
    },



    /*remove 将一个现有节点删除，并返回该节点*/
    remove(node){
        node.parentNode.removeChild(node);
        return node;
    },
    /*empty 清空一个节点的全部子节点，并将删除的节点作为一个数组返回*/
    empty(node){
         /*因为firstChild的查找过程是动态查找，所以一边删，一边存会导致节点变短*/
        const arr = [];
        let x = node.firstChild;
        while(x){
            array.push(x);
            dom.remove(node.firstChild);
            x = node.firstChild;
        }
       return arr;
    },


    /*attr 修改节点的属性
    * 根据载入的数据不同，有不同的对应输出
    * 输入一个数据node时，只返回该节点
    * 输入一个数据node 和 需要增加的属性对象 object 
    * 输入需要修改的节点node 需要修改的属性名 name 需要修改的对应属性值 value
    * */
    attr(node, name, value){ 
        if(arguments.length === 3){
          node.setAttribute(name, value)
        }else if(arguments.length === 2){
          return node.getAttribute(name)
        }else{
            return node;
        }
      },
    /*text 读写节点内的文本内容
    * 输入一个数据node时，返回该节点的文本内容
    * 输入一个数据node 和 需要写入的文本内容
    * */
      text(node, string){ 
        if(arguments.length ===2 ){
          if('innerText' in node){
            /*如果使用innerText，则认为是IE浏览器
            * textContent 不支持IE
            */ 
            node.innerText = string; 
          }else{
            /*textContent 会获取所有元素的内容，包括 <script> 和 <style> 元素，然而 innerText 只展示给人看的元素。
            * textContent 不支持IE
            * */
            node.textContent = string;
          }
        }else if(arguments.length === 1){
          if('innerText' in node){
            return node.innerText;
          }else{
            return node.textContent;
          }
        }
      },
    /*html 读写节点内的html内容
    * 输入一个数据node时，返回该节点的html内容
    * 输入一个数据node 和 需要写入的html内容
    * */
   html(node, string){ // 适配
    if(arguments.length ===2 ){
      node.innerHTML = string; 
    }else if(arguments.length === 1){
      return node.innerHTML;
    }
  },
    /*style 修改节点的样式属性
    * 根据载入的数据不同，有不同的对应输出
    * 读取
    * 输入一个数据node时，只返回该节点样式
    * 输入一个数据node 和 样式的名称，则返回对应的样式值 
    * 写入
    * 输入需要修改的节点node 需要修改的属性名 name 需要修改的对应属性值 value
    * */
   style(node, name, value){ 
    if(arguments.length === 3){
      node.style[name]=value;
    }else if(arguments.length === 2){
        if(typeof name === "string"){
         /*如果样式信息是字符串，那么就读取相应的样式值。*/  
         return node.style[name];
        }else if( name instanceof Object){
        /*如果name是对象类型的实例*/  
        const object = name;
        for(let key in object){
        node.style[key] = object[key];
        }
        }
    }
    },
    /*class 修改节点的class属性
    * add 增加属性值
    * remove 删除已有属性
    * has 查找是存在该属性根据载入的数据不同，有不同的对应输出
    * */
    class: {
        add(node, className){
          node.classList.add(className);
        },
        remove(node, className){
          node.classList.remove(className);
        },
        has(node, className){
          return node.classList.contains(className);
        }
    },
    /*on 增加节点的监听事件，并为事件设置函数
    * */
    on(node, eventName, fn){
       node.addEventListener(eventName, fn);
    },
    /*off 删除节点的监听事件，以及事件对应的函数
    * */
    off(node, eventName, fn){
       node.removeEventListener(eventName, fn);
    },



    /* find 在scope节点范围内查找是否存在selector节点
    * */
    find(selector, scope){
        console.log(selector);
        return (scope || document).querySelectorAll(selector);
        /*如果scope不存在，就在document中查找该节点*/  
    },
    /* parent 查找并返回节点的父节点
    * */
    parent(node){
        return node.parentNode;
    },
    /* children 查找并返回节点的子节点
    * */
    children(node){
        return node.children;
    },
    /* siblings 查找并返回节点的兄妹节点
    * */
    siblings(node){
    /*将兄妹节点转换成数组返回*/  
        return Array.from(node.parentNode.children).filter(n=>n!==node);
    },
    /* next 查找并返回节点的下一个节点
    * */
    next(node){
        let x = node.nextSibling
        while(x && x.nodeType === 3){
        /*如果查到节点的下一个节点是文本，那么就返回下下一个节点*/  
          x = x.nextSibling;
        }
        return x
    },
    /* previous 查找并返回节点的上一个节点
    * */
    previous(node){
        let x = node.previousSibling
        while(x && x.nodeType === 3){
        /*如果查到节点的上一个节点是文本，那么就返回上上一个节点*/ 
          x = x.previousSibling;
        }
        return x
     },
    /* each 遍历一个节点，并调用相关函数
    * */
    each(nodeList, fn){
        for(let i=0;i<nodeList.length;i++){
          fn.call(null, nodeList[i]);
        }
    },
    /* index 查找输入节点的索引
    * */
      index(node){
        const list = dom.children(node.parentNode);
        for(let i=0;i<list.length;i++){
          if(list[i] === node){
            return i;
            break;
          }
        }
      }
 };
    
    