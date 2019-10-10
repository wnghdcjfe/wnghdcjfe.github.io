const largestNumber = function(nums) {
    return nums
            .sort((a, b) => `${b}${a}` - `${a}${b}`)
            .reduce((a, b) => a + b, '') 
};  
console.log(largestNumber([10, 2]))