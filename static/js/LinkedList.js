// 这是一个单向链表的实现类，之所以没有使用class构造，是因为实现封装，无法访问内部属性
function LinkedList() {
    let Node = function (element) { // {1}
        this.element = element;
        this.next = null;
    };
    let length = 0; // {2}
    let head = null; // {3}
    this.append = function (element) {
        let node = new Node(element);
        let current;
        if (head == null) {
            head = node;
        } else {
            current = head;
            //循环列表，直到找到最后一项
            while (current.next) {
                current = current.next;
            }
            //找到最后一项，将其next赋为node，建立链接
            current.next = node; //{5}
        }
        length++;
    };
    this.insert = function (position, element) {
        if (position >= 0 && position <= length) {
            let node = new Node(element);
            let current = head;
            let previous;
            let index = 0;
            if (position == 0) {
                node.next = current;
                head = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.next = current;
            }
            length++;
            return true;
        } else {
            return false;
        }
    };
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            let current = head;
            let index = 0;
            let previous;
            if (position == 0) {
                head = current.next;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
            }
            length--;
            return current.element
        } else {
            return null;
        }
    };
    this.remove = function (element) {
        let index = this.indexOf(element);
        return this.removeAt(index);
    };
    this.indexOf = function (element) {
        let current = head;
        let index = -1;
        while (current) {
            if (current.element == element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };
    this.isEmpty = function () {
        return length == 0;
     };
    this.size = function () {
        return length;
     };
    this.getHead = function () {
        return head;
     };
    this.toString = function () { 
        let current = head;
        let string = '';
        while (current) {
            string += current.element;
            current = current.next;
        }
        return string;
    };
    this.print = function () { 
        let current = head;
        while (current) {
            console.log(current.element)
            current = current.next;
        }
    };
}

export default LinkedList;