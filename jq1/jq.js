
window.jQuery = function(selectorOrArr){
    let elements;
    if(typeof selectorOrArr === "string"){
        if(selectorOrArr[0] === '<'){
            // 创建相应的元素
            elements=[createElement(selectorOrArr)];
          }else{
            /**如果输入的是字符串，则创建对应的元素选择器 */
            elements = document.querySelectorAll(selectorOrArr);
          }
    }else if(selectorOrArr instanceof Array){
        /**如果输入是数组的话，说明是已处理过的对象 */
        elements = selectorOrArr;
    }
    const api = Object.create(jQuery.prototype);
    //创建api对象，实现jquery.prototype的实例化，实现返回对象的可操作性

    api.elements= elements;
    api.oldApi = selectorOrArr.oldApi;
    return api;
}
window.$ = window.jQuery;
    jQuery.prototype={
    constructor: jQuery,
    jQuery: true,

    //get 获取index对应的元素
    get(index){
        return this.elements[index]
      },
    
    //appendTo 追加输入节点的子节点
    appendTo(node){
      if(node instanceof Element){
          this.each(el => node.appendChild(el)) 
      // 遍历 element，对每个 el 进行 node.appendChild 操作
      }else if(node.jquery === true){
          this.each(el => node.get(0).appendChild(el))  
      // 遍历 element，对每个 el 进行 node.get(0).appendChild(el))  操作
      }
      },
    
      append(children){
        if(children instanceof Element){
          this.get(0).appendChild(children)
        }else if(children instanceof HTMLCollection){
          for(let i =0;i<children.length;i++){
            this.get(0).appendChild(children[i])
          }
        }else if(children.jquery === true){
          children.each(node => this.get(0).appendChild(node))
        }
      },

    
      find(selector){
        let array = []
        for(let i =0;i<this.elements.length;i++){
          const elements2 = Array.from(this.elements[i].querySelectorAll(selector))
          array = array.concat(elements2)
        }
        array.oldApi = this // this 就是 旧 api
        return jQuery(array)
      },
      each(fn){
        for(let i=0; i<this.elements.length;i++){
          fn.call(null, this.elements[i], i)
        }
        return this
      },
      parent(){
        const array = []
        this.each((node)=>{
          if(array.indexOf(node.parentNode) === -1){
            array.push(node.parentNode)
          }
        })
        return jQuery(array)
      },
      children(){
        const array = []
        this.each((node)=>{
          // 上课的时候这段代码是复制的，复制错了，现已改正
          array.push(...node.children)
          
        })
        return jQuery(array)
      },
      print(){
        console.log(elements)
      },
      // 闭包：函数访问外部的变量
      addClass(className){
        for(let i=0;i<this.elements.length;i++){
          const element = this.elements[i]
          element.classList.add(className)
        }
        return this
      },
      
      end(){
        return this.oldApi  // this 就是新 api
      },
    
    }
