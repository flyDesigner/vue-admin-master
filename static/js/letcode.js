// 双数之和的问题，双循环求解法
var twoSum = function (nums, target) {
    var res = {};
    for (var i = 0; i < nums.length; i++) {
        res[target - nums[i]] = nums[i];
    }
    for (var j = 0; i < nums.length; j++) {
        if (res[nums[j]] != undefined) {
            return [nums[j], res[nums[j]]]
        }
    }
}

// hashmap求解法
var twoSum1 = function (nums, target) {
    var res = {};
    for (var i = 0; i < nums.length; i++) {
        if (res[nums[i] != undefined]) {
            return [nums[i], res[nums[i]]]
        } else {
            res[target - nums[i]] = nums[i];
        }
    }
}

// 三数之和求解，三循环求解
var threeSum = function (nums) {
    var list = [];
    for (var i = 0; i < nums.length; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            for (var k = j + 1; k < nums.length; k++) {
                if (nums[i] + nums[j] + nums[k] == 0) {
                    list.push([nums[i], nums[j], nums[k]])
                }
            }
        }
    }
    return list;
};

// hashmap求解法
var threeSum1 = function (nums) {
    var res = [];
    var hash = {};
    for (var i = 0; i < nums.length - 1; i++) {
        for (var j = i + 1; j < nums.length; j++) {
            if (hash[nums[j]] != undefined) {
                let list = [nums[j]].concat(hash[nums[j]]);
                res.push(list);
                hash[nums[j]] = undefined;
            } else {
                let key = 0 - nums[i] - nums[j];
                hash[key] = [nums[i], nums[j]];
            }
        }
    }
    return res;
};

// 双指针求解法
var threeSum2 = function (nums) {
    var res = [];
    nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length - 2; i++) {
        if (nums[i] > 0) break;
        let first = i + 1;
        let last = nums.length - 1;
        do {
            let result = nums[first] + nums[i] + nums[last];
            if (result == 0) {
                res.push([nums[i], nums[first], nums[last]]);
            }
            if (result <= 0) {
                // while (first < last && nums[first] === nums[++first]){}
                while (first < last && nums[first] === nums[first + 1]) {
                    first++;
                }
                first++;
            } else {
                // while (first < last && nums[last] === nums[--last]) {}
                while (first < last && nums[last] === nums[last - 1]) {
                    last--;
                }
                last--;
            }
        } while (first < last)
        while (nums[i] === nums[i + 1]) {
            i++;
        }
    }
    return res;
};


var lengthOfLongestSubstring = function (s) {
    var length = 0;
    var value = '';
    var list = s.split("");
    for (var i = 0; i < list.length; i++) {
        var index = value.indexOf(list[i]);
        if (index == -1) {
            value = value + list[i];
            if (length < value.length) {
                length = value.length;
            }
        } else {
            value = value + list[i];
            value = value.slice(index + 1);
        }
    }
    return length;
};

// 最长回文字符串
var longestPalindrome = function (s) {
    var start = 0;
    var end = 0;
    var length = 0;
    if (s == null || s.length < 1) return "";
    for (var i = 0; i < s.length; i++) {
        if (s[i] == s[i + 1]) {
            var len1 = expandAroundCenter(s, i, i);
            var len2 = expandAroundCenter(s, i, i + 1);
            var len = Math.max(len1, len2);
            if (len > length) {
                length = len;
                if (len % 2 == 0) {
                    start = i - len / 2 + 1;
                    end = i + len / 2;
                } else {
                    start = i - (len - 1) / 2;
                    end = i + (len - 1) / 2;
                }
            }
        } else {
            var len = expandAroundCenter(s, i, i);
            if (len > length) {
                length = len;
                start = i - (len - 1) / 2;
                end = i + (len - 1) / 2;
            }
        }
    }
    return s.substring(start, end + 1);
};

var expandAroundCenter = function (s, left, right) {
    var L = left;
    var R = right;
    while (L >= 0 && R < s.length && s.charAt(L) == s.charAt(R)) {
        L--;
        R++;
    }
    return R - L - 1;
}
//z字变换
var convert = function (s, numRows) {
    if (numRows == 1) {
        return s;
    }
    var list = [];
    var curRow = 0;
    var flag = false;
    for (var i = 0; i < Math.min(numRows, s.length); i++) {
        list.push("");
    }
    for (var j = 0; j < s.length; j++) {
        list[curRow] = list[curRow] + s[j];
        if (curRow == 0 || curRow == numRows - 1) {
            flag = !flag;
        }
        curRow += flag ? 1 : -1;
    }
    return list.join("");
}

var isPalindrome = function (x) {
    if (x < 0 || (x % 10 == 0 && x != 0)) {
        return false;
    }
    var reverse = 0;
    while (x > reverse) {
        reverse = reverse * 10 + x % 10;
        x = parseInt(x / 10);
    }
    return x == reverse || parseInt(reverse / 10) == x;
}

var maxArea = function (height) {
    var areaList = [];
    var maxAreaNum = 0;
    for (var i = 0; i < height.length - 1; i++) {
        for (var j = i + 1; j < height.length; j++) {
            let area = (j - i) * Math.min(height[i], height[j]);
            areaList.push(area);
            if (area > maxAreaNum) {
                maxAreaNum = area;
            }
        }
    }
    return maxAreaNum;
};
var maxArea2 = function (height) {
    var left = 0;
    var right = height.length - 1;
    var maxAreaNum = 0;
    while (left < right) {
        let area = (right - left) * Math.min(height[left], height[right]);
        if (area > maxAreaNum) {
            maxAreaNum = area;
        }
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxAreaNum;
};

var myAtoi = function (str) {
    if (!str) {
        return 0;
    }
    str = str.trim();
    var reg = new RegExp(/^[+|-]?\d+/g);
    if (!reg.test(str)) {
        return 0;
    }
    var num = str.match(reg)[0];
    var max = Math.pow(2, 31);
    if (num > max - 1) {
        return max - 1;
    } else if (num < -max) {
        return -max;
    }
    return num;
};

// 数字转罗马数字
var intToRoman = function (num) {
    var values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    var index = 0;
    var romanNum = "";
    while (index < 13) {
        while (num >= values[index]) {
            romanNum = romanNum + strs[index];
            num -= values[index];
        }
        index++;
    }
    return romanNum;
};

// 第二种解法
var intToRoman1 = function (num) {
    var values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    var strs = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    var romanNum = "";
    for (var i = 0; i < values.length; i++) {
        var a = parseInt(num / values[i]);
        if (a == 0) continue;
        for (var j = a; j > 0; j--) {
            romanNum = romanNum + strs[i];
        }
        num -= a * values[i];
        if (num == 0) {
            break;
        }
    }
    return romanNum;
};

// 罗马数字转数字
var romanToInt = function (s) {
    var values = {
        "M": 1000,
        "CM": 900,
        "D": 500,
        "CD": 400,
        "C": 100,
        "XC": 90,
        "L": 50,
        "XL": 40,
        "X": 10,
        "IX": 9,
        "V": 5,
        "IV": 4,
        "I": 1
    };
    var num = 0;
    for (var i = 0; i < s.length; i++) {
        if (i < s.length - 1 && !!values[s.substring(i, i + 2)]) {
            num += values[s.substring(i, i + 2)];
            i++;
        } else {
            num += values[s.substring(i, i + 1)];
        }
    }
    return num;
};

var longestCommonPrefix = function (strs) {
    if (strs.length == 0) {
        return "";
    }
    var first = strs[0];
    for (var i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(first) != 0) {
            first = first.substring(0, first.length - 1)
        }
        if (first == "") {
            break;
        }
    }
    return first;
};

var threeSumClosest = function (nums, target) {
    var colseSum = nums[0] + nums[1] + nums[2];
    nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length - 1; i++) {
        var left = i + 1;
        var right = nums.length - 1;
        while (left < right) {
            var sum = nums[left] + nums[i] + nums[right];
            if (Math.abs(sum - target) < Math.abs(colseSum - target)) {
                colseSum = sum;
            }
            if (sum < target) {
                left++;
            } else {
                right--;
            }
        }
    }
    return colseSum;
};


// 用辅助栈解决对称括号问题
var isValid = function (s) {
    var stack = [s[0]];
    var map = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    if (s == "") {
        return true;
    }
    for (var i = 1; i < s.length; i++) {
        if (map[stack[stack.length - 1]] == s[i]) {
            stack = stack.slice(0, stack.length - 1);
        } else {
            stack.push(s[i]);
        }
    }
    if (stack.length == 0) {
        return true;
    } else {
        return false;
    }
};

// 回溯算法解决数字排列问题
var letterCombinations = function (digits) {
    var values = {
        "2": "abc",
        "3": "def",
        "4": "ghi",
        "5": "jkl",
        "6": "mno",
        "7": "pqrs",
        "8": "tuv",
        "9": "wxyz"
    };
    var allResult = [];
    var ss = function (first, nextNum) {
        if (nextNum.length == 0) {
            allResult.push(first);
            return ;
        }
        var letters = values[nextNum.substring(0, 1)];
        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i];
            ss(first + letter,nextNum.substring(1));
        }
    }
    ss("",digits);
    return allResult;
}