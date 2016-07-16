window.onload = function(){
	var inputweight = document.getElementById('inputweight');
	var inputnumber = document.getElementById('inputnumber');
	var generate  = document.getElementById('generate');
	/* 获取{.down}中的DOM节点 */
	var dataInput  = document.getElementById('dataInput'); 
	var down = document.getElementById('down'); 
	var confirm = document.getElementById('confirm'); 
	/* 获取{.middle}中的DOM节点 */
	var middle  = document.getElementById('middle');
	var userData  = document.getElementById('userData');
	var dataShow  = document.getElementById('dataShow');
	var sortData  = document.getElementById('sortData');
	var dataSort  = document.getElementById('dataSort');		
	/* 获取{.right}中的DOM节点 */
	var right  = document.getElementById('right');
	var maxValue  = document.getElementById('maxValue');
	var bags  = document.getElementById('bags');
	var show = document.getElementById('show');
	var result = null;
	generate.onclick = function(){
		if(inputweight.value == "" || inputnumber.value == "" ) {
			alert("请输入数据 !");
			return;
		}
		down.style.display = 'block';
		numberOfBags = inputnumber.value;
		totalWeight = inputweight.value;
		for(var i = 1; i <= inputnumber.value; i++) {
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
				td1.innerHTML = i;
			var td2 = document.createElement('td');
			var input2 = document.createElement('input');
				input2.type = 'text';
				input2.id = 'weight'+i;
				input2.className = 'weight';
			td2.appendChild(input2);
			var td3 = document.createElement('td');
			var input3 = document.createElement('input');
				input3.type = 'text';
				input3.id = 'value'+i;
				input3.className = 'value';
			td3.appendChild(input3);
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			dataInput.appendChild(tr);
		}			
		inputweight.disabled = "disable";
		inputnumber.disabled = "disable";
		generate.disabled = "disable";
	}


	confirm.onclick = function() {
		var w = dataInput.querySelectorAll('.weight');
		var v = dataInput.querySelectorAll('.value');
		var weight = []; //用户输入的重量
		var value = [];  //用户输入的价值
		for(var i = 0; i < numberOfBags; i++ ) {
			weight.push(parseInt(w[i].value));
		}
		for(var i = 0; i < numberOfBags; i++ ) {
			value.push(parseInt(v[i].value));
		}
		confirm.disabled = "disable";
		middle.style.display = 'block';
		maxValue.style.display = 'block';
		bags.style.display = 'block';
		result = knapsack(weight, value, numberOfBags, totalWeight);
		//console.log(typeof result.useItem);
		for(var i = 0; i < numberOfBags; i++) {
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
				td1.innerHTML = result.dataItem[i].name;
			var td2 = document.createElement('td');
				td2.innerHTML = result.dataItem[i].weight;
			var td3 = document.createElement('td');
				td3.innerHTML = result.dataItem[i].value;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			dataShow.appendChild(tr);
		}

		for(var i = 0; i < numberOfBags; i++) {
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
				td1.innerHTML = result.sortItem[i].name;
			var td2 = document.createElement('td');
				td2.innerHTML = result.sortItem[i].weight;
			var td3 = document.createElement('td');
				td3.innerHTML = result.sortItem[i].value;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			dataSort.appendChild(tr);
		}

		show.innerHTML = result.maxdata;

		for(var i = 0; i < result.useItem.length; i++) {
			var tr = document.createElement('tr');
			var td1 = document.createElement('td');
				td1.innerHTML = result.useItem[i].name;
			var td2 = document.createElement('td');
				td2.innerHTML = result.useItem[i].weight;
			var td3 = document.createElement('td');
				td3.innerHTML = result.useItem[i].value;
			tr.appendChild(td1);
			tr.appendChild(td2);
			tr.appendChild(td3);
			dataUsed.appendChild(tr);
		}

	}

}