## 1-Array
### · reduce()
接收一个函数作为 __累加器__，数组中的每个值（从左到右）开始缩减，最终计算为一个值。
```javascript
    array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```
例子———求和
```javascript
    let numbers = [65, 44, 12, 4];
    function getSum(total, num) {
        return total + num;
    }
    function myFunction(item) {
        console.log(numbers.reduce(getSum));//125
    }
```