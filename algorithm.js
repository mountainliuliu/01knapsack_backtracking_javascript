var bestValue = 0;      
//当前最优价值
var currentWeight = 0;         
//当前重量
var currentValue = 0;         
//当前价值
var weightSort = [];         
//物品重量数组
var valueSort = [];         
//物品价值数组
var totalWeight;         
//背包容量
var numberOfBags;          
//物品数量
var x = [];
//存储最优路径
function knapsack(weight, value, numberOfBags, totalWeight){
    //传入的四个参数分别为：
    // weight: 用户输入的重量(array)
    // value: 用户输入的价值(array)
    // numberOfBags: 用户输入的物品数量(number)
    // totalWeight: 用户输入的背包总容量(number)
    var obj = new Object();
    obj.useItem = [];
    obj.sortItem = [];
    obj.dataItem = [];
    obj.maxdata = 0;
    // obj为对象, 主要是为了更好的封装数据，以便给页面端使用。有四个属性, 分别是：
    //useItem：存放得到最优解后选择的那些物品，包括“序号”, “重量”, “价值”(array)
    //sortItem：对用户输入的物品按照单位重量价值进行从大到小排序，包括“序号”, “重量” ,“价值”(array)
    //dataItem：存放用户输入的那些物品，包括“序号”, “重量” ,“价值”(array)
    //maxdata：存放最优解的值

    var r = [];
    //用于记录物品的单位重量价值
    var index = [];
    //用于存放物品的序号
    for(var i = 0; i < numberOfBags; i++) {
        r[i] = value[i] / weight[i];
        index[i] = i;
    }
    //将各物品依单位重量价值从大到小排序
    var temp = 0;   
    for(var i = 0;i < numberOfBags - 1; i++) {   
        for(var j = i + 1; j < numberOfBags; j++) {   
            if(r[i] < r[j]) {   
                temp = r[i];   
                r[i] = r[j];   
                r[j] = temp;   
                var y = index[i];   
                index[i] = index[j];   
                index[j] = y;   
            }   
        }   
    }
    //计算出按照单位重量价值进行从大到小排序后的weightSort和valueSort
    for(var i = 0; i < numberOfBags; i++) {
        weightSort[i] = weight[index[i]];   
        valueSort[i] = value[index[i]];   
    }
    backtrack(0);     //回溯搜索
    //对数据进行封装
    for(var i = 0,j = 0; i < numberOfBags; i++) {
        if(x[i] === 1) {
            var item = {'weight':weightSort[i],'value':valueSort[i],'name':index[i] + 1};
            obj.useItem[j] = item;
            j++;
        }   
    }
    for(var i = 0; i < numberOfBags; i++) {
        var item = {'weight':weightSort[i],'value':valueSort[i],'name':index[i] + 1};
        obj.sortItem[i] = item;
    }
    for(var i = 0; i < numberOfBags; i++) {
        var item = {'weight':weight[i],'value':value[i],'name':i + 1};
        obj.dataItem[i] = item;
    }
    obj.maxdata = bestValue;
    return obj;
}

function backtrack(i) {
    if(i > numberOfBags - 1) {
        //到达叶节点
        bestValue=currentValue;                        
    }
    //搜索子树
    if(currentWeight + weightSort[i] <= totalWeight)	{  //进入左子树
        currentWeight += weightSort[i];
        currentValue += valueSort[i];
        x[i] = 1;
        backtrack(i+1);
        currentWeight -= weightSort[i];
        currentValue -= valueSort[i];
    }
    if(bound(i + 1) > bestValue) {
        x[i + 1] = 0;
        backtrack(i + 1);    //进入右子树
    }
}
function bound(i) {
    var cleft = totalWeight - currentWeight;     //剩余容量
    var bound = currentValue;
    //以物品单位重量价值递减顺序装入物品
    while(i < numberOfBags && weightSort[i] <= cleft){
        cleft -= weightSort[i];
        bound += valueSort[i];
        i++;
    }
    //装满背包
    if(i < numberOfBags-1) {
        bound+=valueSort[i] * cleft / weightSort[i];
    }
    return bound;
}
//console.log(knapsack());
