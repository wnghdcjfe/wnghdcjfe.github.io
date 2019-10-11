class Queue{
    constructor(){
        this.s1 = []
        this.s2 = []
    }
    front(){
        if(this.s1.length === 0){
            console.log("큐가 비었습니다. ")
            return
        }else return this.s1[this.s1.length - 1];
    }
    enqueue(value){
        while(this.s1.length){
            this.s2.push(this.s1[this.s1.length - 1]); 
            this.s1.pop(); //앞에서 빼는 것은 shift
        }
        this.s1.push(value)
        while(this.s2.length){
            this.s1.push(this.s2[this.s2.length - 1])
            this.s2.pop()
        }
    }
    dequeue(){
        if(this.s1.length === 0){
            console.log("큐가 비었습니다. ")
            return
        }
        let front_value = this.s1[this.s1.length - 1];
        this.s1.pop();  
        return front_value
    }
}
const a = new Queue()
a.enqueue(1); 
a.enqueue(2); 
a.enqueue(3); 
a.enqueue(4); 
a.enqueue(5); 
console.log(a.front()) 