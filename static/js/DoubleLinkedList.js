// 这是一个双向链表的构造函数
function DoubleLinkedList() {
    function Node(element) {
        this.element = element;
        this.pre = null;
        this.next = null;
    }
    let length = 0;
    let head = null;
    let tail = null;
    this.append = function (element) {
        let node = new Node(element);
        let current;
        if (head == null) {
            head = node;
            node.pre = head;
            tail = node;
        } else {
            current = head;
            while (current.next) {
                current = current.next;
            }
            node.pre = current;
            current.next = node;
            tail = node;
        }
        length++;

    }
    this.insert = function (position, element) {
        if (position > -1 && position < length) {
            let node = new Node(element);
            let current = head;
            let previous;
            let index = 0;
            if (position == 0) {
                if (!head) {
                    head = node;
                    tail = node;
                } else {
                    node.next = current;
                    head = node;
                    node.pre = head;
                }
            } else if (position == length) {
                current = tail;
                current.next = node;
                node.pre = current;
                tail = node;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = node;
                node.pre = previous;
                node.next = current;
                current.pre = node;
            }
            length++;
            return true;
        } else {
            return false;
        }
    }
    this.removeAt = function (position) {
        if (position > -1 && position < length) {
            let node = new Node(element);
            let current = head;
            let previous;
            let index = 0;
            if (position == 0) {
                head = current.next;
                if (length == 1) {
                    tail = null;
                } else {
                    current.next.pre = head;
                }
            } else if (position == length - 1) {
                current = tail;
                tail = current.pre;
                tail.next = null;
            } else {
                while (index++ < position) {
                    previous = current;
                    current = current.next;
                }
                previous.next = current.next;
                current.next.pre = previous;
            }
            length--;
            return current.element;
        } else {
            return null;
        }
    }
    this.remove = function (element) {
        let position = this.indexOf(element);
        return this.removeAt(position);
    }
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
    }
    this.isEmpty = function () {
        return length == 0;
    };
    this.size = function () {
        return length;
    };
    this.getHead = function () {
        return head;
    };
    this.getTail = function () {
        return tail;
    }
    this.toString = function () { };
    this.print = function () { };
}

export default DoubleLinkedList;