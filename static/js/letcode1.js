/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
// 四数之和，数组中四个数字和等于target
var fourSum = function (nums, target) {
    if (nums.length < 4) {
        return [];
    }
    var allSumList = [];
    nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length - 3; i++) {
        if (nums[i] > target / 4) {
            break;
        }
        for (var j = i + 1; j < nums.length - 2; j++) {
            var left = j + 1;
            var right = nums.length - 1;
            while (left < right) {
                var sum = nums[i] + nums[j] + nums[left] + nums[right];
                if (sum == target) {
                    allSumList.push([nums[i], nums[j], nums[left], nums[right]]);
                }
                if (sum < target) {
                    while (left < right && nums[left] === nums[left + 1]) {
                        left++;
                    }
                    left++;
                } else {
                    while (left < right && nums[right] === nums[right - 1]) {
                        right--;
                    }
                    right--;
                }
            }
            while (nums[j] === nums[j + 1]) {
                j++;
            }
        }
        while (nums[i] === nums[i + 1]) {
            i++;
        }
    }
    return allSumList;
};

// 汽水兑换，
var getNum = function (num) {
    var num2 = 0;
    var digui = function (num1) {
        if (num1 == 1) {
            return;
        }
        if (num1 == 2) {
            num2++;
            return;
        }
        if (num1 >= 3) {
            num2 = num2 + parseInt(num1 / 3);
            digui(parseInt(num1 / 3) + num1 % 3);
        }
    }
    digui(num);
    return num2;
}

var getLastDelIndex = function (num) {
    var list = [];
    for (var i = 0; i < num; i++) {
        list.push(i);
    }
    var currentSize = num;
    var lastIndex;
    var j = 0;
    var count = 0;
    var delfalg = num + 1;
    while (currentSize != 0) {
        if (list[j] !== delfalg) {
            if (count++ == 2) {
                list[j] = delfalg;
                currentSize--;
                lastIndex = j;
                count = 0;
            }
        }
        j = (j + 1) % num;
    }
    return lastIndex;
}

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    var list = [];
    var generateParent = function(str,open,close,max){
        if(str.length == 2*max){
            list.push(str);
            return ;
        }
        if(open < max){
            generateParent(str+"(",open+1,close,max);
        }
        if(close < open){
            generateParent(str+")",open,close+1,max)
        }
    }
    generateParent("",0,0,n);
    return list;
};

let handler = {
    set(target,key,value,receiver) {
        console.log(target,key,value,receiver);
        Reflect.set(target,key,value,receiver);
    },
    defineProperty(target,key,attribute) {
        console.log(target,key,attribute);
        Reflect.defineProperty(target,key,attribute);
    }
}